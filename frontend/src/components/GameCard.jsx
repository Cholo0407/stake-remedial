import React, { useState } from 'react';
import { FaGamepad, FaEdit, FaTrash, FaEye } from 'react-icons/fa';

const GameCard = ({ game, onEdit, onDelete, showActions = true }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
        <FaGamepad className="text-6xl text-white opacity-80" />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{game.name || 'Nombre del Juego'}</h3>
        <p className="text-gray-600 mb-3">{game.category || 'Categoría'}</p>
        {showDetails && (
          <div className="mb-3 text-sm text-gray-700">
            <p><strong>ID:</strong> {game.id}</p>
            {game.minimumBet && <p><strong>Apuesta mínima:</strong> ${game.minimumBet}</p>}
            {game.maximumBet && <p><strong>Apuesta máxima:</strong> ${game.maximumBet}</p>}
          </div>
        )}
        <div className="flex justify-between items-center">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <FaEye />
            <span>{showDetails ? 'Ocultar' : 'Ver más'}</span>
          </button>
          {showActions && (
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(game)}
                className="p-2 text-green-600 hover:bg-green-100 rounded transition-colors"
                title="Editar"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => onDelete(game.id)}
                className="p-2 text-red-600 hover:bg-red-100 rounded transition-colors"
                title="Eliminar"
              >
                <FaTrash />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameCard;
