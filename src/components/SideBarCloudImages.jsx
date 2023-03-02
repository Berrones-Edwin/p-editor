import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerFooter,
  Button,
  DrawerBody,

  Stack
} from '@chakra-ui/react'
import React from 'react'
import CardCloudImages from './CardCloudImages'

const SideBarCloudImages = ({ onClose, isOpen, images }) => {
  return (
        <Drawer onClose={onClose} isOpen={isOpen} size={'lg'}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>My Cloud <button>Reload</button></DrawerHeader>

                <DrawerBody>
                    <Stack display={'flex'} justifyContent='center' alignItems={'center'} gap='2' flexDir='row' flexWrap={'wrap'}
                    >

                        {images
                          ? images.map((i) =>
                                <CardCloudImages key={i.data.imageUrl} src={i.data.imageUrl} />
                          )
                          : null}
                    </Stack>

                </DrawerBody>
            </DrawerContent>
            <DrawerFooter>
                <Button variant='outline' mr={3} onClick={onClose}>
                    Cancel
                </Button>
                <Button colorScheme='blue'>Close</Button>
            </DrawerFooter>
        </Drawer>
  )
}

export default SideBarCloudImages
