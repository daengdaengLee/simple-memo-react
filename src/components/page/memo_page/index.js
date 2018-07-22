import React, { Component } from 'react';
import uuidv1 from 'uuid/v1';
import _ from 'underscore';
import Presenter from './presenter';

_.pipe = function(...funcs) {
  const reversed = _.sortBy(funcs, (funcs, index) => -index);
  return _.compose(...reversed);
};

_.go = function(value, ...funcs) {
  return _.pipe(...funcs)(value);
};

const isSameId = id =>
  _.pipe(
    _.property('id'),
    _.partial(_.isEqual, _, id),
  );

const setNewMemo = newMemo => state => ({ ...state, newMemo });

const unshiftMemos = memo => state => ({
  ...state,
  memos: [memo, ...state.memos],
});

const filterMemos = predi => state =>
  _.go(state, _.property('memos'), _.partial(_.filter, _, predi), memos => ({
    ...state,
    memos,
  }));

const replaceMemos = (idx, memo) => state =>
  _.go(
    state,
    _.property('memos'),
    memos => [...memos.slice(0, idx), memo, ...memos.slice(idx + 1)],
    memos => ({ ...state, memos }),
  );

const changeMemo = (id, changer) => state => {
  const idx = _.findIndex(state.memos, isSameId(id));
  const changedMemo = _.go(
    state,
    _.property('memos'),
    _.partial(_.find, _, isSameId(id)),
    changer,
  );
  return replaceMemos(idx, changedMemo)(state);
};

const createNewMemo = id => state =>
  _.go(
    state,
    unshiftMemos({
      id,
      content: state.newMemo,
      isEditing: false,
      editingContent: '',
    }),
    setNewMemo(''),
  );

const deleteMemo = id => state =>
  _.go(state, filterMemos(_.go(id, isSameId, _.negate)));

const startEdit = id => state =>
  _.go(
    state,
    changeMemo(id, memo => ({
      ...memo,
      isEditing: true,
      editingContent: memo.content,
    })),
  );

const inputEditing = (id, content) => state =>
  _.go(state, changeMemo(id, memo => ({ ...memo, editingContent: content })));

const saveEditing = id => state =>
  _.go(
    state,
    changeMemo(id, memo => ({
      ...memo,
      content: memo.editingContent,
      isEditing: false,
      editingContent: '',
    })),
  );

const cancelEditing = id => state =>
  _.go(
    state,
    changeMemo(id, memo => ({ ...memo, isEditing: false, editingContent: '' })),
  );

const resetEditing = id => state =>
  _.go(
    state,
    changeMemo(id, memo => ({ ...memo, editingContent: memo.content })),
  );

const validateMemo = memo => memo.trim().length > 0;

const validateCreateNewMemo = state => validateMemo(state.newMemo);

const validateEditingMemo = (id, state) =>
  _.go(
    state,
    _.property('memos'),
    _.partial(_.find, _, isSameId(id)),
    _.property('editingContent'),
    validateMemo,
  );

class MemoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newMemo: '',
      memos: [],
    };
    this._inputNewMemo = this._inputNewMemo.bind(this);
    this._createNewMemo = this._createNewMemo.bind(this);
    this._deleteMemo = this._deleteMemo.bind(this);
    this._startEdit = this._startEdit.bind(this);
    this._inputEditing = this._inputEditing.bind(this);
    this._saveEditing = this._saveEditing.bind(this);
    this._cancelEditing = this._cancelEditing.bind(this);
    this._failedToMakeNewMemo = this._failedToMakeNewMemo.bind(this);
    this._failedToSaveEditing = this._failedToSaveEditing.bind(this);
  }

  render() {
    const {
      _inputNewMemo,
      _createNewMemo,
      _deleteMemo,
      _startEdit,
      _inputEditing,
      _saveEditing,
      _cancelEditing,
    } = this;
    const { newMemo, memos } = this.state;
    return (
      <Presenter
        newMemo={newMemo}
        memos={memos}
        inputNewMemo={_inputNewMemo}
        inputEditing={_inputEditing}
        createNewMemo={_createNewMemo}
        saveEditing={_saveEditing}
        startEdit={_startEdit}
        cancelEditing={_cancelEditing}
        deleteMemo={_deleteMemo}
      />
    );
  }

  _inputNewMemo(event) {
    const newMemo = event.target.value;
    this.setState(setNewMemo(newMemo));
  }

  _createNewMemo() {
    validateCreateNewMemo(this.state)
      ? this.setState(createNewMemo(uuidv1()))
      : this._failedToMakeNewMemo();
  }

  _deleteMemo(id) {
    this.setState(deleteMemo(id));
  }

  _startEdit(id) {
    this.setState(startEdit(id));
  }

  _inputEditing(id, event) {
    const editingMemo = event.target.value;
    this.setState(inputEditing(id, editingMemo));
  }

  _saveEditing(id) {
    validateEditingMemo(id, this.state)
      ? this.setState(saveEditing(id))
      : this._failedToSaveEditing(id);
  }

  _cancelEditing(id) {
    this.setState(cancelEditing(id));
  }

  _failedToMakeNewMemo() {
    alert('Cannot make empty memo.');
    this.setState(setNewMemo(''));
  }

  _failedToSaveEditing(id) {
    alert('Cannot make empty memo.');
    this.setState(resetEditing(id));
  }
}

export default MemoPage;
