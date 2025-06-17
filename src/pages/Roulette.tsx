
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, RotateCcw } from "lucide-react";
import BurgerMenu from "@/components/BurgerMenu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Roulette = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [showPrizeModal, setShowPrizeModal] = useState(false);
  const [wonPrize, setWonPrize] = useState<string | null>(null);

  const prizes = [
    { id: 1, name: "Vale Jantar para casal", color: "#FF6B8A", icon: "🍽️", textColor: "#fff" },
    { id: 2, name: "Vale HotDog", color: "#F4D03F", icon: "🌭", textColor: "#333" },
    { id: 3, name: "Vale Pipoca", color: "#E67E22", icon: "🍿", textColor: "#fff" },
    { id: 4, name: "Ingressos Cinema", color: "#9B59B6", icon: "🎬", textColor: "#fff" },
    { id: 5, name: "Vale Docinhos", color: "#E74C3C", icon: "🍭", textColor: "#fff" },
    { id: 6, name: "1 Bebida", color: "#27AE60", icon: "🥤", textColor: "#fff" },
    { id: 7, name: "Tente Novamente", color: "#95A5A6", icon: "😔", textColor: "#fff" },
    { id: 8, name: "Sem Prêmio", color: "#34495E", icon: "❌", textColor: "#fff" },
  ];

  useEffect(() => {
    const savedGames = localStorage.getItem("gamesPlayed");
    if (savedGames) {
      setGamesPlayed(parseInt(savedGames));
    }
  }, []);

  const canSpin = gamesPlayed >= 3;

  const spinRoulette = () => {
    if (!canSpin || isSpinning) return;

    setIsSpinning(true);
    const spins = 5 + Math.random() * 5; // 5-10 voltas
    const finalRotation = rotation + spins * 360 + Math.random() * 360;
    setRotation(finalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      
      // Calculate which section won
      const normalizedRotation = (360 - (finalRotation % 360)) % 360;
      const sectionAngle = 360 / prizes.length;
      const wonIndex = Math.floor(normalizedRotation / sectionAngle);
      const prize = prizes[wonIndex];
      
      if (prize.name !== "Tente Novamente" && prize.name !== "Sem Prêmio") {
        setWonPrize(prize.name);
      } else {
        setWonPrize(null);
      }
      
      setShowPrizeModal(true);
      
      // Reset games counter
      setGamesPlayed(0);
      localStorage.setItem("gamesPlayed", "0");
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-junina-cream to-yellow-50">
      <header className="bg-white/80 backdrop-blur-sm shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <BurgerMenu />
            <Link to="/games" className="flex items-center space-x-2 text-junina-orange hover:text-junina-red transition-colors">
              <ArrowLeft className="w-6 h-6" />
              <span className="font-bold">Voltar</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-2">
            <RotateCcw className="w-8 h-8 text-junina-yellow" />
            <span className="text-2xl font-bold text-junina-orange">Roleta da Sorte</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-junina-yellow mb-4">
            Roda da Sorte JuniHub
          </h1>
          <p className="text-xl text-gray-700 mb-4">
            Gire a roleta e ganhe prêmios incríveis!
          </p>
          <div className="flex justify-center items-center space-x-4">
            <p className="text-lg text-junina-orange font-semibold">
              Jogos completados: {gamesPlayed}/3
            </p>
            <div className="flex space-x-1">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-4 h-4 rounded-full ${
                    i <= gamesPlayed ? "bg-junina-green" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <Card className="shadow-2xl border-4 border-junina-yellow">
            <CardContent className="p-8">
              <div className="relative w-96 h-96 mx-auto">
                {/* Roulette wheel */}
                <div
                  className="w-full h-full rounded-full border-8 border-junina-yellow relative overflow-hidden transition-transform ease-out shadow-2xl"
                  style={{ 
                    transform: `rotate(${rotation}deg)`,
                    transitionDuration: isSpinning ? '4s' : '0.3s'
                  }}
                >
                  {prizes.map((prize, index) => {
                    const angle = (360 / prizes.length) * index;
                    const nextAngle = (360 / prizes.length) * (index + 1);
                    return (
                      <div
                        key={prize.id}
                        className="absolute w-full h-full"
                        style={{
                          clipPath: `polygon(50% 50%, ${50 + 48 * Math.cos(angle * Math.PI / 180)}% ${50 + 48 * Math.sin(angle * Math.PI / 180)}%, ${50 + 48 * Math.cos(nextAngle * Math.PI / 180)}% ${50 + 48 * Math.sin(nextAngle * Math.PI / 180)}%)`
                        }}
                      >
                        <div
                          className="w-full h-full flex flex-col items-center justify-center text-xs font-bold p-2"
                          style={{ 
                            backgroundColor: prize.color,
                            color: prize.textColor,
                            transform: `rotate(${angle + 22.5}deg)`
                          }}
                        >
                          <div className="text-2xl mb-1 transform -rotate-90">{prize.icon}</div>
                          <div className="text-center leading-tight transform -rotate-90 max-w-12 text-[10px]">
                            {prize.name}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Center circle */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-junina-orange to-junina-red rounded-full shadow-lg flex items-center justify-center border-4 border-white">
                  <div className="text-2xl">🎯</div>
                </div>
                
                {/* Pointer */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
                  <div className="w-0 h-0 border-l-6 border-r-6 border-b-12 border-l-transparent border-r-transparent border-b-junina-red shadow-lg"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mb-8">
          <Button
            onClick={spinRoulette}
            disabled={!canSpin || isSpinning}
            className={`px-12 py-6 text-2xl font-bold rounded-full transition-all duration-300 ${
              canSpin && !isSpinning
                ? "bg-gradient-to-r from-junina-yellow to-junina-orange hover:from-junina-orange hover:to-junina-red text-white shadow-2xl hover:shadow-3xl transform hover:scale-110 animate-pulse"
                : "bg-gray-400 text-gray-600 cursor-not-allowed"
            }`}
          >
            {isSpinning ? "🎲 Girando..." : canSpin ? "🎯 GIRAR ROLETA!" : "🎮 Complete 3 jogos para girar"}
          </Button>
        </div>

        {/* Prêmios disponíveis */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {prizes.filter(p => p.name !== "Tente Novamente" && p.name !== "Sem Prêmio").map((prize) => (
            <div key={prize.id} className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg border-2 border-junina-yellow">
              <div className="text-3xl mb-2">{prize.icon}</div>
              <div className="text-sm font-semibold text-gray-700">{prize.name}</div>
            </div>
          ))}
        </div>

        {!canSpin && (
          <div className="text-center bg-gradient-to-r from-junina-pink to-junina-orange text-white rounded-3xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold mb-4">
              🎮 Como ganhar giros na roleta?
            </h3>
            <p className="text-lg mb-6">
              Complete 3 jogos para ganhar um giro na roleta e concorrer a prêmios incríveis!
            </p>
            <Link to="/games">
              <Button className="bg-white text-junina-orange hover:bg-gray-100 text-xl px-8 py-4 font-bold">
                🎯 Ir para os Jogos
              </Button>
            </Link>
          </div>
        )}

        {/* Prize Modal */}
        <Dialog open={showPrizeModal} onOpenChange={setShowPrizeModal}>
          <DialogContent className="bg-gradient-to-br from-white to-yellow-50 border-junina-yellow border-4 max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-3xl font-bold text-junina-orange">
                {wonPrize ? "🎉 PARABÉNS!" : "😔 Que pena!"}
              </DialogTitle>
            </DialogHeader>
            <div className="text-center p-6">
              {wonPrize ? (
                <div>
                  <div className="text-8xl mb-6 animate-bounce">🎁</div>
                  <p className="text-xl text-gray-700 mb-4">Você ganhou:</p>
                  <div className="bg-gradient-to-r from-junina-yellow to-junina-orange text-white p-4 rounded-xl mb-6">
                    <p className="text-2xl font-bold">{wonPrize}</p>
                  </div>
                  <p className="text-sm text-gray-600">
                    🎫 Apresente este prêmio nas barraquinhas da festa!
                  </p>
                </div>
              ) : (
                <div>
                  <div className="text-8xl mb-6">😔</div>
                  <p className="text-xl text-gray-700 mb-4">
                    Você não ganhou nenhum prêmio desta vez.
                  </p>
                  <p className="text-base text-gray-600 mb-4">
                    Não desanime! Continue jogando para tentar novamente!
                  </p>
                </div>
              )}
              <Button
                onClick={() => setShowPrizeModal(false)}
                className="mt-4 bg-junina-yellow hover:bg-junina-orange text-white px-8 py-3 text-lg font-bold"
              >
                {wonPrize ? "🎉 Fechar" : "🎮 Continuar Jogando"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Roulette;
