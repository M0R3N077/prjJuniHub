
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MusicProvider } from "@/contexts/MusicContext";
import GlobalMusicPlayer from "@/components/GlobalMusicPlayer";

// Page imports
import Index from "@/pages/Index";
import Home from "@/pages/Home";
import Games from "@/pages/Games";
import Music from "@/pages/Music";
import Map from "@/pages/Map";
import Info from "@/pages/Info";
import Ranking from "@/pages/Ranking";
import Roulette from "@/pages/Roulette";
import VoucherForm from "@/pages/VoucherForm";
import Splash from "@/pages/Splash";
import NotFound from "@/pages/NotFound";

// Game pages
import Quiz from "@/pages/games/Quiz";
import MemoryGame from "@/pages/games/MemoryGame";
import BocaDoPalhaco from "@/pages/games/BocaDoPalhaco";
import CandyCrush from "@/pages/games/CandyCrush";
import DishQuiz from "@/pages/games/DishQuiz";
import FlagSequence from "@/pages/games/FlagSequence";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <MusicProvider>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/home" element={<Home />} />
            <Route path="/games" element={<Games />} />
            <Route path="/music" element={<Music />} />
            <Route path="/map" element={<Map />} />
            <Route path="/info" element={<Info />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/roulette" element={<Roulette />} />
            <Route path="/voucher-form" element={<VoucherForm />} />
            <Route path="/splash" element={<Splash />} />
            <Route path="/games/quiz" element={<Quiz />} />
            <Route path="/games/memory" element={<MemoryGame />} />
            <Route path="/games/boca-do-palhaco" element={<BocaDoPalhaco />} />
            <Route path="/games/candy-crush" element={<CandyCrush />} />
            <Route path="/games/dish-quiz" element={<DishQuiz />} />
            <Route path="/games/flag-sequence" element={<FlagSequence />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <GlobalMusicPlayer />
        </BrowserRouter>
      </TooltipProvider>
    </MusicProvider>
  </QueryClientProvider>
);

export default App;
