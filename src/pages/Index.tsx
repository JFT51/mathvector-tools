
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
              Vector Mathematics
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
              {APP_TITLE}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Interactive tools for teaching and learning vector operations, inner products, and angle calculations.
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
              Try Vector Calculator
              <ChevronRightIcon className="w-5 h-5 ml-1" />
            </button>
            <button
              onClick={() => handleSectionChange('exercises')}
              className="flex items-center px-6 py-3 bg-white text-gray-800 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              <BookOpenIcon className="w-5 h-5 mr-2" />
              Practice with Exercises
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
              Calculate inner products and angles between vectors with an interactive visualization tool.
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
            <span className="text-sm font-medium text-primary">EXERCISES</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Practice Exercises</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Enhance your understanding with practical exercises on vector operations and angle calculations.
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
            <span className="text-sm font-medium text-primary">ABOUT</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">About MathVector Analytics</h2>
          </div>
          
          <div className="bg-white/60 backdrop-blur-lg rounded-xl shadow-lg border border-white/50 p-6 lg:p-8">
            <div className="prose prose-lg prose-blue max-w-none">
              <h3>Educational Purpose</h3>
              <p>
                MathVector Analytics is designed to help mathematics educators and students explore and understand vector operations, with a focus on inner products and angle calculations. The platform provides interactive tools for visualization and computation of vector properties.
              </p>
              
              <h3>Key Features</h3>
              <ul>
                <li>Interactive vector calculator with real-time visualization</li>
                <li>Practice exercises with automatic grading and step-by-step solutions</li>
                <li>Dynamic visual representations of vector relationships</li>
                <li>Comprehensive coverage of inner product concepts</li>
              </ul>
              
              <h3>Mathematical Concepts Covered</h3>
              <p>
                The core concepts covered in this platform include:
              </p>
              <ul>
                <li>Inner (dot) product of two vectors</li>
                <li>Angle calculation between vectors using the inner product</li>
                <li>Perpendicularity (orthogonality) of vectors</li>
                <li>Applications in geometry, including triangle centroids</li>
                <li>Angle calculations between lines using direction vectors</li>
              </ul>
              
              <h3>Using This Platform</h3>
              <p>
                Teachers can use this platform for classroom demonstrations, to generate exercises for students, and to provide interactive learning materials. Students can use the tools to practice vector calculations, visualize vector relationships, and check their work with step-by-step solutions.
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
              Educational tools for vector mathematics
            </p>
          </div>
          
          <div className="flex gap-6">
            <button onClick={() => handleSectionChange('calculator')} className="text-gray-600 hover:text-primary transition-colors">
              Calculator
            </button>
            <button onClick={() => handleSectionChange('exercises')} className="text-gray-600 hover:text-primary transition-colors">
              Exercises
            </button>
            <button onClick={() => handleSectionChange('about')} className="text-gray-600 hover:text-primary transition-colors">
              About
            </button>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto mt-6 pt-6 border-t border-gray-100 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} MathVector Analytics. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;
