import React from 'react'
import { FormControl, ButtonGroup, IconButton } from '@chakra-ui/react'
import { FaBold, FaItalic, FaUnderline } from 'react-icons/fa'

function MoreStyleFont ({ dispatch, nameInputs, state, header }) {
  const boldType = header ? nameInputs.styleHeaderBold : nameInputs.styleSubtitleBold
  const boldValue = header ? state.styleHeaderBold : state.styleSubtitleBold
  const italicType = header ? nameInputs.styleHeaderItalic : nameInputs.styleSubtitleItalic
  const italicValue = header ? state.styleHeaderItalic : state.styleSubtitleItalic
  const underlineType = header ? nameInputs.styleHeaderUnderline : nameInputs.styleSubtitleUnderline
  const underlineValue = header ? state.styleHeaderUnderline : state.styleSubtitleUnderline

  const handleType = (type, value) => {
    dispatch({
      type,
      payload: !value
    })
  }
  return (

        <FormControl mb='1rem' display={'flex'} justifyContent='center'>
            <ButtonGroup spacing={2}>
                <IconButton backgroundColor={boldValue && 'green'} onClick={() => handleType(boldType, boldValue)} icon={<FaBold />} size={'xs'} />
                <IconButton backgroundColor={italicValue && 'green'} onClick={() => handleType(italicType, italicValue)} icon={<FaItalic />} size={'xs'} />
                <IconButton backgroundColor={underlineValue && 'green'} onClick={() => handleType(underlineType, underlineValue)} icon={<FaUnderline />} size={'xs'} />
            </ButtonGroup>
        </FormControl>
  )
}

export default MoreStyleFont
