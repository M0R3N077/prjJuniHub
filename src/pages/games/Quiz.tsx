import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, Brain, Clock, CheckCircle, XCircle } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const Quiz = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [answers, setAnswers] = useState<number[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      question: "Qual é o prato típico junino feito com milho e leite?",
      options: ["Pamonha", "Canjica", "Curau", "Pipoca"],
      correct: 1,
      explanation: "A canjica é feita com milho branco, leite e açúcar, sendo um dos doces mais tradicionais das festas juninas."
    },
    {
      id: 2,
      question: "Em que mês tradicionalmente começa a festa junina?",
      options: ["Maio", "Junho", "Julho", "Agosto"],
      correct: 1,
      explanation: "As festas juninas começam em junho, daí o nome 'junina', celebrando santos como São João."
    },
    {
      id: 3,
      question: "Qual dança é típica das festas juninas?",
      options: ["Samba", "Forró", "Frevo", "Macarena"],
      correct: 1,
      explanation: "O forró é a dança mais tradicional das festas juninas, originária do Nordeste brasileiro."
    },
    {
      id: 4,
      question: "O que representa a fogueira nas festas juninas?",
      options: ["Purificação", "Proteção", "Comunicação com santos", "Todas as anteriores"],
      correct: 3,
      explanation: "A fogueira tem múltiplos significados: purificação, proteção contra o mal e forma de comunicação com os santos."
    },
    {
      id: 5,
      question: "Qual é o ingrediente principal da pamonha?",
      options: ["Trigo", "Arroz", "Milho", "Mandioca"],
      correct: 2,
      explanation: "A pamonha é feita principalmente com milho verde ralado, sendo um dos pratos mais tradicionais."
    }
  ];

  useEffect(() => {
    if (gameStarted && !gameOver && !showResult && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleAnswer(-1); // Resposta errada por tempo esgotado
    }
  }, [timeLeft, gameStarted, gameOver, showResult]);

  const startGame = () => {
    setGameStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameOver(false);
    setTimeLeft(30);
    setAnswers([]);
  };

  const handleAnswer = (answerIndex: number) => {
    if (showResult) return;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);
    
    if (answerIndex === questions[currentQuestion].correct) {
      setScore(score + 10);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setTimeLeft(30);
      } else {
        setGameOver(true);
      }
    }, 3000);
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameOver(false);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setTimeLeft(30);
    setAnswers([]);
  };

  const handleQuizComplete = () => {
    setQuizComplete(true);
    
    // Increment games played counter for roulette
    const currentGames = parseInt(localStorage.getItem("gamesPlayed") || "0");
    localStorage.setItem("gamesPlayed", (currentGames + 1).toString());
    
    if (score >= 40) { // 4 ou mais acertos
      setTimeout(() => {
        window.location.href = '/voucher-form?game=quiz&score=' + score;
      }, 2000);
    }
  };

  useEffect(() => {
    if (gameOver && score >= 40) {
      handleQuizComplete();
    }
  }, [gameOver, score]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-purple-200">
      <header className="bg-white/80 backdrop-blur-sm shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/games" className="flex items-center space-x-2 text-junina-orange hover:text-junina-red transition-colors">
            <ArrowLeft className="w-6 h-6" />
            <span className="font-bold">Voltar aos Jogos</span>
          </Link>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold text-junina-purple">Quiz Junino</h1>
          </div>

          <div className="text-right">
            <p className="text-lg font-bold text-junina-orange">Pontos: {score}</p>
            {gameStarted && !gameOver && (
              <p className="text-sm text-gray-600 flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {timeLeft}s
              </p>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {!gameStarted && !gameOver && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-center text-2xl text-junina-purple flex items-center justify-center">
                <Brain className="w-8 h-8 mr-2" />
                Quiz de Cultura Junina
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-gray-700">
                Teste seus conhecimentos sobre festa junina!
              </p>
              <p className="text-gray-700">
                São 5 perguntas, cada uma vale 10 pontos.
              </p>
              <p className="text-gray-700">
                Você tem 30 segundos para cada resposta.
              </p>
              <p className="text-gray-700">
                Acerte 4 ou mais para ganhar um voucher!
              </p>
              <Button onClick={startGame} className="bg-junina-purple hover:bg-purple-600 text-white">
                <Brain className="w-4 h-4 mr-2" />
                Começar Quiz
              </Button>
            </CardContent>
          </Card>
        )}

        {gameStarted && !gameOver && (
          <Card className="mb-8">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl text-junina-purple">
                  Pergunta {currentQuestion + 1} de {questions.length}
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-red-500" />
                  <span className={`font-bold ${timeLeft <= 10 ? 'text-red-500' : 'text-gray-600'}`}>
                    {timeLeft}s
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-junina-purple h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">
                {questions[currentQuestion].question}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={showResult}
                    className={`p-4 h-auto text-left justify-start ${
                      showResult
                        ? index === questions[currentQuestion].correct
                          ? 'bg-green-500 hover:bg-green-500 text-white'
                          : index === selectedAnswer
                            ? 'bg-red-500 hover:bg-red-500 text-white'
                            : 'bg-gray-200 hover:bg-gray-200 text-gray-600'
                        : 'bg-white hover:bg-junina-purple/20 text-gray-800 border-2 border-gray-200'
                    }`}
                  >
                    <span className="font-bold mr-2">{String.fromCharCode(65 + index)})</span>
                    {option}
                    {showResult && index === questions[currentQuestion].correct && (
                      <CheckCircle className="w-5 h-5 ml-auto" />
                    )}
                    {showResult && index === selectedAnswer && index !== questions[currentQuestion].correct && (
                      <XCircle className="w-5 h-5 ml-auto" />
                    )}
                  </Button>
                ))}
              </div>

              {showResult && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-bold text-blue-800 mb-2">Explicação:</h3>
                  <p className="text-blue-700">{questions[currentQuestion].explanation}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {gameOver && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-center text-2xl text-junina-purple">
                Quiz Finalizado!
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-4xl font-bold text-junina-yellow">
                {score} / 50 pontos
              </p>
              <p className="text-xl">
                Você acertou {Math.floor(score / 10)} de {questions.length} perguntas
              </p>
              {score >= 40 ? (
                <div>
                  <p className="text-green-600 font-bold mb-4">
                    🎉 Parabéns! Você ganhou um voucher!
                  </p>
                  <p className="text-gray-600">
                    Redirecionando para o formulário...
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-orange-600 mb-4">
                    Você precisa acertar pelo menos 4 perguntas para ganhar um voucher.
                  </p>
                  <Button onClick={resetGame} className="bg-junina-purple hover:bg-purple-600 text-white">
                    <Brain className="w-4 h-4 mr-2" />
                    Tentar Novamente
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

export default Quiz;
