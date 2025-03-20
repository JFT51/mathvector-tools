
import React, { useEffect, useRef, useState } from 'react';
import { VECTOR_COLORS } from '@/utils/constants';
import { calculateAngle, getAngleType } from '@/utils/mathUtils';

interface VectorVisualizationProps {
  vector1: [number, number];
  vector2: [number, number];
  width?: number;
  height?: number;
  showAngle?: boolean;
  showGrid?: boolean;
  animated?: boolean;
}

const VectorVisualization: React.FC<VectorVisualizationProps> = ({
  vector1,
  vector2,
  width = 400,
  height = 400,
  showAngle = true,
  showGrid = true,
  animated = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawn, setIsDrawn] = useState(false);
  
  // Scale vectors to fit within the canvas
  const scaleVectors = () => {
    const [x1, y1] = vector1;
    const [x2, y2] = vector2;
    
    // Find the maximum absolute value among all coordinates
    const maxCoord = Math.max(
      Math.abs(x1), 
      Math.abs(y1), 
      Math.abs(x2), 
      Math.abs(y2)
    );
    
    // Calculate scale factor (leaving margin)
    const maxCanvasDim = Math.min(width, height) / 2;
    const scaleFactor = maxCoord > 0 ? (maxCanvasDim * 0.7) / maxCoord : 1;
    
    return {
      scaled1: [x1 * scaleFactor, y1 * scaleFactor] as [number, number],
      scaled2: [x2 * scaleFactor, y2 * scaleFactor] as [number, number],
      scaleFactor
    };
  };
  
  // Draw vectors on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Set canvas dimensions
    canvas.width = width;
    canvas.height = height;
    
    // Transform to make origin at center
    ctx.translate(width / 2, height / 2);
    // Flip y-axis to make positive y go up
    ctx.scale(1, -1);
    
    // Draw grid if enabled
    if (showGrid) {
      drawGrid(ctx);
    }
    
    // Draw axes
    drawAxes(ctx);
    
    // Scale vectors
    const { scaled1, scaled2, scaleFactor } = scaleVectors();
    
    // If animation is enabled, draw with animation effect
    if (animated && !isDrawn) {
      animateDrawing(ctx, scaled1, scaled2, () => {
        setIsDrawn(true);
      });
    } else {
      // Draw vectors immediately
      drawVector(ctx, [0, 0], scaled1, VECTOR_COLORS.primary, 'u');
      drawVector(ctx, [0, 0], scaled2, VECTOR_COLORS.secondary, 'v');
      
      // Draw angle between vectors if enabled
      if (showAngle && scaled1[0] !== 0 && scaled1[1] !== 0 && scaled2[0] !== 0 && scaled2[1] !== 0) {
        drawAngle(ctx, scaled1, scaled2);
      }
    }
    
    // Add coordinate values for each vector
    drawCoordinateLabels(ctx, scaled1, scaled2, scaleFactor);
    
  }, [vector1, vector2, width, height, showAngle, showGrid, animated, isDrawn]);
  
  // Reset animation when vectors change
  useEffect(() => {
    setIsDrawn(false);
  }, [vector1, vector2]);
  
  // Draw grid
  const drawGrid = (ctx: CanvasRenderingContext2D) => {
    const gridSize = 20;
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    
    ctx.strokeStyle = VECTOR_COLORS.grid;
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    
    // Draw vertical grid lines
    for (let x = -halfWidth; x <= halfWidth; x += gridSize) {
      ctx.moveTo(x, -halfHeight);
      ctx.lineTo(x, halfHeight);
    }
    
    // Draw horizontal grid lines
    for (let y = -halfHeight; y <= halfHeight; y += gridSize) {
      ctx.moveTo(-halfWidth, y);
      ctx.lineTo(halfWidth, y);
    }
    
    ctx.stroke();
  };
  
  // Draw coordinate axes
  const drawAxes = (ctx: CanvasRenderingContext2D) => {
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    
    ctx.strokeStyle = VECTOR_COLORS.axes;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    
    // X-axis
    ctx.moveTo(-halfWidth, 0);
    ctx.lineTo(halfWidth, 0);
    
    // Y-axis
    ctx.moveTo(0, -halfHeight);
    ctx.lineTo(0, halfHeight);
    
    ctx.stroke();
    
    // Draw arrow heads
    ctx.fillStyle = VECTOR_COLORS.axes;
    
    // X-axis arrow
    ctx.save();
    ctx.translate(halfWidth, 0);
    ctx.rotate(0);
    drawArrowhead(ctx);
    ctx.restore();
    
    // Y-axis arrow
    ctx.save();
    ctx.translate(0, halfHeight);
    ctx.rotate(Math.PI / 2);
    drawArrowhead(ctx);
    ctx.restore();
    
    // Add x and y labels
    drawText(ctx, 'x', halfWidth - 15, -15, false);
    drawText(ctx, 'y', 15, halfHeight - 15, false);
  };
  
  // Draw a single vector
  const drawVector = (
    ctx: CanvasRenderingContext2D,
    start: [number, number],
    end: [number, number],
    color: string,
    label: string
  ) => {
    const [startX, startY] = start;
    const [endX, endY] = end;
    
    // Calculate the actual end point by adding start and end
    const x = startX + endX;
    const y = startY + endY;
    
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(x, y);
    ctx.stroke();
    
    // Draw arrow head
    const angle = Math.atan2(y - startY, x - startX);
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillStyle = color;
    drawArrowhead(ctx);
    ctx.restore();
    
    // Draw vector label
    const labelX = startX + endX * 0.5;
    const labelY = startY + endY * 0.5;
    const offset = 15;
    
    // Determine the best position for the label
    const labelOffsetX = -Math.sin(angle) * offset;
    const labelOffsetY = Math.cos(angle) * offset;
    
    drawText(ctx, label, labelX + labelOffsetX, labelY + labelOffsetY, false);
  };
  
  // Draw arrowhead
  const drawArrowhead = (ctx: CanvasRenderingContext2D, size = 10) => {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-size, -size / 2);
    ctx.lineTo(-size, size / 2);
    ctx.closePath();
    ctx.fill();
  };
  
  // Draw text (considering y-axis is flipped)
  const drawText = (
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    considerFlip = true
  ) => {
    ctx.save();
    ctx.scale(1, considerFlip ? -1 : 1); // Flip text if needed
    ctx.fillStyle = "#334155";
    ctx.font = "14px Inter, sans-serif";
    ctx.fillText(text, x, considerFlip ? -y : y);
    ctx.restore();
  };
  
  // Draw the angle between two vectors
  const drawAngle = (
    ctx: CanvasRenderingContext2D,
    vector1: [number, number],
    vector2: [number, number]
  ) => {
    const [x1, y1] = vector1;
    const [x2, y2] = vector2;
    
    // Calculate angle between vectors
    const angle = calculateAngle(x1, y1, x2, y2);
    const angleType = getAngleType(angle);
    
    // Calculate angle for drawing arc
    const startAngle = Math.atan2(y1, x1);
    const endAngle = Math.atan2(y2, x2);
    
    // Draw arc
    const radius = 30;
    ctx.beginPath();
    ctx.arc(0, 0, radius, startAngle, endAngle, getAngleDirection(startAngle, endAngle));
    ctx.strokeStyle = VECTOR_COLORS.angle;
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw angle value
    const midAngle = (startAngle + endAngle) / 2;
    const textRadius = radius + 10;
    const textX = Math.cos(midAngle) * textRadius;
    const textY = Math.sin(midAngle) * textRadius;
    
    // Draw angle text
    ctx.save();
    ctx.scale(1, -1); // Flip text because our canvas is flipped
    ctx.fillStyle = VECTOR_COLORS.angle;
    ctx.font = "bold 14px Inter, sans-serif";
    ctx.fillText(`${angle}°`, textX, -textY);
    ctx.restore();
    
    // If it's a right angle, draw a small square
    if (angleType === 'right') {
      const rightAngleSize = 15;
      const point1X = Math.cos(startAngle) * rightAngleSize;
      const point1Y = Math.sin(startAngle) * rightAngleSize;
      const cornerX = Math.cos(startAngle) * rightAngleSize;
      const cornerY = Math.sin(endAngle) * rightAngleSize;
      const point2X = Math.cos(endAngle) * rightAngleSize;
      const point2Y = Math.sin(endAngle) * rightAngleSize;
      
      ctx.beginPath();
      ctx.moveTo(point1X, point1Y);
      ctx.lineTo(cornerX, cornerY);
      ctx.lineTo(point2X, point2Y);
      ctx.strokeStyle = VECTOR_COLORS.angle;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  };
  
  // Determine arc direction
  const getAngleDirection = (startAngle: number, endAngle: number) => {
    // Normalize angles to [0, 2π]
    const normStart = startAngle < 0 ? startAngle + 2 * Math.PI : startAngle;
    const normEnd = endAngle < 0 ? endAngle + 2 * Math.PI : endAngle;
    
    // If crossing the 0/2π boundary
    if (Math.abs(normEnd - normStart) > Math.PI) {
      return normStart > normEnd;
    }
    
    return normStart > normEnd;
  };
  
  // Draw coordinate labels for vectors
  const drawCoordinateLabels = (
    ctx: CanvasRenderingContext2D,
    scaled1: [number, number],
    scaled2: [number, number],
    scaleFactor: number
  ) => {
    // Draw original coordinate values (not scaled)
    const [x1, y1] = vector1;
    const [x2, y2] = vector2;
    
    // Format coordinates
    const formatCoord = (val: number) => val.toFixed(1).replace(/\.0$/, '');
    
    ctx.save();
    ctx.scale(1, -1); // Flip text
    
    // Labels for vector 1
    ctx.fillStyle = VECTOR_COLORS.primary;
    ctx.font = "bold 12px Inter, sans-serif";
    ctx.fillText(`u(${formatCoord(x1)}, ${formatCoord(y1)})`, scaled1[0] + 10, -scaled1[1] - 10);
    
    // Labels for vector 2
    ctx.fillStyle = VECTOR_COLORS.secondary;
    ctx.fillText(`v(${formatCoord(x2)}, ${formatCoord(y2)})`, scaled2[0] + 10, -scaled2[1] - 10);
    
    ctx.restore();
  };
  
  // Animate vector drawing
  const animateDrawing = (
    ctx: CanvasRenderingContext2D,
    vector1: [number, number],
    vector2: [number, number],
    onComplete: () => void
  ) => {
    const duration = 1000; // ms
    const start = performance.now();
    
    const animate = (time: number) => {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      
      // Clear vectors (not the grid or axes)
      ctx.clearRect(-width / 2, -height / 2, width, height);
      
      // Redraw grid and axes
      if (showGrid) {
        drawGrid(ctx);
      }
      drawAxes(ctx);
      
      // Draw vectors with current progress
      const currentV1: [number, number] = [
        vector1[0] * progress,
        vector1[1] * progress
      ];
      
      const currentV2: [number, number] = [
        vector2[0] * progress,
        vector2[1] * progress
      ];
      
      drawVector(ctx, [0, 0], currentV1, VECTOR_COLORS.primary, 'u');
      drawVector(ctx, [0, 0], currentV2, VECTOR_COLORS.secondary, 'v');
      
      // Draw angle if both vectors have some length
      if (showAngle && 
          progress > 0.9 && 
          (currentV1[0] !== 0 || currentV1[1] !== 0) && 
          (currentV2[0] !== 0 || currentV2[1] !== 0)) {
        drawAngle(ctx, currentV1, currentV2);
      }
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        onComplete();
      }
    };
    
    requestAnimationFrame(animate);
  };
  
  return (
    <div className="relative bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <canvas 
        ref={canvasRef} 
        width={width} 
        height={height}
        className="touch-none"
      />
      <div className="absolute bottom-3 right-3 text-xs text-gray-500">
        <span className="inline-block w-3 h-3 rounded-full bg-blue-500 mr-1 opacity-80"></span>
        <span className="mr-3">Vector u</span>
        <span className="inline-block w-3 h-3 rounded-full bg-pink-500 mr-1 opacity-80"></span>
        <span>Vector v</span>
      </div>
    </div>
  );
};

export default VectorVisualization;
