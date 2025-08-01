import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { TeamSelector } from './components/TeamSelector';
import { ComparisonView } from './components/ComparisonView';
import { LoadingSpinner } from './components/LoadingSpinner';
import { Footer } from './components/Footer';
import { fetchComparison } from './services/geminiService';
import { ComparisonData, Team } from './types';
import { TEAMS } from './constants';
import { SoccerBallIcon } from './components/icons';

const App: React.FC = () => {
  const [teamA, setTeamA] = useState<string>('');
  const [teamB, setTeamB] = useState<string>('');
  const [comparisonData, setComparisonData] = useState<ComparisonData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleCompare = useCallback(async () => {
    if (!teamA || !teamB || teamA === teamB) {
      setError('Por favor, selecione dois times diferentes.');
      return;
    }
    setLoading(true);
    setError(null);
    setComparisonData(null);
    try {
      const data = await fetchComparison(teamA, teamB);
      if (data) {
        setComparisonData(data);
      } else {
        setError('Não foi possível obter os dados da comparação. Tente novamente.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro desconhecido.');
    } finally {
      setLoading(false);
    }
  }, [teamA, teamB]);
  
  const canCompare = teamA && teamB && teamA !== teamB;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <section className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-gray-700/50">
          <h2 className="text-2xl font-bold text-center text-cyan-400 mb-6">Selecione os Times para Comparar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <TeamSelector 
              teams={TEAMS} 
              selectedTeam={teamA} 
              onSelectTeam={setTeamA} 
              label="Time A" 
              otherSelectedTeam={teamB}
            />
            <TeamSelector 
              teams={TEAMS} 
              selectedTeam={teamB} 
              onSelectTeam={setTeamB} 
              label="Time B" 
              otherSelectedTeam={teamA}
            />
          </div>
          <div className="text-center">
            <button
              onClick={handleCompare}
              disabled={!canCompare || loading}
              className={`px-8 py-3 font-semibold rounded-lg transition-all duration-300 ease-in-out text-white
                ${canCompare && !loading ? 'bg-cyan-500 hover:bg-cyan-600 shadow-lg shadow-cyan-500/30' : 'bg-gray-600 cursor-not-allowed'}
                ${loading ? 'animate-pulse' : ''}
              `}
            >
              {loading ? 'Analisando...' : 'Comparar Times'}
            </button>
          </div>
        </section>

        {loading && <LoadingSpinner />}
        
        {error && (
            <div className="mt-8 text-center bg-red-900/50 border-2 border-red-700 text-red-200 p-6 rounded-2xl shadow-lg animate-fade-in">
                <h3 className="text-2xl font-bold mb-3 text-red-300">Ocorreu um Erro</h3>
                <p className="mb-6">{error}</p>
                <button
                    onClick={handleCompare}
                    disabled={!canCompare || loading}
                    className={`px-6 py-2 font-semibold rounded-lg transition-colors duration-200 text-white
                    ${!canCompare || loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-cyan-600 hover:bg-cyan-700'}
                    `}
                >
                    {loading ? 'Analisando...' : 'Tentar Novamente'}
                </button>
            </div>
        )}

        {comparisonData ? (
          <ComparisonView data={comparisonData} teamAName={teamA as Team} teamBName={teamB as Team}/>
        ) : (
          !loading && !error && (
            <div className="mt-12 text-center text-gray-500">
               <div className="flex justify-center mb-4">
                  <SoccerBallIcon className="w-20 h-20 text-gray-700 animate-spin-slow" />
               </div>
               <h3 className="text-2xl font-semibold text-gray-400">Pronto para a Análise</h3>
               <p className="mt-2">Selecione dois times e clique em "Comparar" para ver as estatísticas.</p>
            </div>
          )
        )}
      </main>
      <Footer sources={comparisonData?.dataSources?.names} />
    </div>
  );
};

export default App;