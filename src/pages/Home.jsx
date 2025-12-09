import React, { useState, useEffect } from 'react';
import { movieAPI } from '../services/api';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [loading, setLoading] = useState(true);

  const handleSearch = async (query) => {
    setLoading(true);
    try {
      const response = await movieAPI.searchMulti(query);
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error searching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId);
  };

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await movieAPI.getGenres();
        setGenres(response.data.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = selectedGenre
          ? await movieAPI.getMoviesByGenre(selectedGenre)
          : await movieAPI.getPopularMovies();
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [selectedGenre]);

  if (loading) {
    return <div className="loading">Cargando películas...</div>;
  }

  return (
    <div className="home">
      <h1 className="text-center text-3xl font-bold my-4">LO NUEVO EN CARTELERA</h1>
      <SearchBar onSearch={handleSearch} onGenreChange={handleGenreChange} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} item={movie} />
        ))}
      </div>
    </div>
  );
};

export default Home;