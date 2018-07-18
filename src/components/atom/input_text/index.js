import React from 'react';
import styled, { css } from 'styled-components';

const noop = () => {};

const Input = styled.input`
  flex-grow: 1;
  font-size: 1.2rem;
  border: 1px solid #0d47a1;
  border-radius: 0.2rem;
  padding-left: 0.4rem;
  ${props =>
    props.backgroundColor &&
    css`
      background-color: ${props.backgroundColor};
    `};
`;

const InputText = ({
  backgroundColor,
  placeholder,
  value,
  disabled,
  onChange,
}) => (
  <Input
    backgroundColor={backgroundColor}
    placeholder={placeholder || ''}
    value={value}
    disabled={disabled === void 0 ? false : disabled}
    onChange={onChange || noop}
  />
);

export default InputText;
