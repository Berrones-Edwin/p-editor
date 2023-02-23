import { useContext } from 'react'
import { GeneralContext } from '../context/GeneralContextProvider'

const useGeneralSettings = () => {
  const { state, dispatch } = useContext(GeneralContext)
  return { state, dispatch }
}

export default useGeneralSettings
