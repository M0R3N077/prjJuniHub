
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, Calendar, Users, Music, Utensils } from "lucide-react";
import BurgerMenu from "@/components/BurgerMenu";
import DestaquesInstagram from "./Destaques";
import Infos from "./Infos";

const Info = () => {
  
  return (
    <div>
      <header className="bg-white/80 backdrop-blur-sm shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <BurgerMenu />
            <Link to="/home" className="flex items-center space-x-2 text-junina-orange hover:text-junina-red transition-colors">
              <ArrowLeft className="w-6 h-6" />
              <span className="font-bold">Voltar ao Início</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-2">
            
            <span className="text-2xl font-bold text-junina-orange">Informações JuniHub</span>
          </div>
        </div>
      </header>
      <div className="bg-gradient-to-b from-yellow-50 to-[#fbcc67]">
      <Infos />
      <DestaquesInstagram />
      </div>
    </div>
  );
};

export default Info;
