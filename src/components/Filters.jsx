import React from 'react';

const roles = ['All', 'Batsman', 'Bowler', 'All Rounder', 'Wicket Keeper'];

const Filters = ({ activeFilter, setActiveFilter }) => {
  return (
    <div className="flex justify-center gap-4 py-4 z-40 relative">
      {roles.map((role) => {
        const isActive = activeFilter === role;
        return (
          <button
            key={role}
            onClick={() => setActiveFilter(role)}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
            }`}
          >
            {role}
          </button>
        );
      })}
    </div>
  );
};

export default Filters;
