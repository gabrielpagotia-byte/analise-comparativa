import { TEAMS } from './constants';

export type Team = typeof TEAMS[number];

export interface Last5Games {
  wins: number | null;
  draws: number | null;
  losses: number | null;
}

export interface KeyPlayer {
  name: string | null;
  value: number | string | null;
}

export interface TeamStats {
  last5Games: Last5Games | null;
  goalsScored: number | null;
  goalsConceded: number | null;
  bttsProbability: string | null;
  avgCorners: number | null;
  avgYellowCards: number | null;
  avgRedCards: number | null;
  keyPlayerShots: KeyPlayer | null;
  keyPlayerChances: KeyPlayer | null;
  avgPossession: string | null;
  avgShots: number | null;
  teamNews: string | null;
}

export interface HeadToHead {
  summary: string | null;
  lastMatch: string | null;
}

export interface RefereeStats {
  nextMatchDate: string | null;
  refereeName: string | null;
  avgYellowCards: number | null;
  avgRedCards: number | null;
}

export interface DataSources {
    names: string[] | null;
}

export interface ComparisonData {
  tournamentContext: string | null;
  teamA: TeamStats | null;
  teamB: TeamStats | null;
  headToHead: HeadToHead | null;
  refereeStats: RefereeStats | null;
  dataSources: DataSources | null;
  groundingSources?: { uri: string; title: string }[];
}