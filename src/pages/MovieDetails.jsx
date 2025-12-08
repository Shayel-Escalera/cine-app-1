import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { movieAPI } from '../services/api';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await movieAPI.getMovieDetails(id);
        setMovie(response.data);

        // Fetch trailer
        const trailerResponse = await movieAPI.getMovieTrailer(id);
        const trailer = trailerResponse.data.results.find(
          (video) => video.type === 'Trailer' && video.site === 'YouTube'
        );
        setTrailerKey(trailer?.key || null);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <div className="loading">Cargando detalles de la película...</div>;
  }

  if (!movie) {
    return <div className="error">No se encontraron detalles para esta película.</div>;
  }

  return (
    <div className="movie-details p-4">
      <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : '/placeholder-image.jpg'
        }
        alt={movie.title}
        className="w-full max-w-md mx-auto mb-4"
      />
      <p className="text-lg text-gray-700 mb-4">{movie.overview}</p>
      <p className="text-sm text-gray-500">Fecha de lanzamiento: {movie.release_date}</p>

      {trailerKey && (
        <div className="trailer mt-4">
          <h2 className="text-2xl font-bold mb-2">Trailer</h2>
          <iframe
            width="100%"
            height="315"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;