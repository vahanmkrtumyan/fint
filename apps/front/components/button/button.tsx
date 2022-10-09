import * as React from 'react'
import { ButtonStyle } from './button.style'

export type ButtonProps = {
  className?: string
  children: React.ReactNode
  importance?: 'primary' | 'primary-light' | 'secondary' | 'outline' | 'reset'
  size?: 'lg' | 'md' | 'sm' | 'xs'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  onClick?: (e: React.MouseEvent) => void
}

export const Button: React.FC<ButtonProps> = ({
  type = 'button',
  className,
  children,
  importance = 'primary',
  onClick,
  size = "lg",
  disabled,
}) => {
  return (
    <ButtonStyle
      importance={importance}
      size={size}
      onClick={onClick}
      className={className}
      disabled={disabled}
      type={type}
    >
      {children}
    </ButtonStyle>
  )
}
