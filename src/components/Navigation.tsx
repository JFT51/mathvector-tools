
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { APP_TITLE } from '@/utils/constants';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, onSectionChange }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  // Handle scroll event to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navigationItems = [
    { id: 'calculator', label: 'Vector Calculator', icon: 'fa-calculator' },
    { id: 'exercises', label: 'Oefeningen', icon: 'fa-book' },
    { id: 'about', label: 'Over', icon: 'fa-info-circle' },
  ];

  const handleNavClick = (sectionId: string) => {
    onSectionChange(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-2 sm:py-4 transition-all duration-300",
        scrolled ? "glassmorphism shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center opacity-0 animate-fade-in cursor-pointer" 
            onClick={() => handleNavClick('hero')}
          >
            <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 mr-2 sm:mr-3">
              <span className="text-primary font-title font-bold text-sm sm:text-base">M</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold gradient-text font-title tracking-wide">
              {APP_TITLE}
            </h1>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={cn(
                  "nav-link flex items-center px-3 py-2 text-sm lg:text-base rounded-md opacity-0 transition-all",
                  `animate-fade-in-delay-${index + 1}`,
                  activeSection === item.id && "text-primary font-medium"
                )}
              >
                <i className={`fas ${item.icon} mr-2`}></i>
                {item.label}
              </button>
            ))}
            <button className="ml-3 flex items-center bg-gradient-to-r from-primary to-primary/90 text-white px-3 py-2 text-sm lg:text-base rounded-md shadow-sm hover:shadow-md transition-all opacity-0 animate-fade-in-delay-3">
              <i className="fas fa-download mr-2"></i>
              Download PDF
            </button>
          </nav>

          {/* Mobile menu button */}
          <button 
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-md"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <i className="fas fa-times text-xl text-primary"></i>
            ) : (
              <i className="fas fa-bars text-xl text-primary"></i>
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glassmorphism animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={cn(
                    "flex items-center px-4 py-3 rounded-md",
                    activeSection === item.id 
                      ? "bg-primary/10 text-primary" 
                      : "hover:bg-gray-50"
                  )}
                >
                  <i className={`fas ${item.icon} mr-2`}></i>
                  {item.label}
                </button>
              ))}
              <button className="flex items-center bg-primary text-white px-4 py-3 rounded-md mt-2">
                <i className="fas fa-download mr-2"></i>
                Download PDF
              </button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
