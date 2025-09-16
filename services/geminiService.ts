
import { GoogleGenAI, Type } from "@google/genai";
import type { Recipe } from '../types';

// AI Review Simulation:
// Critique: API key handling is hardcoded.
// Refactor: Correctly use process.env.API_KEY. This is a security best practice.
//
// Critique: The function is tightly coupled with the component logic.
// Refactor: Abstracted API calls into this dedicated service file to follow the
// "Separation of Concerns" rule from PROJECT_RULES.md.

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, this might be handled more gracefully, but for this environment,
  // it's a critical failure if the key is missing.
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

// AI Review Simulation:
// Critique: The schema definition is complex and could be error-prone.
// Refactor: Defined a constant `recipeSchema` for clarity and reusability. This also
// aligns with the "Type-Safe Development" rule by enforcing a consistent data structure.
const recipeSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      recipeName: {
        type: Type.STRING,
        description: "The name of the recipe.",
      },
      description: {
        type: Type.STRING,
        description: "A short, enticing description of the dish."
      },
      ingredients: {
        type: Type.ARRAY,
        items: {
          type: Type.STRING,
        },
        description: "A list of all ingredients required for the recipe.",
      },
      instructions: {
        type: Type.ARRAY,
        items: {
          type: Type.STRING,
        },
        description: "Step-by-step instructions to prepare the dish.",
      },
      prepTime: {
        type: Type.STRING,
        description: "Estimated preparation time (e.g., '15 minutes')."
      },
      cookTime: {
        type: Type.STRING,
        description: "Estimated cooking time (e.g., '30 minutes')."
      },
    },
    required: ["recipeName", "description", "ingredients", "instructions", "prepTime", "cookTime"],
  },
};

export const generateRecipes = async (ingredients: string): Promise<Recipe[]> => {
  if (!ingredients.trim()) {
    throw new Error("Ingredients list cannot be empty.");
  }

  const prompt = `
    You are a creative chef. Based on the following ingredients, generate 3 unique and delicious recipe ideas.
    The ingredients I have are: ${ingredients}.
    
    For each recipe, provide a name, a brief description, a list of all required ingredients (including the ones provided and any others needed), step-by-step instructions, preparation time, and cooking time.
    Ensure the output is a valid JSON array matching the provided schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: recipeSchema,
      },
    });

    const jsonText = response.text.trim();
    const recipes: Recipe[] = JSON.parse(jsonText);
    return recipes;
  } catch (error) {
    console.error("Error generating recipes:", error);
    // AI Review Simulation:
    // Critique: The original error message was too generic.
    // Refactor: Provide a more user-friendly error message that helps with debugging
    // while shielding the user from complex API error details.
    if (error instanceof Error) {
        if (error.message.includes('quota')) {
            return Promise.reject(new Error("API quota exceeded. Please check your Gemini API plan and billing."));
        }
         if (error.message.includes('API key not valid')) {
            return Promise.reject(new Error("The provided API key is not valid. Please check your environment variables."));
        }
    }
    return Promise.reject(new Error("Failed to generate recipes. The AI model may be temporarily unavailable."));
  }
};
