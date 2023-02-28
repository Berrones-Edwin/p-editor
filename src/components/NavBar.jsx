import { useCallback, useId } from 'react'
import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
  useToast

} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { toPng } from 'html-to-image'
import { useUserProvider } from '../hooks/useUserProvider'

export default function NavBar ({ postCard }) {
  const { colorMode, toggleColorMode } = useColorMode()
  const toast = useToast()
  const id = useId()
  const { user } = useUserProvider()

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
        console.log(err)
        toast({
          title: 'Something has gone wrong',
          description: err,
          status: 'error',
          duration: 9000,
          isClosable: true
        })
      })
  }, [postCard])
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex w={'100%'} h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Flex w={'100%'} alignItems={'center'}>
            <Stack w={'100%'} justifyContent='flex-end' direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Button onClick={handleDownload}>Download</Button>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}
