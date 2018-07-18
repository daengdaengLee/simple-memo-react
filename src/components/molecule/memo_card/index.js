import React from 'react';
import styled from 'styled-components';
import Button from '../../atom/button';
import InputText from '../../atom/input_text';

const Card = styled.div`
  display: flex;
  height: 2rem;
  margin: 2rem 0 0;
`;

const MemoCard = ({
  memo,
  inputEditing,
  saveEditing,
  startEdit,
  cancelEditing,
  deleteMemo,
}) => (
  <Card key={memo.id}>
    <InputText
      value={memo.isEditing ? memo.editingContent : memo.content}
      disabled={!memo.isEditing}
      onChange={event => inputEditing(memo.id, event)}
      backgroundColor="#e0f7fa"
    />
    {memo.isEditing ? (
      <Button width="5rem" onClick={() => saveEditing(memo.id)}>
        Save
      </Button>
    ) : (
      <Button width="5rem" onClick={() => startEdit(memo.id)}>
        Edit
      </Button>
    )}
    {memo.isEditing ? (
      <Button width="5rem" onClick={() => cancelEditing(memo.id)}>
        Cancel
      </Button>
    ) : (
      <Button width="5rem" onClick={() => deleteMemo(memo.id)}>
        Delete
      </Button>
    )}
  </Card>
);

export default MemoCard;
