
import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';

interface Song {
  title: string;
  artist: string;
  duration: string;
  file: string;
}

interface MusicContextType {
  currentSong: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  playlist: Song[];
  setCurrentSong: (index: number) => void;
  setIsPlaying: (playing: boolean) => void;
  setVolume: (volume: number) => void;
  playPause: () => void;
  nextSong: () => void;
  previousSong: () => void;
  setPlaylist: (playlist: Song[]) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const useMusicContext = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusicContext must be used within a MusicProvider');
  }
  return context;
};

interface MusicProviderProps {
  children: ReactNode;
}

export const MusicProvider: React.FC<MusicProviderProps> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [playlist, setPlaylist] = useState<Song[]>([
    { title: "Asa Branca", artist: "Luiz Gonzaga", duration: "3:45", file: "/music/Luiz Gonzaga - Asa Branca (Áudio Oficial).MP3" },
    { title: "Clima de Rodeio", artist: "Dj Chris no Beat e Ana Castela", duration: "3:08", file: "/music/DJ Chris no Beat, Ana Castela - Clima de Rodeio (Ao Vivo).MP3" },
    { title: "Tropicana", artist: "Alceu Valença", duration: "5:25", file: "/music/Alceu Valença - Tropicana (Ao Vivo).MP3" },
    { title: "Xote da Alegria", artist: "Falamansa", duration: "4:07", file: "/music/Falamansa - Xote da Alegria.MP3" },
    { title: "Esperando na Janela", artist: "Gilberto Gil", duration: "4:22", file: "/music/Gilberto Gil - Esperando na Janela.mp3" },
    { title: "Pipoco", artist: "Ana Castela e Melody", duration: "3:20", file: "/music/Ana Castela - Pipoco ft. @MELODYOFICIAL  e @djchrisnobeat (Clipe Oficial).MP3" },
    { title: "Festa do Interior", artist: "Gal Costa", duration: "3:20", file: "/music/GAL COSTA - FESTA DO INTERIOR.MP3" },
    { title: "Dengo", artist: "João Gomes", duration: "2:39", file: "/music/João Gomes Cantor - DENGO - João Gomes (DVD Acredite - Ao Vivo em Recife).MP3" }
  ]);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Inicializar o áudio
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    
    const audio = audioRef.current;
    
    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => nextSong();

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Atualizar música atual
  useEffect(() => {
    if (audioRef.current && playlist[currentSong]) {
      audioRef.current.src = playlist[currentSong].file;
      audioRef.current.volume = volume;
    }
  }, [currentSong, playlist]);

  // Atualizar volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const playPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => {
        console.error('Erro ao reproduzir:', error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    const next = (currentSong + 1) % playlist.length;
    setCurrentSong(next);
    setIsPlaying(false);
  };

  const previousSong = () => {
    const prev = (currentSong - 1 + playlist.length) % playlist.length;
    setCurrentSong(prev);
    setIsPlaying(false);
  };

  return (
    <MusicContext.Provider
      value={{
        currentSong,
        isPlaying,
        currentTime,
        duration,
        volume,
        playlist,
        setCurrentSong,
        setIsPlaying,
        setVolume,
        playPause,
        nextSong,
        previousSong,
        setPlaylist,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};
