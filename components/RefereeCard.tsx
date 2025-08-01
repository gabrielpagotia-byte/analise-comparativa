import React from 'react';
import { RefereeStats } from '../types';
import { CardIcon, WhistleIcon } from './icons';

interface RefereeCardProps {
    data: RefereeStats | null;
}

const renderValue = (value: any, fallback: string = 'N/A') => 
    (value !== null && value !== undefined) ? value : fallback;


export const RefereeCard: React.FC<RefereeCardProps> = ({ data }) => {
    if (!data) return null;

    return (
        <div className="bg-gray-800/60 p-6 rounded-2xl border border-gray-700/50 backdrop-blur-sm h-full flex flex-col">
            <h3 className="text-xl font-bold mb-4 flex items-center text-cyan-400">
                <WhistleIcon className="w-6 h-6 mr-2" /> Próxima Partida e Arbitragem
            </h3>
            <div className="space-y-3 text-gray-300 flex-grow">
                <p>
                    <strong className="font-semibold text-gray-100 block">Próximo Jogo:</strong> 
                    <span>{renderValue(data.nextMatchDate, 'A definir')}</span>
                </p>
                <p>
                    <strong className="font-semibold text-gray-100 block">Árbitro:</strong> 
                    <span>{renderValue(data.refereeName, 'A definir')}</span>
                </p>
                <div>
                    <strong className="font-semibold text-gray-100 block mb-1">Média de Cartões (Árbitro):</strong>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center text-yellow-400">
                            <CardIcon className="w-4 h-4 mr-1.5" />
                            <span>{renderValue(data.avgYellowCards)} Amarelos</span>
                        </div>
                        <div className="flex items-center text-red-500">
                            <CardIcon className="w-4 h-4 mr-1.5" />
                            <span>{renderValue(data.avgRedCards)} Vermelhos</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
