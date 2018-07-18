import styled, { css } from 'styled-components';

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

export default Button;
