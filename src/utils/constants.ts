
export const APP_TITLE = "MathVector Analyse";

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
    title: "Hoek tussen vectoren",
    description: "Bereken de hoek tussen twee vectoren u en v.",
    difficulty: "Basis",
  },
  {
    id: 2,
    title: "Inwendig product berekening",
    description: "Bereken het inwendig product van de gegeven vectoren.",
    difficulty: "Basis",
  },
  {
    id: 3,
    title: "Loodrechte vectoren",
    description: "Bepaal of de twee vectoren loodrecht op elkaar staan.",
    difficulty: "Gemiddeld",
  },
  {
    id: 4,
    title: "Zwaartepunt driehoek",
    description: "Bereken het zwaartepunt van een driehoek en vind hoeken tussen vectoren.",
    difficulty: "Gevorderd",
  },
  {
    id: 5,
    title: "Hoek tussen lijnen",
    description: "Bereken de hoek tussen twee lijnen met behulp van hun richtingsvectoren.",
    difficulty: "Gevorderd",
  },
];

export const ANGLE_TYPES = {
  sharp: {
    name: "Scherpe hoek",
    description: "De hoek is kleiner dan 90°",
    className: "text-blue-500",
  },
  right: {
    name: "Rechte hoek",
    description: "De hoek is precies 90°",
    className: "text-green-500",
  },
  obtuse: {
    name: "Stompe hoek",
    description: "De hoek is groter dan 90°",
    className: "text-purple-500",
  },
};

export const TOOL_TIPS = {
  innerProduct: "Het inwendig product van twee vectoren is het product van hun lengtes en de cosinus van de hoek tussen hen.",
  angle: "De hoek tussen twee vectoren wordt berekend met de formule: cos(α) = (u·v)/(|u|·|v|)",
  perpendicular: "Twee vectoren staan loodrecht op elkaar als hun inwendig product gelijk is aan nul.",
  calculator: "Voer de coördinaten van de twee vectoren in om hun inwendig product en de hoek tussen hen te berekenen.",
  exercise: "Oefen je vectorberekeningen met willekeurig gegenereerde oefeningen.",
};
