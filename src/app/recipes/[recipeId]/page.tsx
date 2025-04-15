'use client';

import styles from './page.module.scss';

import { use, useEffect, useState } from 'react';

import { Col, Divider, Row } from 'antd';

import { getRecipe, Recipe } from '@/services/recipesService';

import ImageWithFallback from '@/utils/imageWithFallback/imageWithFallback';

export default function Recipe1({ params }: { params: Promise<{ recipeId: string }> }) {
    const { recipeId } = use(params);
    const [recipe, setRecipe] = useState<Recipe>();

    useEffect(() => {
        getRecipe(recipeId).then((recipe) => {
            setRecipe(recipe);
        });
    }, [recipeId]);

    return (
        <div className={styles.container}>
            <h1 className={styles.recipeTitle}>{recipe?.title}</h1>
            {recipe ? (
                <Row className={styles.recipeHeading} gutter={[48, 48]} align={'middle'}>
                    <Col span={24} lg={16} xl={14} xxl={12}>
                        <div className={styles.recipeImageContainer}>
                            <ImageWithFallback
                                src={recipe.imageUrl}
                                alt={recipe.title}
                                className={styles.recipeImage}
                                width={600}
                                height={400}
                            />
                        </div>
                    </Col>
                    <Col span={24} lg={8} xl={10} xxl={12}>
                        <div className={styles.recipeDetails}>
                            <h2>Описание</h2>
                            <p className={styles.recipeDescription}>{recipe.description}</p>
                            <h2>Нужни продукти</h2>
                            <ul className={styles.recipeIngredients}>
                                {recipe?.ingredients.split(', ').map((ingredient, index) => (
                                    <li key={index}>{ingredient}</li>
                                ))}
                            </ul>
                        </div>
                    </Col>
                </Row>
            ) : null}
            <Divider />
            <h2 className={styles.recipeDirectionsHeading}>Начин на приготвяне</h2>
            <ol className={styles.recipeDirections}>
                {recipe?.directions.split('. ').map((direction, index) => (
                    <li key={index}>{direction}</li>
                ))}
            </ol>
        </div>
    );
}
