import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import "./MovieCards.css";

const MovieCard = ({ item, type, onLike, onReserve, onComment }) => {
  // Estado local para mostrar/ocultar comentarios
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');

  const [userData, setUserData] = useLocalStorage('userData', {});
  const [liked, setLiked] = useState(userData[item.id]?.liked || false);
  const [likes, setLikes] = useState(userData[item.id]?.likes || 0);

  const handleLike = () => {
    const newLiked = !liked;
    const newLikes = newLiked ? likes + 1 : likes - 1;

    setLiked(newLiked);
    setLikes(newLikes);

    setUserData((prev) => ({
      ...prev,
      [item.id]: {
        ...prev[item.id],
        liked: newLiked,
        likes: newLikes,
      },
    }));
  };

  // Función para manejar envío de comentarios
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      onComment(item.id, commentText);
      setCommentText('');
    }
  };

  return (
    <div className="movie-card bg-gray-800 text-white rounded-lg shadow-md overflow-hidden">
      {/* Imagen de la película/serie */}
      <Link to={`/movie/${item.id}`}>
        <img 
          src={item.poster_path 
            ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
            : '/placeholder-image.jpg'
          } 
          alt={item.title || item.name}
          className="w-full h-48 object-cover"
        />
      </Link>
      
      {/* Información y acciones */}
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{item.title || item.name}</h3>
        <p className="text-sm text-gray-400 mb-4">
          {item.overview ? `${item.overview.substring(0, 100)}...` : 'Sin descripción disponible.'}
        </p>
        
        {/* Botones de interacción */}
        <div className="flex justify-between items-center">
          <button
            onClick={handleLike}
            className={`px-4 py-2 rounded ${liked ? 'bg-red-500' : 'bg-gray-500'} text-white`}
          >
            ❤️ {likes}
          </button>
          <button 
            onClick={() => onReserve(item.id)}
            className={`px-4 py-2 rounded ${item.reserved ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
          >
            {item.reserved ? 'Reservada' : 'Reservar'}
          </button>
          
          <button 
            onClick={() => setShowComments(!showComments)}
            className="comment-btn"
          >
            💬 Comentarios ({item.comments?.length || 0})
          </button>
        </div>


        {showComments && (
          <div className="comments-section">
            <form onSubmit={handleCommentSubmit} className="comment-form">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Escribe un comentario..."
                className="comment-input"
              />
              <button type="submit">Enviar</button>
            </form>
            
            <div className="comments-list">
              {item.comments?.map((comment, index) => (
                <div key={index} className="comment">
                  <p>{comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default MovieCard;
