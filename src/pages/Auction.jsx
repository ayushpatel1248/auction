import React, { useState, useEffect, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Mousewheel, Navigation } from 'swiper/modules';
import { fetchPlayers } from '../services/api';
import Navbar from '../components/Navbar';
import Filters from '../components/Filters';
import PlayerCard from '../components/PlayerCard';
import { Loader2, AlertCircle } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';

const Auction = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    const loadPlayers = async () => {
      try {
        const data = await fetchPlayers();
        setPlayers(data || []);
      } catch (err) {
        setError('Failed to load player data. Please check your connection or try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadPlayers();
  }, []);

  const handleBuyerChange = (playerId, buyer) => {
    setPlayers(players.map(p => {
      if (p['Player ID'] === playerId) {
        let status = 'Pending';
        if (buyer && buyer !== 'Not Selected' && buyer !== 'Unsold') {
          status = 'Sold';
        } else if (buyer === 'Unsold') {
          status = 'Unsold';
        }
        return { ...p, Buyer: buyer, Status: status };
      }
      return p;
    }));
  };

  const filteredPlayers = useMemo(() => {
    return players.filter(player => {
      const matchesSearch = player['Player Name']?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            player['Player ID']?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = activeFilter === 'All' || player.Role === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [players, searchTerm, activeFilter]);

  if (loading) {
    return (
      <div className="h-screen w-screen bg-[#0B0E14] flex flex-col items-center justify-center gap-6">
        <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
        <h2 className="text-xl font-bold uppercase tracking-widest text-white">
          Initializing Auction
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-screen bg-[#0B0E14] flex flex-col items-center justify-center gap-4 text-center px-4">
        <AlertCircle className="w-16 h-16 text-red-500" />
        <h2 className="text-2xl font-bold text-white">System Error</h2>
        <p className="text-gray-400 max-w-md">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-[#0B0E14]">
      <Navbar 
        totalPlayers={filteredPlayers.length} 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
      />

      <div className="flex-1 flex flex-col pt-24 pb-8 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <Filters activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

        <div className="flex-1 mt-8">
          {filteredPlayers.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-24 h-24 mb-6 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <AlertCircle className="w-10 h-10 text-gray-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No Players Found</h3>
              <p className="text-gray-400">Try adjusting your filters or search term.</p>
            </div>
          ) : (
            <Swiper
              modules={[Keyboard, Mousewheel, Navigation]}
              navigation
              keyboard={{ enabled: true }}
              mousewheel={{ forceToAxis: true }}
              className="w-full h-full max-h-[80vh]"
            >
              {filteredPlayers.map((player) => (
                <SwiperSlide key={player['Player ID']} className="bg-[#0f141e] rounded-[2rem] border border-white/10 overflow-hidden">
                  <PlayerCard player={player} onBuyerChange={handleBuyerChange} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auction;
