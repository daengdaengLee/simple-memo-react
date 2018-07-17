import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import uuidv1 from 'uuid/v1';

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;
  box-shadow: 0 10px 8px #eeeeee;
  font-size: 3rem;
  background-color: #b3e5fc;
`;

const InputField = styled.div`
  display: flex;
  margin: 1rem 30rem;
  height: 2rem;
`;

const InputNew = styled.input`
  flex-grow: 1;
  font-size: 1.2rem;
  border: 1px solid #0d47a1;
  border-radius: 0.2rem;
  padding-left: 0.4rem;
`;

const Button = styled.button`
  ${props =>
    props.width &&
    css`
      width: ${props.width};
    `} margin-left: 1rem;
  border: 0 none;
  outline: 0 none;
  background-color: #b2ebf2;
  border-radius: 0.2rem;
  &:hover {
    background-color: #80deea;
    cursor: pointer;
    opacity: 0.8;
  }
  &:active {
    opacity: 1;
  }
`;

const Card = styled.div`
  display: flex;
  height: 2rem;
  margin: 2rem 30rem 0;
`;

const InputEdit = styled.input`
  flex-grow: 1;
  font-size: 1.2rem;
  border: 1px solid #0d47a1;
  border-radius: 0.2rem;
  padding-left: 0.4rem;
  background-color: #e0f7fa;
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
`;

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
  memos: prevState.memos.filter(memo => memo.id !== id),
});

const startEdit = id => prevState => {
  const editingMemo = prevState.memos.find(memo => memo.id === id);
  const idx = prevState.memos.findIndex(memo => memo.id === id);
  return {
    memos: [
      ...prevState.memos.slice(0, idx),
      { ...editingMemo, isEditing: true, editingContent: editingMemo.content },
      ...prevState.memos.slice(idx + 1),
    ],
  };
};

const inputEditing = (id, memo) => prevState => {
  const editingMemo = prevState.memos.find(memo => memo.id === id);
  const idx = prevState.memos.findIndex(memo => memo.id === id);
  return {
    memos: [
      ...prevState.memos.slice(0, idx),
      { ...editingMemo, editingContent: memo },
      ...prevState.memos.slice(idx + 1),
    ],
  };
};

const saveEditing = id => prevState => {
  const editingMemo = prevState.memos.find(memo => memo.id === id);
  const idx = prevState.memos.findIndex(memo => memo.id === id);
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
  const editingMemo = prevState.memos.find(memo => memo.id === id);
  const idx = prevState.memos.findIndex(memo => memo.id === id);
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

class App extends Component {
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
      <div className="App">
        <Header>Simple Memo App</Header>
        <InputField>
          <InputNew
            placeholder="Input the memo"
            value={newMemo}
            onInput={_inputNewMemo}
          />
          <Button width="11rem" onClick={_createNewMemo}>
            CREATE
          </Button>
        </InputField>
        <CardList>
          {memos.map(memo => (
            <Card key={memo.id}>
              <InputEdit
                value={memo.isEditing ? memo.editingContent : memo.content}
                disabled={!memo.isEditing}
                onChange={event => _inputEditing(memo.id, event)}
              />
              {memo.isEditing ? (
                <Button width="5rem" onClick={() => _saveEditing(memo.id)}>
                  Save
                </Button>
              ) : (
                <Button width="5rem" onClick={() => _startEdit(memo.id)}>
                  Edit
                </Button>
              )}
              {memo.isEditing ? (
                <Button width="5rem" onClick={() => _cancelEditing(memo.id)}>
                  Cancel
                </Button>
              ) : (
                <Button width="5rem" onClick={() => _deleteMemo(memo.id)}>
                  Delete
                </Button>
              )}
            </Card>
          ))}
        </CardList>
      </div>
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

export default App;
