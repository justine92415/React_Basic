import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'
import App from './App.tsx'
import StarRating from './StarRating.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    {/* <StarRating
      maxRating={5}
      message={['Terrible', 'Bad', 'Okay', 'Good', 'Amazing']}
    />
    <StarRating size={24} color="red" maxRating={3} defaultRating={2} />
    <Test /> */}
  </StrictMode>
);

function Test() {
  const [movieRating, setMovieRating] = useState(0);

  return (
    <div>
      <StarRating maxRating={5} color="blue" onSetRating={setMovieRating} />
      <p>This movie was rated {movieRating} starts</p>
    </div>
  );
}
