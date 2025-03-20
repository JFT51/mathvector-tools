
import React from 'react';
import { cn } from '@/lib/utils';

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,hsl(210,33%,99%),hsl(216,33%,97%))]"></div>
      
      {/* Animated shapes */}
      <div className="absolute inset-0">
        {/* Large circle */}
        <div className="absolute -right-[10%] -top-[10%] h-[35vmax] w-[35vmax] rounded-full bg-gradient-to-tr from-blue-100/40 to-blue-50/60 opacity-60 blur-3xl animate-float"></div>
        
        {/* Medium circle */}
        <div className="absolute left-[5%] top-[40%] h-[25vmax] w-[25vmax] rounded-full bg-gradient-to-br from-indigo-50/30 to-purple-100/50 opacity-40 blur-2xl animate-pulse-soft"></div>
        
        {/* Small circle */}
        <div className="absolute bottom-[10%] right-[30%] h-[20vmax] w-[20vmax] rounded-full bg-gradient-to-bl from-blue-50/40 to-sky-100/60 opacity-50 blur-xl animate-float"></div>
      </div>
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2UyZThmMCIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPjwvc3ZnPg==')]"
        style={{ opacity: 0.3 }}
      ></div>
    </div>
  );
};

export default Background;
