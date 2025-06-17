
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import { ArrowLeft, Trophy, Medal, Award, Star, Crown, Zap, Loader2, BarChart3, List } from "lucide-react";
import BurgerMenu from "@/components/BurgerMenu";
import { rankingService, RankingEntry } from "@/services/rankingService";
import { useToast } from "@/hooks/use-toast";

const Ranking = () => {
  const [selectedCategory, setSelectedCategory] = useState("geral");
  const [viewMode, setViewMode] = useState<"chart" | "table">("chart");
  const [rankingData, setRankingData] = useState<Record<string, RankingEntry[]>>({});
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const categories = [
    { id: "geral", name: "Geral", icon: <Trophy className="w-4 h-4" /> },
    { id: "quiz", name: "Quiz Junino", icon: <Award className="w-4 h-4" /> },
    { id: "flag-sequence", name: "Bandeirinhas", icon: <Medal className="w-4 h-4" /> },
    { id: "boca-do-palhaco", name: "Boca do Palhaço", icon: <Zap className="w-4 h-4" /> },
    { id: "dish-quiz", name: "Descubra o Prato", icon: <Medal className="w-4 h-4" /> },
    { id: "memory-game", name: "Jogo da Memória", icon: <Medal className="w-4 h-4" /> },
    { id: "candy-crush", name: "Doces Juninos", icon: <Medal className="w-4 h-4" /> },
  ];

  useEffect(() => {
    loadRankings();
  }, []);

  const loadRankings = async () => {
    setLoading(true);
    try {
      // Carregar ranking geral
      const generalRanking = await rankingService.getGeneralRanking();
      
      // Carregar rankings por jogo
      const gameRankings: Record<string, RankingEntry[]> = { 
        geral: Array.isArray(generalRanking) ? generalRanking : [] 
      };
      
      for (const category of categories) {
        if (category.id !== "geral") {
          try {
            const gameRanking = await rankingService.getGameRanking(category.id);
            gameRankings[category.id] = Array.isArray(gameRanking) ? gameRanking : [];
          } catch (error) {
            console.warn(`Erro ao carregar ranking do jogo ${category.id}:`, error);
            gameRankings[category.id] = [];
          }
        }
      }
      
      setRankingData(gameRankings);
    } catch (error) {
      console.error('Erro ao carregar rankings:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar rankings. Tente novamente.",
        variant: "destructive"
      });
      // Definir dados padrão em caso de erro
      setRankingData({ geral: [] });
    } finally {
      setLoading(false);
    }
  };

  const formatPlayerName = (entry: RankingEntry) => {
    // Se não tiver nome, usar parte do email
    if (!entry.playerName || entry.playerName.trim() === '') {
      const emailPart = entry.playerEmail.split('@')[0];
      return emailPart.charAt(0).toUpperCase() + emailPart.slice(1);
    }
    return entry.playerName;
  };

  const getPlayerAvatar = (index: number) => {
    const avatars = ["👩‍🌾", "👨‍🌾", "👩‍🦱", "👨‍🦲", "👵", "👴", "👩‍💼", "👨‍💼", "👩‍🎓", "👨‍🎓"];
    return avatars[index % avatars.length];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  // Garantir que currentRanking seja sempre um array
  const currentRanking = Array.isArray(rankingData[selectedCategory]) 
    ? rankingData[selectedCategory] 
    : [];

  const getRankIcon = (position: number) => {
    switch (position) {
      case 0: return <Crown className="w-6 h-6 text-yellow-500" />;
      case 1: return <Trophy className="w-5 h-5 text-gray-400" />;
      case 2: return <Medal className="w-5 h-5 text-amber-600" />;
      default: return <span className="text-lg font-bold">{position + 1}º</span>;
    }
  };

  const getAvatarColor = (position: number) => {
    const colors = [
      "bg-purple-500", "bg-red-500", "bg-yellow-500", 
      "bg-cyan-500", "bg-purple-600", "bg-emerald-500",
      "bg-pink-500", "bg-blue-500", "bg-orange-500"
    ];
    return colors[position % colors.length];
  };

  console.log('Current ranking data:', { selectedCategory, currentRanking, rankingData });

  return (
    <div className="min-h-screen bg-gradient-to-b from-junina-cream to-yellow-50">
      <header className="bg-white/80 backdrop-blur-sm shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <BurgerMenu />
            <Link to="/games" className="flex items-center space-x-2 text-junina-orange hover:text-junina-red transition-colors">
              <ArrowLeft className="w-6 h-6" />
              <span className="font-bold">Voltar aos Jogos</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-2">
            <Trophy className="w-8 h-8 text-junina-yellow" />
            <span className="text-2xl font-bold text-junina-orange">Ranking JuniHub</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-junina-yellow mb-4">
             Hall da Fama
          </h1>
          <p className="text-xl text-gray-700">
            Os melhores jogadores do JuniHub!
          </p>
        </div>

        {/* Categorias */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className={`flex items-center space-x-2 transition-all duration-300 ${
                selectedCategory === category.id 
                  ? "bg-[#FBB419] text-white shadow-lg scale-105" 
                  : "hover:bg-junina-yellow/20 hover:scale-105"
              }`}
            >
              {category.icon}
              <span>{category.name}</span>
            </Button>
          ))}
        </div>

        {/* Botões de Visualização */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-lg p-1 shadow-md border w-full flex justify-center">
            <Button
              onClick={() => setViewMode("chart")}
              variant={viewMode === "chart" ? "default" : "ghost"}
              className={`flex items-center w-full space-x-2 ${
                viewMode === "chart" 
                  ? "bg-junina-orange text-white" 
                  : "text-gray-600 hover:text-junina-orange"
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Gráfico</span>
            </Button>
            <Button
              onClick={() => setViewMode("table")}
              variant={viewMode === "table" ? "default" : "ghost"}
              className={`flex items-center w-full space-x-2 ${
                viewMode === "table" 
                  ? "bg-junina-orange text-white" 
                  : "text-gray-600 hover:text-junina-orange"
              }`}
            >
              <List className="w-4 h-4" />
              <span>Lista</span>
            </Button>
          </div>
        </div>

        {/* Ranking */}
        <Card className="shadow-2xl border-4 border-junina-yellow">
          <CardHeader className="bg-gradient-to-r from-junina-orange to-junina-red text-white">
            <CardTitle className="text-center text-3xl flex items-center justify-center space-x-2">
              <Trophy className="w-8 h-8" />
              <span>Ranking - {categories.find(c => c.id === selectedCategory)?.name}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 bg-[#ffd884]">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-junina-orange" />
                <span className="ml-2 text-lg">Carregando ranking...</span>
              </div>
            ) : currentRanking.length === 0 ? (
              <div className="text-center py-12">
                <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-600 mb-2">Nenhum resultado ainda</h3>
                <p className="text-gray-500">Seja o primeiro a jogar e aparecer no ranking!</p>
              </div>
            ) : viewMode === "chart" ? (
              // Visualização em Gráfico de Colunas (Top 5)
              <div className="space-y-6">
                <div className="flex items-end justify-center gap-6 max-w-full overflow-hidden p-4">
                  {currentRanking.slice(0, 5).map((entry, index) => {
                    const maxScore = Math.max(...currentRanking.slice(0, 5).map(e => e.score));
                    const height = Math.max((entry.score / maxScore) * 180, 60);
                    
                    return (
                      <div key={entry.id} className="flex flex-col items-center min-w-0 flex-1 max-w-24">
                        {/* Posição e medalha no topo */}
                        <div className="mb-2">
                          {index === 0 && <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center mb-1 shadow-lg">🏆</div>}
                          {index === 1 && <div className="w-7 h-7 bg-gray-400 rounded-full flex items-center justify-center mb-1 shadow-lg text-xs">🥈</div>}
                          {index === 2 && <div className="w-7 h-7 bg-amber-600 rounded-full flex items-center justify-center mb-1 shadow-lg text-xs">🥉</div>}
                          {index > 2 && <div className="text-lg font-bold text-gray-600 mb-1">{index + 1}º</div>}
                        </div>
                        
                        {/* Coluna do gráfico */}
                        <div 
                          className={`w-16 flex flex-col justify-end items-center text-white font-bold text-lg rounded-t-2xl transition-all duration-700 shadow-lg transform hover:scale-105 ${
                            index === 0 ? 'bg-gradient-to-t from-yellow-500 to-yellow-400' : 
                            index === 1 ? 'bg-gradient-to-t from-gray-500 to-gray-400' : 
                            index === 2 ? 'bg-gradient-to-t from-amber-600 to-amber-500' :
                            'bg-gradient-to-t from-blue-500 to-blue-400'
                          }`}
                          style={{ height: `${height}px` }}
                        >
                          <div className="mb-3 px-2 text-center">
                            <div className={`w-10 h-10 ${getAvatarColor(index)} rounded-full flex items-center justify-center text-white text-lg mb-2 border-2 border-white shadow-lg`}>
                              {getPlayerAvatar(index)}
                            </div>
                            <div className="text-xs font-bold">{entry.score}</div>
                          </div>
                        </div>
                        
                        {/* Nome do usuário embaixo */}
                        <div className="mt-3 text-center">
                          <div className="text-sm font-semibold text-gray-800 truncate max-w-20">
                            @{formatPlayerName(entry).toLowerCase()}
                          </div>
                          <div className="text-xs text-gray-600 mt-1">{entry.score} XP</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              // Visualização em Tabela
              <div className="bg-yellow-50 rounded-lg overflow-hidden">
                <Table>
                  <TableHeader className="bg-yellow-500">
                    <TableRow>
                      <TableHead className="w-16 text-center font-bold">RANK</TableHead>
                      <TableHead className="w-16 text-center font-bold">FOTO</TableHead>
                      <TableHead className="font-bold">USER</TableHead>
                      <TableHead className="text-right font-bold">XP</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentRanking.map((entry, index) => (
                      <TableRow key={entry.id} className="hover:bg-yellow-100">
                        <TableCell className="text-center">
                          <div className="flex justify-center">
                            {getRankIcon(index)}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className={`w-10 h-10 ${getAvatarColor(index)} rounded-full flex items-center justify-center text-white mx-auto`}>
                            {getPlayerAvatar(index)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">
                            @{formatPlayerName(entry).toLowerCase()}
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-bold text-lg">
                          {entry.score}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Prêmios */}
        <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-3xl p-8 text-center border-4 border-junina-yellow">
          <h2 className="text-3xl font-bold text-junina-orange mb-6">🎁 Prêmios Especiais</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 p-6 rounded-xl text-white shadow-xl border-4 border-yellow-300">
              <Crown className="w-16 h-16 mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">🥇 1º Lugar</h3>
              <p>Voucher premium + Brinde especial</p>
            </div>
            <div className="bg-gradient-to-br from-gray-300 to-gray-500 p-6 rounded-xl text-white shadow-xl border-4 border-gray-200">
              <Trophy className="w-16 h-16 mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">🥈 2º Lugar</h3>
              <p>Voucher duplo + Desconto 20%</p>
            </div>
            <div className="bg-gradient-to-br from-amber-500 to-amber-700 p-6 rounded-xl text-white shadow-xl border-4 border-amber-300">
              <Medal className="w-16 h-16 mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">🥉 3º Lugar</h3>
              <p>Voucher especial + Desconto 10%</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Ranking;
