'use client';

import styles from './page.module.scss';

import { use, useEffect, useState } from 'react';

import { getRecipe, Recipe } from '@/services/recipesService';
import RecipeDetails from '@/components/recipeDetails/recipeDetails';
import RecipeDetailsSkelton from '@/components/recipeDetails/skeleton/recipeDetailsSkeleton';

export default function RecipeDetailsPage({ params }: { params: Promise<{ recipeId: string }> }) {
    const { recipeId } = use(params);
    const [recipe, setRecipe] = useState<Recipe>();

    useEffect(() => {
        getRecipe(recipeId).then((recipe) => {
            setRecipe(recipe);
        });
    }, [recipeId]);

    return (
        <div className={styles.container}>
            {/* <RecipeDetailsSkelton /> */}
            {recipe === undefined ? <RecipeDetailsSkelton /> : <RecipeDetails recipe={recipe}></RecipeDetails>}
        </div>
    );
}
