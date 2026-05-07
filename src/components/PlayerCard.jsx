import React from 'react';
import { Quote, Activity, Target, Award, User, MapPin, Calendar } from 'lucide-react';
import BuyerDropdown from './BuyerDropdown';

const getImageUrl = (url) => {
  if (!url) return null;
  // Handle Google Drive open?id= or file/d/ links
  const driveIdMatch = url.match(/id=([^&]+)/) || url.match(/file\/d\/([^/]+)/);
  if (driveIdMatch && driveIdMatch[1]) {
    return `https://drive.google.com/uc?export=view&id=${driveIdMatch[1]}`;
  }
  return url;
};

const PlayerCard = ({ player, onBuyerChange }) => {
  const isSold = player.Status === 'Sold';
  const isUnsold = player.Status === 'Unsold';
  
  const statusColor = isSold ? 'text-green-400 bg-green-400/10 border-green-400/30' : 
                      isUnsold ? 'text-red-400 bg-red-400/10 border-red-400/30' : 
                      'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';

  const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(player['Player Name'] || 'Player')}&background=0D8ABC&color=fff&size=256`;
  const photoUrl = getImageUrl(player['Player Photo']) || defaultAvatar;

  return (
    <div className="w-full h-full flex flex-col md:flex-row items-center justify-center p-6 md:p-8 gap-8 md:gap-12">
      {/* Left Column: Player Image & Core Identity */}
      <div className="w-full md:w-5/12 flex flex-col items-center relative">
        <div className="relative group">
          <div className="w-72 h-96 md:w-80 md:h-[28rem] rounded-xl overflow-hidden border border-white/10 relative bg-[#1a2332]">
            <img 
              src={photoUrl} 
              alt={player['Player Name']} 
              className="w-full h-full object-cover object-top"
              onError={(e) => { e.target.src = defaultAvatar; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] via-transparent to-transparent opacity-90"></div>
            
            <div className="absolute bottom-6 left-0 right-0 px-6">
              <div className="flex justify-between items-end mb-2">
                <span className="bg-blue-600 px-3 py-1 rounded-md text-xs font-bold tracking-wider">
                  {player['Player ID']}
                </span>
                <span className={`px-3 py-1 rounded-md text-xs font-bold tracking-wider border ${statusColor}`}>
                  {player.Status || 'Pending'}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-white mb-1">
                {player['Player Name']}
              </h2>
              <div className="flex items-center gap-2 text-blue-300 font-medium">
                <Activity className="w-4 h-4" />
                <span>{player.Role}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Player Stats & Details */}
      <div className="w-full md:w-7/12 flex flex-col gap-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatBox icon={<Calendar />} label="Age" value={player.Age} />
          <StatBox icon={<MapPin />} label="City" value={player.City} />
          <StatBox icon={<User />} label="Batting" value={player['Batting Style']} />
          <StatBox icon={<Target />} label="Bowling" value={player['Bowling Style']} />
        </div>

        <div className="flex gap-4">
          <div className="flex-1 bg-white/5 border border-white/10 rounded-lg p-5">
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Highest Score</p>
            <p className="text-2xl font-bold text-white">{player['Highest Score'] || 'N/A'}</p>
          </div>
          <div className="flex-1 bg-white/5 border border-white/10 rounded-lg p-5">
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Best Bowling</p>
            <p className="text-2xl font-bold text-white">{player['Best Bowling Figures'] || 'N/A'}</p>
          </div>
        </div>

        {player['AI Summary'] && (
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 relative">
            <div className="relative z-10 flex gap-4">
              <Quote className="text-blue-400 shrink-0 mt-1" size={24} />
              <div>
                <h4 className="text-sm font-bold text-blue-300 uppercase tracking-widest mb-2">Scouting Report</h4>
                <p className="text-gray-300 leading-relaxed italic">"{player['AI Summary']}"</p>
              </div>
            </div>
          </div>
        )}

        {player.Achievements && (
          <div className="bg-white/5 border border-white/10 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <Award className="text-yellow-400 w-5 h-5" />
              <h4 className="font-bold text-white uppercase tracking-wider">Key Achievements</h4>
            </div>
            <p className="text-gray-300 text-sm">{player.Achievements}</p>
          </div>
        )}

        <div className="mt-auto pt-4">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-2 font-bold">Auction Action</p>
          <BuyerDropdown 
            value={player.Buyer} 
            onChange={(val) => onBuyerChange(player['Player ID'], val)} 
          />
        </div>
      </div>
    </div>
  );
};

const StatBox = ({ icon, label, value }) => (
  <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col items-center justify-center text-center">
    <div className="text-blue-400 mb-2">{React.cloneElement(icon, { size: 20 })}</div>
    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">{label}</p>
    <p className="font-semibold text-sm whitespace-nowrap overflow-hidden text-ellipsis w-full" title={value || 'N/A'}>
      {value || 'N/A'}
    </p>
  </div>
);

export default PlayerCard;
