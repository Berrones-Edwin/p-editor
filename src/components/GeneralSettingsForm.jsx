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
  useDisclosure

} from '@chakra-ui/react'
import useGeneralSettings from '../hooks/useGeneralSettings'
import { SIZES } from '../constants/sizes'
import { useUserProvider } from '../hooks/useUserProvider'
import SettingsImages from './SettingsImages'
const nameInputs = {
  bgColor: 0,
  headerColor: 1,
  subtitleColor: 2,
  sizeHeader: 3,
  sizeSubtitlte: 4
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

                    <FormControl mb={'1rem'} id="bgColor">
                        <FormLabel>Background Color</FormLabel>
                        <Input
                            type="color"
                            name="bgColor"
                            value={state.bgColor}
                            onChange={handleInputChange}
                        />

                    </FormControl>

                    <FormLabel>Header Color</FormLabel>
                    <FormControl mb={'1rem'} display={'flex'} id="bgColor">
                        <Input
                            type="color"
                            name="headerColor"
                            value={state.bgColorHeader}
                            onChange={handleInputChange}
                        />
                        <Select
                            placeholder="Select option"
                            name="sizeHeader"
                            onChange={handleInputChange}
                        >
                            {SIZES.map((s) => (
                                <option
                                    defaultValue={s.size === state.sizeHeader ? s.size : ''}
                                    value={s.size}
                                    key={s.id}
                                >
                                    {s.size.toLocaleUpperCase()}
                                </option>
                            ))}
                        </Select>
                    </FormControl>

                    <FormLabel>Subtitle Color</FormLabel>
                    <FormControl mb={'1rem'} display={'flex'} id="bgColor">
                        <Input
                            type="color"
                            name="subtitleColor"
                            value={state.bgColorSubtitle}
                            onChange={handleInputChange}
                        />
                        <Select
                            placeholder="Select option"
                            name="sizeSubtitlte"
                            onChange={handleInputChange}
                        >
                            {SIZES.map((s) => (
                                <option
                                    defaultValue={s.size === state.sizeHeader ? s.size : ''}
                                    value={s.size}
                                    key={s.id}
                                >
                                    {s.size.toLocaleUpperCase()}
                                </option>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl mb={'1rem'} display='flex' alignItems='center'>
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
