import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { auth } from '../firebase/firebase'

const provider = new GoogleAuthProvider()

export const loginWithGoogle = () => {
  return signInWithPopup(auth, provider)
}

export const logout = () => {
  localStorage.removeItem('auth')
  return signOut(auth)
}
