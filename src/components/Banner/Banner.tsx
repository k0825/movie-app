import axios from '../../api/axios';
import { useEffect, useState } from 'react';
import { Movie } from '../../types';
import { requests } from '../../api/request';
import styles from './Banner.module.scss';

const truncate = (str: string, n: number) => {
  // undefinedを弾く
  if (str !== undefined) {
    return str.length > n ? str?.substring(0, n - 1) + '...' : str;
  }
};

export const Banner = (): JSX.Element => {
  const [movie, setMovie] = useState<Movie>({});

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(requests.feachNetflixOriginals);

      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    };
    fetchData();
  }, []);

  return (
    <header
      className={styles.container}
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
        backgroundPosition: 'center center',
      }}
    >
      <div className={styles.contents}>
        <h1 className={styles.title}>
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div>
          <button className={styles.button}>Play</button>
          <button className={styles.button}>My List</button>
        </div>
        {movie.overview ? (
          <h1 className={styles.description}>
            {truncate(movie.overview, 150)}
          </h1>
        ) : (
          <></>
        )}
      </div>
      <div className={styles['fade-bottom']} />
    </header>
  );
};
