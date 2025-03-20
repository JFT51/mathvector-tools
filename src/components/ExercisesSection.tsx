
import React, { useState } from 'react';
import { VECTOR_EXERCISES, TOOL_TIPS } from '@/utils/constants';
import { generateExercise } from '@/utils/mathUtils';
import { BookIcon, CheckIcon, XIcon, RefreshCwIcon, EyeIcon, InfoIcon } from 'lucide-react';
import VectorVisualization from './VectorVisualization';
import { cn } from '@/lib/utils';

interface Exercise {
  vector1: [number, number];
  vector2: [number, number];
  innerProduct: number;
  angle: number;
  angleType: 'sharp' | 'right' | 'obtuse';
  isPerpendicular: boolean;
}

const ExercisesSection: React.FC = () => {
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [exerciseType, setExerciseType] = useState<'angle' | 'innerProduct' | 'perpendicular'>('angle');
  const [difficulty, setDifficulty] = useState<'Basis' | 'Gemiddeld' | 'Gevorderd'>('Basis');
  
  // Generate a new exercise
  const handleGenerateExercise = () => {
    const exercise = generateExercise();
    // Explicitly cast to ensure it matches the Exercise type
    const typedExercise: Exercise = {
      vector1: exercise.vector1 as [number, number],
      vector2: exercise.vector2 as [number, number],
      innerProduct: exercise.innerProduct,
      angle: exercise.angle,
      angleType: exercise.angleType as 'sharp' | 'right' | 'obtuse',
      isPerpendicular: exercise.isPerpendicular
    };
    setCurrentExercise(typedExercise);
    setUserAnswer('');
    setShowSolution(false);
    setIsCorrect(null);
  };
  
  // Check user's answer
  const handleCheckAnswer = () => {
    if (!currentExercise || !userAnswer) return;
    
    let correct = false;
    
    // Convert user answer to number if needed
    const numericAnswer = parseFloat(userAnswer);
    
    switch (exerciseType) {
      case 'angle':
        // Allow some tolerance for angle calculations (±0.5 degrees)
        correct = Math.abs(numericAnswer - currentExercise.angle) <= 0.5;
        break;
      case 'innerProduct':
        // Allow some tolerance for inner product calculations (±0.1)
        correct = Math.abs(numericAnswer - currentExercise.innerProduct) <= 0.1;
        break;
      case 'perpendicular':
        // For perpendicular, accept "yes"/"no" or "true"/"false"
        const normalizedAnswer = userAnswer.toLowerCase().trim();
        const isPerpendicular = normalizedAnswer === 'ja' || normalizedAnswer === 'yes' || normalizedAnswer === 'true';
        correct = isPerpendicular === currentExercise.isPerpendicular;
        break;
    }
    
    setIsCorrect(correct);
  };
  
  // Toggle solution visibility
  const handleToggleSolution = () => {
    setShowSolution(!showSolution);
  };
  
  // Get the correct answer based on exercise type
  const getCorrectAnswer = () => {
    if (!currentExercise) return '';
    
    switch (exerciseType) {
      case 'angle':
        return `${currentExercise.angle}°`;
      case 'innerProduct':
        return `${currentExercise.innerProduct}`;
      case 'perpendicular':
        return currentExercise.isPerpendicular ? 'Ja' : 'Nee';
    }
  };
  
  // Get the exercise prompt
  const getExercisePrompt = () => {
    if (!currentExercise) return '';
    
    const { vector1, vector2 } = currentExercise;
    const u = `u(${vector1[0]}, ${vector1[1]})`;
    const v = `v(${vector2[0]}, ${vector2[1]})`;
    
    switch (exerciseType) {
      case 'angle':
        return `Bereken de hoek (in graden) tussen de vectoren ${u} en ${v}.`;
      case 'innerProduct':
        return `Bereken het inwendig product van de vectoren ${u} en ${v}.`;
      case 'perpendicular':
        return `Bepaal of de vectoren ${u} en ${v} loodrecht op elkaar staan. Antwoord met "Ja" of "Nee".`;
    }
  };
  
  // Step-by-step solution
  const getSolutionSteps = () => {
    if (!currentExercise) return [];
    
    const { vector1, vector2, innerProduct, angle } = currentExercise;
    const [x1, y1] = vector1;
    const [x2, y2] = vector2;
    
    switch (exerciseType) {
      case 'angle':
        return [
          {
            title: "Bereken het inwendig product",
            content: `u · v = (${x1} × ${x2}) + (${y1} × ${y2}) = ${innerProduct}`
          },
          {
            title: "Bereken de groottes",
            content: `|u| = √(${x1}² + ${y1}²) = ${Math.sqrt(x1*x1 + y1*y1).toFixed(2)}\n|v| = √(${x2}² + ${y2}²) = ${Math.sqrt(x2*x2 + y2*y2).toFixed(2)}`
          },
          {
            title: "Pas de formule voor de hoek toe",
            content: `cos(α) = (u · v) / (|u| × |v|) = ${innerProduct} / (${Math.sqrt(x1*x1 + y1*y1).toFixed(2)} × ${Math.sqrt(x2*x2 + y2*y2).toFixed(2)}) = ${Math.cos(angle * Math.PI / 180).toFixed(4)}`
          },
          {
            title: "Bereken de hoek in graden",
            content: `α = arccos(${Math.cos(angle * Math.PI / 180).toFixed(4)}) = ${angle}°`
          }
        ];
      case 'innerProduct':
        return [
          {
            title: "Pas de formule voor inwendig product toe",
            content: `u · v = (${x1} × ${x2}) + (${y1} × ${y2})`
          },
          {
            title: "Bereken elke term",
            content: `(${x1} × ${x2}) = ${x1 * x2}\n(${y1} × ${y2}) = ${y1 * y2}`
          },
          {
            title: "Tel de termen op",
            content: `u · v = ${x1 * x2} + ${y1 * y2} = ${innerProduct}`
          }
        ];
      case 'perpendicular':
        return [
          {
            title: "Bereken het inwendig product",
            content: `u · v = (${x1} × ${x2}) + (${y1} × ${y2}) = ${innerProduct}`
          },
          {
            title: "Controleer of het inwendig product gelijk is aan nul",
            content: `Vectoren staan loodrecht op elkaar als hun inwendig product gelijk is aan nul.\nInwendig product = ${innerProduct}\nDaarom staan de vectoren ${Math.abs(innerProduct) < 0.000001 ? 'loodrecht op elkaar (inwendig product ≈ 0)' : 'niet loodrecht op elkaar (inwendig product ≠ 0)'}.`
          }
        ];
    }
  };
  
  return (
    <div className="bg-white/60 backdrop-blur-lg rounded-xl shadow-lg border border-white/50 p-6 lg:p-8 transition-all duration-300 hover:shadow-xl">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Vector Oefeningen</h2>
            <p className="text-gray-600">Oefen het berekenen van vectoreigenschappen met interactieve oefeningen</p>
          </div>
          <div className="relative group mt-4 md:mt-0">
            <InfoIcon className="w-5 h-5 text-gray-400 hover:text-primary transition-colors cursor-help" />
            <div className="absolute right-0 transform translate-y-2 z-10 w-64 p-3 bg-white rounded-lg shadow-lg border border-gray-200 text-sm text-gray-600 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              {TOOL_TIPS.exercise}
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Exercise generator */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Maak Oefening</h3>
            
            {/* Exercise type selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Type Oefening</label>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => setExerciseType('angle')}
                  className={cn(
                    "px-3 py-2 text-sm rounded-md transition-colors",
                    exerciseType === 'angle' 
                      ? "bg-primary text-white" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  )}
                >
                  Hoek Tussen Vectoren
                </button>
                <button 
                  onClick={() => setExerciseType('innerProduct')}
                  className={cn(
                    "px-3 py-2 text-sm rounded-md transition-colors",
                    exerciseType === 'innerProduct' 
                      ? "bg-primary text-white" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  )}
                >
                  Inwendig Product
                </button>
                <button 
                  onClick={() => setExerciseType('perpendicular')}
                  className={cn(
                    "px-3 py-2 text-sm rounded-md transition-colors",
                    exerciseType === 'perpendicular' 
                      ? "bg-primary text-white" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  )}
                >
                  Loodrechte Vectoren
                </button>
              </div>
            </div>
            
            {/* Difficulty selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Moeilijkheidsgraad</label>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => setDifficulty('Basis')}
                  className={cn(
                    "px-3 py-2 text-sm rounded-md transition-colors",
                    difficulty === 'Basis' 
                      ? "bg-green-500 text-white" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  )}
                >
                  Basis
                </button>
                <button 
                  onClick={() => setDifficulty('Gemiddeld')}
                  className={cn(
                    "px-3 py-2 text-sm rounded-md transition-colors",
                    difficulty === 'Gemiddeld' 
                      ? "bg-yellow-500 text-white" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  )}
                >
                  Gemiddeld
                </button>
                <button 
                  onClick={() => setDifficulty('Gevorderd')}
                  className={cn(
                    "px-3 py-2 text-sm rounded-md transition-colors",
                    difficulty === 'Gevorderd' 
                      ? "bg-red-500 text-white" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  )}
                >
                  Gevorderd
                </button>
              </div>
            </div>
            
            {/* Generate exercise button */}
            <div className="pt-2">
              <button
                onClick={handleGenerateExercise}
                className="w-full py-3 bg-gradient-to-r from-primary to-primary/90 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all flex items-center justify-center"
              >
                <RefreshCwIcon className="w-5 h-5 mr-2" />
                Genereer Nieuwe Oefening
              </button>
            </div>
          </div>
          
          {/* Exercise list */}
          <div className="mt-6 space-y-3">
            <h3 className="text-base font-medium text-gray-700 flex items-center">
              <BookIcon className="w-4 h-4 mr-2 text-gray-500" />
              Beschikbare Oefeningtypes
            </h3>
            <div className="space-y-2">
              {VECTOR_EXERCISES.map((exercise) => (
                <div 
                  key={exercise.id}
                  className="p-3 bg-gray-50 border border-gray-100 rounded-lg hover:border-gray-200 transition-colors"
                >
                  <div className="flex justify-between">
                    <h4 className="text-sm font-medium text-gray-900">{exercise.title}</h4>
                    <span className={cn(
                      "text-xs px-2 py-0.5 rounded-full",
                      exercise.difficulty === 'Basis' && "bg-green-100 text-green-800",
                      exercise.difficulty === 'Gemiddeld' && "bg-yellow-100 text-yellow-800",
                      exercise.difficulty === 'Gevorderd' && "bg-red-100 text-red-800"
                    )}>
                      {exercise.difficulty}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">{exercise.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Exercise display and solution */}
        <div className="space-y-6">
          {!currentExercise ? (
            <div className="bg-gray-50 rounded-xl border border-gray-200 h-full min-h-[400px] flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <BookIcon className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Geen Oefening Gegenereerd</h3>
              <p className="text-gray-500 max-w-xs">Genereer een nieuwe oefening om te beginnen met het oefenen van vectorberekeningen.</p>
              <button
                onClick={handleGenerateExercise}
                className="mt-6 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
              >
                Genereer Oefening
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Exercise prompt */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Oefening</h3>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <p className="text-gray-800">{getExercisePrompt()}</p>
                </div>
                
                {/* Vector visualization */}
                <div className="mt-4">
                  <VectorVisualization 
                    vector1={currentExercise.vector1} 
                    vector2={currentExercise.vector2} 
                    width={350} 
                    height={280} 
                    showAngle={false}
                    showGrid={true}
                    animated={false}
                  />
                </div>
              </div>
              
              {/* Answer input */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Jouw Antwoord</h3>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder={exerciseType === 'perpendicular' ? "Ja of Nee" : "Voer je antwoord in..."}
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  />
                  <button
                    onClick={handleCheckAnswer}
                    disabled={!userAnswer}
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Controleer
                  </button>
                </div>
                
                {/* Feedback message */}
                {isCorrect !== null && (
                  <div className={cn(
                    "mt-3 p-3 rounded-md flex items-start",
                    isCorrect ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
                  )}>
                    {isCorrect ? (
                      <>
                        <CheckIcon className="w-5 h-5 mr-2 text-green-500 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Correct!</p>
                          <p className="text-sm opacity-80">Je antwoord is juist.</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <XIcon className="w-5 h-5 mr-2 text-red-500 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Onjuist</p>
                          <p className="text-sm opacity-80">
                            Het juiste antwoord is {getCorrectAnswer()}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                )}
                
                {/* Show solution button */}
                <div className="mt-4">
                  <button
                    onClick={handleToggleSolution}
                    className="flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    <EyeIcon className="w-4 h-4 mr-1" />
                    {showSolution ? "Verberg Oplossing" : "Toon Oplossing"}
                  </button>
                </div>
              </div>
              
              {/* Step-by-step solution */}
              {showSolution && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 animate-fade-in">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Oplossing</h3>
                  <div className="space-y-4">
                    {getSolutionSteps().map((step, index) => (
                      <div key={index} className="space-y-2">
                        <h4 className="text-sm font-medium text-gray-800 flex items-center">
                          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-xs mr-2">
                            {index + 1}
                          </span>
                          {step.title}
                        </h4>
                        <pre className="bg-gray-50 p-3 rounded-md text-sm font-mono text-gray-700 whitespace-pre-wrap">
                          {step.content}
                        </pre>
                      </div>
                    ))}
                    
                    <div className="mt-2 pt-2 border-t border-gray-100">
                      <div className="flex items-center">
                        <span className="font-medium text-primary mr-2">Eindantwoord:</span>
                        <span className="font-mono">{getCorrectAnswer()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExercisesSection;
