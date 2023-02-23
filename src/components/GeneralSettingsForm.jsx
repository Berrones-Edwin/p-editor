import React from 'react'
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
  Button
} from '@chakra-ui/react'
import useGeneralSettings from '../hooks/useGeneralSettings'
import { SIZES } from '../constants/sizes'
import { useImageProvider } from '../hooks/useImageProvider'
const nameInputs = {
  bgColor: 0,
  headerColor: 1,
  subtitleColor: 2,
  sizeHeader: 3,
  sizeSubtitlte: 4
}

const GeneralSettingsForm = () => {
  const { state, dispatch } = useGeneralSettings()

  const { setImage } = useImageProvider()
  const handleInputChange = (e) => {
    dispatch({
      type: nameInputs[e.target.name],
      payload: e.target.value
    })
  }
  const handleInputChangeImage = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0])
    }
  }
  return (
        <Stack minH={'100vh'} padding={3}>
            <form onSubmit={(e) => e.preventDefault()}>

                <FormControl id="bgColor">
                    <FormLabel>Background Color</FormLabel>
                    <Input
                        type="color"
                        name="bgColor"
                        value={state.bgColor}
                        onChange={handleInputChange}
                    />
                </FormControl>
                <FormControl id="bgColor">
                    <FormLabel>Header Color</FormLabel>
                    <Input
                        type="color"
                        name="headerColor"
                        value={state.bgColorHeader}
                        onChange={handleInputChange}
                    />
                </FormControl>
                <FormControl id="bgColor">
                    <FormLabel>Subtitle Color</FormLabel>
                    <Input
                        type="color"
                        name="subtitleColor"
                        value={state.bgColorSubtitle}
                        onChange={handleInputChange}
                    />
                </FormControl>
                <Divider borderRight="1px" w={'1rem'} />
                <FormControl>
                    <FormLabel>Size Header</FormLabel>
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
                <FormControl>
                    <FormLabel>Size Subtitle</FormLabel>
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
                <FormControl id="Image">
                    <FormLabel>Add Image</FormLabel>
                    <Input
                        type="file"
                        name="image"
                        onChange={handleInputChangeImage}
                    />
                </FormControl>
            </form>
        </Stack>
  )
}

export default GeneralSettingsForm
