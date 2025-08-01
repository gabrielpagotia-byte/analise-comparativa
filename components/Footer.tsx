
import React from 'react';

interface FooterProps {
    sources?: (string | null)[] | null;
}

export const Footer: React.FC<FooterProps> = ({ sources }) => {
    const validSources = sources?.filter(s => s) || [];

    return (
        <footer className="bg-gray-900 border-t border-gray-800 mt-12 py-6">
            <div className="container mx-auto text-center text-gray-500 text-sm">
                {validSources.length > 0 && (
                     <p className="mb-2">
                        Fontes dos dados: {validSources.join(', ')}
                     </p>
                )}
                <p>&copy; {new Date().getFullYear()} Análise Comparativa de Times. Desenvolvido com React e Gemini API.</p>
            </div>
        </footer>
    );
};
