import styled from 'styled-components'

export const Wrapper = styled.div`
  [class*='indicatorContainer'] {
    padding: 0;
    margin: 0 8px;
    cursor: pointer;
  }
`

export const SVG = styled.svg`
  margin-right: 12px;
  cursor: pointer;
`

export const customStyles = {
  input: (provided: any) => ({
    ...provided,
    padding: 8,
  }),
  control: (provided: any) => ({
    ...provided,
    border: '2px solid red',
  }),
}
