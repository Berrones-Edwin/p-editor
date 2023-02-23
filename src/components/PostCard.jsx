import {
  Stack,
  Editable,
  EditableInput,
  EditablePreview,
  Image, Text
} from '@chakra-ui/react'
import React from 'react'
import useGeneralSettings from '../hooks/useGeneralSettings'
import { useUserProvider } from '../hooks/useUserProvider'

const PostCard = () => {
  const { state } = useGeneralSettings()
  const { user } = useUserProvider()
  return (
    <Stack
      borderRadius="md"
      minH={'630px'}
      minW={'630px'}
      bgColor={state.bgColor}
      padding={'3rem'}
      position='relative'

    >
      <Editable
        justifyContent="center"
        alignItems="center"
        display="flex"
        textAlign="center"
        fontWeight="bold"
        fontSize={state.sizeHeader}
        color={state.bgColorHeader}
        as="h1"
        defaultValue="Enter your header"
      >
        <EditablePreview />
        <EditableInput />
      </Editable>
      <Editable
        textAlign="center"
        fontSize={state.sizeSubtitlte}
        color={state.bgColorSubtitle}
        as="p"
        defaultValue="Enter your subtitle"
      >
        <EditablePreview />
        <EditableInput />
      </Editable>
      {/* {
        image
          ? (<figure className="lofi">

          <img src={URL.createObjectURL(image)} alt={image.lastModified} />
        </figure>)
          : null
      } */}

      <Stack bottom={'10'} right='10' position={'absolute'}>
        {
          user.photo ? <Image src={user.photo} alt={user.username} /> : null
        }
        {
          user.username ? <Text>{user.username}</Text> : null
        }

      </Stack>

    </Stack>
  )
}

export default PostCard
