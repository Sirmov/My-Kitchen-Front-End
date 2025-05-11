import styles from './page.module.scss';

import { RecipesProvider } from '@/contexts/recipesContext';

import RecipesList from '@/components/recipe/recipeList/recipeList';

export default function RecipesPage() {
    return (
        <RecipesProvider>
            <div className={styles.container}>
                <h1 className={styles.containerTitle}>My Recipes</h1>
                <RecipesList />
            </div>
        </RecipesProvider>
    );
}
