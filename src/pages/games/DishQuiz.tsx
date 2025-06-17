
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, UtensilsCrossed, CheckCircle2, XCircle } from "lucide-react";
import BurgerMenu from "@/components/BurgerMenu";

interface Dish {
  id: string;
  name: string;
  emoji: string;
  hints: string[];
  correctAnswer: string;
}

const dishes: Dish[] = [
  {
    id: "pamonha",
    name: "Pamonha",
    emoji: "🫔",
    hints: [
      "Feita de milho verde ralado",
      "Envolvida em palha de milho",
      "Pode ser doce ou salgada"
    ],
    correctAnswer: "pamonha"
  },
  {
    id: "canjica",
    name: "Canjica",
    emoji: "🥛",
    hints: [
      "Sobremesa cremosa e branca",
      "Feita com milho branco",
      "Temperada com canela e coco"
    ],
    correctAnswer: "canjica"
  },
  {
    id: "quentao",
    name: "Quentão",
    emoji: "🍵",
    hints: [
      "Bebida quente muito popular",
      "Feita com gengibre e canela",
      "Pode levar cachaça ou vinho"
    ],
    correctAnswer: "quentão"
  },
  {
    id: "cocada",
    name: "Cocada",
    emoji: "🥥",
    hints: [
      "Doce feito com coco ralado",
      "Pode ser branca ou queimada",
      "Muito doce e cremosa"
    ],
    correctAnswer: "cocada"
  },
  {
    id: "pacoca",
    name: "Paçoca",
    emoji: "🥜",
    hints: [
      "Doce feito de amendoim",
      "Tem textura granulada",
      "Muito tradicional nas festas"
    ],
    correctAnswer: "paçoca"
  }
];

const DishQuiz = () => {
  const [currentDish, setCurrentDish] = useState(0);
  const [currentHint, setCurrentHint] = useState(0);
  const [score, setScore] = useState(0);
  const [guess, setGuess] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [gameComplete, setGameComplete] = useState(false);
  const navigate = useNavigate();

  const handleGuess = () => {
    const current = dishes[currentDish];
    const isCorrect = guess.toLowerCase().trim() === current.correctAnswer.toLowerCase();
    
    if (isCorrect) {
      const points = Math.max(30 - (currentHint * 5), 10); // Less points for more hints
      setScore(score + points);
      setFeedbackMessage(`🎉 Correto! +${points} pontos`);
      
      setTimeout(() => {
        if (currentDish === dishes.length - 1) {
          setGameComplete(true);
          const currentGames = parseInt(localStorage.getItem("gamesPlayed") || "0");
          localStorage.setItem("gamesPlayed", (currentGames + 1).toString());
        } else {
          setCurrentDish(currentDish + 1);
          setCurrentHint(0);
          setGuess("");
          setShowFeedback(false);
        }
      }, 2000);
    } else {
      setFeedbackMessage("❌ Incorreto! Tente novamente.");
      setTimeout(() => setShowFeedback(false), 2000);
    }
    
    setShowFeedback(true);
  };

  const getNextHint = () => {
    if (currentHint < dishes[currentDish].hints.length - 1) {
      setCurrentHint(currentHint + 1);
    }
  };

  const handleFinish = () => {
    navigate(`/voucher-form?game=dish-quiz&score=${score}`);
  };

  const resetGame = () => {
    setCurrentDish(0);
    setCurrentHint(0);
    setScore(0);
    setGuess("");
    setShowFeedback(false);
    setGameComplete(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-orange-100">
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
            <UtensilsCrossed className="w-8 h-8 text-junina-orange" />
            <span className="text-2xl font-bold text-junina-orange"> Descubra o Prato</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-junina-orange mb-4">
             Descubra o Prato Junino
          </h1>
          <p className="text-xl text-gray-700">
            Adivinhe o prato típico pelas dicas!
          </p>
        </div>

        {!gameComplete ? (
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-center text-2xl text-junina-orange">
                Prato {currentDish + 1} de {dishes.length} | Pontuação: {score}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="text-8xl mb-6">{dishes[currentDish].emoji}</div>
                
                <div className="space-y-4 mb-6">
                  {dishes[currentDish].hints.slice(0, currentHint + 1).map((hint, index) => (
                    <div key={index} className="bg-blue-100 border border-blue-300 rounded-lg p-4">
                      <p className="text-blue-800 font-medium">
                        💡 Dica {index + 1}: {hint}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Digite o nome do prato..."
                    className="w-full px-4 py-3 text-lg border-2 rounded-lg focus:ring-junina-orange focus:border-junina-orange"
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    disabled={showFeedback}
                    onKeyPress={(e) => e.key === 'Enter' && guess.trim() && handleGuess()}
                  />

                  <div className="flex gap-4 justify-center">
                    {currentHint < dishes[currentDish].hints.length - 1 && (
                      <Button 
                        onClick={getNextHint}
                        variant="outline"
                        disabled={showFeedback}
                        className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800"
                      >
                        💡 Próxima Dica
                      </Button>
                    )}
                    
                    <Button 
                      onClick={handleGuess}
                      disabled={!guess.trim() || showFeedback}
                      className="bg-junina-green hover:bg-green-600 text-white"
                    >
                      Enviar Resposta
                    </Button>
                  </div>
                </div>

                {showFeedback && (
                  <div className="mt-6 p-4 rounded-lg">
                    {feedbackMessage.includes("Correto") ? (
                      <div className="text-green-600 font-bold flex items-center justify-center space-x-2">
                        <CheckCircle2 className="w-6 h-6" />
                        <span className="text-xl">{feedbackMessage}</span>
                      </div>
                    ) : (
                      <div className="text-red-600 font-bold flex items-center justify-center space-x-2">
                        <XCircle className="w-6 h-6" />
                        <span className="text-xl">{feedbackMessage}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-center text-2xl text-junina-orange">
                🎉 Parabéns! Quiz Concluído!
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-6">🏆</div>
              <p className="text-2xl font-bold text-junina-yellow mb-4">
                Pontuação Final: {score}
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Você conhece bem os pratos juninos!
              </p>
              
              <div className="space-x-4">
                {score >= 50 ? (
                  <Button onClick={handleFinish} className="bg-junina-green hover:bg-green-600 text-white">
                    Gerar Voucher
                  </Button>
                ) : (
                  <p className="text-orange-600 mb-4">
                    Você precisa de pelo menos 50 pontos para um voucher!
                  </p>
                )}
                <Button onClick={resetGame} variant="outline">
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

export default DishQuiz;
