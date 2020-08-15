import { Dispatch } from 'redux';

import { HistoryItem, Actions, ActionTypes, AddAction, ReloadAction } from './types';

import * as ls from '../../util/local-storage';

export const initialState: HistoryItem[] = [];

export default (state: HistoryItem[] = initialState, action: Actions): HistoryItem[] => {
  switch (action.type) {
    case ActionTypes.ADD:
    case ActionTypes.RELOAD: {
      return ls.getByPrefix('recent_') as HistoryItem[];
    }
    default:
      return state;
  }
}

/* Actions */
export const addToUploadHistory = (item: HistoryItem) => (dispatch: Dispatch) => {
  ls.set(`recent_${item.id}`, item);
  dispatch(addAct(item));
};

export const deleteFromUploadHistory = (id: number) => (dispatch: Dispatch) => {
  ls.remove(`recent_${id}`);
  dispatch(reloadAct());
};

/* Action Creators */
export const addAct = (item: HistoryItem): AddAction => {
  return {
    type: ActionTypes.ADD,
    item
  };
};

export const reloadAct = (): ReloadAction => {
  return {
    type: ActionTypes.RELOAD
  };
};
