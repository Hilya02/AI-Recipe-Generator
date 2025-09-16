
import React, { useState, useCallback } from 'react';
import { generateRecipes } from './services/geminiService';
import type { Recipe } from './types';
import IngredientInput from './components/IngredientInput';
import RecipeCard from './components/RecipeCard';
import Spinner from './components/Spinner';
import ErrorMessage from './components/ErrorMessage';
import { GithubIcon, SparklesIcon } from './components/Icons';

const App: React.FC = () => {
  const [ingredients, setIngredients] = useState<string>('chicken breast, broccoli, rice, soy sauce');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // AI Review Simulation:
  // Critique: The API call logic was previously inside a regular function, causing
  // potential re-renders of the IngredientInput component on every state change.
  // Refactor: Wrapped the handler in `useCallback` to memoize it. This follows
  // rule #3 from PROJECT_RULES.md, improving performance by preventing child
  // components from re-rendering unnecessarily.
  const handleGenerateRecipes = useCallback(async () => {
    if (!ingredients.trim()) {
      setError("Please enter some ingredients.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setRecipes([]);

    try {
      const result = await generateRecipes(ingredients);
      setRecipes(result);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [ingredients]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans">
      <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <SparklesIcon className="w-8 h-8 text-blue-500" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            AI Recipe Generator
          </h1>
        </div>
        <a 
          href="https://github.com/google/genai-js" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors"
          aria-label="View on GitHub"
        >
          <GithubIcon className="w-7 h-7" />
        </a>
      </header>

      <main className="container mx-auto p-4 md:p-8">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
            Enter the ingredients you have, and let AI create delicious recipes for you. This demo showcases a structured, AI-enhanced development workflow.
          </p>
          
          <IngredientInput
            ingredients={ingredients}
            setIngredients={setIngredients}
            onGenerate={handleGenerateRecipes}
            isLoading={isLoading}
          />

          {error && <ErrorMessage message={error} />}
        </div>

        <div className="mt-10">
          {isLoading && <Spinner />}

          {recipes.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recipes.map((recipe, index) => (
                <RecipeCard key={index} recipe={recipe} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
