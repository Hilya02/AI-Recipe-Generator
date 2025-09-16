
import React from 'react';
import { SparklesIcon } from './Icons';

interface IngredientInputProps {
  ingredients: string;
  setIngredients: (value: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

// AI Review Simulation:
// Critique: Component logic was initially mixed with App.tsx.
// Refactor: Extracted into a dedicated component to follow the "Separation of Concerns"
// rule. This makes it reusable and easier to test independently. It strictly follows
// the pattern of receiving state and callbacks via props.

const IngredientInput: React.FC<IngredientInputProps> = ({ ingredients, setIngredients, onGenerate, isLoading }) => {
  return (
    <div className="flex flex-col gap-4">
      <textarea
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="e.g., chicken breast, broccoli, rice, soy sauce"
        className="w-full h-24 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200 resize-none"
        disabled={isLoading}
      />
      <button
        onClick={onGenerate}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          <>
            <SparklesIcon className="w-5 h-5" />
            Generate Recipes
          </>
        )}
      </button>
    </div>
  );
};

export default IngredientInput;
