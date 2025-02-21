import { ActionType, NextButtonProps } from './types';

function NextButton({ dispatch, answer }: NextButtonProps) {
  if (answer === null) return null;

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

export default NextButton;
