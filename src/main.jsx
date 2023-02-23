import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ChakraProvider } from '@chakra-ui/react'
import './index.css'
import theme from './theme/theme'
import GeneralContextProvider from './context/GeneralContextProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <GeneralContextProvider>

      <App />
      </GeneralContextProvider>
    </ChakraProvider>
  </React.StrictMode>
)
