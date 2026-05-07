import React from 'react';
import { ChevronDown, Tag } from 'lucide-react';

const teams = [
  'Not Selected',
  'Team 1',
  'Team 2',
  'Team 3',
  'Team 4',
  'Team 5',
  'Unsold'
];

const BuyerDropdown = ({ value, onChange }) => {
  return (
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Tag className="h-5 w-5 text-blue-400" />
      </div>
      <select
        value={value || 'Not Selected'}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none w-full bg-[#0F172A]/80 border border-blue-500/30 text-white font-medium py-3 pl-12 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 hover:border-blue-400/50 transition-all cursor-pointer shadow-[0_0_15px_rgba(0,71,171,0.2)]"
      >
        {teams.map((team) => (
          <option key={team} value={team} className="bg-[#0F172A] text-white py-2">
            {team}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
        <ChevronDown className="h-5 w-5 text-blue-400" />
      </div>
    </div>
  );
};

export default BuyerDropdown;
