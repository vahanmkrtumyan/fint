import styled from 'styled-components'
import { theme } from '../theme'
import { LightenDarkenColor } from './util'
import { ButtonProps } from './button'

const getImportance = (props: ButtonProps) => {
  const mapping = {
    primary: {
      bgColor: theme.primary,
      color: '#fff',
      borderColor: 'transparent',
      hoverBgColor: LightenDarkenColor(theme.primary, -25),
      hoverColor: '#fff',
    },
    secondary: {
      bgColor: theme.secondary,
      color: '#fff',
      borderColor: 'transparent',
      hoverBgColor: LightenDarkenColor(theme.secondary, -25),
      hoverColor: '#fff',
    },
    reset: {
      bgColor: '#ffffff',
      color: theme.error,
      borderColor: theme.error,
      hoverBgColor: theme.error,
      hoverColor: '#ffffff',
    },
  }
  return mapping[props.importance]
}

const getSize = (props) => {
  const mapping = {
    lg: {
      height: '56px',
      size: '18px',
      heightMobile: '44px',
      sizeMobile: '18px',
      padding: '0 32px',
    },
    md: {
      height: '48px',
      size: '16px',
      heightMobile: '40px',
      sizeMobile: '16px',
      padding: '0 24px',
    },
    sm: {
      height: '40px',
      size: '16px',
      heightMobile: '32px',
      sizeMobile: '14px',
      padding: '0 24px',
    },
    xs: {
      height: '28px',
      size: '14px',
      heightMobile: '28px',
      sizeMobile: '14px',
      padding: '0 12px',
    },
  }
  return mapping[props.size]
}

export const ButtonStyle = styled('button')<ButtonProps>`
  display: inline-block;
  border-radius: 4px;
  padding: ${(props) => getSize(props).padding};
  background-color: ${(props) => getImportance(props).bgColor};
  color: ${(props) => getImportance(props).color};
  border: 1px solid ${(props) => getImportance(props).borderColor};
  box-shadow: 0 4px 4px rgba(139, 193, 210, 0.1);
  height: ${(props) => getSize(props).height};
  line-height: ${(props) => getSize(props).height};
  font-size: ${(props) => getSize(props).size};
  transition: 0.3s;
  cursor: pointer;

  &:not(.no-hover) {
    &:hover {
      background-color: ${(props) => getImportance(props).hoverBgColor};
      color: ${(props) => getImportance(props).hoverColor};
    }
  }

  &.disabled,
  &[disabled] {
    background-color: ${theme.inactiveGray};
    color: #ffffff;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    height: ${(props) => getSize(props).heightMobile};
    line-height: ${(props) => getSize(props).heightMobile};
    font-size: ${(props) => getSize(props).sizeMobile};
  }
`
