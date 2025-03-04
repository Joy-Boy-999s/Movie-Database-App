import React, { createContext, useState, useEffect } from "react";

export const MovieContext = createContext();

const API_KEY = "YOUR_TMDB_API_KEY"; // Replace with actual key
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
  const fetchMovies = async (category, endpoint) => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/movie/${endpoint}?api_key=${API_KEY}`);
      if (!response.ok) throw new Error("Failed to fetch movies");
      const data = await response.json();
      setMovies((prev) => ({ ...prev, [category]: data.results }));
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
      setMovies((prev) => ({ ...prev, searched: data.results }));
    } catch (error) {
      console.error("Error searching movies:", error);
    }
    setLoading(false);
  };

  // Fetch Data on Mount
  useEffect(() => {
    fetchMovies("popular", "popular");
    fetchMovies("topRated", "top_rated");
    fetchMovies("upcoming", "upcoming");
  }, []);

  return (
    <MovieContext.Provider value={{ movies, loading, searchQuery, setSearchQuery, searchMovies }}>
      {children}
    </MovieContext.Provider>
  );
};

export { MovieProvider };
