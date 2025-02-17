import { useState, useEffect } from 'react';

const key = '9588565';

export default function useMovies(query: string, callback: () => void) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      callback?.();

      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError('');
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${key}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error('Something went wrong with fetchting movies');

          const data = await res.json();
          if (data.Response === 'False') throw new Error('Movie not found');

          setMovies(data.Search);
          setError('');
        } catch (error) {
          if (error instanceof Error) {
            console.error(error.message);
            if (error.name !== 'AbortError') {
              setError(error.message);
            }
          } else {
            console.error('An unknown error occurred');
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError('');
        return;
      }

      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return { movies, error, isLoading };
}
