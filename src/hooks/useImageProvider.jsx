import { useContext } from 'react'
import { ImageContext } from '../context/ContextImage'

export const useImageProvider = () => {
  const { image, setImage } = useContext(ImageContext)
  return { image, setImage }
}
