'use client';

import { use, useEffect, useState } from 'react';

import { RecipesProvider } from '@contexts/recipesContext';

import { Recipe, getRecipe } from '@services/recipesService';

import RecipeDetails from '@components/recipe/recipeDetails/recipeDetails';
import RecipeDetailsSkelton from '@components/recipe/recipeDetails/skeleton/recipeDetailsSkeleton';

import styles from './page.module.scss';

export default function RecipeDetailsPage({ params }: { params: Promise<{ recipeId: string }> }) {
    const { recipeId } = use(params);
    const [recipe, setRecipe] = useState<Recipe>();

    useEffect(() => {
        getRecipe(recipeId)
            .then((recipe) => {
                setRecipe(recipe as Recipe);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [recipeId]);

    return (
        <RecipesProvider>
            <div className={styles.container}>
                {recipe === undefined ?
                    <RecipeDetailsSkelton />
                :   <RecipeDetails recipe={recipe} setRecipe={setRecipe}></RecipeDetails>}
            </div>
        </RecipesProvider>
    );
}
