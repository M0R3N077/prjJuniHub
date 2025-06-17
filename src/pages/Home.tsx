import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles, Music, MapPin } from "lucide-react";
import Flag from "../../public/flag.png";
import BurgerMenu from "@/components/BurgerMenu";
import GLBViewer from "@/components/GLBViewer";


const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-[#FBB419]  relative overflow-hidden">
        <div className="absolute w-full pb-12">
        <img src={Flag} className="xl:w-[725px] lg:w-[480px] w-[200px]" />
      </div>
  {/* 
          <div className="absolute w-full pb-12 flex justify-end">
          <img src={Flag} className="w-[550px] -scale-x-100" />
        </div> */}

      {/* Header */}
      <header className="relative z-20 pt-10 px-4">
        <div className="max-w-full flex justify-between px-20 items-center">
          <div className="flex w-full justify-between">
            <div className="flex" >
            <BurgerMenu />
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-junina-orange">Juni</span>
              <span className="text-2xl font-bold text-[#FBB419]">Hub</span>
              {/* <img src="/logo2.png" alt="" className="w-56 " />  */}
            </div>
            </div>
            <div>

            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/games" className="text-gray-700 hover:text-junina-orange transition-colors">
              Jogos
            </Link>
            <Link to="/info" className="text-gray-700 hover:text-junina-orange transition-colors">
              Informações
            </Link>
            <Link to="/music" className="text-gray-700 hover:text-junina-orange transition-colors">
              <Music className="w-5 h-5" />
            </Link>
            <Link to="/map" className="text-gray-700 hover:text-junina-orange transition-colors">
              <MapPin className="w-5 h-5" />
            </Link>
          </nav>
        </div>
      </header>

    

      {/* Conteúdo Principal */}
      <main className="relative z-10 px-4 pt-16 pb-20">
        <div className="max-w-6xl mx-auto text-center">
          {/* Título Principal */}
          <div className="mb-8 md:mt-[-130px]">
            {/* <h1 className="text-6xl md:text-8xl font-bold text-[#FBB419] mb-4 animate-bounce-gentle">
              JuniHub
            </h1> */}
      <div className="w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto md:mb-[-110px]">
    <img src="/logo2.png" alt="Logo do JuniHub" className="w-full h-auto object-contain" />
</div>
            <p className="text-xl md:text-2xl text-junina-orange font-medium max-w-2xl mx-auto leading-relaxed">
              O Hub de diversão para quem ama Festa Junina!
            </p>
          </div>

          {/* Elementos 3D */}
          <div className="mb-12 mx-auto md:pl-10">
            <div className="flex justify-center">
            <GLBViewer
              modelUrl="/3d/corn.glb"
              height="300px"
              width="300px"
              scale={0.5}
              position={[0, -1, 0]}
              autoRotate={true}
              enableControls={true}
              showEnvironment={true}
              className="hidden md:block"
            />
              <GLBViewer
              modelUrl="/3d/bonfire.glb"
              height="300px"
              width="300px"
              scale={0.7}
              position={[0, -1, 0]}
              autoRotate={true}
              enableControls={true}
              showEnvironment={true}       
            />
             <GLBViewer
              modelUrl="/3d/hat.glb"
              height="300px"
              width="300px"
              scale={1.5}
              position={[0, -1, 0]}
              autoRotate={true}
              enableControls={true}
              showEnvironment={true}
              className="hidden md:block pb-16"
            />
            </div>
            <p className="text-sm text-junina-orange mt-2 font-medium">
              Arraste para rotacionar • Role para zoom • Clique para interagir  
            </p>
          </div>
      
          {/* Botão de Entrada */}
          <div className="mb-12">
            <Link to="/games">
              <Button 
                className="bg-[#E2422C] hover:bg-pink-600 text-white px-12 py-6 text-xl font-bold rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <Sparkles className="w-6 h-6 mr-2" />
                ENTRAR
              </Button>
            </Link>
          </div>

          {/* Informações Adicionais */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-junina-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-junina-orange" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Jogos Divertidos</h3>
              <p className="text-gray-600">Participe de jogos incríveis e ganhe vouchers promocionais!</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-junina-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Music className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Música Junina</h3>
              <p className="text-gray-600">Ouça as melhores músicas tradicionais das festas juninas!</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-junina-green rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Mapa da Festa</h3>
              <p className="text-gray-600">Encontre todas as atrações e barracas da festa!</p>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
};

export default Home;
