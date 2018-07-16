import React, { Component } from 'react';
import styled, { css } from 'styled-components';

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

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header>Simple Memo App</Header>
        <InputField>
          <InputNew placeholder="Input the memo" />
          <Button width="11rem">CREATE</Button>
        </InputField>
        <CardList>
          <Card>
            <InputEdit value="Test memo" disabled />
            <Button width="5rem">Edit</Button>
            <Button width="5rem">Delete</Button>
          </Card>
          <Card>
            <InputEdit value="Test memo" disabled />
            <Button width="5rem">Edit</Button>
            <Button width="5rem">Delete</Button>
          </Card>
          <Card>
            <InputEdit value="Test memo" disabled />
            <Button width="5rem">Edit</Button>
            <Button width="5rem">Delete</Button>
          </Card>
          <Card>
            <InputEdit value="Test memo" disabled />
            <Button width="5rem">Edit</Button>
            <Button width="5rem">Delete</Button>
          </Card>
          <Card>
            <InputEdit value="Test memo" disabled />
            <Button width="5rem">Edit</Button>
            <Button width="5rem">Delete</Button>
          </Card>
          <Card>
            <InputEdit value="Test memo" disabled />
            <Button width="5rem">Edit</Button>
            <Button width="5rem">Delete</Button>
          </Card>
          <Card>
            <InputEdit value="Test memo" disabled />
            <Button width="5rem">Edit</Button>
            <Button width="5rem">Delete</Button>
          </Card>
          <Card>
            <InputEdit value="Test memo" disabled />
            <Button width="5rem">Edit</Button>
            <Button width="5rem">Delete</Button>
          </Card>
          <Card>
            <InputEdit value="Test memo" disabled />
            <Button width="5rem">Edit</Button>
            <Button width="5rem">Delete</Button>
          </Card>
          <Card>
            <InputEdit value="Test memo" disabled />
            <Button width="5rem">Edit</Button>
            <Button width="5rem">Delete</Button>
          </Card>
          <Card>
            <InputEdit value="Test memo" disabled />
            <Button width="5rem">Edit</Button>
            <Button width="5rem">Delete</Button>
          </Card>
          <Card>
            <InputEdit value="Test memo" disabled />
            <Button width="5rem">Edit</Button>
            <Button width="5rem">Delete</Button>
          </Card>
          <Card>
            <InputEdit value="Test memo" disabled />
            <Button width="5rem">Edit</Button>
            <Button width="5rem">Delete</Button>
          </Card>
          <Card>
            <InputEdit value="Test memo" disabled />
            <Button width="5rem">Edit</Button>
            <Button width="5rem">Delete</Button>
          </Card>
          <Card>
            <InputEdit value="Test memo" disabled />
            <Button width="5rem">Edit</Button>
            <Button width="5rem">Delete</Button>
          </Card>
          <Card>
            <InputEdit value="Test memo" disabled />
            <Button width="5rem">Edit</Button>
            <Button width="5rem">Delete</Button>
          </Card>
          <Card>
            <InputEdit value="Test memo" disabled />
            <Button width="5rem">Edit</Button>
            <Button width="5rem">Delete</Button>
          </Card>
          <Card>
            <InputEdit value="Test memo" disabled />
            <Button width="5rem">Edit</Button>
            <Button width="5rem">Delete</Button>
          </Card>
          <Card>
            <InputEdit value="Test memo" disabled />
            <Button width="5rem">Edit</Button>
            <Button width="5rem">Delete</Button>
          </Card>
          <Card>
            <InputEdit value="Test memo" disabled />
            <Button width="5rem">Edit</Button>
            <Button width="5rem">Delete</Button>
          </Card>
          <Card>
            <InputEdit value="Test memo" disabled />
            <Button width="5rem">Edit</Button>
            <Button width="5rem">Delete</Button>
          </Card>
          <Card>
            <InputEdit value="Test memo" disabled />
            <Button width="5rem">Edit</Button>
            <Button width="5rem">Delete</Button>
          </Card>
          <Card>
            <InputEdit value="Test memo" disabled />
            <Button width="5rem">Edit</Button>
            <Button width="5rem">Delete</Button>
          </Card>
          <Card>
            <InputEdit value="Test memo" disabled />
            <Button width="5rem">Edit</Button>
            <Button width="5rem">Delete</Button>
          </Card>
        </CardList>
      </div>
    );
  }
}

export default App;
