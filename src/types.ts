export type ReducerFn = (state: State, action: Action) => State;

export interface Action {
  type: any;
  payload?: any;
}

export interface State {
  questions: Question[];
  status: Status;
  index: number;
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
  Start = 'start',
}

export interface StartScreenProps {
  numQuestions: number;
  dispatch: React.Dispatch<Action>;
}

export interface QuestionProps {
  question: Question;
}

export interface OptionsProps {
  question: Question;
}
