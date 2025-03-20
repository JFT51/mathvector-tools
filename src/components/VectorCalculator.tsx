
import React, { useState, useEffect } from 'react';
import { 
  calculateInnerProduct, 
  calculateAngle, 
  calculateMagnitude,
  arePerpendicular,
  getAngleType
} from '@/utils/mathUtils';
import { ANGLE_TYPES, TOOL_TIPS } from '@/utils/constants';
import { cn } from '@/lib/utils';
import { InfoIcon, RotateCcwIcon, Calculator, CornerRightDownIcon } from 'lucide-react';
import VectorVisualization from './VectorVisualization';

const VectorCalculator: React.FC = () => {
  // Vector coordinates
  const [vector1, setVector1] = useState<[number, number]>([3, 4]);
  const [vector2, setVector2] = useState<[number, number]>([8, 6]);
  
  // Results
  const [innerProduct, setInnerProduct] = useState<number>(0);
  const [angle, setAngle] = useState<number>(0);
  const [angleType, setAngleType] = useState<'sharp' | 'right' | 'obtuse'>('sharp');
  const [isPerpendicular, setIsPerpendicular] = useState<boolean>(false);
  
  // Input error state
  const [inputError, setInputError] = useState<string | null>(null);
  
  // Calculate results when vectors change
  useEffect(() => {
    try {
      const [x1, y1] = vector1;
      const [x2, y2] = vector2;
      
      if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) {
        setInputError("Voer geldige getallen in voor alle coördinaten");
        return;
      }
      
      setInputError(null);
      
      // Calculate inner product
      const product = calculateInnerProduct(x1, y1, x2, y2);
      setInnerProduct(Math.round(product * 100) / 100);
      
      // Calculate angle
      const calculatedAngle = calculateAngle(x1, y1, x2, y2);
      setAngle(calculatedAngle);
      
      // Determine angle type
      setAngleType(getAngleType(calculatedAngle));
      
      // Check if vectors are perpendicular
      setIsPerpendicular(arePerpendicular(x1, y1, x2, y2));
      
    } catch (error) {
      console.error("Berekeningsfout:", error);
      setInputError("Er is een fout opgetreden tijdens de berekening");
    }
  }, [vector1, vector2]);
  
  // Handle vector input changes
  const handleVectorChange = (
    vectorNumber: 1 | 2,
    coordinate: 'x' | 'y',
    value: string
  ) => {
    const numValue = value === '' ? 0 : Number(value);
    
    if (vectorNumber === 1) {
      if (coordinate === 'x') {
        setVector1([numValue, vector1[1]]);
      } else {
        setVector1([vector1[0], numValue]);
      }
    } else {
      if (coordinate === 'x') {
        setVector2([numValue, vector2[1]]);
      } else {
        setVector2([vector2[0], numValue]);
      }
    }
  };
  
  // Reset to default values
  const handleReset = () => {
    setVector1([3, 4]);
    setVector2([8, 6]);
  };
  
  // Create example vectors
  const handleExample = (example: 'perpendicular' | 'parallel' | 'acute' | 'obtuse') => {
    switch (example) {
      case 'perpendicular':
        setVector1([4, 3]);
        setVector2([-3, 4]);
        break;
      case 'parallel':
        setVector1([2, 4]);
        setVector2([3, 6]);
        break;
      case 'acute':
        setVector1([5, 1]);
        setVector2([3, 2]);
        break;
      case 'obtuse':
        setVector1([2, 3]);
        setVector2([-4, 1]);
        break;
    }
  };
  
  return (
    <div className="bg-white/60 backdrop-blur-lg rounded-xl shadow-lg border border-white/50 p-6 lg:p-8 transition-all duration-300 hover:shadow-xl">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Vector Calculator</h2>
            <p className="text-gray-600">Bereken inwendig product en hoek tussen twee vectoren</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-2">
            <button
              onClick={handleReset}
              className="flex items-center text-sm text-gray-500 hover:text-gray-800 transition-colors py-1 px-2 rounded-md hover:bg-gray-100"
            >
              <RotateCcwIcon className="w-4 h-4 mr-1" />
              Reset
            </button>
          </div>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Voer Vector Coördinaten In</h3>
              <div className="relative group">
                <InfoIcon className="w-4 h-4 text-gray-400 hover:text-primary transition-colors cursor-help" />
                <div className="absolute right-0 transform translate-y-2 z-10 w-64 p-3 bg-white rounded-lg shadow-lg border border-gray-200 text-sm text-gray-600 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {TOOL_TIPS.calculator}
                </div>
              </div>
            </div>
            
            {/* Vector 1 input */}
            <div className="p-4 rounded-lg border border-blue-100 bg-blue-50/50">
              <label className="block text-sm font-medium text-blue-800 mb-3">Vector u</label>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1">x₁ coördinaat</label>
                  <input
                    type="number"
                    value={vector1[0]}
                    onChange={(e) => handleVectorChange(1, 'x', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    step="any"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1">y₁ coördinaat</label>
                  <input
                    type="number"
                    value={vector1[1]}
                    onChange={(e) => handleVectorChange(1, 'y', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    step="any"
                  />
                </div>
              </div>
            </div>
            
            {/* Vector 2 input */}
            <div className="p-4 rounded-lg border border-pink-100 bg-pink-50/50">
              <label className="block text-sm font-medium text-pink-800 mb-3">Vector v</label>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1">x₂ coördinaat</label>
                  <input
                    type="number"
                    value={vector2[0]}
                    onChange={(e) => handleVectorChange(2, 'x', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    step="any"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1">y₂ coördinaat</label>
                  <input
                    type="number"
                    value={vector2[1]}
                    onChange={(e) => handleVectorChange(2, 'y', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    step="any"
                  />
                </div>
              </div>
            </div>
            
            {/* Error message */}
            {inputError && (
              <div className="mt-2 text-red-500 text-sm">{inputError}</div>
            )}
          </div>
          
          {/* Examples */}
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-3">Voorbeelden</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleExample('perpendicular')}
                className="px-3 py-1.5 text-xs rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                Loodrechte Vectoren
              </button>
              <button
                onClick={() => handleExample('parallel')}
                className="px-3 py-1.5 text-xs rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                Parallelle Vectoren
              </button>
              <button
                onClick={() => handleExample('acute')}
                className="px-3 py-1.5 text-xs rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                Scherpe Hoek
              </button>
              <button
                onClick={() => handleExample('obtuse')}
                className="px-3 py-1.5 text-xs rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                Stompe Hoek
              </button>
            </div>
          </div>
          
          {/* Results */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
              <Calculator className="w-5 h-5 mr-2 text-primary" />
              Resultaten
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">Inwendig Product:</span>
                  <span className="font-mono font-medium text-gray-900">{innerProduct}</span>
                  <div className="relative group ml-2">
                    <InfoIcon className="w-4 h-4 text-gray-400 cursor-help" />
                    <div className="absolute left-0 transform translate-y-2 z-10 w-64 p-3 bg-white rounded-lg shadow-lg border border-gray-200 text-sm text-gray-600 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      {TOOL_TIPS.innerProduct}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  <code className="text-xs font-mono bg-gray-100 px-1 py-0.5 rounded">
                    u · v = ({vector1[0]} × {vector2[0]}) + ({vector1[1]} × {vector2[1]}) = {innerProduct}
                  </code>
                </div>
              </div>
              
              <div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">Hoek tussen vectoren:</span>
                  <span 
                    className={cn(
                      "font-mono font-medium",
                      angleType === 'sharp' && "text-blue-600",
                      angleType === 'right' && "text-green-600",
                      angleType === 'obtuse' && "text-purple-600"
                    )}
                  >
                    {angle}° ({ANGLE_TYPES[angleType].name})
                  </span>
                  <div className="relative group ml-2">
                    <InfoIcon className="w-4 h-4 text-gray-400 cursor-help" />
                    <div className="absolute left-0 transform translate-y-2 z-10 w-64 p-3 bg-white rounded-lg shadow-lg border border-gray-200 text-sm text-gray-600 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      {TOOL_TIPS.angle}
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">Loodrecht:</span>
                  <span className={cn(
                    "font-medium",
                    isPerpendicular ? "text-green-600" : "text-gray-900"
                  )}>
                    {isPerpendicular ? "Ja" : "Nee"}
                  </span>
                  <div className="relative group ml-2">
                    <InfoIcon className="w-4 h-4 text-gray-400 cursor-help" />
                    <div className="absolute left-0 transform translate-y-2 z-10 w-64 p-3 bg-white rounded-lg shadow-lg border border-gray-200 text-sm text-gray-600 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      {TOOL_TIPS.perpendicular}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Visualization */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Vector Visualisatie</h3>
          <div className="rounded-xl overflow-hidden bg-white shadow-sm">
            <VectorVisualization 
              vector1={vector1} 
              vector2={vector2} 
              width={400} 
              height={400} 
              showAngle={true}
              showGrid={true}
              animated={true}
            />
          </div>
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-sm text-gray-600">
            <div className="flex items-start">
              <CornerRightDownIcon className="w-5 h-5 mr-2 text-gray-400 mt-0.5" />
              <p>
                De hoek tussen vectoren u({vector1[0]}, {vector1[1]}) en v({vector2[0]}, {vector2[1]}) is {angle}°. 
                Dit is {isPerpendicular ? "een rechte hoek, wat betekent dat de vectoren loodrecht op elkaar staan." : `een ${angleType === 'sharp' ? 'scherpe' : angleType === 'right' ? 'rechte' : 'stompe'} hoek.`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VectorCalculator;
