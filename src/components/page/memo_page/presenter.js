import React from 'react';
import MemoPageHeader from '../../organism/memo_page_header';
import MemoPageMain from '../../organism/memo_page_main';

const Presenter = ({
  newMemo,
  memos,
  inputNewMemo,
  inputEditing,
  createNewMemo,
  saveEditing,
  startEdit,
  cancelEditing,
  deleteMemo,
}) => (
  <div className="App">
    <MemoPageHeader>Simple Memo App</MemoPageHeader>
    <MemoPageMain
      newMemo={newMemo}
      memos={memos}
      inputNewMemo={inputNewMemo}
      createNewMemo={createNewMemo}
      inputEditing={inputEditing}
      saveEditing={saveEditing}
      startEdit={startEdit}
      cancelEditing={cancelEditing}
      deleteMemo={deleteMemo}
    />
  </div>
);

export default Presenter;
