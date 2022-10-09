import { forwardRef, ForwardedRef } from 'react'
import Select, { ActionMeta } from 'react-select'
import { theme } from '../theme'

type OptionType = { [key: string]: unknown }
type OptionsType = Array<OptionType>

interface SelectProps {
  options: OptionsType
  value: OptionType
  defaultValue?: OptionType
  onChange: (option: OptionType | null, actionMeta: ActionMeta<OptionType>) => void
}

const customStyles = {
  input: (provided: any) => ({
    ...provided,
    padding: 8,
  }),
  control: (provided: any) => ({
    ...provided,
    border: `1px solid ${theme.primary}`,
  }),
}

export const CustomSelect: React.FC<SelectProps> = forwardRef(
  ({ options, value, defaultValue, onChange }, ref: ForwardedRef<null>) => {
    return <Select ref={ref} options={options} value={value} defaultValue={defaultValue} onChange={onChange} styles={customStyles} />
  },
)

CustomSelect.displayName = 'CustomSelect'
