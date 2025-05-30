import { useState } from 'react';
import axios from 'axios';

const API_URL = 'https://stake-remedial.onrender.com/api/games';

const useGames = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchGames = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      setGames(response.data);
    } catch (err) {
      console.error(err);
      setError('Error al cargar los juegos');
    } finally {
      setLoading(false);
    }
  };

  const addGame = async (gameData) => {
    try {
      const response = await axios.post(API_URL, gameData);
      setGames(prev => [...prev, response.data]);
      return { success: true, data: response.data };
    } catch (err) {
      console.error(err);
      return { success: false, error: 'Error al agregar el juego' };
    }
  };

  const updateGame = async (id, gameData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, gameData);
      setGames(prev => prev.map(game => game.id === id ? response.data : game));
      return { success: true, data: response.data };
    } catch (err) {
      console.error(err);
      return { success: false, error: 'Error al actualizar el juego' };
    }
  };

  const deleteGame = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setGames(prev => prev.filter(game => game.id !== id));
      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false, error: 'Error al eliminar el juego' };
    }
  };

  return {
    games,
    loading,
    error,
    fetchGames,
    addGame,
    updateGame,
    deleteGame
  };
};

export default useGames;
