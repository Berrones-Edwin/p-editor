import React, { useEffect, useState } from 'react'
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

const ImageFilter = ({ filter, src, name, setSettings, settings }) => {
  return (
    <>
      <Stack onClick={() => setSettings({ filter })}
            cursor={'pointer'}
            display={'flex'}
            justifyContent='center'
            alignItems={'center'}
            flexDir='column'
            className={filter}
            outline={settings.filter === filter ? '5px solid purple' : ''}>
        <Image src={src} width='100' height='100' alt={filter} />
        <Text color={'#rrr'}> {name}</Text>
      </Stack>
    </>
  )
}

const SettingsImages = ({ isOpen, onClose, btnRef }) => {
  const { user, user: { image }, setUser } = useUserProvider()
  const [settings, setSettings] = useState({
    filter: ''
  })

  const handleSettings = () => {
    setUser({
      ...user,
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
                  return <ImageFilter
                    setSettings={setSettings}
                    name={filter.name}
                    filter={filter.class}
                    key={filter.name}
                    src={image.src}
                    settings={settings}

                  />
                })
                : null
            }
          </Stack>
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
