import {
  Stack,
  Editable,
  EditableInput,
  EditablePreview,
  Image, Text, EditableTextarea
} from '@chakra-ui/react'
import React from 'react'
import useGeneralSettings from '../hooks/useGeneralSettings'
import { useUserProvider } from '../hooks/useUserProvider'

const PostCard = ({ postCard }) => {
  const { state } = useGeneralSettings()
  const { user } = useUserProvider()

  return (
    <Stack
      ref={postCard}
      borderRadius="md"
      minH={'630px'}
      maxH={'630px'}
      maxW={'630px'}
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
        defaultValue="Enter your subtitle"
        justifyContent="center"
        alignItems="center"
        display="flex"
        maxW={'100%'}
      >
        <EditablePreview />
        <EditableInput />
      </Editable>
      {
        user.image.src
          ? (<figure className={user.image.filter}>

            <Image
              src={user.image.src} width="534px" height={'300px'} alt={user.image.src} />
          </figure>)
          : null
      }

      <Stack bottom={'10'} right='10' zIndex={'10'} position={'absolute'}>
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
