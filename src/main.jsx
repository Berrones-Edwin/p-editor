import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ChakraProvider } from '@chakra-ui/react'
import './index.css'
import theme from './theme/theme'
import GeneralContextProvider from './context/GeneralContextProvider'
import UserContextProvider from './context/UserContextProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <GeneralContextProvider>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </GeneralContextProvider>
    </ChakraProvider>
  </React.StrictMode>
)
