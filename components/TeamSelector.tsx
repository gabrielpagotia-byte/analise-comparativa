
import React from 'react';
import { Team } from '../types';

interface TeamSelectorProps {
  teams: readonly Team[];
  selectedTeam: string;
  onSelectTeam: (team: string) => void;
  label: string;
  otherSelectedTeam: string;
}

export const TeamSelector: React.FC<TeamSelectorProps> = ({ teams, selectedTeam, onSelectTeam, label, otherSelectedTeam }) => {
  return (
    <div>
      <label htmlFor={label} className="block text-sm font-medium text-gray-400 mb-2">{label}</label>
      <select
        id={label}
        value={selectedTeam}
        onChange={(e) => onSelectTeam(e.target.value)}
        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
      >
        <option value="" disabled>Selecione um time</option>
        {teams.map(team => (
          <option 
            key={team} 
            value={team}
            disabled={team === otherSelectedTeam}
            className={team === otherSelectedTeam ? 'text-gray-500' : 'text-white'}
          >
            {team}
          </option>
        ))}
      </select>
    </div>
  );
};
