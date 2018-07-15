import React, { Component } from 'react';
import styled, { css } from 'styled-components';

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;
  box-shadow: 0 10px 8px #EEEEEE;
  font-size: 3rem;
  background-color: #B3E5FC;
`;

const InputField = styled.div`
  display: flex;
  margin: 1rem 30rem;
  height: 2rem;
`;

const InputNew = styled.input`
  flex-grow: 1;
  font-size: 1.2rem;
  border: 1px solid #0D47A1;
  border-radius: .2rem;
  padding-left: .4rem;
`;

const Button = styled.button`
  ${props => props.width && css`width: ${props.width};`}
  margin-left: 1rem;
  border: 0 none;
  outline: 0 none;
  background-color: #B2EBF2;
  border-radius: .2rem;
  &:hover {
    background-color: #80DEEA;
    cursor: pointer;
    opacity: .8;
  }
  &:active {
    opacity: 1;
  }
`;

const Card = styled.div`
  display: flex;
  margin: 2rem 30rem;
  height: 2rem;
`;

const InputEdit = styled.input`
  flex-grow: 1;
  font-size: 1.2rem;
  border: 1px solid #0D47A1;
  border-radius: .2rem;
  padding-left: .4rem;
  background-color: #E0F7FA;
`;

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header>
          Simple Memo App
        </Header>
        <InputField>
          <InputNew placeholder="Input the memo" />
          <Button width="11rem">CREATE</Button>
        </InputField>
        <Card>
          <InputEdit value="Test memo" disabled />
          <Button width="5rem">Edit</Button>
          <Button width="5rem">Delete</Button>
        </Card>
      </div>
    );
  }
}

export default App;
