import styled from 'styled-components'
import { InputProps } from './input'
import { theme } from '../theme'

export const Label = styled('label')<Partial<InputProps>>`
  display: block;
  margin-bottom: ${(props) => (props.withMargin ? '32px' : props.noMargin ? '0' : '20px')};
  position: relative;

  .input::-webkit-outer-spin-button,
  .input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .input[type='number'] {
    -moz-appearance: textfield;
  }

  .input:-webkit-autofill,
  .input:-webkit-autofill:hover,
  .input:-webkit-autofill:focus,
  .input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px ${theme.primaryLight} inset !important;
    -webkit-text-fill-color: ${theme.primary};
  }

  .input {
    width: 100%;
    outline: none;
    background-color: #ffffff;
    border-radius: 4px;
    color: ${theme.primary};
    border: 1px solid ${(props) => (props?.errorMessage ? props.theme.error : props.theme.primary)};
    box-shadow: inset 0 0 8px
      ${(props) => (props?.errorMessage ? props.theme.error + '15' : props.theme.primary + '15')};
    padding: 24px 16px 7px;
    caret-color: ${(props) => (props?.errorMessage ? props.theme.error : props.theme.primary)};
    display: block;

    &::placeholder {
      opacity: 0;
    }

    &:not(:placeholder-shown) {
      + span {
        transform: translateY(8px);
        font-size: 12px;
      }
    }

    &:focus {
      box-shadow: 0 0 1px 4px
        ${(props) => (props?.errorMessage ? props.theme.error + '15' : props.theme.primary + '15')};
    }
  }

  .textarea {
    resize: none;
  }

  span {
    position: absolute;
    top: 0;
    left: 16px;
    font-size: 16px;
    transition: 0.2s;
    color: #bdbdbd;
    cursor: text;
    will-change: transform, font-size;
    transform: translateY(16px);
    line-height: 1;
  }

  &:focus-within {
    > span {
      transform: translateY(8px);
      font-size: 12px;
    }
  }

  .error-message {
    position: absolute;
    top: 100%;
    transform: translateY(5px);
    color: ${(props) => props.theme.error};
    font-size: 14px;
  }
`

export const Error = styled.p`
  color: red;
  margin: 0;
`
