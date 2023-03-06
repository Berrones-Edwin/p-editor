
import {

  Editable,
  EditableInput,
  EditablePreview,
  Image, Text, EditableTextarea, Stack
} from '@chakra-ui/react'
import React, { useEffect, useCallback } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { html, htmlCompletionSourceWith } from '@codemirror/lang-html'
import { css } from '@codemirror/lang-css'
import useGeneralSettings from '../hooks/useGeneralSettings'
import { useUserProvider } from '../hooks/useUserProvider'

const PostCard = ({ postCard }) => {
  const { state } = useGeneralSettings()
  const { user } = useUserProvider()

  const onChange = useCallback((value, viewUpdate) => {

  }, [])

  const extensions = user.language === 'js'
    ? [javascript({ jsx: true })]
    : user.language === 'css'
      ? [css()]
      : [html({
          matchClosingTags: true,
          selfClosingTags: true,
          autoCloseTags: true
        })]
  const value = user.language === 'js'
    ? " console.log('hello world!');"
    : user.language === 'css' ? "h1 { color:'blue'} " : '<h1>hello world</h1>'
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

          ? (<Stack height={'300'} display={'flex'} flexDir='row' justifyContent='center'>
            <figure className={user.image.filter}>
              <Image
                src={user.image.src} height='300px' alt={user.image.src} />
            </figure>
          </Stack>)
          : null
      }
      {
        user.code
          ? <CodeMirror
            value={value}
            height="400px"
            extensions={extensions}
            onChange={onChange}
            theme={'dark'}
            style={{ fontSize: '1.25rem' }}
          />
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
