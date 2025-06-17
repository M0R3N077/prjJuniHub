
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Gamepad2, 
  Target, 
  Brain, 
  Eye, 
  Flame, 
  UtensilsCrossed,
  Grid3X3,
  Trophy,
  Candy
} from "lucide-react";

const Games = () => {
  const games = [
    {
      id: "boca-do-palhaco",
      title: "Boca do Palhaço",
      description: "Controle ângulo e força para acertar a boca do palhaço!",
      icon: "/icons/clown.png",
      color: "bg-junina-red",
      difficulty: "Médio"
    },
    {
      id: "quiz",
      title: "Quiz Junino",
      description: "Teste seus conhecimentos sobre cultura nordestina!",
            icon: "/icons/quiz.png",
      color: "bg-junina-blue",
      difficulty: "Médio"
    },
    {
      id: "flag-sequence",
      title: "Sequência da Bandeirinha",
      description: "Memorize e repita a sequência de bandeirinhas coloridas!",
          icon: "/icons/flag.png",
      color: "bg-junina-green",
      difficulty: "Difícil"
    },
    {
      id: "dish-quiz",
      title: "Descubra o Prato",
      description: "Adivinhe o prato típico pelas dicas!",
            icon: "/icons/eat.png",
      color: "bg-junina-yellow",
      difficulty: "Fácil"
    },
    {
      id: "memory",
      title: "Jogo da Memória",
      description: "Encontre os pares de itens juninos!",
          icon: "/icons/memory.png",
      color: "bg-junina-purple ",
      difficulty: "Médio"
    },
    {
      id: "candy-crush",
      title: "Doces Juninos",
      description: "Versão junina do clássico jogo de combinação!",
           icon: "/icons/pacoca.png",
      color: "bg-junina-green",
      difficulty: "Médio"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-[#FBB419]">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-junina-orange hover:text-junina-red transition-colors">
            <ArrowLeft className="w-6 h-6" />
            <span className="font-bold">Voltar</span> 
          </Link>
          
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-junina-orange">Juni</span>
            <span className="text-2xl font-bold text-[#FBB419]">Hub</span>
          </div>

          <Link to="/ranking">
            <Button variant="outline" className="hidden md:flex items-center space-x-2 bg-[#FBB419] text-white">
              <Trophy className="w-4 h-4" />
              <span>Ranking</span>
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Título da seção */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-[#FBB419] mb-4">
             Jogos Juninos
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Divirta-se com nossos jogos melhorados e ganhe vouchers promocionais incríveis!
          </p>
        </div>

        {/* Grid de jogos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {games.map((game) => (
            <Card key={game.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer bg-white border-black ">
              <Link to={`/games/${game.id}`}>
                <CardHeader className="text-center ">
                  <div className={`w-16 h-16 ${game.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white group-hover:scale-110 transition-transform`}>
                    <img src={game.icon} />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-800">{game.title}</CardTitle>
                  <div className="flex justify-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      game.difficulty === 'Fácil' ? 'bg-green-100 text-green-800' :
                      game.difficulty === 'Médio' ? 'bg-yellow-100 text-yellow-800' :
                      game.difficulty === 'Difícil' ? 'bg-red-100 text-red-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {game.difficulty}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600">
                    {game.description}
                  </CardDescription>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        {/* Seção de vouchers */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 text-center shadow-lg">
          <h2 className="text-3xl font-bold text-junina-orange mb-4">Como Ganhar Vouchers?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-junina-blue rounded-full flex items-center justify-center text-white font-bold text-xl mb-3">1</div>
              <h3 className="font-bold text-gray-800 mb-2">Jogue</h3>
              <p className="text-gray-600">Escolha um jogo e complete o desafio</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-junina-green rounded-full flex items-center justify-center text-white font-bold text-xl mb-3">2</div>
              <h3 className="font-bold text-gray-800 mb-2">Cadastre-se</h3>
              <p className="text-gray-600">Informe seus dados para gerar o voucher</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-junina-yellow rounded-full flex items-center justify-center text-white font-bold text-xl mb-3">3</div>
              <h3 className="font-bold text-gray-800 mb-2">Aproveite</h3>
              <p className="text-gray-600">Use seu voucher nas barracas da festa!</p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-3xl p-8 text-center">
          <h2 className="text-3xl font-bold text-junina-orange mb-6"> Ranking dos Jogos</h2>
          <p className="text-gray-700 mb-4">
            Mostre que você é o melhor nos jogos juninos e conquiste o topo do ranking!
          </p>
          <Link to="/ranking">
            <Button className="bg-[#E2422C] hover:bg-pink-600 text-white">
              Ver Ranking <Trophy className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Games;
