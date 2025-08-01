import React from 'react';
import { ComparisonData, Team } from '../types';
import { StatCard } from './StatCard';
import { RefereeCard } from './RefereeCard';
import { ShieldIcon, NewsIcon, SourceIcon } from './icons';

interface ComparisonViewProps {
  data: ComparisonData;
  teamAName: Team;
  teamBName: Team;
}

const HeadToHeadCard: React.FC<{ data: ComparisonData['headToHead'] }> = ({ data }) => {
    if (!data) return null;
    return (
        <div className="bg-gray-800/60 p-6 rounded-2xl border border-gray-700/50 backdrop-blur-sm h-full flex flex-col">
            <h3 className="text-xl font-bold mb-4 flex items-center text-cyan-400">
                <ShieldIcon className="w-6 h-6 mr-2" /> Confronto Direto
            </h3>
            <div className="space-y-3 text-gray-300 flex-grow">
                <p><strong className="font-semibold text-gray-100">Resumo (Últimos 5):</strong> {data.summary || 'N/A'}</p>
                <p><strong className="font-semibold text-gray-100">Última Partida:</strong> {data.lastMatch || 'N/A'}</p>
            </div>
        </div>
    );
};

const TeamNewsCard: React.FC<{ teamANews: string | null, teamBNews: string | null, teamAName: string, teamBName: string }> = ({ teamANews, teamBNews, teamAName, teamBName }) => (
    <div className="bg-gray-800/60 p-6 rounded-2xl border border-gray-700/50 backdrop-blur-sm h-full flex flex-col">
        <h3 className="text-xl font-bold mb-4 flex items-center text-cyan-400">
            <NewsIcon className="w-6 h-6 mr-2" /> Notícias e Destaques
        </h3>
        <div className="space-y-4 flex-grow">
            <div>
                <h4 className="font-semibold text-lg text-gray-200">{teamAName}</h4>
                <p className="text-gray-400 text-sm">{teamANews || 'Nenhuma notícia relevante encontrada.'}</p>
            </div>
             <div className="border-t border-gray-700 my-3"></div>
            <div>
                <h4 className="font-semibold text-lg text-gray-200">{teamBName}</h4>
                <p className="text-gray-400 text-sm">{teamBNews || 'Nenhuma notícia relevante encontrada.'}</p>
            </div>
        </div>
    </div>
);

const GroundingSourcesCard: React.FC<{ sources?: { uri: string; title: string }[] }> = ({ sources }) => {
    if (!sources || sources.length === 0) return null;

    return (
        <div className="bg-gray-800/60 p-6 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-4 flex items-center text-cyan-400">
                <SourceIcon className="w-6 h-6 mr-2" /> Fontes da Pesquisa
            </h3>
            <ul className="space-y-2 list-disc list-inside">
                {sources.map((source, index) => (
                    <li key={index} className="text-gray-400">
                        <a href={source.uri} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 hover:underline transition-colors">
                            {source.title || new URL(source.uri).hostname}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export const ComparisonView: React.FC<ComparisonViewProps> = ({ data, teamAName, teamBName }) => {
  return (
    <div className="mt-8 space-y-8 animate-fade-in">
        <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white flex items-center justify-center gap-4">
                <span>{teamAName}</span>
                <span className="text-gray-500 text-2xl">vs</span>
                <span>{teamBName}</span>
            </h2>
        </div>
        
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <StatCard teamName={teamAName} stats={data.teamA} tournamentContext={data.tournamentContext} />
        <StatCard teamName={teamBName} stats={data.teamB} tournamentContext={data.tournamentContext} />
      </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <HeadToHeadCard data={data.headToHead} />
          <RefereeCard data={data.refereeStats} />
          <TeamNewsCard teamANews={data.teamA?.teamNews ?? null} teamBNews={data.teamB?.teamNews ?? null} teamAName={teamAName} teamBName={teamBName} />
       </div>

       {data.groundingSources && <GroundingSourcesCard sources={data.groundingSources} />}

    </div>
  );
};