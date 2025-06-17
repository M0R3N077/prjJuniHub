
import { apiService } from './api';
import { API_CONFIG } from '@/config/env';

export interface VoucherRequest {
  name: string;
  cpf: string;
  email: string;
  game: string;
  score: number;
}

export interface VoucherResponse {
  id: string;
  voucherCode: string;
  participantName: string;
    participantCpf: string;
  participantEmail: string;
  game: string;
  score: number;
  discountPercentage: number;
  createdAt: string;
  expiresAt: string;
  validUntil: string;
}


export interface VoucherValidationResponse {
  valid: boolean;
  message: string;
  voucher?: VoucherResponse;
}

class VoucherService {
  async generateVoucher(voucherData: VoucherRequest): Promise<VoucherResponse> {
    try {
      console.log('Enviando dados para o backend:', voucherData);
      
      const response = await apiService.post<VoucherResponse>(
        API_CONFIG.ENDPOINTS.VOUCHERS,
        voucherData
      );
      
      console.log('Voucher gerado com sucesso:', response);
      return response;
    } catch (error) {
      console.error('Erro ao gerar voucher:', error);
      throw new Error('Erro ao gerar voucher. Tente novamente.');
    }
  }

  async validateVoucher(code: string): Promise<VoucherValidationResponse> {
    try {
      const response = await apiService.get<VoucherValidationResponse>(
        `${API_CONFIG.ENDPOINTS.VOUCHERS}/validate/${code}`
      );
      return response;
    } catch (error) {
      console.error('Erro ao validar voucher:', error);
      throw new Error('Erro ao validar voucher.');
    }
  }

  async useVoucher(code: string): Promise<VoucherResponse> {
    try {
      const response = await apiService.put<VoucherResponse>(
        `${API_CONFIG.ENDPOINTS.VOUCHERS}/use/${code}`,
        {}
      );
      return response;
    } catch (error) {
      console.error('Erro ao usar voucher:', error);
      throw new Error('Erro ao usar voucher.');
    }
  }

  async getVouchersByEmail(email: string): Promise<VoucherResponse[]> {
    try {
      const response = await apiService.get<VoucherResponse[]>(
        `${API_CONFIG.ENDPOINTS.VOUCHERS}/email/${email}`
      );
      return response;
    } catch (error) {
      console.error('Erro ao buscar vouchers:', error);
      throw new Error('Erro ao buscar vouchers.');
    }
  }
}

export const voucherService = new VoucherService();
