import { GoogleGenAI } from "@google/genai";
import { ComparisonData } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const fetchComparison = async (teamA: string, teamB: string): Promise<ComparisonData | null> => {
    try {
        const prompt = `
        Com base em dados atualizados de fontes confiáveis da web (como SofaScore, Globo Esporte, etc.), analise e compare os times de futebol ${teamA} e ${teamB}.
        O foco da análise deve ser o contexto da próxima partida entre eles.

        Siga estas etapas:
        1. Identifique a próxima partida oficial entre ${teamA} e ${teamB} e o nome do campeonato em que ela ocorrerá.
        2. Para cada time, colete as estatísticas dos seus últimos 5 jogos JOGADOS NESSE MESMO CAMPEONATO. Por exemplo, se a próxima partida é no Campeonato Brasileiro, as estatísticas devem ser dos últimos 5 jogos de cada time no Campeonato Brasileiro.
        3. Colete os dados do árbitro designado para a próxima partida.
        4. Forneça uma resposta ESTRITAMENTE em formato JSON. A resposta deve ser um objeto JSON válido e nada mais. Não adicione nenhum texto explicativo ou markdown.

        A estrutura do JSON deve ser a seguinte:
        {
          "tournamentContext": "<string>",
          "teamA": {
            "last5Games": { "wins": <integer>, "draws": <integer>, "losses": <integer> },
            "goalsScored": <integer>,
            "goalsConceded": <integer>,
            "bttsProbability": "<string>",
            "avgCorners": <number>,
            "avgYellowCards": <number>,
            "avgRedCards": <number>,
            "keyPlayerShots": { "name": "<string>", "value": <number> },
            "keyPlayerChances": { "name": "<string>", "value": <number> },
            "avgPossession": "<string>",
            "avgShots": <number>,
            "teamNews": "<string>"
          },
          "teamB": {
            "last5Games": { "wins": <integer>, "draws": <integer>, "losses": <integer> },
            "goalsScored": <integer>,
            "goalsConceded": <integer>,
            "bttsProbability": "<string>",
            "avgCorners": <number>,
            "avgYellowCards": <number>,
            "avgRedCards": <number>,
            "keyPlayerShots": { "name": "<string>", "value": <number> },
            "keyPlayerChances": { "name": "<string>", "value": <number> },
            "avgPossession": "<string>",
            "avgShots": <number>,
            "teamNews": "<string>"
          },
          "headToHead": {
            "summary": "<string>",
            "lastMatch": "<string>"
          },
          "refereeStats": {
            "nextMatchDate": "<string>",
            "refereeName": "<string>",
            "avgYellowCards": <number>,
            "avgRedCards": <number>
          },
          "dataSources": {
            "names": ["<string>", "<string>", ...]
          }
        }

        Instruções adicionais:
        - O campo "tournamentContext" é obrigatório e deve conter o nome do campeonato. Se não encontrar a próxima partida, use "Contexto Geral".
        - Os dados de "teamA" devem ser sobre ${teamA} e "teamB" sobre ${teamB}, contextualizados pelo campeonato.
        - Para 'refereeStats', encontre a data da próxima partida oficial, o árbitro designado e a média de cartões amarelos e vermelhos dele nos últimos 5 jogos que apitou. Se a partida ou o árbitro não estiverem definidos, use "A definir". Se os dados de cartões não estiverem disponíveis, use null.
        - Para 'teamNews', se não houver notícias, use "Nenhuma notícia relevante encontrada.".
        - Se algum dado numérico ou de texto não estiver disponível, use o valor null para o campo correspondente.
        - 'bttsProbability' e 'avgPossession' devem ser strings com porcentagem, ex: "55%".
        - 'summary' em 'headToHead' deve resumir os últimos 5 confrontos diretos GERAIS, não apenas no campeonato específico. Ex: "2 vitórias para ${teamA}, 1 empate, 2 vitórias para ${teamB}".
        - 'lastMatch' em 'headToHead' deve ser o resultado do último jogo geral, ex: "${teamA} 2 - 1 ${teamB}".
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            tools: [{ googleSearch: {} }],
        }
      });
      
      let text = response.text;

      // The response can sometimes be wrapped in ```json ... ```, so we need to extract it.
      const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/);
      if (jsonMatch && jsonMatch[1]) {
        text = jsonMatch[1];
      }

      const parsedData: ComparisonData = JSON.parse(text);

      const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
      if (groundingMetadata?.groundingChunks) {
          parsedData.groundingSources = groundingMetadata.groundingChunks
            .map(chunk => chunk.web)
            .filter((web): web is { uri: string; title: string } => !!web?.uri);
      }
      
      return parsedData;

    } catch (error) {
        console.error("Error fetching comparison data from Gemini API:", error);
        if (error instanceof Error) {
            if (error.name === 'SyntaxError') {
              throw new Error('Falha ao processar a resposta da API. O formato JSON retornado é inválido.');
            }
           throw new Error(`Falha na comunicação com a API Gemini: ${error.message}`);
        }
        throw new Error("Ocorreu um erro desconhecido ao buscar os dados.");
    }
};