'use client';

import { Recipe } from '@/services/recipesService';
import { ReactNode, createContext, useContext, useState } from 'react';

type RecipesContextType = {
    recipes: Recipe[] | null;
    setRecipes: React.Dispatch<React.SetStateAction<Recipe[] | null>>;
};

const RecipesContext = createContext<RecipesContextType | undefined>(undefined);

export function RecipesProvider({ children }: { children: ReactNode }) {
    const [recipes, setRecipes] = useState<Recipe[] | null>(null);

    return <RecipesContext.Provider value={{ recipes, setRecipes }}>{children}</RecipesContext.Provider>;
}

export function useRecipesContext(): RecipesContextType {
    const context = useContext(RecipesContext);

    if (!context) {
        throw new Error('useRecipesContext must be used within an RecipesProvider');
    }

    return context;
}
