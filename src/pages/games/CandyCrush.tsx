
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Candy, RotateCcw } from "lucide-react";
import BurgerMenu from "@/components/BurgerMenu";

interface CandyCell {
  id: string;
  type: string;
  emoji: string;
  row: number;
  col: number;
  selected: boolean;
}

const CandyCrush = () => {
  const [board, setBoard] = useState<CandyCell[][]>([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(20);
  const [selectedCandy, setSelectedCandy] = useState<{row: number, col: number} | null>(null);
  const [gameComplete, setGameComplete] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const navigate = useNavigate();

  const candyTypes = [
    { type: "milho", emoji: "🌽" },
    { type: "doce", emoji: "🍬" },
    { type: "pacoca", emoji: "🥜" },
    { type: "cocada", emoji: "🥥" },
    { type: "canjica", emoji: "🥛" }
  ];

  const initializeBoard = () => {
    const newBoard: CandyCell[][] = [];
    for (let row = 0; row < 6; row++) {
      newBoard[row] = [];
      for (let col = 0; col < 6; col++) {
        const randomCandy = candyTypes[Math.floor(Math.random() * candyTypes.length)];
        newBoard[row][col] = {
          id: `${row}-${col}`,
          type: randomCandy.type,
          emoji: randomCandy.emoji,
          row,
          col,
          selected: false
        };
      }
    }
    setBoard(newBoard);
    setScore(0);
    setMoves(20);
    setSelectedCandy(null);
    setGameComplete(false);
    setGameStarted(true);
  };

  const handleCandyClick = (row: number, col: number) => {
    if (moves <= 0 || gameComplete) return;

    if (!selectedCandy) {
      setSelectedCandy({ row, col });
      setBoard(prev => prev.map((r, rIndex) => 
        r.map((cell, cIndex) => ({
          ...cell,
          selected: rIndex === row && cIndex === col
        }))
      ));
    } else {
      // Check if it's adjacent
      const rowDiff = Math.abs(selectedCandy.row - row);
      const colDiff = Math.abs(selectedCandy.col - col);
      
      if ((rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1)) {
        // Swap candies
        swapCandies(selectedCandy.row, selectedCandy.col, row, col);
      }
      
      setSelectedCandy(null);
      setBoard(prev => prev.map(r => r.map(cell => ({ ...cell, selected: false }))));
    }
  };

  const swapCandies = (row1: number, col1: number, row2: number, col2: number) => {
    const newBoard = [...board];
    const temp = { ...newBoard[row1][col1] };
    
    newBoard[row1][col1] = {
      ...newBoard[row2][col2],
      row: row1,
      col: col1,
      id: `${row1}-${col1}`
    };
    
    newBoard[row2][col2] = {
      ...temp,
      row: row2,
      col: col2,
      id: `${row2}-${col2}`
    };

    setBoard(newBoard);
    
    // Check for matches after swap
    setTimeout(() => {
      const matches = findMatches(newBoard);
      if (matches.length > 0) {
        setScore(score + matches.length * 10);
        removeMatches(newBoard, matches);
      }
      setMoves(moves - 1);
      
      if (moves <= 1) {
        setGameComplete(true);
        const currentGames = parseInt(localStorage.getItem("gamesPlayed") || "0");
        localStorage.setItem("gamesPlayed", (currentGames + 1).toString());
      }
    }, 300);
  };

  const findMatches = (currentBoard: CandyCell[][]) => {
    const matches: {row: number, col: number}[] = [];

    // Check horizontal matches
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 4; col++) {
        if (currentBoard[row][col].type === currentBoard[row][col + 1].type &&
            currentBoard[row][col].type === currentBoard[row][col + 2].type) {
          matches.push({row, col}, {row, col: col + 1}, {row, col: col + 2});
        }
      }
    }

    // Check vertical matches
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 6; col++) {
        if (currentBoard[row][col].type === currentBoard[row + 1][col].type &&
            currentBoard[row][col].type === currentBoard[row + 2][col].type) {
          matches.push({row, col}, {row: row + 1, col}, {row: row + 2, col});
        }
      }
    }

    return matches;
  };  

  const removeMatches = (currentBoard: CandyCell[][], matches: {row: number, col: number}[]) => {
    const newBoard = [...currentBoard];
    
    // Remove matched candies and drop others down
    matches.forEach(match => {
      // Shift everything down
      for (let r = match.row; r > 0; r--) {
        newBoard[r][match.col] = {
          ...newBoard[r - 1][match.col],
          row: r,
          id: `${r}-${match.col}`
        };
      }
      
      // Add new candy at top
      const randomCandy = candyTypes[Math.floor(Math.random() * candyTypes.length)];
      newBoard[0][match.col] = {
        id: `0-${match.col}`,
        type: randomCandy.type,
        emoji: randomCandy.emoji,
        row: 0,
        col: match.col,
        selected: false
      };
    });

    setBoard(newBoard);
  };

  const handleFinish = () => {
    navigate(`/voucher-form?game=candy-crush&score=${score}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-100">
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
            <Candy className="w-8 h-8 text-junina-pink" />
            <span className="text-2xl font-bold text-junina-orange"> Doces Juninos</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-junina-pink mb-4">
             Doces Juninos
          </h1>
          <p className="text-xl text-gray-700">
            Combine 3 ou mais doces iguais!
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
                Clique em um doce e depois em um adjacente para trocar de lugar.
              </p>
              <p className="text-gray-700">
                Faça combinações de 3 ou mais doces iguais para pontuar!
              </p>
              <p className="text-gray-700">
                Você tem 20 movimentos para fazer o máximo de pontos.
              </p>
              <Button onClick={initializeBoard} className="bg-junina-pink hover:bg-pink-600 text-white">
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
                  <div className="text-lg font-bold text-junina-pink">
                    Movimentos: {moves}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl">
              <CardContent className="p-6">
                <div className="grid grid-cols-6 gap-2 max-w-md mx-auto">
                  {board.map((row, rowIndex) =>
                    row.map((candy, colIndex) => (
                      <div
                        key={candy.id}
                        onClick={() => handleCandyClick(rowIndex, colIndex)}
                        className={`
                          aspect-square rounded-lg border-2 flex items-center justify-center cursor-pointer
                          transition-all duration-200 transform hover:scale-105
                          ${candy.selected
                            ? 'bg-yellow-200 border-yellow-400 scale-110' 
                            : 'bg-white border-gray-300 hover:bg-gray-50'
                          }
                        `}
                      >
                        <span className="text-2xl">{candy.emoji}</span>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-center text-2xl text-junina-orange">
                🎉 Jogo Finalizado!
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-6">🏆</div>
              <p className="text-2xl font-bold text-junina-pink mb-6">
                Pontuação Final: {score}
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
                <Button onClick={initializeBoard} variant="outline">
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

export default CandyCrush;
