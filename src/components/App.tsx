import { useEffect, useReducer } from 'react';
import { ReducerFn, State, Status, ActionType } from '../types';
import ErrorComponent from './Error';
import StartScreen from './StartScreen';
import Question from './Question';
import Header from './Header';
import MainComponent from './MainComponent';
import Loader from './Loader';

const initialState: State = {
  questions: [],
  status: Status.Loading,
  index: 0,
};

const reducer: ReducerFn = (state, action) => {
  switch (action.type) {
    case ActionType.DataReceived:
      return {
        ...state,
        questions: action.payload,
        status: Status.Ready,
      };
    case ActionType.DataFailed:
      return {
        ...state,
        status: Status.Error,
      };
    case ActionType.Start:
      return { ...state, status: Status.Active };
    default:
      throw new Error('Unknow Error');
  }
};

function App() {
  const [{ status, questions, index }, dispatch] = useReducer(reducer, initialState);

  const numQuestions = questions.length;

  useEffect(function () {
    fetch('http://localhost:8000/questions')
      .then((res) => res.json())
      .then((data) =>
        dispatch({
          type: ActionType.DataReceived,
          payload: data,
        })
      )
      .catch((err) => dispatch({ type: ActionType.DataFailed }));
  }, []);

  return (
    <div className="app">
      <Header />

      <MainComponent>
        {status === Status.Loading && <Loader />}
        {status === Status.Error && <ErrorComponent />}
        {status === Status.Ready && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
        {status === Status.Active && <Question question={questions[index]}/>}
      </MainComponent>
    </div>
  );
}

export default App;
