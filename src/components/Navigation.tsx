
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { CalculatorIcon, BookIcon, DownloadIcon, InfoIcon, MenuIcon, XIcon } from 'lucide-react';
import { APP_TITLE } from '@/utils/constants';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, onSectionChange }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    { id: 'calculator', label: 'Vector Calculator', icon: <CalculatorIcon className="w-4 h-4 mr-2" /> },
    { id: 'exercises', label: 'Oefeningen', icon: <BookIcon className="w-4 h-4 mr-2" /> },
    { id: 'about', label: 'Over', icon: <InfoIcon className="w-4 h-4 mr-2" /> },
  ];

  const handleNavClick = (sectionId: string) => {
    onSectionChange(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300",
        scrolled ? "bg-white/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center opacity-0 animate-fade-in" 
            onClick={() => handleNavClick('hero')}
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 mr-3">
              <span className="text-primary font-bold">M</span>
            </div>
            <h1 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
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
                  "nav-link flex items-center px-4 py-2 rounded-md opacity-0 transition-all",
                  `animate-fade-in-delay-${index + 1}`,
                  activeSection === item.id && "text-primary font-medium"
                )}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
            <button className="ml-4 flex items-center bg-gradient-to-r from-primary to-primary/90 text-white px-4 py-2 rounded-md shadow-sm hover:shadow-md transition-all opacity-0 animate-fade-in-delay-3">
              <DownloadIcon className="w-4 h-4 mr-2" />
              Download PDF
            </button>
          </nav>

          {/* Mobile menu button */}
          <button 
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-md"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <XIcon className="w-6 h-6 text-primary" />
            ) : (
              <MenuIcon className="w-6 h-6 text-primary" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100 animate-fade-in">
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
                  {item.icon}
                  {item.label}
                </button>
              ))}
              <button className="flex items-center bg-primary text-white px-4 py-3 rounded-md mt-2">
                <DownloadIcon className="w-4 h-4 mr-2" />
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
