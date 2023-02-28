import { ActionType } from './actions'

export function reducerGeneralSettings (
  state,
  action
) {
  switch (action.type) {
    case ActionType.BGCOLOR:
      return { ...state, bgColor: action.payload }
    case ActionType.BGCOLORHEADER:
      return { ...state, bgColorHeader: action.payload }
    case ActionType.BGCOLORSUBTITLE:
      return { ...state, bgColorSubtitle: action.payload }
    case ActionType.SIZEHEADER:
      return { ...state, sizeHeader: action.payload }
    case ActionType.SIZESUBTITLTE:
      return { ...state, sizeSubtitlte: action.payload }
    case ActionType.ALIGNHEADER:
      return { ...state, alignHeader: action.payload }
    case ActionType.ALIGNSUBTITLE:
      return { ...state, alignSubtitle: action.payload }
    case ActionType.STYLEHEADER:
      return { ...state, styleHeader: action.payload }
    case ActionType.STYLESUBTITLE:
      return { ...state, styleSubtitle: action.payload }
    default:
      return state
  }
}
