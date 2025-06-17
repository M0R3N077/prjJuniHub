
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Brain, RotateCcw } from "lucide-react";
import BurgerMenu from "@/components/BurgerMenu";

interface MemoryCard {
  id: number;
  emoji: string;
  name: string;
  flipped: boolean;
  matched: boolean;
}

const MemoryGame = () => {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const navigate = useNavigate();

  const emojis = [
    { emoji: "🌽", name: "milho" },
    { emoji: "🔥", name: "fogueira" },
    { emoji: "🎶", name: "sanfona" },
    { emoji: "🚩", name: "bandeirinha" },
    { emoji: "👗", name: "vestido" },
    { emoji: "🍬", name: "doce" },
    { emoji: "🥜", name: "paçoca" },
    { emoji: "🍵", name: "quentão" }
  ];

  const initializeGame = () => {
    const gameCards: MemoryCard[] = [];
    emojis.forEach((item, index) => {
      // Add two cards for each emoji (pairs)
      gameCards.push({
        id: index * 2,
        emoji: item.emoji,
        name: item.name,
        flipped: false,
        matched: false
      });
      gameCards.push({
        id: index * 2 + 1,
        emoji: item.emoji,
        name: item.name,
        flipped: false,
        matched: false
      });
    });
    
    // Embaralha os cards
    const shuffled = gameCards.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedCards([]);
    setScore(0);
    setMoves(0);
    setGameComplete(false);
    setGameStarted(true);
  };

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2) return;
    if (flippedCards.includes(cardId)) return;
    if (cards.find(c => c.id === cardId)?.matched) return;

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    // Update card state to show as flipped (virado)
    setCards(prev => prev.map(card => 
      card.id === cardId ? { ...card, flipped: true } : card
    ));

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      
      const [firstId, secondId] = newFlippedCards;
      const firstCard = cards.find(c => c.id === firstId);
      const secondCard = cards.find(c => c.id === secondId);

      if (firstCard?.emoji === secondCard?.emoji) {
        // Match found!
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            newFlippedCards.includes(card.id) 
              ? { ...card, matched: true }
              : card
          ));
          setScore(score + 20);
          setFlippedCards([]);
          
          // Check if game is complete
          const allMatched = cards.every(card => 
            newFlippedCards.includes(card.id) || card.matched
          );
          
          if (allMatched) {
            setTimeout(() => {
              setGameComplete(true);
              const currentGames = parseInt(localStorage.getItem("gamesPlayed") || "0");
              localStorage.setItem("gamesPlayed", (currentGames + 1).toString());
            }, 500);
          }
        }, 1000);
      } else {
        // No match - flip back
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            newFlippedCards.includes(card.id) 
              ? { ...card, flipped: false }
              : card
          ));
          setFlippedCards([]);
        }, 1500);
      }
    }
  };

  const handleFinish = () => {
    const finalScore = Math.max(200 - (moves * 5), 50); // Bonus for fewer moves
    navigate(`/voucher-form?game=memory-game&score=${finalScore}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100">
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
            <Brain className="w-8 h-8 text-junina-purple" />
            <span className="text-2xl font-bold text-junina-orange"> Jogo da Memória</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-junina-purple mb-4">
            🧠 Jogo da Memória Junina
          </h1>
          <p className="text-xl text-gray-700">
            Encontre os pares de itens juninos!
          </p>
        </div>

        {!gameStarted ? (
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-center text-2xl text-junina-orange">
                🎮 Como Jogar
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4 p-8">
              <p className="text-gray-700 text-lg">
                Clique nas cartas para virá-las e encontre os pares!
              </p>
              <p className="text-gray-700">
                Você ganha pontos por cada par encontrado.
              </p>
              <p className="text-gray-700">
                Menos movimentos = mais pontos no final!
              </p>
              <Button onClick={initializeGame} className="bg-junina-purple hover:bg-purple-600 text-white">
                Começar Jogo
              </Button>
            </CardContent>
          </Card>
        ) : !gameComplete ? (
          <div>
            <Card className="shadow-xl mb-6">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div className="text-lg font-bold text-junina-orange">
                    Pontos: {score}
                  </div>
                  <div className="text-lg font-bold text-junina-purple">
                    Movimentos: {moves}
                  </div>
                  <div className="text-lg font-bold text-gray-600">
                    Pares: {cards.filter(c => c.matched).length / 2} / {emojis.length}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl">
              <CardContent className="p-6">
                <div className="grid grid-cols-4 gap-4">
                  {cards.map((card) => (
                    <div
                      key={card.id}
                      onClick={() => handleCardClick(card.id)}
                      className={`
                        aspect-square rounded-lg border-2 flex items-center justify-center cursor-pointer
                        transition-all duration-300 transform hover:scale-105
                        ${card.flipped || card.matched
                          ? 'bg-white border-junina-yellow' 
                          : 'bg-junina-blue border-blue-400 hover:bg-blue-400'
                        }
                        ${card.matched ? 'opacity-75 scale-95' : ''}
                      `}
                    >
                      {card.flipped || card.matched ? (
                        <span className="text-4xl">{card.emoji}</span>
                      ) : (
                        <span className="text-4xl text-white">❓</span>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-center text-2xl text-junina-orange">
                🎉 Parabéns! Jogo Concluído!
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-6">🏆</div>
              <p className="text-2xl font-bold text-junina-purple mb-2">
                Pontuação: {score}
              </p>
              <p className="text-lg text-gray-700 mb-2">
                Movimentos: {moves}
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Pontuação Final: {Math.max(200 - (moves * 5), 50)}
              </p>
              
              <div className="space-x-4">
                <Button onClick={handleFinish} className="bg-junina-green hover:bg-green-600 text-white">
                  Gerar Voucher
                </Button>
                <Button onClick={initializeGame} variant="outline">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Jogar Novamente
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default MemoryGame;
