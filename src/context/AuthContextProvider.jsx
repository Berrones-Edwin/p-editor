import React, { createContext, useState } from 'react'

export const AuthContext = createContext(null)

const dataAuth = JSON.parse(localStorage.getItem('auth'))

const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(dataAuth || null)
  return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}

        </AuthContext.Provider>
  )
}
export default AuthContextProvider
