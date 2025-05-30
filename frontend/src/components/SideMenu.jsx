import React from 'react';
import { FaGamepad, FaUsers, FaPlus } from 'react-icons/fa';

const SideMenu = ({ isOpen, toggleMenu, currentPage, setCurrentPage }) => {
  const menuItems = [
    { id: 'games', icon: FaGamepad, label: 'Juegos' },
    { id: 'manage', icon: FaPlus, label: 'Gestionar Juegos' },
    { id: 'customers', icon: FaUsers, label: 'Clientes' }
  ];

  const handleMenuClick = (pageId) => {
    setCurrentPage(pageId);
    if (window.innerWidth < 1024) toggleMenu();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={toggleMenu} />
      )}
      <div className={`fixed left-0 top-0 h-full w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:w-64`}>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-8 text-center">Casino Admin</h2>
          <nav className="space-y-4">
            {menuItems.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition-colors ${
                    currentPage === item.id ? 'bg-gray-700' : ''
                  }`}
                >
                  <Icon className="text-xl" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
