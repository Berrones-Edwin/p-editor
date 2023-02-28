
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
      w: 630,
      h: 630,
      name: ''
    }
  })

  return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
  )
}

export default UserContextProvider
