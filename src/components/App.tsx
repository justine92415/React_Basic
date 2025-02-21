import { useEffect, useReducer } from 'react';
import { ReducerFn, State, Status, ActionType } from '../types';
import ErrorComponent from './Error';
import StartScreen from './StartScreen';
import Question from './Question';
import Header from './Header';
import MainComponent from './MainComponent';
import Loader from './Loader';
import NextButton from '../NextButton';
import Progress from '../Progress';
import FinishScreen from '../FinishScreen';
import Footer from '../Footer';
import Timer from '../Timer';

const SECS_PER_QUESTION = 30;

const initialState: State = {
  questions: [],
  status: Status.Loading,
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null,
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
      return {
        ...state,
        status: Status.Active,
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case ActionType.NewAnswer:
      const question = state.questions.at(state.index)!;
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case ActionType.NextQuestion:
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case ActionType.Finished:
      return {
        ...state,
        status: Status.Finished,
        highScore: Math.max(state.points, state.highScore),
      };
    case ActionType.Restart:
      return {
        ...initialState,
        questions: state.questions,
        status: Status.Ready,
        highScore: state.highScore,
      };
    case ActionType.Tick:
      return {
        ...state,
        secondsRemaining: state.secondsRemaining! - 1,
        status: state.secondsRemaining === 0 ? Status.Finished : state.status,
      };
    default:
      throw new Error('Unknow Error');
  }
};

function App() {
  const [
    { status, questions, index, answer, points, highScore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;

  const maxPossiblePoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );

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
        {status === Status.Ready && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === Status.Active && (
          <>
            <Progress
              numQuestions={numQuestions}
              index={index}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                numQuestions={numQuestions}
                index={index}
              />
            </Footer>
          </>
        )}
        {status === Status.Finished && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            dispatch={dispatch}
            highScore={highScore}
          />
        )}
      </MainComponent>
    </div>
  );
}

export default App;
