import React, { useEffect, useState } from 'react';
import { FaPlus, FaGamepad } from 'react-icons/fa';
import useGames from '../hooks/useGames.jsx';
import GameCard from '../components/GameCard';

const Games = ({ setCurrentPage }) => {
  const { games, loading, error, fetchGames, deleteGame } = useGames();
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchGames();
  }, []);

  const handleDelete = async (id) => {
    const result = await deleteGame(id);
    if (result.success) {
      setDeleteConfirm(null);
    } else {
      alert(result.error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Juegos del Casino</h1>
        <button
          onClick={() => setCurrentPage('manage')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <FaPlus />
          <span>Agregar Juego</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map(game => (
          <GameCard
            key={game.id}
            game={game}
            onEdit={() => {}}
            onDelete={(id) => setDeleteConfirm(id)}
            showActions={true}
          />
        ))}
      </div>

      {games.length === 0 && (
        <div className="text-center py-12">
          <FaGamepad className="text-6xl text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">No hay juegos disponibles</p>
        </div>
      )}

      {/* Modal de confirmación de eliminación */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full mx-4">
            <h3 className="text-lg font-bold mb-4">¿Eliminar juego?</h3>
            <p className="text-gray-600 mb-4">Esta acción no se puede deshacer.</p>
            <div className="flex space-x-4">
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
              >
                Eliminar
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Games;
