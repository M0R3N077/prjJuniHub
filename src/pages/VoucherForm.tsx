import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, User, Mail, CreditCard, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { voucherService, VoucherResponse } from "@/services/voucherService";
import { rankingService } from '@/services/rankingService';


const VoucherForm = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    cpf: "",
    email: ""
  });
  const [loading, setLoading] = useState(false);
  const [voucher, setVoucher] = useState<VoucherResponse | null>(null);

  const game = searchParams.get('game') || '';
  const score = searchParams.get('score') || '0';

  const gameNames: Record<string, string> = {
    'flying-items': 'Itens Voadores',
    'clown-mouth': 'Boca do Palhaço',
    'quiz': 'Quiz Junino',
    'flag-sequence': 'Sequência da Bandeirinha',
    'guess-item': 'Adivinha Junina',
    'build-fire': 'Monte sua Fogueira',
    'dish-quiz': 'Descubra o Prato',
    'spin-wheel': 'Roda da Sorte',
    'candy-crush': 'Doces Juninos',
    'pescaria': 'Pescaria'
  };

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const validateCPF = (cpf: string) => {
    const numbers = cpf.replace(/\D/g, '');
    if (numbers.length !== 11) return false;
    
    // Verificação básica de CPF
    if (/^(\d)\1{10}$/.test(numbers)) return false;
    
    return true;
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === 'cpf') {
      value = formatCPF(value);
    }
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.cpf.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }

    if (!validateCPF(formData.cpf)) {
      toast({
        title: "CPF Inválido",
        description: "Por favor, insira um CPF válido.",
        variant: "destructive"
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Email Inválido",
        description: "Por favor, insira um email válido.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
  const voucherData = {
    name: formData.name,
    cpf: formData.cpf.replace(/\D/g, ''),
    email: formData.email,
    game: game,
    score: parseInt(score)
  };

  const response = await voucherService.generateVoucher(voucherData);
  setVoucher(response);

  // ✅ Envia score pro ranking também
  await rankingService.submitScore({
    playerName: voucherData.name,
    playerEmail: voucherData.email,
    playerCpf: formData.cpf,
    game: voucherData.game,
    score: voucherData.score,
  });

  toast({
    title: "Voucher Gerado!",
    description: "Seu voucher foi criado e enviado para seu email!",
  });
} catch (error: any) {
  console.error('Erro ao gerar voucher ou enviar ranking:', error);
  toast({
    title: "Erro",
    description: error.message || "Erro ao gerar voucher. Tente novamente.",
    variant: "destructive"
  });
}
  };

  const downloadVoucher = () => {
    if (!voucher) return;
    
    const element = document.createElement('a');
    const voucherText = `
🎉 VOUCHER JUNIHUB 🎉

Código: ${voucher.voucherCode}
Participante: ${voucher.participantName}
Jogo: ${gameNames[voucher.game] || voucher.game}
Pontuação: ${voucher.score}
Desconto: ${voucher. discountPercentage}%
Válido até: ${new Date(voucher.validUntil).toLocaleDateString('pt-BR')}

Gerado em: ${new Date(voucher.createdAt).toLocaleDateString('pt-BR')}
    `;
    
    const file = new Blob([voucherText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `voucher-${voucher.voucherCode}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (voucher) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-junina-cream to-yellow-50">
        <header className="bg-white/80 backdrop-blur-sm shadow-lg">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link to="/games" className="flex items-center space-x-2 text-junina-orange hover:text-junina-red transition-colors">
              <ArrowLeft className="w-6 h-6" />
              <span className="font-bold">Voltar aos Jogos</span>
            </Link>
            
            <div className="text-center">
              <h1 className="text-2xl font-bold text-junina-yellow">Voucher Gerado!</h1>
            </div>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-8">
          <Card className="bg-gradient-to-br from-junina-yellow to-junina-orange text-white shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold">🎉 PARABÉNS! 🎉</CardTitle>
              <p className="text-lg opacity-90">Seu voucher foi gerado e enviado por email!</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-white/20 rounded-lg p-6 space-y-4">
                <div className="text-center">
                  <p className="text-4xl font-bold tracking-wider">{voucher.voucherCode}</p>
                  <p className="text-sm opacity-75">Código do Voucher</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="opacity-75">Participante:</p>
                    <p className="font-bold">{voucher.participantName}</p>
                  </div>
                  <div>
                    <p className="opacity-75">Jogo:</p>
                    <p className="font-bold">{gameNames[voucher.game] || voucher.game}</p>
                  </div>
                  <div>
                    <p className="opacity-75">Pontuação:</p>
                    <p className="font-bold">{voucher.score} pontos</p>
                  </div>
                  <div>
                    <p className="opacity-75">Desconto:</p>
                    <p className="font-bold text-2xl">{voucher. discountPercentage}%</p>
                  </div>
                </div>
                
                <div className="text-center pt-4 border-t border-white/30">
                  <p className="text-sm opacity-75">
                    Válido até: {new Date(voucher.validUntil).toLocaleDateString('pt-BR')}
                  </p>
                  <p className="text-xs opacity-60 mt-1">
                    Voucher enviado para: {voucher.participantEmail}
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col space-y-3">
                <Button 
                  onClick={downloadVoucher}
                  className="bg-white text-junina-orange hover:bg-gray-100"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Baixar Voucher
                </Button>
                
                <Link to="/games">
                  <Button variant="outline" className="w-full border-white text-white hover:bg-white hover:text-junina-orange">
                    Jogar Novamente
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-8 bg-white/80 rounded-lg p-6 text-center">
            <h3 className="text-xl font-bold text-junina-orange mb-4">Como usar seu voucher?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="w-12 h-12 bg-junina-blue rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-2">1</div>
                <p className="font-bold">Apresente o código</p>
                <p className="text-gray-600">Mostre o código na barraca</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-junina-green rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-2">2</div>
                <p className="font-bold">Escolha seu lanche</p>
                <p className="text-gray-600">Selecione o que deseja</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-junina-yellow rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-2">3</div>
                <p className="font-bold">Aproveite o desconto</p>
                <p className="text-gray-600">Economize até {voucher. discountPercentage}%!</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-junina-cream to-yellow-50">
      <header className="bg-white/80 backdrop-blur-sm shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/games" className="flex items-center space-x-2 text-junina-orange hover:text-junina-red transition-colors">
            <ArrowLeft className="w-6 h-6" />
            <span className="font-bold">Voltar aos Jogos</span>
          </Link>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold text-junina-yellow">Gerar Voucher</h1>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 ">
        <Card className="shadow-xl ">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-junina-orange">
              🎉 Você ganhou um voucher!
            </CardTitle>
            <div className="bg-junina-cream rounded-lg p-4 mt-4">
              <p className="text-lg font-semibold text-gray-800">
                Jogo: {gameNames[game] || game}
              </p>
              <p className="text-junina-orange font-bold">
                Pontuação: {score} pontos
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Nome Completo *</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Seu nome completo"
                  required
                  className="bg-white border-2 border-black rounded-3xl text-black placeholder:text-gray"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cpf" className="flex items-center space-x-2">
                  <CreditCard className="w-4 h-4" />
                  <span>CPF *</span>
                </Label>
                <Input
                  id="cpf"
                  type="text"
                  value={formData.cpf}
                  onChange={(e) => handleInputChange('cpf', e.target.value)}
                  placeholder="000.000.000-00"
                  maxLength={14}
                  required
                  className="bg-white border-2 border-black rounded-3xl text-black placeholder:text-gray"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>Email *</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="seu@email.com"
                  required
                  className="bg-white border-2 border-black rounded-3xl text-black placeholder:text-gray"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">📋 Informações Importantes:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Apenas um voucher por CPF por dia</li>
                  <li>• Voucher válido por 24 horas</li>
                  <li>• O voucher será enviado para seu email</li>
                  <li>• Não é possível alterar os dados após gerar o voucher</li>
                  <li>• Guarde bem o código do seu voucher</li>
                </ul>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-junina-green hover:bg-green-600 text-white py-6 text-lg"
                disabled={loading}
              >
                {loading ? "Gerando e Enviando Voucher..." : "Gerar Meu Voucher"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default VoucherForm;
