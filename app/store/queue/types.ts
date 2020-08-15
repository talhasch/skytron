export interface Task {
  id: string,
  path: string,
  progress: number,
  done: boolean,
  failed: boolean,
  link: string | null
}

export type Queue = Task[];

export enum ActionTypes {
  SET = '@queue/SET',
  PROGRESS = '@queue/PROGRESS',
  DONE = '@queue/DONE',
  FAIL = '@queue/FAIL',
}

export interface SetAction {
  type: ActionTypes.SET;
  paths: string[];
}

export interface ProgressAction {
  type: ActionTypes.PROGRESS;
  id: string;
  percent: number;
}

export interface DoneAction {
  type: ActionTypes.DONE;
  id: string;
  link: string
}

export interface FailAction {
  type: ActionTypes.FAIL;
  id: string;
}

export type Actions = SetAction | ProgressAction | DoneAction | FailAction ;
