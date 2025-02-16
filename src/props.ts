import { IWatchedMovie } from './types';
export interface WatchedMovieListProps {
  watched: IWatchedMovie[];
  onDeleteWatched: (id: string) => void;
}

export interface WatchedSummaryProps {
  watched: IWatchedMovie[];
}

export interface WatchedMovieProps {
  movie: IWatchedMovie;
  onDeleteWatched: (id: string) => void;
}

export interface MovieDetailsProps {
  selectedId: string;
  onCloseMovie: () => void;
  onAddWatched: (movie: IWatchedMovie) => void;
  watched: IWatchedMovie[];
}
