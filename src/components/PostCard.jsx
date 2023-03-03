
import {

  Editable,
  EditableInput,
  EditablePreview,
  Image, Text, EditableTextarea, Stack
} from '@chakra-ui/react'
import { Resizable } from 're-resizable'
import React, { useEffect } from 'react'
import useGeneralSettings from '../hooks/useGeneralSettings'
import { useUserProvider } from '../hooks/useUserProvider'

const PostCard = ({ postCard }) => {
  const { state } = useGeneralSettings()
  const { user } = useUserProvider()

  return (

    <Stack
      ref={postCard}
      borderRadius="md"
      style={{ aspectRatio: '1/1' }}
      minH={user.sizeImage.h}
      maxH={user.sizeImage.h}
      maxW={user.sizeImage.w}
      minW={user.sizeImage.w}
      bgColor={state.bgColor}
      padding={'2rem 4rem 1rem'}
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

          ? (<Stack>
            <figure className={user.image.filter}>
              <Image
                src={user.image.src} minW='100%' minHeight={'100%'} alt={user.image.src} />
            </figure>
          </Stack>)
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
