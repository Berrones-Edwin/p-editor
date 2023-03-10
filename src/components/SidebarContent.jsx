import React from 'react'
import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon

} from '@chakra-ui/react'
import useGeneralSettings from '../hooks/useGeneralSettings'
import { SIZES } from '../constants/sizes'
import GeneralSettingsForm from './GeneralSettingsForm'
import UserSettingsForm from './UserSettingsForm'

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          P-Editor
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>

      <Accordion allowMultiple>

        {/* General Settings */}
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex='1' textAlign='left'>
                General Settings
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>

          <AccordionPanel pb={4}>
            <GeneralSettingsForm />
          </AccordionPanel>
        </AccordionItem>
        {/* End General Settings */}

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex='1' textAlign='left'>
                Watermark
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <UserSettingsForm />
          </AccordionPanel>
        </AccordionItem>

      </Accordion>
    </Box>
  )
}
export default SidebarContent
