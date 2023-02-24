import React, { useState } from 'react'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Image,
  Stack,
  Avatar,
  Text
} from '@chakra-ui/react'
import { filters } from '../constants/filter'
import { useUserProvider } from '../hooks/useUserProvider'

const ImageFilter = ({ filter, src, alt, name, setFilter }) => {
  return (
    <>

        <Stack onClick={() => setFilter({ filter })} cursor={'pointer'} display={'flex'} justifyContent='center' alignItems={'center'} flexDir='column' className={filter}>
            <Avatar src={src} size='lg' alt={filter} />
            <p>{name}</p>
        </Stack>
    </>
  )
}

const SettingsImages = ({ isOpen, onClose, btnRef }) => {
  const { user: { image }, setUser } = useUserProvider()
  const [settings, setSettings] = useState({
    filter: ''
  })

  const handleSettings = () => {
    setUser({
      image: {
        ...image,
        filter: settings.filter

      }
    })
    onClose()
  }

  return (
        <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            finalFocusRef={btnRef}
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Settings Image</DrawerHeader>

                <DrawerBody >
                <Text>Filters</Text>
                    <Stack display={'flex'} justifyContent='center' alignItems={'center'} gap='2' flexDir='row' flexWrap={'wrap'} >

                        {
                            image
                              ? filters.map((filter) => {
                                return <ImageFilter setFilter={setSettings} name={filter.name} filter={filter.class} key={filter.name} src={image.src} alt={image.src.lastModified} />
                              })
                              : null
                        }
                    </Stack>
                    {/* <Input placeholder='Type here...' /> */}
                </DrawerBody>

                <DrawerFooter>
                    <Button variant='outline' mr={3} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleSettings} colorScheme='blue'>Apply</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
  )
}

export default SettingsImages
