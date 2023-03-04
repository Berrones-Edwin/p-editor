import { useCallback, useEffect, useId, useState } from 'react'
import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  Avatar,
  MenuDivider,
  useDisclosure

} from '@chakra-ui/react'
import { MoonIcon, SunIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { FaLaptopCode, FaSoundcloud, FaRegSave, FaThList, FaSignOutAlt } from 'react-icons/fa'
import { toPng } from 'html-to-image'
import { useUserProvider } from '../hooks/useUserProvider'
import { uploadService } from '../services/uploadImage'
import { loginWithGoogle, logout } from '../services/auth-firebase'
import { useAuth } from '../hooks/useAuth'
import { GoogleAuthProvider } from 'firebase/auth'
import { loadImages, saveImages } from '../services/db-firebase'
import SideBarCloudImages from './SideBarCloudImages'

export default function NavBar ({ postCard }) {
  const { colorMode, toggleColorMode } = useColorMode()
  const toast = useToast()
  const { user } = useUserProvider()
  const { auth, setAuth } = useAuth()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [images, setImages] = useState(null)

  const uploadImage = ({ uid }) => {
    toPng(postCard.current, { cacheBust: true })
      .then((dataUrl) => {
        // create Images
        const link = document.createElement('a')
        link.download = `${user.sizeImage.name}.png`
        link.href = dataUrl

        // Upload to cloudinary
        uploadService({ data: dataUrl }).then(async (data) => {
          if (data) {
            // save reference on firebase public_id

            await saveImages({ imageUrl: data.public_id, uid })
            await toast({
              title: 'Image uploaded.',
              description: "We've uploaded your image for you.",
              status: 'success',
              duration: 9000,
              isClosable: true
            })
          }
        })
      })
      .catch((err) => {
        toast({
          title: 'Something has gone wrong',
          description: err,
          status: 'error',
          duration: 9000,
          isClosable: true
        })
      })
  }

  const handleDownload = useCallback(() => {
    if (postCard.current === null) {
      return
    }

    toPng(postCard.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = `${user.sizeImage.name}.png`
        link.href = dataUrl
        link.click()

        toast({
          title: 'Image downloaded.',
          description: "We've downloaded your image for you.",
          status: 'success',
          duration: 9000,
          isClosable: true
        })
      })
      .catch((err) => {
        toast({
          title: 'Something has gone wrong',
          description: err,
          status: 'error',
          duration: 9000,
          isClosable: true
        })
      })
  }, [postCard])

  const handleDownloadCloud = useCallback(() => {
    if (postCard.current === null) {
      return
    }

    if (auth !== null) {
      uploadImage({ uid: auth?.user?.uid })
    } else if (auth === null || window.localStorage.getItem('auth') === null) {
      loginWithGoogle().then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential.accessToken
        // The signed-in user info.
        const user = result.user
        // IdP data available using getAdditionalUserInfo(result)

        window.localStorage.setItem('auth', JSON.stringify({ token, user }))
        uploadImage({ uid: user.uid })
        setAuth({
          token,
          user
        })
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.customData.email
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error)
        // ...
      })
    }
  }, [postCard])

  const handleLogout = async () => {
    await logout()
    setAuth(null)
  }

  const handleOpenSideBar = () => {
    loadImages({ uid: auth.user.uid }).then((data) => {
      setImages(data)
      onOpen()
    })
  }

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex w={'100%'} h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Flex w={'100%'} alignItems={'center'}>
            <Stack w={'100%'} justifyContent='flex-end' direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton leftIcon={<FaRegSave />} as={Button} rightIcon={<ChevronDownIcon />}>
                  Save
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={handleDownload} icon={<FaLaptopCode />}>Local</MenuItem>
                  <MenuItem onClick={handleDownloadCloud} icon={<FaSoundcloud />} minH='48px'>Upload Cloud</MenuItem>

                </MenuList>
              </Menu>

              {

                auth?.user
                  ? (

                    <Menu>
                      <MenuButton
                        as={Button}
                        rounded={'full'}
                        variant={'link'}
                        cursor={'pointer'}
                        minW={0}>
                        <Avatar
                          size={'sm'}
                          src={auth.user.photoURL}
                        />
                      </MenuButton>
                      <MenuList>
                        <MenuItem onClick={handleOpenSideBar} icon={<FaThList />}>My images</MenuItem>
                        <MenuItem onClick={handleLogout} icon={<FaSignOutAlt />}>logout</MenuItem>
                      </MenuList>
                    </Menu>)
                  : null
              }

            </Stack>
          </Flex>
        </Flex>
      </Box>
      <SideBarCloudImages images={images} onClose={onClose} isOpen={isOpen} />
    </>
  )
}
