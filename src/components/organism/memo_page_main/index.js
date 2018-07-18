import React from 'react';
import styled from 'styled-components';
import Button from '../../atom/button';
import InputText from '../../atom/input_text';
import MemoCard from '../../molecule/memo_card';

const MainContainer = styled.div`
  padding: 0 20rem;
`;

const InputField = styled.div`
  display: flex;
  margin: 1rem 0;
  height: 2rem;
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
`;

const MemoPageMain = ({
  newMemo,
  memos,
  inputNewMemo,
  createNewMemo,
  inputEditing,
  saveEditing,
  startEdit,
  cancelEditing,
  deleteMemo,
}) => (
  <MainContainer>
    <InputField>
      <InputText
        placeholder="Input the memo"
        value={newMemo}
        onChange={inputNewMemo}
      />
      <Button width="11rem" onClick={createNewMemo}>
        CREATE
      </Button>
    </InputField>
    <CardList>
      {memos.map(memo => (
        <MemoCard
          key={memo.id}
          memo={memo}
          inputEditing={inputEditing}
          saveEditing={saveEditing}
          startEdit={startEdit}
          cancelEditing={cancelEditing}
          deleteMemo={deleteMemo}
        />
      ))}
    </CardList>
  </MainContainer>
);

export default MemoPageMain;
