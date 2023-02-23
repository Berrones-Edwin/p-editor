import React, { useState } from 'react'
import {
  Button,
  Stack,
  FormControl,
  FormLabel,
  Input
} from '@chakra-ui/react'
import { useUserProvider } from '../hooks/useUserProvider'
import { uploadService } from '../services/uploadImage'
import { Cloudinary } from '@cloudinary/url-gen'
import { thumbnail } from '@cloudinary/url-gen/actions/resize'
import { byRadius } from '@cloudinary/url-gen/actions/roundCorners'
import { focusOn } from '@cloudinary/url-gen/qualifiers/gravity'
import { FocusOn } from '@cloudinary/url-gen/qualifiers/focusOn'

const cloudinary = new Cloudinary({
  cloud: {
    cloudName: 'dwa0boye6'
  },
  url: {
    secure: true
  }
})

const UserSettingsForm = () => {
  const { setUser } = useUserProvider()
  const [form, setForm] = useState({
    username: '', photo: ''
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

    uploadService({ data: form.photo }).then((data) => {
      if (data) {
        const avatar = cloudinary.image(data.public_id)
          .resize(thumbnail().width(100).height(100).gravity(focusOn(FocusOn.face())))
          .roundCorners(byRadius(80))
        const url = avatar.toURL()
        setUser({
          username: form.username,
          photo: url
        })
      }
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
      <FormControl id="btnSend">
      <Button type='submit'>Save</Button>
      </FormControl>
    </form>
  </Stack>
  )
}

export default UserSettingsForm
