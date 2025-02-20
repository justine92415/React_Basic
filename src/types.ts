export type ReducerFn = (state: State, action: Action) => State;

export interface Action {
  type: any;
  payload?: any;
}

export interface State {
  questions: Question[];
  status: Status;
}

export interface Question {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
  id: string;
}

export enum Status {
  Loading = 'loading',
  Error = 'error',
  Ready = 'ready',
  Active = 'active',
  Finished = 'finished',
}

export enum ActionType {
  DataReceived = 'dataReceived',
  DataFailed = 'dataFailed',
}
