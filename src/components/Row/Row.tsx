import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { Movie } from '../../types';
import styles from './Row.module.scss';

type RowProps = {
  title: string;
  fetchUrl: string;
  isLargeRow?: boolean;
};

export const Row = ({ title, fetchUrl, isLargeRow }: RowProps): JSX.Element => {
  const [movies, setMovies] = useState<Movie[]>([]);

  const baseUrl = 'https://image.tmdb.org/t/p/original';

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    };
    fetchData();
  }, [fetchUrl]);

  console.log(movies);

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
          />
        ))}
      </div>
    </div>
  );
};
