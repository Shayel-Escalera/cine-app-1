import { useState, useEffect } from 'react';


export const useLocalStorage = (key, initialValue) => {
  // Paso 1: Estado para almacenar el valor
  const [value, setValue] = useState(() => {
    try {
      // Paso 2: Intentar obtener el valor del localStorage
      const item = window.localStorage.getItem(key);
      // Paso 3: Si existe, parsearlo; si no, usar valor inicial
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Paso 4: En caso de error, usar valor inicial
      return initialValue;
    }
  });


  // Paso 5: Efecto para guardar en localStorage cuando el valor cambie
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);


  // Paso 6: Retornar el valor y la función para actualizarlo
  return [value, setValue];
};

// javascript
// const [favorites, setFavorites] = useLocalStorage('favorites', []);


// // Agregar a favoritos
// setFavorites(prev => [...prev, newMovie]);


// Remover de favoritos
// setFavorites(prev => prev.filter(movie => movie.id !== movieId));
