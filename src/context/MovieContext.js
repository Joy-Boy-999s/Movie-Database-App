import React, { createContext, useState } from "react";

export const MovieContext = createContext();

const API_KEY = "9248b786e86e93721bb2a0a3e25e0dfe"; 
const BASE_URL = "https://api.themoviedb.org/3";

const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState({
    popular: [],
    topRated: [],
    upcoming: [],
    searched: [],
  });

  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch Movies
  const getUpdatedData = responseData => ({
    totalPages: responseData.total_pages,
    totalResults: responseData.total_results,
    results: responseData.results.map(eachMovie => ({
      id: eachMovie.id,
      posterPath: `https://image.tmdb.org/t/p/w500${eachMovie.poster_path}`,
      voteAverage: eachMovie.vote_average,
      title: eachMovie.title,
    })),
  })

  const fetchMovies = async (category, endpoint) => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/movie/${endpoint}?api_key=${API_KEY}`);
      if (!response.ok) throw new Error("Failed to fetch movies");
      const data = await response.json();
      const updatedData = getUpdatedData(data)
      setMovies((prev) => ({ ...prev, [category]: updatedData }));
    } catch (error) {
      console.error(`Error fetching ${category} movies:`, error);
    }
    setLoading(false);
  };

  // Search Movies
  const searchMovies = async (query) => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
      if (!response.ok) throw new Error("Failed to fetch search results");
      const data = await response.json();
      const updatedData = getUpdatedData(data)
      setMovies((prev) => ({ ...prev, searched: updatedData }));
    } catch (error) {
      console.error("Error searching movies:", error);
    }
    setLoading(false);
  };

  // Fetch Data on Mount
  // useEffect(() => {
  //   fetchMovies("popular", "popular");
  //   fetchMovies("topRated", "top_rated");
  //   fetchMovies("upcoming", "upcoming");
  // }, []);

  return (
    <MovieContext.Provider value={{ movies, loading, searchQuery, setSearchQuery, searchMovies,fetchMovies }}>
      {children}
    </MovieContext.Provider>
  );
};

export { MovieProvider };
