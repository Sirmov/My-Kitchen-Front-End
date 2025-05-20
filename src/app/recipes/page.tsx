import { Flex } from 'antd';

import { RecipesProvider } from '@contexts/recipesContext';

import RecipeCreateModal from '@components/recipe/recipeCreateModal/recipeCreateModal';
import RecipesList from '@components/recipe/recipeList/recipeList';

import styles from './page.module.scss';

export default function RecipesPage() {
    return (
        <RecipesProvider>
            <div className={styles.pageContainer}>
                <Flex className={styles.headlineContainer} align="baseline">
                    <h1 className={styles.title}>My Recipes</h1>
                    <RecipeCreateModal />
                </Flex>
                <RecipesList />
            </div>
        </RecipesProvider>
    );
}
