
import React from 'react';
import type { Recipe } from '../types';
import { ChefHatIcon, ClockIcon, TimerIcon } from './Icons';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out flex flex-col">
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2 flex items-center gap-2">
          <ChefHatIcon className="w-6 h-6" /> {recipe.recipeName}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{recipe.description}</p>
        
        <div className="flex justify-around text-center text-sm my-4 border-t border-b border-gray-200 dark:border-gray-700 py-3">
            <div className="flex items-center gap-2">
                <TimerIcon className="w-5 h-5 text-green-500"/>
                <div>
                    <span className="font-semibold block">Prep</span>
                    <span>{recipe.prepTime}</span>
                </div>
            </div>
             <div className="flex items-center gap-2">
                <ClockIcon className="w-5 h-5 text-orange-500"/>
                 <div>
                    <span className="font-semibold block">Cook</span>
                    <span>{recipe.cookTime}</span>
                </div>
            </div>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Ingredients</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
              {recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Instructions</h4>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 dark:text-gray-400">
              {recipe.instructions.map((step, i) => <li key={i}>{step}</li>)}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
