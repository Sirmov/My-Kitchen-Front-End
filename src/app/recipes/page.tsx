'use client';

import styles from './page.module.scss';

import notebook from '@public/notebook.svg';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import { Col, Empty, Row } from 'antd';

import RecipeCardSkeleton from '@/components/recipeCard/skeleton/recipeCardSkeleton';
import RecipeCard from '@/components/recipeCard/recipeCard';

import { getAllRecipes, Recipe } from '@/services/recipesService';

export default function Recipes() {
    const [recipes, setRecipes] = useState<Recipe[]>();

    useEffect(() => {
        getAllRecipes()
            .then((recipes) => {
                setRecipes(recipes);
            })
            .catch((error) => {
                console.error(error);
            });
    });

    return (
        <div className={styles.container}>
            <h1 className={styles.containerTitle}>My Recipes</h1>
            {recipes === undefined ? (
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
            ) : recipes.length === 0 ? (
                <Empty
                    className={styles.emptyRecipes}
                    image={<Image className={styles.emptyImage} src={notebook} alt="" />}
                    description="No recipes"
                />
            ) : (
                <Row gutter={[0, { xs: 16, sm: 16, md: 24, lg: 32 }]} align={'stretch'} justify={'space-between'}>
                    {recipes.map((r) => (
                        <Col
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
            )}
        </div>
    );
}
