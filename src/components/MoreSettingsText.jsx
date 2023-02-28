import React from 'react'
import {
  FaAlignCenter, FaAlignJustify, FaAlignLeft, FaAlignRight, FaBold,
  FaItalic,
  FaUnderline
} from 'react-icons/fa'
import { FormControl, ButtonGroup, IconButton } from '@chakra-ui/react'

const MoreSettingsText = ({ action, dispatch, state }) => {
  const handleAlign = (value) => {
    dispatch({
      type: action,
      payload: value
    })
  }
  return (
        <FormControl mb='1rem' display={'flex'} justifyContent='center'>
            <ButtonGroup>
                <IconButton icon={<FaAlignLeft />} bgColor={ state === 'left' ? 'green' : '' } onClick={() => handleAlign('left')} size={'xs'} />
                <IconButton icon={<FaAlignCenter />} bgColor={ state === 'center' ? 'green' : '' } onClick={() => handleAlign('center')} size={'xs'} />
                <IconButton icon={<FaAlignRight />} bgColor={ state === 'right' ? 'green' : '' } onClick={() => handleAlign('right')} size={'xs'} />

            </ButtonGroup>
        </FormControl>
  )
}

export default MoreSettingsText
