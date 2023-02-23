import React from 'react'
import {
  Button,
  Stack,
  FormControl,
  FormLabel,
  Input
} from '@chakra-ui/react'
import { useUserProvider } from '../hooks/useUserProvider'
import { uploadService } from '../services/uploadImage'

const UserSettingsForm = () => {
  const { user, setUser } = useUserProvider()

  const handleInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })

    if (e.target.files && e.target.files.length > 0) {
      setUser({ ...user, photo: e.target.files[0] })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({ user })
    uploadService({ data: user.photo }).then((data) => {
      console.log(data)
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
          value={user.username}
          onChange={handleInputChange}
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
