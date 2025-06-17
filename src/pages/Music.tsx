
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, Play, Pause, SkipForward, SkipBack, Volume2, Upload } from "lucide-react";
import GLBViewer from "@/components/GLBViewer";
import { useMusicContext } from "@/contexts/MusicContext";

const Music = () => {
  const {
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
  } = useMusicContext();

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Carregar arquivos de música salvos no localStorage
  useEffect(() => {
    const savedPlaylist = localStorage.getItem('juniHub_playlist');
    if (savedPlaylist) {
      try {
        const parsed = JSON.parse(savedPlaylist);
        setPlaylist(parsed);
      } catch (error) {
        console.error('Erro ao carregar playlist:', error);
      }
    }
  }, [setPlaylist]);

  // Salvar playlist no localStorage
  const savePlaylist = (newPlaylist: typeof playlist) => {
    localStorage.setItem('juniHub_playlist', JSON.stringify(newPlaylist));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach((file, index) => {
      if (file.type.startsWith('audio/')) {
        const url = URL.createObjectURL(file);
        const audio = new Audio(url);
        
        audio.addEventListener('loadedmetadata', () => {
          const minutes = Math.floor(audio.duration / 60);
          const seconds = Math.floor(audio.duration % 60);
          const durationString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
          
          const newSong = {
            title: file.name.replace(/\.[^/.]+$/, ""),
            artist: "Uploaded",
            duration: durationString,
            file: url
          };

          const updated = [...playlist, newSong];
          setPlaylist(updated);
          savePlaylist(updated);
        });
      }
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const currentSongData = playlist[currentSong];
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-junina-cream to-yellow-50">
      <header className="bg-white/80 backdrop-blur-sm shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-junina-orange hover:text-junina-red transition-colors">
            <ArrowLeft className="w-6 h-6" />
            <span className="font-bold">Voltar</span>
          </Link>
          
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-junina-orange">Juni</span>
            <span className="text-2xl font-bold text-[#FBB419]">Hub</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-junina-yellow mb-4">
             Rádio JuniHub
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Ouça as melhores músicas juninas enquanto se diverte!
            <br />
            <span className="text-junina-orange font-semibold"> A música continua tocando em todas as páginas!</span>
          </p>
        </div>
     

        {/* Player Principal */}
        <Card className="shadow-2xl mb-8 bg-gradient-to-r from-junina-orange to-junina-red text-white">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className={`text-6xl ${isPlaying ? 'animate-pulse' : ''}`}>🎼</div>
              </div>
              <h2 className="text-2xl font-bold mb-2">{currentSongData.title}</h2>
              <p className="text-lg opacity-90">{currentSongData.artist}</p>
            </div>

            {/* Controles */}
            <div className="flex justify-center items-center space-x-6 mb-6">
              <Button
                onClick={previousSong}
                variant="ghost"
                size="lg"
                className="text-white hover:bg-white/20 rounded-full"
              >
                <SkipBack className="w-8 h-8" />
              </Button>
              
              <Button
                onClick={playPause}
                size="lg"
                className="bg-white text-junina-orange hover:bg-gray-100 rounded-full w-16 h-16"
                disabled={!currentSongData.file}
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8" />
                ) : (
                  <Play className="w-8 h-8 ml-1" />
                )}
              </Button>
              
              <Button
                onClick={nextSong}
                variant="ghost"
                size="lg"
                className="text-white hover:bg-white/20 rounded-full"
              >
                <SkipForward className="w-8 h-8" />
              </Button>
            </div>

            {/* Barra de Progresso */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2 opacity-75">
                <span>{formatTime(currentTime)}</span>
                <span>{duration > 0 ? formatTime(duration) : currentSongData.duration}</span>
              </div>
              <div className="w-full bg-white/30 rounded-full h-2 cursor-pointer">
                <div 
                  className="bg-white h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>

            {/* Volume */}
            <div className="flex items-center justify-center space-x-3">
              <Volume2 className="w-5 h-5" />
              <div className="w-24 bg-white/30 rounded-full h-2 cursor-pointer"
                   onClick={(e) => {
                     const rect = e.currentTarget.getBoundingClientRect();
                     const x = e.clientX - rect.left;
                     const newVolume = x / rect.width;
                     setVolume(Math.max(0, Math.min(1, newVolume)));
                   }}>
                <div 
                  className="bg-white h-2 rounded-full"
                  style={{ width: `${volume * 100}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Playlist */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl text-junina-orange">
              📻 Playlist Junina
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {playlist.map((song, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setCurrentSong(index);
                    setIsPlaying(false);
                  }}
                  className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-all ${
                    index === currentSong
                      ? 'bg-junina-yellow text-white'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">
                      {index === currentSong && isPlaying ? '🎵' : 
                       song.file ? '🎼' : '📤'}
                    </div>
                    <div>
                      <h3 className="font-semibold">{song.title}</h3>
                      <p className={`text-sm ${index === currentSong ? 'text-white/80' : 'text-gray-600'}`}>
                        {song.artist} {!song.file && '(Faça upload do arquivo)'}
                      </p>
                    </div>
                  </div>
                  <div className={`text-sm ${index === currentSong ? 'text-white/80' : 'text-gray-500'}`}>
                    {song.duration}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>


        {/* Call to Action */}
        <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-3xl p-8 text-center">
          <h2 className="text-3xl font-bold text-junina-orange mb-4">
             Que tal jogar enquanto escuta?
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Aproveite nossa trilha sonora e se divirta com os jogos juninos!
          </p>
          <Link to="/games">
            <Button className="bg-junina-green hover:bg-green-600 text-white px-8 py-3 text-lg">
              Jogar Agora
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Music;
