
// Configuração de ambiente para integração com backend
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  ENDPOINTS: {
    VOUCHERS: '/vouchers',
    RANKINGS: '/rankings',
    GAMES: '/games'
  }
};
