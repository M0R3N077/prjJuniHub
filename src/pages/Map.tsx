
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, Star, UtensilsCrossed, Music, Gamepad2, Navigation } from "lucide-react";
import BurgerMenu from "@/components/BurgerMenu";

const Map = () => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const locations = [
    {
      id: "entrada",
      name: "Entrada / Saída",
      type: "entrance",
      x: 95,
      y: 50,
      icon: "🚪",
      description: "Portão de entrada e saída da festa. Enquanto espera na fila, jogue os nossos jogos juninos e ganhe vouchers!",
      hours: "13:00 -00:00",
      size: "large"
    },
    {
      id: "palco-principal",
      name: "Palco",
      type: "stage",
      x: 28,
      y: 28,
      icon: "🎤",
      description: "Shows ao vivo com bandas de forró, cantores de sertanejo, quadrilhas e apresentações especiais.",
      hours: "19:00 - 01:00",
      size: "large"
    },
    
    {
      id: "pracaAlimentacao",
      name: "Praça de Alimentação",
      type: "pracaAlimentacao",
      x: 50,
      y: 80,
      icon: "🌽",
      description: "Um verdadeiro arraial de sabores! Delícias típicas como milho, pamonha, canjica e doces caseiros te esperam nesse cantinho irresistível da festa.",
      hours: "13:00 - 23:00",
      size: "large"
    },
    {
      id: "jogos",
      name: "Parque de Diversões",
      type: "games",
      x: 70,
      y: 25,
      icon: "🎯",
      description: "Diversão garantida para todas as idades! Brinque de pescaria, acerte as argolas e encare a nossa montanha russa JuniHub.",
      hours: "18:00 - 01:00",
      voucher: true,
      size: "large"
    },
    {
      id: "sanitarios",
      name: "Sanitários",
      type: "service",
      x: 3.8,
      y: 50,
      icon: "🚻",
      description: "Espaço limpo e bem sinalizado para o seu conforto durante toda a festa. Localizado em ponto estratégico com fácil acesso.",
      hours: "13:00 - 01:00",
      size: "small"
    },
    {
      id: "sanitarios",
      name: "Sanitários",
      type: "service",
      x: 93,
      y: 92.5,
      icon: "🚻",
      description: "Espaço limpo e bem sinalizado para o seu conforto durante toda a festa. Localizado em ponto estratégico com fácil acesso.",
      hours: "13:00 - 01:00",
      size: "small"
    },
    {
      id: "saidaEmergencia",
      name: "Saída de Emergência",
      type: "emergency",
      x: 2,
      y: 23,
      icon: "🚨",
      description: "Rota de segurança em caso de necessidade. Fique tranquilo: nossa equipe está preparada para qualquer eventualidade!",
      hours: "19:00 - 22:00",
      size: "small"
    },
    {
      id: "saidaEmergencia",
      name: "Saída de Emergência",
      type: "emergency",
      x: 2,
      y: 77,
      icon: "🚨",
      description: "Rota de segurança em caso de necessidade. Fique tranquilo: nossa equipe está preparada para qualquer eventualidade!",
      hours: "18:00 - 00:00",
      size: "small"
    },
    
    {
      id: "sanitarios",
      name: "Sanitários",
      type: "service",
      x: 93,
      y: 6,
      icon: "🚻",
      description: "Espaço limpo e bem sinalizado para o seu conforto durante toda a festa. Localizado em ponto estratégico com fácil acesso.",
      hours: "13:00 - 01:00",
      size: "small"
    }
  ];

  const getLocationColor = (type: string) => {
  switch (type) {
    case "stage":          return "bg-[#ff6161]";
    case "pracaAlimentacao": return "bg-[#11d091]";
    case "games":          return "bg-[#2da8c9]";
    case "service":        return "bg-[#145d41]";
    case "entrance":       return "bg-[#3f2463]";
    case "emergency":      return "bg-[#ec522f]";
    default:               return "bg-[#9D412D]";
  }
};

  

 const getLocationSize = (size: string) => {
  switch (size) {
    case "large":
      return "w-12 h-12 text-xl md:w-16 md:h-16 md:text-2xl lg:w-20 lg:h-20 lg:text-3xl";
    case "medium":
      return "w-10 h-10 text-lg md:w-12 md:h-12 md:text-xl lg:w-14 lg:h-14 lg:text-2xl";
    case "small":
      return "w-8 h-8 text-base md:w-10 md:h-10 md:text-lg lg:w-12 lg:h-12 lg:text-xl";
    default:
      return "w-10 h-10 text-lg md:w-12 md:h-12 md:text-xl";
  }
};


  const selectedLoc = locations.find(loc => loc.id === selectedLocation);

  return (
    <div className="min-h-screen bg-gradient-to-b from-junina-cream to-yellow-50">
      <header className="bg-white/80 backdrop-blur-sm shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <BurgerMenu />
            <Link to="/home" className="flex items-center space-x-2 text-junina-orange hover:text-junina-red transition-colors">
              <ArrowLeft className="w-6 h-6" />
              <span className="font-bold">Voltar</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-2">
            <MapPin className="w-8 h-8 text-junina-orange" />
            <span className="text-2xl font-bold text-junina-orange">Mapa da Festa</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-junina-yellow mb-4">
            Mapa do JuniHub 2025
          </h1>
          <p className="text-xl text-gray-700">
            Explore todas as atrações e barracas da nossa festa junina!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Mapa */}
          <div className="lg:col-span-2">
            <Card className="shadow-2xl border-4 border-junina-yellow">
              <CardHeader className="bg-gradient-to-r from-junina-orange to-junina-red text-white">
                <CardTitle className="text-center text-2xl flex items-center justify-center space-x-2">
                  <Navigation className="w-6 h-6" />
                  <span>Layout da Festa</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
               <div
  className="relative w-full max-w-full aspect-[813/445] rounded-b-xl overflow-hidden bg-cover bg-center"
  style={{ backgroundImage: 'url("/mapJuniHub.png")' }}
>

                  {/* Decorações do mapa */}
                  <div className="absolute top-2 left-2 text-3xl animate-pulse"></div>
                  <div className="absolute top-2 right-2 text-3xl animate-pulse"></div>
                  <div className="absolute bottom-2 left-2 text-3xl animate-pulse"></div>
                  <div className="absolute bottom-2 right-2 text-3xl animate-pulse"></div>
                  
                  {/* Localizações */}
                  {locations.map((location) => (
                    <button
                      key={location.id}
                      onClick={() => setSelectedLocation(location.id)}
                      className={`
                        absolute transform -translate-x-1/2 -translate-y-1/2
                        ${getLocationSize(location.size || "medium")} rounded-full flex items-center justify-center
                        transition-all duration-300 hover:scale-125 cursor-pointer
                        ${getLocationColor(location.type)} text-white shadow-2xl border-4 border-white
                        ${selectedLocation === location.id ? 'ring-4 ring-junina-yellow scale-125 z-10' : ''}
                        ${location.featured ? 'animate-pulse' : ''}
                      `}
                      style={{
                        left: `${location.x}%`,
                        top: `${location.y}%`
                      }}
                      title={location.name}
                    >
                      {location.icon}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Legenda */}
            <Card className="mt-4 border-2 border-junina-yellow bg-junina-yellow">
              <CardContent className="p-6">
                <h3 className="font-bold text-xl mb-4 text-center text-junina-orange">Legenda do Mapa</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
  <div className="flex items-center space-x-3">
    <div className="w-6 h-6 rounded-full bg-[#ff6161]"></div>
    <span className="font-semibold text-[#312C29]">Palco</span>
  </div>
  <div className="flex items-center space-x-3">
    <div className="w-6 h-6 rounded-full bg-[#11d091]"></div>
    <span className="font-semibold text-[#312C29]">Praça de Alimentação</span>
  </div>
  <div className="flex items-center space-x-3">
    <div className="w-6 h-6 rounded-full bg-[#2da8c9]"></div>
    <span className="font-semibold text-[#312C29]">Parque de Diversões</span>
  </div>
  <div className="flex items-center space-x-3">
    <div className="w-6 h-6 rounded-full bg-[#ec522f]"></div>
    <span className="font-semibold text-[#312C29]">Saída de Emergência</span>
  </div>
  <div className="flex items-center space-x-3">
    <div className="w-6 h-6 rounded-full bg-[#145d41]"></div>
    <span className="font-semibold text-[#312C29]">Sanitários</span>
  </div>
  <div className="flex items-center space-x-3">
    <div className="w-6 h-6 rounded-full bg-[#3f2463]"></div>
    <span className="font-semibold text-[#312C29]">Entrada / Saída</span>
  </div>
</div>

                 
              
              </CardContent>
            </Card>
          </div>

          {/* Detalhes */}
          <div className="space-y-6">
            {selectedLoc ? (
              <Card className="shadow-2xl border-4 border-junina-yellow bg-junina-yellow">
                <CardHeader className={`${getLocationColor(selectedLoc.type)} text-white`}>
                  <CardTitle className="flex items-center space-x-3 text-xl">
                    <span className="text-3xl">{selectedLoc.icon}</span>
                    <div>
                      <div>{selectedLoc.name}</div>
                      {selectedLoc.voucher && (
                        <span className="bg-white text-junina-orange text-xs px-3 py-1 rounded-full font-bold">
                          Aceita Voucher
                        </span>
                      )}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                  <p className="text-gray-700 text-lg">{selectedLoc.description}</p>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Clock className="w-5 h-5" />
                    <span className="font-semibold">{selectedLoc.hours}</span>
                  </div>
                  {selectedLoc.featured && (
                    <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 p-4 rounded-xl border-2 border-yellow-300">
                      <div className="flex items-center space-x-2 text-yellow-800">
                        <Star className="w-5 h-5" />
                        <span className="font-bold text-lg">Atração em Destaque!</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-2xl border-4 border-junina-yellow bg-junina-yellow">
                <CardContent className="p-8 text-center">
                  <MapPin className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-600 mb-2">
                    Selecione um local
                  </h3>
                  <p className="text-gray-500 text-lg">
                    Clique nos ícones do mapa para descobrir mais sobre cada atração da festa!
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Lista de locais com voucher */}
            <Card className="shadow-2xl border-4 border-[#ec522f] bg-junina-yellow">
  <CardHeader className="bg-[#ec522f] text-white">
    <CardTitle className="text-xl">
   Locais que Aceitam Voucher
    </CardTitle>
  </CardHeader>
  <CardContent className="p-4">
    <div className="space-y-3">
      {locations.filter(loc => loc.type === "pracaAlimentacao").map((location) => (
        <button
          key={location.id}
          onClick={() => setSelectedLocation(location.id)}
          className="w-full text-left p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 hover:from-[#FBB419]/20 hover:to-[#ec522f]/20 transition-all duration-300 hover:scale-105 border-2 border-gray-200 hover:border-[#FBB419]"
        >
          <div className="flex items-center space-x-4">
            <span className="text-2xl">{location.icon}</span>
            <div className="flex-1">
              <div className="font-bold text-lg">{location.name}</div>
              <div className="text-sm text-[#312C29] flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{location.hours}</span>
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  </CardContent>
</Card>

            {/* Call to Action */}
            <Card className="bg-gradient-to-r from-junina-orange to-junina-red text-white shadow-2xl">
              <CardContent className="p-8 text-center">
                <h3 className="font-bold text-2xl mb-4">Não tem voucher ainda?</h3>
                <p className="mb-6 text-lg">Jogue nossos games incríveis e ganhe vouchers para usar na festa!</p>
                <Link to="/games">
                  <Button className="bg-white text-junina-orange hover:bg-gray-100 text-xl px-8 py-4 font-bold">
                    <Gamepad2 className="w-6 h-6 mr-2" />
                    Jogar Agora
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Map;
