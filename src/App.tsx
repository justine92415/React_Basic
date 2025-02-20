import { useEffect, useReducer } from 'react';
import Header from './Header';
import MainComponent from './MainComponent';
import { ReducerFn, State, Status, ActionType } from './types';
import Loader from './Loader';
import ErrorComponent from './Error';
import StartScreen from './StartScreen';

const initialState: State = {
  questions: [],
  status: Status.Loading,
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
    default:
      throw new Error('Unknow Error');
  }
};

function App() {
  const [{ status, questions }, dispatch] = useReducer(reducer, initialState);

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
        {status === Status.Ready && <StartScreen numQuestions={numQuestions} />}
      </MainComponent>
    </div>
  );
}

export default App;
