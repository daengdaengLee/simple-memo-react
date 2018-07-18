import React, { Component } from 'react';
import uuidv1 from 'uuid/v1';
import Presenter from './presenter';

const find = (predi, list) => list.find(predi);

const findIndex = (predi, list) => list.findIndex(predi);

const not = val => !val;

const isSameId = id => obj => obj.id === id;

const createNewMemo = id => prevState => ({
  newMemo: '',
  memos: [
    {
      id,
      content: prevState.newMemo,
      isEditing: false,
      editingContent: '',
    },
    ...prevState.memos,
  ],
});

const deleteMemo = id => prevState => ({
  memos: prevState.memos.filter(memo => not(isSameId(id)(memo))),
});

const startEdit = id => prevState => {
  const editingMemo = find(isSameId(id), prevState.memos);
  const idx = findIndex(isSameId(id), prevState.memos);
  return {
    memos: [
      ...prevState.memos.slice(0, idx),
      { ...editingMemo, isEditing: true, editingContent: editingMemo.content },
      ...prevState.memos.slice(idx + 1),
    ],
  };
};

const inputEditing = (id, memo) => prevState => {
  const editingMemo = find(isSameId(id), prevState.memos);
  const idx = findIndex(isSameId(id), prevState.memos);
  return {
    memos: [
      ...prevState.memos.slice(0, idx),
      { ...editingMemo, editingContent: memo },
      ...prevState.memos.slice(idx + 1),
    ],
  };
};

const saveEditing = id => prevState => {
  const editingMemo = find(isSameId(id), prevState.memos);
  const idx = findIndex(isSameId(id), prevState.memos);
  return {
    memos: [
      ...prevState.memos.slice(0, idx),
      {
        ...editingMemo,
        content: editingMemo.editingContent,
        isEditing: false,
        editingContent: '',
      },
      ...prevState.memos.slice(idx + 1),
    ],
  };
};

const cancelEditing = id => prevState => {
  const editingMemo = find(isSameId(id), prevState.memos);
  const idx = findIndex(isSameId(id), prevState.memos);
  return {
    memos: [
      ...prevState.memos.slice(0, idx),
      {
        ...editingMemo,
        isEditing: false,
        editingContent: '',
      },
      ...prevState.memos.slice(idx + 1),
    ],
  };
};

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
    this.setState({ newMemo });
  }

  _createNewMemo() {
    this.setState(createNewMemo(uuidv1()));
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
    this.setState(saveEditing(id));
  }

  _cancelEditing(id) {
    this.setState(cancelEditing(id));
  }
}

export default MemoPage;
