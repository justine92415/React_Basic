export type ReducerFn = (state: State, action: Action) => State;

export interface Action {
  type: any;
  payload?: any;
}

export interface State {
  questions: Question[];
  status: Status;
  index: number;
  answer: number | null;
  points: number;
  highScore: number;
  secondsRemaining: number | null;
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
  NewAnswer = 'newAnswer',
  NextQuestion = 'nextQuestion',
  Finished = 'finished',
  Restart = 'restart',
  Tick = 'tick',
}

export interface StartScreenProps {
  numQuestions: number;
  dispatch: React.Dispatch<Action>;
}

export interface QuestionProps {
  question: Question;
  dispatch: React.Dispatch<Action>;
  answer: number | null;
}

export interface OptionsProps {
  question: Question;
  dispatch: React.Dispatch<Action>;
  answer: number | null;
}

export interface NextButtonProps {
  dispatch: React.Dispatch<Action>;
  answer: number | null;
  index: number;
  numQuestions: number;
}

export interface ProgressProps {
  numQuestions: number;
  index: number;
  points: number;
  maxPossiblePoints: number;
  answer: number | null;
}

export interface FinishScreenProps {
  points: number;
  maxPossiblePoints: number;
  dispatch: React.Dispatch<Action>;
  highScore: number;
}

export interface TimerProps {
  dispatch: React.Dispatch<Action>;
  secondsRemaining: number | null;
}
