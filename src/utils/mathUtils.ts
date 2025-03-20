
/**
 * Calculate the inner product (dot product) of two 2D vectors
 */
export const calculateInnerProduct = (
  x1: number, 
  y1: number, 
  x2: number, 
  y2: number
): number => {
  return x1 * x2 + y1 * y2;
};

/**
 * Calculate the magnitude (length) of a 2D vector
 */
export const calculateMagnitude = (x: number, y: number): number => {
  return Math.sqrt(x * x + y * y);
};

/**
 * Calculate the angle between two 2D vectors in degrees
 */
export const calculateAngle = (
  x1: number, 
  y1: number, 
  x2: number, 
  y2: number
): number => {
  const dotProduct = calculateInnerProduct(x1, y1, x2, y2);
  const mag1 = calculateMagnitude(x1, y1);
  const mag2 = calculateMagnitude(x2, y2);
  
  // Prevent division by zero
  if (mag1 === 0 || mag2 === 0) {
    return 0;
  }
  
  // Use Math.min/max to handle floating point errors that could push values outside [-1, 1]
  const cosine = Math.max(-1, Math.min(1, dotProduct / (mag1 * mag2)));
  return Math.round(Math.acos(cosine) * (180 / Math.PI) * 100) / 100;
};

/**
 * Check if two vectors are perpendicular (orthogonal)
 */
export const arePerpendicular = (
  x1: number, 
  y1: number, 
  x2: number, 
  y2: number
): boolean => {
  // Vectors are perpendicular if their dot product is zero (or very close to zero due to floating point precision)
  return Math.abs(calculateInnerProduct(x1, y1, x2, y2)) < 0.000001;
};

/**
 * Check if the angle is sharp (< 90°), right (= 90°), or obtuse (> 90°)
 */
export const getAngleType = (angle: number): 'sharp' | 'right' | 'obtuse' => {
  if (Math.abs(angle - 90) < 0.01) {
    return 'right';
  } else if (angle < 90) {
    return 'sharp';
  } else {
    return 'obtuse';
  }
};

/**
 * Calculate the centroid of a triangle with vertices (x1,y1), (x2,y2), (x3,y3)
 */
export const calculateCentroid = (
  x1: number, 
  y1: number, 
  x2: number, 
  y2: number, 
  x3: number, 
  y3: number
): [number, number] => {
  const centroidX = (x1 + x2 + x3) / 3;
  const centroidY = (y1 + y2 + y3) / 3;
  return [centroidX, centroidY];
};

/**
 * Convert polar coordinates (r, theta) to Cartesian coordinates (x, y)
 * theta should be in radians
 */
export const polarToCartesian = (r: number, theta: number): [number, number] => {
  const x = r * Math.cos(theta);
  const y = r * Math.sin(theta);
  return [x, y];
};

/**
 * Convert degrees to radians
 */
export const degreesToRadians = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

/**
 * Generate a random vector with specified magnitude range
 */
export const generateRandomVector = (minMag: number = 1, maxMag: number = 10): [number, number] => {
  // Random angle in radians
  const angle = Math.random() * 2 * Math.PI;
  // Random magnitude
  const magnitude = minMag + Math.random() * (maxMag - minMag);
  
  return polarToCartesian(magnitude, angle);
};

/**
 * Generate a random exercise problem with vectors
 */
export const generateExercise = () => {
  // Generate two random vectors
  const [x1, y1] = generateRandomVector(3, 8);
  const [x2, y2] = generateRandomVector(3, 8);
  
  // Round to 1 decimal place
  const roundedX1 = Math.round(x1 * 10) / 10;
  const roundedY1 = Math.round(y1 * 10) / 10;
  const roundedX2 = Math.round(x2 * 10) / 10;
  const roundedY2 = Math.round(y2 * 10) / 10;
  
  // Calculate the answer
  const innerProduct = calculateInnerProduct(roundedX1, roundedY1, roundedX2, roundedY2);
  const angle = calculateAngle(roundedX1, roundedY1, roundedX2, roundedY2);
  const angleType = getAngleType(angle);
  
  return {
    vector1: [roundedX1, roundedY1],
    vector2: [roundedX2, roundedY2],
    innerProduct: Math.round(innerProduct * 100) / 100,
    angle: angle,
    angleType: angleType,
    isPerpendicular: angleType === 'right'
  };
};
