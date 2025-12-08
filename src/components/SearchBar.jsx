import { useState, useEffect } from 'react';

const SearchBar = ({ onSearch, onGenreChange }) => {
  const [query, setQuery] = useState('');
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/genre/movie/list?api_key=62a3a831bc57922f157fd0fe2bb2bf76&language=es-ES'
        );
        const data = await response.json();
        setGenres(data.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center justify-center mb-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar películas..."
        className="border border-gray-300 rounded-l px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        onChange={(e) => onGenreChange(e.target.value)}
        className="border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Todos los géneros</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
      >
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;