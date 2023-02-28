import SidebarWithHeader from './components/Sidebar'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Stack,
  useDisclosure,
  ModalOverlay,
  FormControl,
  Select,
  Input
} from '@chakra-ui/react'
import PostCard from './components/PostCard'
import NavBar from './components/NavBar'
import { useEffect, useRef, useState } from 'react'
import { useUserProvider } from './hooks/useUserProvider'

function App () {
  const postCard = useRef()
  const [form, setForm] = useState({
    size: 'default',
    name: ''
  })
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user, setUser } = useUserProvider()

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = () => {
    let w = 0
    let h = 0

    switch (form.size) {
      case 'stories-fb':
        w = 750
        h = 1334
        break
      case 'stories-ig':
        w = 750
        h = 1334
        break
      case 'square-ig':
        w = 1080
        h = 1080
        break
      case 'vertical-ig':
        w = 1080
        h = 1350
        break
      case 'tweet-tw':
        w = 1024
        h = 512
        break
    }
    setUser({
      ...user,
      sizeImage: {
        w,
        h,
        name: form.name
      }
    })

    onClose()
  }
  useEffect(() => {
    onOpen()
  }, [])
  return (
    <>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg='blackAlpha.300'
          backdropFilter='blur(10px) hue-rotate(90deg)' />
        <ModalContent>
          <ModalHeader>Settings Image</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form action="">
              <FormControl>
                <Input name='name' value={form.name} onChange={handleChange} />
              </FormControl>
              <FormControl>
                <Select variant='flushed' onChange={handleChange} name="size" value={form.size} placeholder='Select your option'>
                  <option value="default" selected>Default (630x630)</option>
                  <option value="" disabled>Facebook</option>
                  <option value="stories-fb">Stories (750x1334)</option>
                  <option value="" disabled>Instagram</option>
                  <option value="stories-ig">Stories (750x1334)</option>
                  <option value="square-ig">Square (1080x1080)</option>
                  <option value="vertical-ig">Vertical (1080x1350)</option>
                  <option value="" disabled>Twitter</option>
                  <option value="tweet-tw">Tweet (1024x512)</option>
                </Select>
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSave} colorScheme='blue' mr={3}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <SidebarWithHeader>
        <NavBar postCard={postCard} />
        <Stack
          as="main"
          minH={'100vh'}
          direction={'row'}
          justifyContent={'center'}
          alignItems={'center'}

        >
          <PostCard postCard={postCard} />
        </Stack>
      </SidebarWithHeader>
    </>
  )
}

export default App
