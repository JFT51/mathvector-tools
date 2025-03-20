
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Fout: Gebruiker probeerde toegang te krijgen tot een niet-bestaande route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="fancy-card p-6 sm:p-10 text-center max-w-md w-full">
        <div className="text-red-500 mb-4 sm:mb-6">
          <i className="fas fa-exclamation-triangle text-4xl sm:text-6xl"></i>
        </div>
        <h1 className="title-lg text-gray-900 mb-3 sm:mb-4">404</h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-4 sm:mb-6">Oeps! Pagina niet gevonden</p>
        <a 
          href="/" 
          className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <i className="fas fa-home mr-2"></i>
          Terug naar Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
