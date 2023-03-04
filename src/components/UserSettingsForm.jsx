import React, { useRef, useState } from 'react'
import {
  Button,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Switch,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  Box,
  AccordionPanel,
  Select
} from '@chakra-ui/react'
import { useUserProvider } from '../hooks/useUserProvider'
import { uploadService } from '../services/uploadImage'
import { Cloudinary } from '@cloudinary/url-gen'
import { thumbnail } from '@cloudinary/url-gen/actions/resize'
import { byRadius } from '@cloudinary/url-gen/actions/roundCorners'
import { focusOn } from '@cloudinary/url-gen/qualifiers/gravity'
import { FocusOn } from '@cloudinary/url-gen/qualifiers/focusOn'
import { sepia, cartoonify } from '@cloudinary/url-gen/actions/effect'
import { byAngle } from '@cloudinary/url-gen/actions/rotate'
import { FaFileUpload } from 'react-icons/fa'

const cloudinary = new Cloudinary({
  cloud: {
    cloudName: 'dwa0boye6'
  },
  url: {
    secure: true
  }
})

const UserSettingsForm = () => {
  const btnImage = useRef()
  const { user, setUser } = useUserProvider()
  const [form, setForm] = useState({
    username: '', photo: '', sepia: false, cartoonify: false, round: 80, rotate: 0, width: 100, height: 100, position: ''
  })

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })

    if (e.target.files && e.target.files.length > 0) {
      setForm({ ...form, photo: e.target.files[0] })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // setPostion()

    if (form.username === '' && form.photo === '') return
    if (form.photo) {
      uploadService({ data: form.photo }).then((data) => {
        if (data) {
          console.log({ data })
          const avatar = cloudinary.image(data.public_id)
            .resize(
              thumbnail()
                .width(form.width)
                .height(form.height)
                .gravity(focusOn(FocusOn.face())))
            .roundCorners(byRadius(form.round))
            .rotate(byAngle(form.rotate))

          if (form.sepia) avatar.effect(sepia())
          if (form.cartoonify) avatar.effect(cartoonify())

          const url = avatar.toURL()
          setUser({
            ...user,
            username: form.username,
            photo: url
          })
        }
      })
    }

    setUser({
      ...user,
      username: form.username
    })
  }

  // const setPostion = () => {
  //   if (form.position === 'top-left') setUser({ ...user, position: { top: '10', left: '10', bottom: '', right: '' } })
  //   else if (form.position === 'top-right') setUser({ ...user, position: { top: '10', right: '10', bottom: '', left: '' } })
  //   else if (form.position === 'bottom-left') setUser({ ...user, position: { bottom: '10', left: '10', top: '', right: '' } })
  //   else if (form.position === 'bottom-right') setUser({ ...user, position: { bottom: '10', right: '10', top: '', left: '' } })

  //   console.log({ user })
  // }

  return (
    <Stack minH={'100vh'} padding={3}>
      <form onSubmit={handleSubmit}>

        <FormControl id="username" mb='1rem'>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            name='username'
            value={form.username}
            onChange={handleInputChange}
            autoComplete="off"
            placeholder='@myusername'
          />
        </FormControl>
        <FormControl id="Image" mb='1rem'>
          <FormLabel>Profile Photo</FormLabel>
          <Input
            type="file"
            name="photo"
            onChange={handleInputChange}
            hidden
            ref={btnImage}
          />
          <Button leftIcon={<FaFileUpload />} onClick={() => { btnImage.current?.click() }}>
            Upload
          </Button>
        </FormControl>
        <FormControl id="btnSend">
          <Button type='submit'>Save</Button>
        </FormControl>

        <Accordion mb='1rem' allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex='1' textAlign='left'>
                  Advanced Settings
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel >
              <Stack gap={'1'} mb='1rem' display={'flex'} flexDir='row' justifyContent={'center'} alignItems='center'>

                <FormControl display={'flex'} flexDir='column' justifyContent={'center'} alignItems='center'>
                  <FormLabel margin="0" >Height</FormLabel>
                  <Input
                    onChange={handleInputChange}
                    type="number"
                    name="height"
                    value={form.height}
                    margin="0"
                    size={'sm'}

                  />
                </FormControl>
                <FormControl style={{ marginTop: '0' }} display={'flex'} flexDir='column' justifyContent={'center'} alignItems='center'>
                  <FormLabel margin="0" >Width</FormLabel>
                  <Input
                    onChange={handleInputChange}
                    type="number"
                    name="width"
                    value={form.width}
                    margin="0"
                    size={'sm'}
                  />
                </FormControl>
              </Stack>
              <FormControl display={'flex'} flexDirection='row' justifyContent={'space-around'}>
                <FormLabel htmlFor='sepia'>
                  Sepia
                  <Switch isChecked={form.sepia} onChange={() => setForm({ ...form, sepia: !form.sepia })} name="sepia" id='sepia' />
                </FormLabel>
                <FormLabel htmlFor='cartoonify' >
                  Cartoonify
                  <Switch id="cartoonify" onChange={() => setForm({ ...form, cartoonify: !form.cartoonify })} isChecked={form.cartoonify} name="cartoonify" />
                </FormLabel>
              </FormControl>
              <FormControl>
                <FormLabel >Corners Round</FormLabel>
                <Input
                  min='0'
                  max='100'
                  onChange={handleInputChange}
                  type="number"
                  name="round"
                  value={form.round}

                />
              </FormControl>
              <FormControl mb='1rem'>
                <FormLabel >Rotate</FormLabel>
                <Input
                  min='0'
                  max='100'
                  onChange={handleInputChange}
                  type="number"
                  name="rotate"
                  value={form.rotate}

                />
              </FormControl>
              {/* <FormControl>
                <FormLabel>Position</FormLabel>
                <Select onChange={handleInputChange} name='position' defaultValue={'bottom-right'}>
                  <option value="top-left">Top - Left</option>
                  <option value="top-right">Top - Right</option>
                  <option value="bottom-left">Bottom - Left</option>
                  <option value="bottom-right">Bottom - Right</option>
                </Select>
              </FormControl> */}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

      </form>
    </Stack>
  )
}

export default UserSettingsForm
