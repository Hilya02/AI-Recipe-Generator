
# Project Rules & Patterns (AI-Assisted Plan)

This document outlines the core development principles for the AI-Enhanced Recipe Generator project. These rules were established during a planning phase with an AI assistant to ensure consistency, maintainability, and performance.

### 1. Strict Separation of Concerns

- **UI Components (`/components`)**: All React components must be purely for presentation. They receive data and callbacks via props and should not contain any direct business logic or API calls. State within these components should be limited to UI-specific concerns (e.g., a dropdown's open state).
- **API Logic (`/services`)**: All interactions with the Gemini API must be encapsulated within the `services/geminiService.ts` file. This service will handle model initialization, prompt construction, API calls, and data transformation. Components will call functions from this service but will be unaware of the implementation details.
- **State Management (`App.tsx`)**: The primary application state (ingredient list, recipes, loading status, errors) will be centralized in the main `App.tsx` component using React hooks (`useState`, `useReducer` if complexity grows). State and state-setting functions will be passed down to child components as props.

### 2. Type-Safe Development with Structured Data

- **Centralized Types (`types.ts`)**: All shared data structures, especially the `Recipe` object, must be defined in a central `types.ts` file. This ensures consistency across the application.
- **Structured API Responses**: The Gemini API will be prompted to return structured JSON. We will use the `responseSchema` configuration in `generateContent` to enforce this structure, minimizing the risk of parsing errors and simplifying data handling on the frontend. This avoids manual string manipulation and makes the data flow predictable.

### 3. Asynchronous Operations and User Feedback

- **Clear Loading States**: Every asynchronous operation (i.e., API calls) must trigger a visual loading indicator in the UI. A `loading` boolean state will be managed in `App.tsx` to control the visibility of a spinner component, preventing user confusion and duplicate requests.
- **Graceful Error Handling**: API errors must be caught and displayed to the user in a clear, non-technical message. An `error` state (string or null) will be managed in `App.tsx`. The UI should guide the user on how to proceed (e.g., "An error occurred. Please try again.").
- **Memoization for Performance**: Use the `useCallback` hook for functions passed as props to child components (like the recipe generation handler). This prevents unnecessary re-renders of child components, especially those that are expensive to render, ensuring a smoother user experience.

