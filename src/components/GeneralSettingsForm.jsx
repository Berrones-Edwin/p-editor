import React, { useState, useRef } from 'react'
import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Text,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Divider,
  Select,
  Button,
  Switch,
  VisuallyHidden,
  Icon,
  useDisclosure,
  ButtonGroup,
  IconButton

} from '@chakra-ui/react'
import useGeneralSettings from '../hooks/useGeneralSettings'
import { SIZES } from '../constants/sizes'
import { useUserProvider } from '../hooks/useUserProvider'
import SettingsImages from './SettingsImages'
import MoreSettingsText from './MoreSettingsText'
import SelectSizesFont from './SelectSizesFont'
import {
  FaAlignCenter, FaAlignJustify, FaAlignLeft, FaAlignRight, FaBold,
  FaItalic,
  FaUnderline
} from 'react-icons/fa'
import MoreStyleFont from './MoreStyleFont'

const nameInputs = {
  bgColor: 0,
  headerColor: 1,
  subtitleColor: 2,
  sizeHeader: 3,
  sizeSubtitlte: 4,
  alignHeader: 5,
  alignSubtitle: 6,
  styleHeaderBold: 7,
  styleHeaderItalic: 8,
  styleHeaderUnderline: 9,
  styleSubtitleBold: 10,
  styleSubtitleItalic: 11,
  styleSubtitleUnderline: 12
}

const GeneralSettingsForm = () => {
  const { state, dispatch } = useGeneralSettings()
  const [allowImage, setAllowImage] = useState(false)
  const [allowCodeEditor, setAllowCodeEditor] = useState(false)
  const { user, setUser } = useUserProvider()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnSettingsImage = useRef()

  const handleInputChange = (e) => {
    dispatch({
      type: nameInputs[e.target.name],
      payload: e.target.value
    })
  }
  const handleInputChangeImage = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(e.target.files[0])
      fileReader.onloadend = function () {
        setUser({
          ...user,
          image: {
            src: fileReader.result
          }
        })
      }
    }
  }

  return (
    <>
      <Stack minH={'100vh'} padding={3}>
        <form onSubmit={(e) => e.preventDefault()}>

          <FormControl mb={'1rem'} id="bgColor" display={'flex'} justifyContent='space-around' alignItems={'center'}>
            <FormLabel>Bg Color</FormLabel>
            <Input
              width={'50px'}

              type="color"
              name="bgColor"
              value={state.bgColor}
              onChange={handleInputChange}
              border='none'
              padding={'0'}
              rounded='full'
            />

          </FormControl>
          <hr />

          <FormLabel mt={'1rem'} textAlign='center'>Headline</FormLabel>
          <FormControl mb={'1rem'} display={'flex'} justifyContent='space-around' alignItems={'center'} id="bgColor">

            <Input
              type="color"
              name="headerColor"
              value={state.bgColorHeader}
              onChange={handleInputChange}
              border='none'
              padding={'0'}
              rounded='full'
              width={'50px'}
            />
            <SelectSizesFont name="sizeHeader" handleInputChange={handleInputChange} state={state.sizeHeader} />
          </FormControl>

          <MoreSettingsText state={state.alignHeader} dispatch={dispatch} action={nameInputs.alignHeader} />
          <MoreStyleFont dispatch={dispatch} nameInputs={nameInputs} state={state} header />

          <hr />

          <FormLabel mt='1rem' mb='1rem'>Body Text</FormLabel>
          <FormControl mb={'1rem'} display={'flex'} justifyContent='space-around' alignItems={'center'} id="bgColor">

            <Input
              type="color"
              name="subtitleColor"

              value={state.bgColorSubtitle}
              onChange={handleInputChange}
              border='none'
              padding={'0'}
              rounded='full'
              width={'50px'}

            />
            <SelectSizesFont name="sizeSubtitlte" handleInputChange={handleInputChange} state={state.sizeSubtitlte} />

          </FormControl>
          <MoreSettingsText state={state.alignSubtitle} dispatch={dispatch} action={nameInputs.alignSubtitle} />
          <MoreStyleFont dispatch={dispatch} nameInputs={nameInputs} state={state} />

          <hr />

          <FormControl mt={'1rem'} mb={'1rem'} display='flex' alignItems='center'>
            <FormLabel htmlFor='allow-image' mb='0' >
              Add Image
            </FormLabel>
            <Switch id='allow-image' isChecked={allowImage} onChange={() => setAllowImage(!allowImage)} />
          </FormControl>

          <FormControl mb={'1rem'} hidden={!allowImage}>
            <input onChange={handleInputChangeImage} type="file" name="image" id="image" />
            <Button onClick={onOpen} ref={btnSettingsImage} variant='outline' mt={'1rem'} size={'md'}>Settings Image</Button>
          </FormControl>

          <FormControl display='flex' alignItems='center'>
            <FormLabel htmlFor='allow-code.editor' mb='0' >
              Add Editor
            </FormLabel>
            <Switch id='allow-code.editor' isChecked={allowCodeEditor} onChange={() => setAllowCodeEditor(!allowCodeEditor)} />
          </FormControl>
        </form>
      </Stack>
      <SettingsImages isOpen={isOpen} onClose={onClose} btnRef={btnSettingsImage} />
    </>
  )
}

export default GeneralSettingsForm
