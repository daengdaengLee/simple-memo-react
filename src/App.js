import React, { Component } from 'react';
import styled from 'styled-components';

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;
  box-shadow: 0 10px 8px #EEEEEE;
  font-size: 3rem;
  background-color: #B3E5FC;
`;

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header>
          Simple Memo App
        </Header>
      </div>
    );
  }
}

export default App;
