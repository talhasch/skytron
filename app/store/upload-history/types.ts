export interface HistoryItem {
  id: number,
  name: string
  size: number
  link: string,
  timestamp: number
}

export enum ActionTypes {
  ADD = '@users/ADD',
  RELOAD = '@users/RELOAD',
}

export interface AddAction {
  type: ActionTypes.ADD;
  item: HistoryItem;
}

export interface ReloadAction {
  type: ActionTypes.RELOAD;
}

export type Actions = AddAction | ReloadAction;
