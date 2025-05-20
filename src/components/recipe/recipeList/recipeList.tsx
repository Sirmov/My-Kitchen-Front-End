'use client';

import { useEffect } from 'react';

import Image from 'next/image';

import { Col, Empty, Row } from 'antd';

import notebook from '@public/notebook.svg';

import { useRecipesContext } from '@contexts/recipesContext';

import { Recipe, getAllRecipes } from '@services/recipesService';

import RecipeCard from '@components/recipe/recipeCard/recipeCard';
import RecipeCardSkeleton from '@components/recipe/recipeCard/skeleton/recipeCardSkeleton';

import styles from './recipeList.module.scss';

export default function RecipesList() {
    const { recipes, setRecipes } = useRecipesContext();

    useEffect(() => {
        getAllRecipes()
            .then((recipes) => {
                setRecipes(recipes as Recipe[]);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [setRecipes]);

    return (
        recipes === null ?
            <Row gutter={[0, { xs: 16, sm: 16, md: 24, lg: 32 }]} align={'stretch'} justify={'space-between'}>
                {Array.from({ length: 5 }).map((_, index) => (
                    <Col
                        key={index}
                        xs={{ flex: '100%' }}
                        md={{ flex: '50%' }}
                        lg={{ flex: '33%' }}
                        xl={{ flex: '25%' }}
                        xxl={{ flex: '20%' }}>
                        <RecipeCardSkeleton />
                    </Col>
                ))}
                <Col flex={'auto'}></Col>
            </Row>
        : recipes.length === 0 ?
            <Empty
                className={styles.emptyRecipes}
                image={<Image className={styles.emptyImage} src={notebook} alt="" />}
                description="No recipes"
            />
        :   <Row gutter={[0, { xs: 16, sm: 16, md: 24, lg: 32 }]} align={'stretch'} justify={'space-between'}>
                {recipes.map((r) => (
                    <Col
                        className={styles.recipeCardContainer}
                        key={r.id}
                        xs={{ flex: '100%' }}
                        md={{ flex: '50%' }}
                        lg={{ flex: '33%' }}
                        xl={{ flex: '25%' }}
                        xxl={{ flex: '20%' }}>
                        <RecipeCard recipe={r} />
                    </Col>
                ))}
                <Col flex={'auto'}></Col>
            </Row>
    );
}
