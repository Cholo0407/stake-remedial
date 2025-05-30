import React, { useState } from 'react';
import { FaSave, FaTimes } from 'react-icons/fa';
import useGames from '../hooks/useGames';

const GamesManagePage = ({ setCurrentPage }) => {
  const { addGame, updateGame } = useGames();
  const [editingGame, setEditingGame] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    minimumBet: '',
    maximumBet: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const gameData = {
      name: formData.name,
      category: formData.category,
      minimumBet: formData.minimumBet ? parseFloat(formData.minimumBet) : null,
      maximumBet: formData.maximumBet ? parseFloat(formData.maximumBet) : null
    };

    const result = editingGame
    ? await updateGame(editingGame.id, gameData)
    : await addGame(gameData);

  if (result.success) {
    setFormData({
      name: '',
      category: '',
      minimumBet: '',
      maximumBet: ''
    });
    setEditingGame(null);
    alert(editingGame ? 'Juego actualizado exitosamente' : 'Juego agregado exitosamente');
    setCurrentPage('games');
  } else {
    alert(result.error);
  }
};

const handleCancel = () => {
  setFormData({
    name: '',
    category: '',
    minimumBet: '',
    maximumBet: ''
  });
  setEditingGame(null);
  setCurrentPage('games');
};

return (
  <div className="max-w-2xl mx-auto space-y-6">
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold text-gray-800">
        {editingGame ? 'Editar Juego' : 'Agregar Nuevo Juego'}
      </h1>
      <button
        onClick={handleCancel}
        className="text-gray-600 hover:text-gray-800 transition-colors"
      >
        <FaTimes className="text-xl" />
      </button>
    </div>

    <div className="bg-white p-6 rounded-lg shadow-md">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombre del Juego *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ej: Poker Texas Hold'em"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Categoría *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecciona una categoría</option>
            <option value="Cartas">Cartas</option>
            <option value="Ruleta">Ruleta</option>
            <option value="Slots">Slots</option>
            <option value="Dados">Dados</option>
            <option value="Deportes">Deportes</option>
            <option value="Otros">Otros</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Apuesta Mínima ($)
            </label>
            <input
              type="number"
              name="minimumBet"
              value={formData.minimumBet}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Apuesta Máxima ($)
            </label>
            <input
              type="number"
              name="maximumBet"
              value={formData.maximumBet}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
            />
          </div>
        </div>

        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <FaSave />
            <span>{editingGame ? 'Actualizar' : 'Guardar'}</span>
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors flex items-center space-x-2"
          >
            <FaTimes />
            <span>Cancelar</span>
          </button>
        </div>
      </form>
    </div>
  </div>
);
};

export default GamesManagePage;

