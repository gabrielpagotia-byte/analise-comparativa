
import React from 'react';
import { SoccerBallIcon } from './icons';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-900/80 backdrop-blur-lg border-b border-gray-700/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-20">
            <SoccerBallIcon className="h-8 w-8 text-cyan-400 mr-3" />
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">
                Análise Comparativa de Times
            </h1>
        </div>
      </div>
    </header>
  );
};
