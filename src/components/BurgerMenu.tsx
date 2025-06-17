
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, RotateCcw, Info, Trophy, MapPin, Music, Gamepad2 } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const BurgerMenu = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: "/home", label: "Home", icon: Home },
    { path: "/roulette", label: "Roleta", icon: RotateCcw },
    { path: "/info", label: "Infos", icon: Info },
    { path: "/ranking", label: "Ranking", icon: Trophy },
    { path: "/map", label: "Mapa", icon: MapPin },
    { path: "/music", label: "Música", icon: Music },
    { path: "/games", label: "Jogos", icon: Gamepad2 },
  ];

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button className="p-2 text-junina-orange hover:text-junina-red transition-colors z-50">
          <Menu className="w-6 h-6" />
        </button>
      </DrawerTrigger>
      <DrawerContent className="bg-gradient-to-b from-junina-cream to-yellow-50 border-junina-yellow">
        <DrawerHeader className="border-b border-junina-yellow/20">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-2xl font-bold text-junina-orange flex items-center space-x-2">
              <span>🌽</span>
              <span>JuniHub Menu</span>
            </DrawerTitle>
            <DrawerClose asChild>
              <button className="p-2 text-junina-orange hover:text-junina-red transition-colors">
                <X className="w-6 h-6" />
              </button>
            </DrawerClose>
          </div>
        </DrawerHeader>
        
        <div className="p-6">
          <nav className="space-y-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <DrawerClose key={item.path} asChild>
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 ${
                      isActive 
                        ? "bg-junina-yellow text-white shadow-lg" 
                        : "bg-white/60 hover:bg-junina-yellow/20 text-junina-orange hover:text-junina-red"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="text-lg font-medium">{item.label}</span>
                  </Link>
                </DrawerClose>
              );
            })}
          </nav>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default BurgerMenu;
