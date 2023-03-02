import {
  Stack,
  Editable,
  EditableInput,
  EditablePreview,
  Image, Text, EditableTextarea
} from '@chakra-ui/react'
import { Resizable } from 're-resizable'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import useGeneralSettings from '../hooks/useGeneralSettings'
import { useUserProvider } from '../hooks/useUserProvider'

const PostCard = ({ postCard }) => {
  const { state } = useGeneralSettings()
  const { user } = useUserProvider()
  const { auth } = useAuth()

  return (

    <Stack
      ref={postCard}
      borderRadius="md"
      minH={user.sizeImage.h}
      maxH={user.sizeImage.h}
      maxW={user.sizeImage.w}
      minW={user.sizeImage.w}
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
        <EditablePreview style={{ textDecoration: state.styleHeaderUnderline ? 'underline' : '' }} />
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

          ? (<Resizable>
            <figure style={{ minWidth: '100%', width: '100%', minHeight: '100%' }} className={user.image.filter}>
              <Image
                src={user.image.src} minW='100%' minHeight={'100%'} alt={user.image.src} />
            </figure>
          </Resizable>)
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
