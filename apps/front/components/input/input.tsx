import { useCallback, forwardRef, ForwardedRef, ChangeEvent } from 'react'
import { Label, Error } from './input.style'
import { ChangeHandler } from 'react-hook-form'

export type InputProps = {
  id?: string
  type?: string
  size?: 'lg' | 'sm'
  value?: string | number
  rows?: number
  defaultValue?: string
  label: string
  name?: string
  pattern?: string
  className?: string
  touched?: boolean
  disabled?: boolean
  noMargin?: boolean
  withMargin?: boolean
  errorMessage?: string
  onBlur?: ChangeHandler | (() => void)
  onChange?: (e: ChangeEvent) => void
  onFocus?: () => void
  onKeyPress?: () => void
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      type = 'text',
      name,
      value,
      defaultValue,
      touched,
      onBlur,
      onChange,
      onFocus,
      onKeyPress,
      errorMessage,
      label,
      size = 'lg',
      disabled = false,
      className = '',
      withMargin,
      noMargin,
      pattern,
      ...rest
    },
    ref: ForwardedRef<any>,
  ) => {
    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        if (pattern && !RegExp(pattern).test(e.target.value)) {
          return
        }

        if (onChange) {
          onChange(e)
        }
      },
      [onChange, pattern],
    )

    return (
      <Label size={size} className={className} noMargin={noMargin} withMargin={withMargin} errorMessage={errorMessage}>
        <input
          className="input"
          ref={ref}
          id={id}
          type={type}
          name={name}
          value={value}
          defaultValue={defaultValue}
          placeholder={label}
          onBlur={onBlur}
          onChange={handleChange}
          onFocus={onFocus}
          onKeyPress={onKeyPress}
          disabled={disabled}
          pattern={pattern}
          {...rest}
        />
        <span>{label}</span>
        {errorMessage && <Error className="error-message">{errorMessage}</Error>}
      </Label>
    )
  },
)

Input.displayName = 'Input'
