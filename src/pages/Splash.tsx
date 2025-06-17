
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 3000); // 3 segundos

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[url('../../public/bg-loadng.png')] bg-cover flex items-center justify-center relative overflow-hidden">
      {/* Corn silhouettes background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 text-6xl transform rotate-12 animate-pulse">🌽</div>
        <div className="absolute top-20 right-20 text-4xl transform -rotate-12 animate-pulse delay-300">🌽</div>
        <div className="absolute bottom-20 left-20 text-5xl transform rotate-45 animate-pulse delay-500">🌽</div>
        <div className="absolute bottom-10 right-10 text-7xl transform -rotate-45 animate-pulse delay-700">🌽</div>
        <div className="absolute top-1/2 left-1/4 text-3xl transform rotate-90 animate-pulse delay-1000">🌽</div>
        <div className="absolute top-1/3 right-1/3 text-4xl transform -rotate-90 animate-pulse delay-1200">🌽</div>
      </div>

      {/* Main content */}
      <div className="text-center z-10 animate-fade-in">
        <div className="mb-8">
          {/* <h1 className="text-7xl md:text-9xl font-bold text-white mb-4 animate-bounce-gentle">
            JuniHub
          </h1> */}
          <img src="/logo.png" className="w-[500px] text-center flex justify-center items-center" />
          <div className="w-24 h-1 bg-white mx-auto rounded animate-pulse"></div>
        </div>
        
        {/* Loading indicator */}
        <div className="flex justify-center space-x-2 mt-8">
          <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-white rounded-full animate-pulse delay-150"></div>
          <div className="w-3 h-3 bg-white rounded-full animate-pulse delay-300"></div>
        </div>
      </div>
    </div>
  );
};

export default Splash;
