import fs from 'fs';

import { Dispatch } from 'redux';

import uploader from '../../helper/uploader';
import random from '../../util/random';
import filename from '../../util/filename';
import * as ls from '../../util/local-storage';

import { RootState } from '../index';

import {
  Actions,
  ActionTypes,
  Queue,
  SetAction,
  ProgressAction,
  DoneAction,
  FailAction,
  HistoryItem
} from './types';

export const initialState: Queue = [];

export default (state: Queue = initialState, action: Actions): Queue => {
  switch (action.type) {
    case ActionTypes.SET: {
      return action.paths.map(f => {
        return {
          id: random(),
          path: f,
          progress: 0,
          done: false,
          failed: false,
          link: null
        };
      });
    }
    case ActionTypes.PROGRESS: {
      return state.map(t => t.id === action.id ? { ...t, progress: action.percent } : t);
    }
    case ActionTypes.DONE: {
      return state.map(t => t.id === action.id ? { ...t, done: true, link: action.link } : t);
    }
    case ActionTypes.FAIL: {
      return state.map(t => t.id === action.id ? { ...t, done: true, failed: true } : t);
    }
    default:
      return state;
  }
}

/* Actions */
export const setQueue = (paths: string[]) => (dispatch: Dispatch) => {
  dispatch(setAct(paths));
};


export const startQueue = () => async (dispatch: Dispatch, getState: () => RootState) => {
  const state: RootState = getState();

  const { queue } = state;

  for (let i = 0; i < queue.length; i++) {
    const task = queue[i];

    const buffer = fs.readFileSync(task.path);
    const arrayBuffer = Uint8Array.from(buffer).buffer;
    const blob = new Blob([arrayBuffer]);

    let link = null;

    try {
      link = await uploader(filename(task.path), blob, (percent: number) => {
        dispatch(progressAct(task.id, percent));
      });
    } catch (e) {
      dispatch(failAct(task.id));
      continue;
    }

    dispatch(doneAct(task.id, link));

    const hItem: HistoryItem = { path: task.path, link, timestamp: Date.now() };
    ls.set(`history_${task.id}_${Date.now()}`, hItem);
  }
};


/* Action Creators */
export const setAct = (paths: string[]): SetAction => {
  return {
    type: ActionTypes.SET,
    paths
  };
};

export const progressAct = (id: string, percent: number): ProgressAction => {
  return {
    type: ActionTypes.PROGRESS,
    id,
    percent
  };
};

export const doneAct = (id: string, link: string): DoneAction => {
  return {
    type: ActionTypes.DONE,
    id,
    link
  };
};

export const failAct = (id: string): FailAction => {
  return {
    type: ActionTypes.FAIL,
    id
  };
};
