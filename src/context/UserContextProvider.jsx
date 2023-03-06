
import React, { createContext, useState } from 'react'
export const UserContext = createContext('')

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: '',
    photo: '',
    image: {
      src: '',
      filter: ''
    },
    sizeImage: {
      w: 650,
      h: 650,
      name: 'default'
    },
    code: true,
    position: {
      top: '', bottom: '', left: '', right: ''
    },
    language: 'js'
  })

  return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
  )
}

export default UserContextProvider
