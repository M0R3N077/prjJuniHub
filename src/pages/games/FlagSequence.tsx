
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, Play, RotateCcw } from "lucide-react";
import BurgerMenu from "@/components/BurgerMenu";

const FlagSequence = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [sequence, setSequence] = useState<string[]>([]);
  const [playerSequence, setPlayerSequence] = useState<string[]>([]);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [showingSequence, setShowingSequence] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [playerTurn, setPlayerTurn] = useState(false);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  const colors = ["red", "blue", "yellow", "green", "purple", "orange"];
  const colorClasses = {
    red: "bg-red-500 hover:bg-red-600",
    blue: "bg-blue-500 hover:bg-blue-600", 
    yellow: "bg-yellow-500 hover:bg-yellow-600",
    green: "bg-green-500 hover:bg-green-600",
    purple: "bg-purple-500 hover:bg-purple-600",
    orange: "bg-orange-500 hover:bg-orange-600"
  };

  const colorEmojis = {
    red: "🔴",
    blue: "🔵", 
    yellow: "🟡",
    green: "🟢",
    purple: "🟣",
    orange: "🟠"
  };

  const generateSequence = (level: number) => {
    const newSequence = [];
    for (let i = 0; i < level + 2; i++) {
      newSequence.push(colors[Math.floor(Math.random() * colors.length)]);
    }
    return newSequence;
  };

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setCurrentLevel(1);
    setScore(0);
    const newSequence = generateSequence(1);
    setSequence(newSequence);
    setPlayerSequence([]);
    showSequence(newSequence);
  };

  const showSequence = (seq: string[]) => {
    setShowingSequence(true);
    setPlayerTurn(false);
    setCurrentStep(0);

    const showNextFlag = (index: number) => {
      if (index < seq.length) {
        setCurrentStep(index);
        setTimeout(() => {
          setCurrentStep(-1);
          setTimeout(() => showNextFlag(index + 1), 300);
        }, 800);
      } else {
        setTimeout(() => {
          setShowingSequence(false);
          setPlayerTurn(true);
          setCurrentStep(-1);
        }, 500);
      }
    };

    setTimeout(() => showNextFlag(0), 1000);
  };

  const handleColorClick = (color: string) => {
    if (!playerTurn || showingSequence) return;

    const newPlayerSequence = [...playerSequence, color];
    setPlayerSequence(newPlayerSequence);

    if (color !== sequence[newPlayerSequence.length - 1]) {
      setGameOver(true);
      setPlayerTurn(false);
      return;
    }

    if (newPlayerSequence.length === sequence.length) {
      const newScore = score + currentLevel * 10;
      setScore(newScore);
      
      if (currentLevel >= 5) {
        setGameOver(true);
        const currentGames = parseInt(localStorage.getItem("gamesPlayed") || "0");
        localStorage.setItem("gamesPlayed", (currentGames + 1).toString());
        
        setTimeout(() => {
          if (newScore >= 50) {
            navigate(`/voucher-form?game=flag-sequence&score=${newScore}`);
          }
        }, 2000);
      } else {
        setTimeout(() => {
          const nextLevel = currentLevel + 1;
          setCurrentLevel(nextLevel);
          const newSequence = generateSequence(nextLevel);
          setSequence(newSequence);
          setPlayerSequence([]);
          showSequence(newSequence);
        }, 1500);
      }
    }
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameOver(false);
    setSequence([]);
    setPlayerSequence([]);
    setCurrentLevel(1);
    setShowingSequence(false);
    setCurrentStep(0);
    setPlayerTurn(false);
    setScore(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-200">
      <header className="bg-white/80 backdrop-blur-sm shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <BurgerMenu />
            <Link to="/games" className="flex items-center space-x-2 text-junina-orange hover:text-junina-red transition-colors">
              <ArrowLeft className="w-6 h-6" />
              <span className="font-bold">Voltar aos Jogos</span>
            </Link>
          </div>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold text-junina-green"> Sequência da Bandeirinha</h1>
          </div>

          <div className="text-right">
            <p className="text-lg font-bold text-junina-orange">Nível: {currentLevel}</p>
            <p className="text-sm text-gray-600">Pontos: {score}</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {!gameStarted && !gameOver && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-center text-2xl text-junina-green flex items-center justify-center">
                <Eye className="w-8 h-8 mr-2" />
                Sequência da Bandeirinha
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-gray-700">
                Memorize a sequência de bandeirinhas coloridas!
              </p>
              <p className="text-gray-700">
                Cada nível adiciona mais bandeirinhas na sequência.
              </p>
              <p className="text-gray-700">
                Chegue ao nível 5 para ganhar um voucher!
              </p>
              <Button onClick={startGame} className="bg-junina-green hover:bg-green-600 text-white">
                <Play className="w-4 h-4 mr-2" />
                Começar Jogo
              </Button>
            </CardContent>
          </Card>
        )}

        {gameStarted && !gameOver && (
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  {showingSequence && (
                    <div>
                      <h2 className="text-2xl font-bold text-junina-green mb-4">
                        🧠 Memorize a sequência!
                      </h2>
                      <p className="text-gray-600">
                        Observe as bandeirinhas que acendem...
                      </p>
                    </div>
                  )}
                  {playerTurn && (
                    <div>
                      <h2 className="text-2xl font-bold text-junina-green mb-4">
                        🎯 Sua vez!
                      </h2>
                      <p className="text-gray-600">
                        Clique nas bandeirinhas na ordem correta
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        Progresso: {playerSequence.length} / {sequence.length}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-md mx-auto">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => handleColorClick(color)}
                      disabled={!playerTurn}
                      className={`
                        w-20 h-20 rounded-lg transition-all duration-200 transform
                        ${colorClasses[color as keyof typeof colorClasses]}
                        ${showingSequence && currentStep >= 0 && sequence[currentStep] === color
                          ? 'scale-110 ring-4 ring-white shadow-2xl animate-pulse'
                          : 'scale-100 shadow-lg'
                        }
                        ${!playerTurn ? 'cursor-not-allowed opacity-70' : 'hover:scale-105 cursor-pointer'}
                        flex items-center justify-center text-2xl
                      `}
                    >
                      {colorEmojis[color as keyof typeof colorEmojis]}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Progress indicator only - NO sequence display */}
            <Card className="bg-gray-50">
              <CardContent className="p-4">
                <h3 className="text-center text-lg font-semibold mb-2">Nível {currentLevel} - Progresso</h3>
                <div className="flex justify-center">
                  <div className="w-full max-w-md bg-gray-200 rounded-full h-4">
                    <div 
                      className="bg-junina-green h-4 rounded-full transition-all duration-300"
                      style={{ width: `${(playerSequence.length / sequence.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <p className="text-center text-sm text-gray-600 mt-2">
                  {playerSequence.length} de {sequence.length} corretas
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {gameOver && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-center text-2xl text-junina-green">
                {score >= 50 ? '🎉 Parabéns!' : '😔 Game Over!'}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-2xl font-bold text-junina-yellow">
                Pontuação Final: {score}
              </p>
              <p className="text-lg">
                Você chegou ao nível {currentLevel}
              </p>
              {score >= 50 ? (
                <div>
                  <p className="text-green-600 font-bold mb-4">
                    🎉 Você ganhou um voucher!
                  </p>
                  <p className="text-gray-600">
                    Redirecionando para o formulário...
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-orange-600 mb-4">
                    Chegue ao nível 5 para ganhar um voucher!
                  </p>
                  <Button onClick={resetGame} className="bg-junina-green hover:bg-green-600 text-white">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Jogar Novamente
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default FlagSequence;
