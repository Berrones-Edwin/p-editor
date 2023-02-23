
import React, { createContext, useState } from 'react'
export const ImageContext = createContext('')

const ImageContextProvider = ({ children }) => {
  const [image, setImage] = useState('')

  return (
        <ImageContext.Provider value={{ image, setImage }}>
            {children}
        </ImageContext.Provider>
  )
}

export default ImageContextProvider
