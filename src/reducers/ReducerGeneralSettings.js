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
    case ActionType.STYLEHEADERBOLD:
      return { ...state, styleHeaderBold: action.payload }
    case ActionType.STYLEHEADERITALIC:
      return { ...state, styleHeaderItalic: action.payload }
    case ActionType.STYLEHEADERUNDERLINE:
      return { ...state, styleHeaderUnderline: action.payload }
    case ActionType.STYLESUBTITLERBOLD:
      return { ...state, styleSubtitleBold: action.payload }
    case ActionType.STYLESUBTITLEUNDERLINE:
      return { ...state, styleSubtitleUnderline: action.payload }
    case ActionType.STYLESUBTITLETALIC:
      return { ...state, styleSubtitleItalic: action.payload }
    default:
      return state
  }
}
