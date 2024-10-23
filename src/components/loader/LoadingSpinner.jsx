import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col w-full bg-opacity-70 items-center justify-center gap-3">
      <div className="relative">
        {/* Outer spinning ring */}
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-t-blue-500 border-opacity-30"></div>
        
        {/* Middle spinning ring */}
        <div className="absolute inset-2 animate-spin rounded-full border-4 border-t-purple-500 border-opacity-30" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
        
        {/* Inner spinning ring */}
        <div className="absolute inset-4 animate-spin rounded-full border-4 border-t-pink-500 border-opacity-30" style={{ animationDuration: '0.5s' }}></div>
        
        {/* Static container for sizing */}
        <div className="h-16 w-16"></div>
      </div>
      
      {/* Animated dots */}
      <div className="flex items-center gap-1">
        <span className="text-lg font-medium text-gray-700">Loading</span>
        <span className="animate-bounce text-blue-500 delay-0">.</span>
        <span className="animate-bounce text-purple-500 delay-100">.</span>
        <span className="animate-bounce text-pink-500 delay-200">.</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;