import styled from 'styled-components'
import { LightenDarkenColor } from '../button/util'
import { theme } from '../theme'

export const FileInput = styled('input')`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;

  + label {
    display: inline-block;
    border-radius: 4px;
    padding: 12px 24px;
    background-color: ${theme.primary};
    color: #fff;
    border: 1px solid transparent;
    box-shadow: 0 4px 4px rgba(139, 193, 210, 0.1);
    font-size: 16px;
    transition: 0.3s;
    cursor: pointer;
  }

  &:focus + label,
  + label:hover {
    background-color: ${LightenDarkenColor(theme.primary, -25)};
  }
`
export const FileInputWrapper = styled('div')`
  text-align: center;

  div {
    margin: 20px;
  }
`
