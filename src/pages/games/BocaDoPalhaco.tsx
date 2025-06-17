import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Target } from "lucide-react";
import BurgerMenu from "@/components/BurgerMenu";

const BocaDoPalhaco = () => {
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(5);
  const [gameComplete, setGameComplete] = useState(false);
  const [ballPosition, setBallPosition] = useState({ x: 50, y: 85 });
  const [isThrown, setIsThrown] = useState(false);
  const [lastHit, setLastHit] = useState(false);
  const [power, setPower] = useState(50);
  const [angle, setAngle] = useState(0);
  const [showTrajectory, setShowTrajectory] = useState(false);
  const navigate = useNavigate();

  // Posição do palhaço que muda a cada jogada
  const [targetPosition, setTargetPosition] = useState({ x: 50, y: 25 });

  // Função para gerar nova posição aleatória do palhaço
  const generateNewTargetPosition = () => {
    // Posição X entre 20% e 80% para manter na tela
    const newX = Math.random() * 60 + 20;
    // Posição Y entre 15% e 35% para manter na parte superior
    const newY = Math.random() * 20 + 15;
    setTargetPosition({ x: newX, y: newY });
  };

  // Gerar nova posição no início do jogo
  useEffect(() => {
    generateNewTargetPosition();
  }, []);

  const calculateTrajectory = (startX: number, startY: number, power: number, angle: number) => {
    const points = [];
    const powerFactor = power / 100;
    const gravity = 0.8;
    
    // Converter ângulo para radianos
    const angleRad = (angle * Math.PI) / 180;
    
    // Velocidade inicial baseada na força e ângulo
    const initialVelocity = powerFactor * 15;
    const velocityX = initialVelocity * Math.sin(angleRad);
    const velocityY = initialVelocity * Math.cos(angleRad);
    
    for (let t = 0; t <= 4; t += 0.1) {
      const x = startX + velocityX * t * 3;
      const y = startY - (velocityY * t * 3 - 0.5 * gravity * t * t * 8);
      
      // Parar se a bola sair da tela
      if (x < -5 || x > 105 || y > 95) break;
      
      points.push({ x, y });
    }
    
    return points;
  };

  const throwBall = () => {
    if (attempts <= 0 || isThrown) return;
    
    setIsThrown(true);
    setShowTrajectory(false);
    
    const trajectory = calculateTrajectory(50, 85, power, angle);
    
    let currentStep = 0;
    const animationInterval = setInterval(() => {
      if (currentStep >= trajectory.length) {
        clearInterval(animationInterval);
        
        // Verificar se acertou baseado na última posição
        const finalPosition = trajectory[trajectory.length - 1];
        const distanceToTarget = Math.sqrt(
          Math.pow(finalPosition.x - targetPosition.x, 2) + 
          Math.pow(finalPosition.y - targetPosition.y, 2)
        );
        
        const hit = distanceToTarget < 3;
        setLastHit(hit);
        
        setTimeout(() => {
          if (hit) {
            setScore(prev => prev + 100);
          }
          setAttempts(prev => prev - 1);
          setIsThrown(false);
          setBallPosition({ x: 50, y: 85 });
          
          // Gerar nova posição do palhaço para a próxima jogada
          if (attempts > 1) {
            generateNewTargetPosition();
          }
          
          if (attempts <= 1) {
            setGameComplete(true);
            const currentGames = parseInt(localStorage.getItem("gamesPlayed") || "0");
            localStorage.setItem("gamesPlayed", (currentGames + 1).toString());
          }
        }, 1000);
        
        return;
      }
      
      setBallPosition(trajectory[currentStep]);
      currentStep++;
    }, 60);
  };

  const handleAngleChange = (newAngle: number) => {
    if (!isThrown) {
      setAngle(newAngle);
      setShowTrajectory(true);
    }
  };

  const handlePowerChange = (newPower: number) => {
    if (!isThrown) {
      setPower(newPower);
      setShowTrajectory(true);
    }
  };

  const handleFinish = () => {
    navigate(`/voucher-form?game=boca-do-palhaco&score=${score}`);
  };

  // Calcular trajetória preview
  const trajectoryPoints = showTrajectory && !isThrown ? 
    calculateTrajectory(50, 85, power, angle) : [];

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
            <Target className="w-8 h-8 text-junina-yellow" />
            <span className="text-2xl font-bold text-junina-orange">🎯 Boca do Palhaço</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-junina-yellow mb-4">
             Boca do Palhaço
          </h1>
          <p className="text-xl text-gray-700">
            Ajuste o ângulo e força para acertar a boca do palhaço! O palhaço muda de posição a cada jogada.
          </p>
        </div>

        <Card className="shadow-xl mb-6">
          <CardHeader>
            <CardTitle className="text-center text-2xl text-junina-orange">
              Tentativas: {attempts} | Pontuação: {score}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="relative bg-gradient-to-b from-sky-200 to-green-300 rounded-xl h-96 overflow-hidden border-4 border-yellow-400">
              {/* Chão */}
              <div className="absolute bottom-0 w-full h-20 bg-green-400"></div>
              
              {/* Palhaço em posição aleatória */}
              <div 
                className="absolute transform -translate-x-1/2 transition-all duration-1000"
                style={{
                  left: `${targetPosition.x}%`,
                  top: `${targetPosition.y - 15}%`
                }}
              >
                <div className="relative">
                  <div className="text-8xl">🤡</div>
                  {/* Boca destacada */}
                  <div 
                    className="absolute w-8 h-6 bg-black rounded-full border-2 border-red-500"
                    style={{
                      top: '50px',
                      left: '50%',
                      transform: 'translateX(-50%)'
                    }}
                  ></div>
                </div>
              </div>
              
              {/* Trajetória preview */}
              {trajectoryPoints.map((point, index) => (
                <div
                  key={index}
                  className="absolute w-2 h-2 bg-red-400 rounded-full opacity-70"
                  style={{
                    left: `${point.x}%`,
                    top: `${point.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                ></div>
              ))}
              
              {/* Bola */}
              <div 
                className={`absolute w-6 h-6 bg-red-500 rounded-full transition-all shadow-lg ${!isThrown ? 'animate-bounce' : ''}`}
                style={{
                  left: `${ballPosition.x}%`,
                  top: `${ballPosition.y}%`,
                  transform: 'translate(-50%, -50%)',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                  zIndex: 10
                }}
              ></div>

              {/* Feedback do tiro */}
              {isThrown && (
                <div className="absolute top-4 left-4 text-2xl font-bold bg-white/80 rounded-lg px-4 py-2">
                  {lastHit ? "🎯 ACERTOU!" : "😢 ERROU!"}
                </div>
              )}

              {/* Indicador da nova posição */}
              {!isThrown && attempts < 5 && (
                <div className="absolute top-4 right-4 text-lg font-bold bg-yellow-400/90 rounded-lg px-3 py-2 animate-pulse">
                  🎯 Nova posição!
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Controles */}
        <Card className="shadow-xl">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-bold text-junina-orange mb-2">
                  Ângulo: {angle}° {angle < -5 ? "(⬅️ Esquerda)" : angle > 5 ? "(➡️ Direita)" : "(⬆️ Centro)"}
                </label>
                <input
                  type="range"
                  min="-45"
                  max="45"
                  value={angle}
                  onChange={(e) => handleAngleChange(Number(e.target.value))}
                  disabled={isThrown}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>⬅️ Esquerda</span>
                  <span>⬆️ Centro</span>
                  <span>➡️ Direita</span>
                </div>
              </div>

              <div>
                <label className="block text-lg font-bold text-junina-orange mb-2">
                  Força: {power}% {power < 40 ? "(Fraca)" : power < 70 ? "(Média)" : "(Forte)"}
                </label>
                <input
                  type="range"
                  min="30"
                  max="90"
                  value={power}
                  onChange={(e) => handlePowerChange(Number(e.target.value))}
                  disabled={isThrown}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className={`h-2 rounded-full transition-all ${
                      power < 40 ? 'bg-red-500' : power < 70 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${power}%` }}
                  ></div>
                </div>
              </div>

              <div className="text-center">
                {!gameComplete ? (
                  <div>
                    <Button 
                      onClick={throwBall} 
                      className="bg-junina-pink hover:bg-pink-600 text-white text-xl px-8 py-4 mb-4"
                      disabled={isThrown || attempts <= 0}
                    >
                      {isThrown ? "Jogando..." : "🎯 Arremessar Bola"}
                    </Button>
                    <p className="text-sm text-gray-600">
                      Ajuste o ângulo e força, depois clique para arremessar!
                    </p>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-2xl font-bold text-junina-yellow mb-4">
                      🎉 Jogo Finalizado!
                    </h2>
                    <p className="text-xl text-gray-700 mb-6">
                      Sua pontuação final: {score} pontos
                    </p>
                    {score >= 200 ? (
                      <Button onClick={handleFinish} className="bg-junina-green hover:bg-green-600 text-white">
                        Gerar Voucher
                      </Button>
                    ) : (
                      <p className="text-orange-600">Você precisa de pelo menos 200 pontos para um voucher!</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default BocaDoPalhaco;
