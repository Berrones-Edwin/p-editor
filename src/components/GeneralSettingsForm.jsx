import React, { useState, useRef, useEffect } from 'react'
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
  IconButton,
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
  AccordionIcon

} from '@chakra-ui/react'
import {
  FaFileUpload,
  FaAlignCenter, FaAlignJustify, FaAlignLeft, FaAlignRight, FaBold,
  FaItalic,
  FaUnderline, FaBahai
} from 'react-icons/fa'
import useGeneralSettings from '../hooks/useGeneralSettings'
import { SIZES } from '../constants/sizes'
import { useUserProvider } from '../hooks/useUserProvider'
import SettingsImages from './SettingsImages'
import MoreSettingsText from './MoreSettingsText'
import SelectSizesFont from './SelectSizesFont'

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
  const [allowCodeEditor, setAllowCodeEditor] = useState(true)
  const { user, setUser } = useUserProvider()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnSettingsImage = useRef()
  const btnInputfile = useRef()

  useEffect(() => {
    if (allowCodeEditor) {
      setAllowImage(false)
      setUser({
        ...user,
        image: {
          src: ''
        }
      })
    }
  }, [allowCodeEditor])

  useEffect(() => {
    if (allowImage) {
      setAllowCodeEditor(false)
      setUser({
        ...user,
        code: false
      })
    }
  }, [allowImage])

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
  const handleAllowImage = () => {
    setAllowImage(!allowImage)
  }

  const handleAllowCodeEditor = () => {
    setAllowCodeEditor(!allowCodeEditor)
    setUser({
      ...user,
      code: !allowCodeEditor
    })
  }

  const handleLanguage = (e) => {
    setUser({
      ...user,
      language: e.target.value
    })
  }

  return (
    <>
      <Stack minH={'100vh'} padding={3}>
        <form onSubmit={(e) => e.preventDefault()}>

          <FormControl mb={'1rem'} id="bgColor" display={'flex'} justifyContent='space-around' alignItems={'center'}>
            <FormLabel>Background</FormLabel>
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

          <Accordion allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex='1' textAlign='left'>
                    More Options
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <MoreSettingsText state={state.alignHeader} dispatch={dispatch} action={nameInputs.alignHeader} />
                <MoreStyleFont dispatch={dispatch} nameInputs={nameInputs} state={state} header />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>

          <FormLabel mt='1rem' textAlign={'center'} mb='1rem'>Body Text</FormLabel>
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
          <Accordion allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex='1' textAlign='left'>
                    More Options
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>

                <MoreSettingsText state={state.alignSubtitle} dispatch={dispatch} action={nameInputs.alignSubtitle} />
                <MoreStyleFont dispatch={dispatch} nameInputs={nameInputs} state={state} />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>

          <FormControl mt={'1rem'} mb={'1rem'} display='flex' alignItems='center'>
            <FormLabel htmlFor='allow-image' mb='0' >
              Add Image
            </FormLabel>
            <Switch id='allow-image' isChecked={allowImage} onChange={handleAllowImage} />
          </FormControl>

          <FormControl mb={'1rem'} hidden={!allowImage} display='flex' flexDir={'row'} alignItems='center' justifyContent={'space-around'}>
            <input ref={btnInputfile} onChange={handleInputChangeImage} type="file" name="image" id="image" hidden />
            <Button leftIcon={<FaFileUpload />} onClick={() => { btnInputfile.current?.click() }}>
              Upload
            </Button>
            <Button onClick={onOpen} ref={btnSettingsImage} variant='outline' size={'sm'} hidden={!user.image.src}><FaBahai /></Button>

          </FormControl>

          <FormControl mb='1rem' display='flex' alignItems='center'>
            <FormLabel htmlFor='allow-code.editor' mb='0' >
              Add Editor
            </FormLabel>
            <Switch id='allow-code.editor' isChecked={allowCodeEditor} onChange={handleAllowCodeEditor} />
          </FormControl>
          <FormControl hidden={!allowCodeEditor}>
            <Select name="language" onChange={handleLanguage}>
              <option defaultValue value="js">JavaScript</option>
              <option value="css">CSS</option>
              <option value="html">HTML</option>
            </Select>
          </FormControl>
        </form>
      </Stack>
      <SettingsImages isOpen={isOpen} onClose={onClose} btnRef={btnSettingsImage} />
    </>
  )
}

export default GeneralSettingsForm
