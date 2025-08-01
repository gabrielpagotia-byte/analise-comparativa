import React from 'react';
import { TeamStats } from '../types';
import { WinIcon, DrawIcon, LossIcon, GoalIcon, CornerIcon, CardIcon, PlayerIcon, PossessionIcon, ShotIcon } from './icons';

interface StatCardProps {
  teamName: string;
  stats: TeamStats | null;
  tournamentContext: string | null;
}

const StatItem: React.FC<{ icon: React.ReactNode; label: string; value: string | number | null | undefined }> = ({ icon, label, value }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-700/50 last:border-b-0">
        <div className="flex items-center text-gray-300">
            {icon}
            <span className="ml-3">{label}</span>
        </div>
        <span className="font-bold text-white">{value ?? 'N/A'}</span>
    </div>
);

const renderValue = (value: any) => value !== null && value !== undefined ? value : 'N/A';

export const StatCard: React.FC<StatCardProps> = ({ teamName, stats, tournamentContext }) => {
    if (!stats) {
        return (
            <div className="bg-gray-800/60 p-6 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-center">{teamName}</h3>
                <p className="text-center text-gray-400 mt-4">Dados não disponíveis.</p>
            </div>
        );
    }

    const { last5Games } = stats;
    const contextText = tournamentContext && tournamentContext !== "Contexto Geral" ? `(${tournamentContext})` : '';

    return (
        <div className="bg-gray-800/60 p-6 rounded-2xl border border-gray-700/50 backdrop-blur-sm shadow-lg">
            <h3 className="text-2xl font-bold text-center mb-6 text-white">{teamName}</h3>

            <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-400 mb-2 text-center">
                    Últimos 5 Jogos {contextText}
                </h4>
                <div className="flex justify-center space-x-6 text-white">
                    <div className="flex items-center space-x-2">
                        <WinIcon className="w-5 h-5 text-green-400" />
                        <span>{renderValue(last5Games?.wins)} V</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <DrawIcon className="w-5 h-5 text-yellow-400" />
                        <span>{renderValue(last5Games?.draws)} E</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <LossIcon className="w-5 h-5 text-red-400" />
                        <span>{renderValue(last5Games?.losses)} D</span>
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <StatItem icon={<GoalIcon className="w-5 h-5 text-cyan-400" />} label="Gols Marcados / Sofridos" value={`${renderValue(stats.goalsScored)} / ${renderValue(stats.goalsConceded)}`} />
                <StatItem icon={<PossessionIcon className="w-5 h-5 text-cyan-400" />} label="Posse de Bola (Média)" value={renderValue(stats.avgPossession)} />
                <StatItem icon={<ShotIcon className="w-5 h-5 text-cyan-400" />} label="Finalizações (Média)" value={renderValue(stats.avgShots)} />
                <StatItem icon={<CornerIcon className="w-5 h-5 text-cyan-400" />} label="Escanteios (Média)" value={renderValue(stats.avgCorners)} />
                <StatItem icon={<CardIcon className="w-5 h-5 text-yellow-400" />} label="Cartões Amarelos (Média)" value={renderValue(stats.avgYellowCards)} />
                <StatItem icon={<CardIcon className="w-5 h-5 text-red-500" />} label="Cartões Vermelhos (Média)" value={renderValue(stats.avgRedCards)} />
                <StatItem icon={<PlayerIcon className="w-5 h-5 text-cyan-400" />} label="Jogador com mais chutes" value={stats.keyPlayerShots?.name ? `${stats.keyPlayerShots.name} (${stats.keyPlayerShots.value})` : 'N/A'} />
                <StatItem icon={<PlayerIcon className="w-5 h-5 text-cyan-400" />} label="Jogador que mais cria chances" value={stats.keyPlayerChances?.name ? `${stats.keyPlayerChances.name} (${stats.keyPlayerChances.value})` : 'N/A'} />
            </div>
        </div>
    );
};