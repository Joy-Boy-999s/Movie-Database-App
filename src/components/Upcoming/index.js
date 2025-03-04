import React, {useContext, useEffect } from "react";
import { Spin } from "antd";
import { MovieContext } from "../../context/MovieContext";
import "./index.css";
import MovieCard from "../MovieCard";

const Upcoming = () => {
  const { fetchMovies, movies, loading } = useContext(MovieContext);

  useEffect(() => {
    fetchMovies("upcoming", "upcoming");
  }, []);

  const onRenderLoading = () => (
    <div className="loading-co">
      <Spin size="large" />
    </div>
  );

  const onRenderMovies = () => {
    const popularMovies = movies.upcoming?.results || []; // Ensure results exist

    return (
      <ul className="movies-list-container">
        {popularMovies.length > 0 ? (
          popularMovies.map((movie) => (
            <MovieCard key={movie.id} movieDetails={movie} />
          ))
        ) : (
          <p>No movies found</p>
        )}
      </ul>
    );
  };

  return <>{loading ? onRenderLoading() : onRenderMovies()}</>;
};

export default Upcoming;
