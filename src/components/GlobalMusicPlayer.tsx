import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react';
import { useMusicContext } from '@/contexts/MusicContext';

const GlobalMusicPlayer = () => {
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    playlist,
    playPause,
    nextSong,
    previousSong,
    setVolume,
  } = useMusicContext();

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;
  const currentSongData = playlist[currentSong];

  if (!currentSongData) return null;

  return (
    <div className="fixed bottom-4 w-1/2 right-4 bg-gradient-to-r from-junina-orange to-junina-red text-white rounded-lg shadow-2xl p-3 md:p-4 z-50  md:w-auto md:min-w-[400px] lg:min-w-[500px] max-w-lg mx-auto md:mx-0">
      <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-3">
        {/* Ícone da música (visível apenas em telas maiores no modo horizontal) */}
        <div className="hidden md:block text-2xl animate-pulse">🎵</div>

        {/* Info da música */}
        <div className="flex-1 min-w-0 w-full">
          <h4 className="font-semibold text-sm sm:text-base truncate">{currentSongData.title}</h4>
          <p className="text-xs sm:text-sm opacity-75 truncate">{currentSongData.artist}</p>

          {/* Barra de progresso */}
          <div className="mt-1 w-full">
            <div className="w-full bg-white/30 rounded-full h-1">
              <div
                className="bg-white h-1 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs sm:text-sm opacity-75 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{duration > 0 ? formatTime(duration) : currentSongData.duration}</span>
            </div>
          </div>
        </div>

        {/* Controles */}
        <div className="flex items-center justify-center space-x-1 sm:space-x-2 w-full md:w-auto mt-2 md:mt-0">
          <Button
            onClick={previousSong}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 rounded-full p-1 h-7 w-7 sm:h-8 sm:w-8"
          >
            <SkipBack className="w-4 h-4" />
          </Button>

          <Button
            onClick={playPause}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 rounded-full p-1 h-9 w-9 sm:h-10 sm:w-10"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5" />
            )}
          </Button>

          <Button
            onClick={nextSong}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 rounded-full p-1 h-7 w-7 sm:h-8 sm:w-8"
          >
            <SkipForward className="w-4 h-4" />
          </Button>

          {/* Volume (escondido em telas muito pequenas, visível a partir de sm) */}
          <div className="hidden sm:flex items-center space-x-1 ml-2">
            <Volume2 className="w-3 h-3 sm:w-4 sm:h-4" />
            <div
              className="w-10 sm:w-16 bg-white/30 rounded-full h-1 cursor-pointer"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const newVolume = x / rect.width;
                setVolume(Math.max(0, Math.min(1, newVolume)));
              }}
            >
              <div
                className="bg-white h-1 rounded-full"
                style={{ width: `${volume * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalMusicPlayer;