export const ActionType = {
  BGCOLOR: 0,
  BGCOLORHEADER: 1,
  BGCOLORSUBTITLE: 2,
  SIZEHEADER: 3,
  SIZESUBTITLTE: 4
}

export const ChangeBgColor = {
  type: ActionType.BGCOLOR,
  payload: ''
}
export const ChangeBgColorHeader = {
  type: ActionType.BGCOLORHEADER,
  payload: ''
}
export const ChangeBgColorSubtitle = {
  type: ActionType.BGCOLORSUBTITLE,
  payload: ''
}
export const ChangeSizeHeader = {
  type: ActionType.SIZEHEADER,
  payload: ''
}
export const ChangeSizeSubtitle = {
  type: ActionType.SIZESUBTITLTE,
  payload: ''
}
