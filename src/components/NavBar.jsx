import { useCallback, useId } from 'react'
import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Stack,
  useColorMode

} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { toPng } from 'html-to-image'

export default function NavBar ({ postCard }) {
  const { colorMode, toggleColorMode } = useColorMode()
  const id = useId()

  const handleDownload = useCallback(() => {
    if (postCard.current === null) {
      return
    }

    toPng(postCard.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = `${id}.png`
        link.href = dataUrl
        link.click()
      })
      .catch((err) => {
        console.log(err)
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
