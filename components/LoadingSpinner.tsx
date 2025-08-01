
import React from 'react';
import { SoccerBallIcon } from './icons';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center my-12 text-center">
        <SoccerBallIcon className="w-16 h-16 text-cyan-400 animate-spin-slow" />
        <p className="mt-4 text-lg font-semibold text-gray-300">Analisando dados...</p>
        <p className="text-sm text-gray-500">Isso pode levar alguns segundos.</p>
    </div>
  );
};

