import styles from './recipeCard.module.scss';

import { Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import { ReactNode } from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import ImageWithFallback from '@/utils/imageWithFallback/imageWithFallback';

export type Recipe = {
    id: string;
    imageUrl: string;
    title: string;
    description: string;
    // ingredients: string;
    // directions: string;
};

export type RecipeCardProps = {
    recipe: Recipe;
};

const actions: ReactNode[] = [
    <EditOutlined key="edit" className={styles.editIcon} />,
    <DeleteOutlined key="delete" className={styles.deleteIcon} />,
];

export default function RecipeCard({ recipe }: RecipeCardProps) {
    return (
        <Card
            className={styles.recipeCard}
            hoverable
            cover={
                // <img src={recipe.imageUrl} alt={recipe.title} className={styles.recipeImage} fill />
                <div className={styles.recipeImageContainer}>
                    <ImageWithFallback src={recipe.imageUrl} alt={recipe.title} className={styles.recipeImage} fill />
                </div>
            }
            actions={actions}>
            <Meta title={recipe.title} description={recipe.description} className="aaaa" />
        </Card>
    );
}
