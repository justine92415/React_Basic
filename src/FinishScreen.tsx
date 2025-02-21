import { ActionType, FinishScreenProps } from './types';

function FinishScreen({
  points,
  maxPossiblePoints,
  dispatch,
  highScore,
}: FinishScreenProps) {
  const percentage = (points / maxPossiblePoints) * 100;

  let emoji = '';
  if (percentage === 100) emoji = '🎉';
  else if (percentage >= 80) emoji = '👏';
  else if (percentage >= 60) emoji = '🙂';
  else emoji = '😢';

  return (
    <>
      <p className="result">
        <span> {emoji} </span> You scored <strong> {points} </strong> out of{' '}
        {maxPossiblePoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highScore} points)</p>

      <button
        className="btn btn-ui"
        onClick={() =>
          dispatch({
            type: ActionType.Restart,
          })
        }
      >Restart quiz</button>
    </>
  );
}

export default FinishScreen;
