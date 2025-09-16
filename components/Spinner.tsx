
import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-10">
      <div className="w-16 h-16 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
      <p className="text-lg text-gray-600 dark:text-gray-400">The AI chef is thinking...</p>
    </div>
  );
};

export default Spinner;
