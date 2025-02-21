import { ActionType, NextButtonProps } from './types';

function NextButton({
  dispatch,
  answer,
  index,
  numQuestions,
}: NextButtonProps) {
  if (answer === null) return null;

  if (index < numQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() =>
          dispatch({
            type: ActionType.NextQuestion,
          })
        }
      >
        Next
      </button>
    );
  }

  if (index === numQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() =>
          dispatch({
            type: ActionType.Finished,
          })
        }
      >
        Finish
      </button>
    );
  }
}

export default NextButton;
