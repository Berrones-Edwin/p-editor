import React from 'react'
import { Select } from '@chakra-ui/react'
import { SIZES } from '../constants/sizes'

const SelectSizesFont = ({ handleInputChange, state, name }) => {
  return (
    <Select
              placeholder="Size"
              name={name}
              onChange={handleInputChange}
              width='80px'
            >
              {SIZES.map((s) => (
                <option
                  defaultValue={s.size === state ? s.size : ''}
                  value={s.size}
                  key={s.id}
                >
                  {s.size.toLocaleUpperCase()}
                </option>
              ))}
            </Select>

  )
}

export default SelectSizesFont
