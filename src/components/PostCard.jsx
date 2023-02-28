import {
  Stack,
  Editable,
  EditableInput,
  EditablePreview,
  Image, Text, EditableTextarea
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
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

        textAlign={state.alignHeader}
        fontSize={state.sizeHeader}
        color={state.bgColorHeader}
        as="h1"
        defaultValue="Enter your header"
        style={{
          fontStyle: state.styleHeaderItalic ? 'italic' : '',
          fontWeight: state.styleHeaderBold ? 'bold' : ''
        }}

      >
        <EditablePreview style={{ textDecoration: state.styleHeaderUnderline ? 'underline' : '' }}/>
        <EditableInput />
      </Editable>
      <Editable
        textAlign={state.alignSubtitle}
        fontSize={state.sizeSubtitlte}
        color={state.bgColorSubtitle}
        defaultValue="Enter your subtitle"
        maxW={'100%'}
        as='p'
        style={{
          fontStyle: state.styleSubtitleItalic ? 'italic' : '',
          fontWeight: state.styleSubtitleBold ? 'bold' : ''
        }}
      >
        <EditablePreview style={{ textDecoration: state.styleSubtitleUnderline ? 'underline' : '' }} />
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
