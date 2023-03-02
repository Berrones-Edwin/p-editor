import React, { useState } from 'react'
import {
  Button,
  Stack,
  FormControl,
  FormLabel,
  Input, Switch
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

const cloudinary = new Cloudinary({
  cloud: {
    cloudName: 'dwa0boye6'
  },
  url: {
    secure: true
  }
})

const UserSettingsForm = () => {
  const { user, setUser } = useUserProvider()
  const [form, setForm] = useState({
    username: '', photo: '', sepia: false, cartoonify: false, round: 80, rotate: 0, width: 100, height: 100
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
  return (
    <Stack minH={'100vh'} padding={3}>
      <form onSubmit={handleSubmit}>

        <FormControl id="username">
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
        <FormControl id="Image">
          <FormLabel>Profile Photo</FormLabel>
          <Input
            type="file"
            name="photo"
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel >Advanced Settings</FormLabel>
        </FormControl>

        <Stack display={'flex'} flexDir='row' justifyContent={'center'} alignItems='center'>

          <FormControl display={'flex'} flexDir='column' justifyContent={'center'} alignItems='center'>
            <FormLabel >Height</FormLabel>
            <Input
              onChange={handleInputChange}
              type="number"
              name="height"
              value={form.height}

            />
          </FormControl>
          <FormControl display={'flex'} flexDir='column' justifyContent={'center'} alignItems='center'>
            <FormLabel >Width</FormLabel>
            <Input
              onChange={handleInputChange}
              type="number"
              name="width"
              value={form.width}
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
        <FormControl>
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
        <FormControl id="btnSend">
          <Button type='submit'>Save</Button>
        </FormControl>
      </form>
    </Stack>
  )
}

export default UserSettingsForm
