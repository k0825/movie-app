import axios from '../api/axios';
import { useEffect, useState } from 'react';
import { Movie } from '../types';
import { requests } from '../api/request';

const truncate = (str: string, n: number) => {
  // undefinedを弾く
  if (str !== undefined) {
    return str.length > n ? str?.substring(0, n - 1) + '...' : str;
  }
};

export const Banner = () => {
  const [movie, setMovie] = useState<Movie>({});

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(requests.feachNetflixOriginals);
      console.log(request.data.results);

      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    };
    fetchData();
  }, []);

  console.log(movie);

  return (
    <header
      className="Banner"
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
        backgroundPosition: 'center center',
      }}
    >
      <div className="Banner-contents">
        <h1 className="Banner-title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="Banner-buttons">
          <button className="Banner-button">Play</button>
          <button className="Banner-button">My List</button>
        </div>
        {movie.overview ? (
          <h1 className="Banner-description">
            {truncate(movie.overview, 150)}
          </h1>
        ) : (
          <></>
        )}
      </div>
      <div className="Banner-fadeBottom" />
    </header>
  );
};
