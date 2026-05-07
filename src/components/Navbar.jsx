import React from 'react';
import { Search, Trophy } from 'lucide-react';

const Navbar = ({ totalPlayers, searchTerm, setSearchTerm }) => {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-[#0B0E14] px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-600 rounded-lg">
          <Trophy className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-wider uppercase text-white">
            Cricket Auction
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
          </div>
          <input
            type="text"
            className="bg-white/5 border border-white/10 rounded-md py-2 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all w-64"
            placeholder="Search players..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-md border border-white/10">
          <span className="text-sm text-gray-400">Total Pool:</span>
          <span className="font-bold text-blue-400">{totalPlayers}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
