
export const APP_TITLE = "MathVector Analytics";

export const SECTION_TRANSITIONS = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export const VECTOR_COLORS = {
  primary: "#3b82f6", // Vector 1
  secondary: "#ec4899", // Vector 2 
  result: "#10b981", // Result vector
  angle: "#8b5cf6", // Angle measurement
  grid: "#94a3b8", // Grid lines
  axes: "#334155", // X and Y axes
};

export const VECTOR_EXERCISES = [
  {
    id: 1,
    title: "Angle Between Vectors",
    description: "Calculate the angle between two vectors u and v.",
    difficulty: "Basic",
  },
  {
    id: 2,
    title: "Inner Product Calculation",
    description: "Find the inner product of the given vectors.",
    difficulty: "Basic",
  },
  {
    id: 3,
    title: "Perpendicular Vectors",
    description: "Determine if the two vectors are perpendicular.",
    difficulty: "Intermediate",
  },
  {
    id: 4,
    title: "Triangle Centroid",
    description: "Calculate the centroid of a triangle and find angles between vectors.",
    difficulty: "Advanced",
  },
  {
    id: 5,
    title: "Angle Between Lines",
    description: "Calculate the angle between two lines using their direction vectors.",
    difficulty: "Advanced",
  },
];

export const ANGLE_TYPES = {
  sharp: {
    name: "Sharp Angle",
    description: "The angle is less than 90°",
    className: "text-blue-500",
  },
  right: {
    name: "Right Angle",
    description: "The angle is exactly 90°",
    className: "text-green-500",
  },
  obtuse: {
    name: "Obtuse Angle",
    description: "The angle is greater than 90°",
    className: "text-purple-500",
  },
};

export const TOOL_TIPS = {
  innerProduct: "The inner product of two vectors is the product of their magnitudes and the cosine of the angle between them.",
  angle: "The angle between two vectors is calculated using the formula: cos(α) = (u·v)/(|u|·|v|)",
  perpendicular: "Two vectors are perpendicular if their inner product equals zero.",
  calculator: "Enter the coordinates of the two vectors to calculate their inner product and the angle between them.",
  exercise: "Practice your vector calculations with randomly generated exercises.",
};
