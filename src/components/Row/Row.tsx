import { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import axios from '../../api/axios';
import { Movie } from '../../types';
import styles from './Row.module.scss';

type RowProps = {
  title: string;
  fetchUrl: string;
  isLargeRow?: boolean;
};

type Options = {
  height: string;
  width: string;
  playerVars: {
    autoplay: 0 | 1 | undefined;
  };
};

export const Row = ({ title, fetchUrl, isLargeRow }: RowProps): JSX.Element => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [trailerUrl, setTrailerUrl] = useState<string | null>('');

  const baseUrl = 'https://image.tmdb.org/t/p/original';

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    };
    fetchData();
  }, [fetchUrl]);

  const opts: Options = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = async (movie: Movie) => {
    if (trailerUrl) {
      setTrailerUrl('');
    } else {
      const response = await axios.get(
        `/movie/${movie.id}/videos?api_key=${process.env.REACT_APP_API_KEY}`
      );
      setTrailerUrl(response.data.results[0]?.key);
    }
  };

  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <div className={styles.posters}>
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`${styles.poster} ${
              isLargeRow && styles['poster-large']
            }`}
            src={`${baseUrl}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
            onClick={() => handleClick(movie)}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};
