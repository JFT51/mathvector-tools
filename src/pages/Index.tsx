
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Background from '@/components/Background';
import Navigation from '@/components/Navigation';
import VectorCalculator from '@/components/VectorCalculator';
import ExercisesSection from '@/components/ExercisesSection';
import { APP_TITLE } from '@/utils/constants';
import { ArrowDownIcon, BookOpenIcon, CalculatorIcon, ChevronRightIcon } from 'lucide-react';

const Index = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [scrollY, setScrollY] = useState<number>(0);

  // Handle scrolling
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Update active section based on scroll position
      const sections = ['hero', 'calculator', 'exercises', 'about'];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom > 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle navigation clicks
  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen">
      <Background />

      {/* Navigation */}
      <Navigation activeSection={activeSection} onSectionChange={handleSectionChange} />

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex flex-col items-center justify-center pt-16 pb-12 px-4">
        <div className="max-w-5xl w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-block px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full mb-4">
              Vector Wiskunde
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
              {APP_TITLE}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Interactieve tools voor het onderwijzen en leren van vectorbewerkingen, inwendige producten en hoekberekeningen.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-wrap gap-4 justify-center mt-8"
          >
            <button
              onClick={() => handleSectionChange('calculator')}
              className="flex items-center px-6 py-3 bg-primary text-white rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <CalculatorIcon className="w-5 h-5 mr-2" />
              Probeer Vector Calculator
              <ChevronRightIcon className="w-5 h-5 ml-1" />
            </button>
            <button
              onClick={() => handleSectionChange('exercises')}
              className="flex items-center px-6 py-3 bg-white text-gray-800 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              <BookOpenIcon className="w-5 h-5 mr-2" />
              Oefen met Opdrachten
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-16 animate-bounce"
          >
            <button
              onClick={() => handleSectionChange('calculator')}
              className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md hover:shadow-lg transition-all"
            >
              <ArrowDownIcon className="w-6 h-6 text-gray-600" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Vector Calculator Section */}
      <section 
        id="calculator" 
        className="py-16 md:py-24 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <span className="text-sm font-medium text-primary">CALCULATOR</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Vector Calculator</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Bereken inwendige producten en hoeken tussen vectoren met een interactief visualisatiehulpmiddel.
            </p>
          </div>
          <VectorCalculator />
        </div>
      </section>

      {/* Exercises Section */}
      <section 
        id="exercises" 
        className="py-16 md:py-24 px-4 bg-gradient-to-b from-white/0 to-white/30"
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <span className="text-sm font-medium text-primary">OEFENINGEN</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Oefenopdrachten</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Verbeter je begrip met praktische oefeningen over vectoroperaties en hoekberekeningen.
            </p>
          </div>
          <ExercisesSection />
        </div>
      </section>

      {/* About Section */}
      <section 
        id="about" 
        className="py-16 md:py-24 px-4"
      >
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <span className="text-sm font-medium text-primary">OVER</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Over MathVector Analyse</h2>
          </div>
          
          <div className="bg-white/60 backdrop-blur-lg rounded-xl shadow-lg border border-white/50 p-6 lg:p-8">
            <div className="prose prose-lg prose-blue max-w-none">
              <h3>Educatief Doel</h3>
              <p>
                MathVector Analyse is ontworpen om wiskundedocenten en studenten te helpen bij het verkennen en begrijpen van vectorbewerkingen, met de nadruk op inwendige producten en hoekberekeningen. Het platform biedt interactieve tools voor visualisatie en berekening van vectoreigenschappen.
              </p>
              
              <h3>Belangrijkste Kenmerken</h3>
              <ul>
                <li>Interactieve vector calculator met realtime visualisatie</li>
                <li>Oefenopdrachten met automatische beoordeling en stapsgewijze oplossingen</li>
                <li>Dynamische visuele representaties van vectorrelaties</li>
                <li>Uitgebreide behandeling van concepten rond inwendig product</li>
              </ul>
              
              <h3>Behandelde Wiskundige Concepten</h3>
              <p>
                De kernconcepten die in dit platform worden behandeld, zijn onder andere:
              </p>
              <ul>
                <li>Inwendig (scalair) product van twee vectoren</li>
                <li>Hoekberekening tussen vectoren met behulp van het inwendig product</li>
                <li>Loodrechtheid (orthogonaliteit) van vectoren</li>
                <li>Toepassingen in de geometrie, waaronder zwaartepunten van driehoeken</li>
                <li>Hoekberekeningen tussen lijnen met behulp van richtingsvectoren</li>
              </ul>
              
              <h3>Gebruik van dit Platform</h3>
              <p>
                Docenten kunnen dit platform gebruiken voor demonstraties in de klas, om oefeningen voor studenten te genereren en om interactief lesmateriaal te bieden. Studenten kunnen de tools gebruiken om vectorberekeningen te oefenen, vectorrelaties te visualiseren en hun werk te controleren met stapsgewijze oplossingen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-200 bg-white/40 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 mr-2">
                <span className="text-primary font-bold text-sm">M</span>
              </div>
              <span className="text-gray-800 font-medium">{APP_TITLE}</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Educatieve tools voor vector wiskunde
            </p>
          </div>
          
          <div className="flex gap-6">
            <button onClick={() => handleSectionChange('calculator')} className="text-gray-600 hover:text-primary transition-colors">
              Calculator
            </button>
            <button onClick={() => handleSectionChange('exercises')} className="text-gray-600 hover:text-primary transition-colors">
              Oefeningen
            </button>
            <button onClick={() => handleSectionChange('about')} className="text-gray-600 hover:text-primary transition-colors">
              Over
            </button>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto mt-6 pt-6 border-t border-gray-100 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} MathVector Analyse. Alle rechten voorbehouden.
        </div>
      </footer>
    </div>
  );
};

export default Index;
