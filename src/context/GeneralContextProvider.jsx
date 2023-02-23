import React, { useReducer } from 'react'
import { reducerGeneralSettings } from '../reducers/ReducerGeneralSettings'
import { initialState } from '../reducers/state'

export const GeneralContext = React.createContext({
  state: initialState,
  dispatch: () => undefined
})

const GeneralContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducerGeneralSettings, initialState)
  return (
    <GeneralContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      {children}
    </GeneralContext.Provider>
  )
}

export default GeneralContextProvider
