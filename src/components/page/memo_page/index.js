import React, { Component } from 'react';
import uuidv1 from 'uuid/v1';
import Presenter from './presenter';

const find = (predi, list) => list.find(predi);

const findIndex = (predi, list) => list.findIndex(predi);

const filter = (predi, list) => list.filter(predi);

const not = val => !val;

const isSameId = id => obj => obj.id === id;

const setNewMemo = newMemo => state => ({ ...state, newMemo });

const unshiftMemos = memo => state => ({
  ...state,
  memos: [memo, ...state.memos],
});

const filterMemos = predi => state => ({
  ...state,
  memos: filter(predi, state.memos),
});

const replaceMemos = (idx, memo) => state => ({
  ...state,
  memos: [...state.memos.slice(0, idx), memo, ...state.memos.slice(idx + 1)],
});

const changeMemo = (id, changer) => state => {
  const idx = findIndex(isSameId(id), state.memos);
  const editingMemo = find(isSameId(id), state.memos);
  const changedMemo = changer(editingMemo);
  return replaceMemos(idx, changedMemo)(state);
};

const createNewMemo = id => state => {
  const unshiftMemosState = unshiftMemos({
    id,
    content: state.newMemo,
    isEditing: false,
    editingContent: '',
  })(state);
  const resetNewMemoState = setNewMemo('')(unshiftMemosState);
  return resetNewMemoState;
};

const deleteMemo = id => state =>
  filterMemos(memo => not(isSameId(id)(memo)))(state);

const startEdit = id => state =>
  changeMemo(id, editingMemo => ({
    ...editingMemo,
    isEditing: true,
    editingContent: editingMemo.content,
  }))(state);

const inputEditing = (id, memo) => state =>
  changeMemo(id, editingMemo => ({ ...editingMemo, editingContent: memo }))(
    state,
  );

const saveEditing = id => state =>
  changeMemo(id, editingMemo => ({
    ...editingMemo,
    content: editingMemo.editingContent,
    isEditing: false,
    editingContent: '',
  }))(state);

const cancelEditing = id => state =>
  changeMemo(id, editingMemo => ({
    ...editingMemo,
    isEditing: false,
    editingContent: '',
  }))(state);

const resetEditing = id => state =>
  changeMemo(id, editingMemo => ({
    ...editingMemo,
    editingContent: editingMemo.content,
  }))(state);

const validateMemo = memo => memo.trim().length > 0;

const validateCreateNewMemo = state => validateMemo(state.newMemo);

const validateEditingMemo = (id, state) =>
  validateMemo(find(isSameId(id), state.memos).editingContent);

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
