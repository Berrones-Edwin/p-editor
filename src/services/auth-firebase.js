import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { auth } from '../firebase/firebase'

const provider = new GoogleAuthProvider()

export const loginWithGoogle = () => {
  return signInWithPopup(auth, provider)
}

export const logout = () => {
  localStorage.clear()
  localStorage.setItem('chakra-ui-color-mode', 'dark')
  return signOut(auth)
}
