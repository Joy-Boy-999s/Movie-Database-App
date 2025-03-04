import React, {useContext, useEffect } from "react";
import { Spin } from "antd";
import { MovieContext } from "../../context/MovieContext";
import "./index.css";
import MovieCard from "../MovieCard";

const SearchMovies = () => {
  const { searchMovies, movies, loading,searchQuery } = useContext(MovieContext);

  useEffect(() => {
    searchMovies(searchQuery);
  }, []);

  const onRenderLoading = () => (
    <div className="loading-co">
      <Spin size="large" />
    </div>
  );

  const onRenderMovies = () => {
    const popularMovies = movies.searched?.results || []; // Ensure results exist

    return (
      <ul className="movies-list-container">
        {searchMovies.length > 0 ? (
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

export default SearchMovies;
