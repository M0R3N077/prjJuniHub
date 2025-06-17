
import { apiService } from './api';
import { API_CONFIG } from '@/config/env';

export interface RankingEntry {
  id: string;
  playerName: string;
  playerEmail: string;
  game: string;
  score: number;
  achievedAt: string;
  position?: number;
}

export interface GameRanking {
  game: string;
  rankings: RankingEntry[];
}

class RankingService {
  async getGeneralRanking(): Promise<RankingEntry[]> {
    try {
      const response = await apiService.get<RankingEntry[]>(
        `${API_CONFIG.ENDPOINTS.RANKINGS}/general`
      );
      return response;
    } catch (error) {
      console.error('Erro ao buscar ranking geral:', error);
      throw new Error('Erro ao carregar ranking geral.');
    }
  }

  async getGameRanking(game: string): Promise<RankingEntry[]> {
    try {
      const response = await apiService.get<RankingEntry[]>(
        `${API_CONFIG.ENDPOINTS.RANKINGS}/game/${game}`
      );
      return response;
    } catch (error) {
      console.error(`Erro ao buscar ranking do jogo ${game}:`, error);
      throw new Error(`Erro ao carregar ranking do jogo ${game}.`);
    }
  }

  async getAllGameRankings(): Promise<GameRanking[]> {
    try {
      const response = await apiService.get<GameRanking[]>(
        `${API_CONFIG.ENDPOINTS.RANKINGS}/all-games`
      );
      return response;
    } catch (error) {
      console.error('Erro ao buscar rankings de todos os jogos:', error);
      throw new Error('Erro ao carregar rankings.');
    }
  }

  async submitScore(scoreData: {
    playerName: string;
    playerEmail: string;
    playerCpf: string;
    game: string;
    score: number;
  }): Promise<RankingEntry> {
    try {
      const response = await apiService.post<RankingEntry>(
        API_CONFIG.ENDPOINTS.RANKINGS,
        scoreData
      );
      return response;
    } catch (error) {
      console.error('Erro ao enviar pontuação:', error);
      throw new Error('Erro ao registrar pontuação.');
    }
  }
}

export const rankingService = new RankingService();
