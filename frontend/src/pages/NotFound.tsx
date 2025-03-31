
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen cyber-grid-bg flex items-center justify-center p-4">
      <div className="glass-card border border-cyber-red/30 p-10 max-w-md w-full text-center">
        <div className="text-6xl font-bold mb-4 text-cyber-red">404</div>
        <h1 className="text-2xl font-bold mb-4 text-white">Page Not Found</h1>
        <p className="text-gray-400 mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <a 
          href="/" 
          className="cyber-button-blue inline-block"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
