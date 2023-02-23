import { useContext } from 'react'
import { UserContext } from '../context/UserContextProvider'

export const useUserProvider = () => {
  const { user, setUser } = useContext(UserContext)
  return { user, setUser }
}
