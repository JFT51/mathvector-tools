
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="fancy-card p-10 text-center max-w-md">
        <div className="text-red-500 mb-6">
          <i className="fas fa-exclamation-triangle text-6xl"></i>
        </div>
        <h1 className="title-lg text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oeps! Pagina niet gevonden</p>
        <a 
          href="/" 
          className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <i className="fas fa-home mr-2"></i>
          Terug naar Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
