import React, { Component } from 'react';
import uuidv1 from 'uuid/v1';
import Presenter from './presenter';
import {
  setNewMemo,
  validateCreateNewMemo,
  createNewMemo,
  deleteMemo,
  startEdit,
  inputEditing,
  validateEditingMemo,
  saveEditing,
  cancelEditing,
  resetEditing,
} from '../../../assets/method/memo_page_method';

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
