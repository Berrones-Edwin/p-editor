import React from 'react'
import {
  Card,
  CardHeader,
  Flex,
  Avatar,
  Box,
  Heading,
  Text,
  Image,
  CardBody,
  CardFooter,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter
} from '@chakra-ui/react'

import { FaCloudDownloadAlt, FaRegFileImage, FaRegShareSquare } from 'react-icons/fa'
import { useAuth } from '../hooks/useAuth'

const CardCloudImages = ({ src }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { auth } = useAuth()

  const handleDownload = () => {
    const link = document.createElement('a')
    link.download = 'my-image.png'
    link.target = '_blank'
    link.href = `https://res.cloudinary.com/dwa0boye6/image/upload/v1677775260/${src}.png`
    link.click()
  }
  return (
        <>
            <Card maxW='md'>
                <CardHeader>
                    <Flex spacing='4'>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Avatar name={auth.user.displayName} src={auth.user.photoURL} />

                            <Box>
                                <Heading size='sm'>{auth.user.displayName}</Heading>
                                <Text>{auth.user.email}</Text>
                            </Box>
                        </Flex>
                    </Flex>
                </CardHeader>
                <Image
                    objectFit='cover'
                    src={`https://res.cloudinary.com/dwa0boye6/image/upload/v1677775260/${src}.webp`}
                    alt={src}
                />

                <CardFooter
                    justify='space-between'
                    flexWrap='wrap'
                    sx={{
                      '& > button': {
                        minW: '136px'
                      }
                    }}
                >
                    <Button onClick={onOpen} flex='1' variant='ghost' leftIcon={<FaRegFileImage />}>
                        View
                    </Button>
                    <Button onClick={handleDownload} flex='1' variant='ghost' leftIcon={<FaCloudDownloadAlt />}>
                        Download
                    </Button>
                    <Button flex='1' variant='ghost' leftIcon={<FaRegShareSquare />}>
                        Share
                    </Button>
                </CardFooter>
            </Card>
            <Modal size='6xl' isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody display={'flex'} justifyContent='center' alignItems={'center'}>
                        <Image

                            src={`https://res.cloudinary.com/dwa0boye6/image/upload/v1677775260/${src}.webp`}
                            alt={src}
                        />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
  )
}

export default CardCloudImages
