import styles from './recipeDetails.module.scss';

import Link from 'next/link';

import { Button, Col, Divider, Flex, Row } from 'antd';
import { ShoppingCartOutlined, ReadOutlined, DeleteOutlined, EditOutlined, BookOutlined } from '@ant-design/icons';

import { Recipe } from '@/services/recipesService';
import ImageWithFallback from '@/utils/imageWithFallback/imageWithFallback';

export default function RecipeDetails({ recipe }: { recipe: Recipe }) {
    return (
        <>
            <Row
                gutter={[
                    { xs: 12, sm: 24, md: 48 },
                    { xs: 12, sm: 24, md: 48 },
                ]}
                align={'middle'}>
                <Col span={24} lg={16} xl={14} xxl={12}>
                    <Flex className={styles.recipeHeading}>
                        <div className={styles.recipeImageContainer}>
                            <ImageWithFallback
                                src={recipe.imageUrl}
                                alt={recipe.title}
                                className={styles.recipeImage}
                                width={600}
                                height={400}
                            />
                        </div>
                        <div className={styles.recipeDetails}>
                            <h1 className={styles.recipeTitle}>{recipe?.title}</h1>
                            <p className={styles.recipeDescription}>{recipe.description}</p>
                        </div>
                    </Flex>
                </Col>
                <Col span={24} lg={8} xl={10} xxl={12}>
                    <div className={styles.recipeIngredientsContainer}>
                        <h2>
                            Нужни продукти
                            <ShoppingCartOutlined id={styles.ingredientsIcon} />
                        </h2>
                        <ul className={styles.recipeIngredients}>
                            {recipe?.ingredients.split(', ').map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                    </div>
                </Col>
            </Row>
            <Divider />
            <h2 className={styles.recipeDirectionsHeading}>
                <ReadOutlined id={styles.directionsIcon} />
                Начин на приготвяне
            </h2>
            <ol className={styles.recipeDirections}>
                {recipe?.directions.split('. ').map((direction, index) => (
                    <li key={index}>{direction}</li>
                ))}
            </ol>
            <Divider />
            <Flex className={styles.actions} justify="space-around" align="center" gap={10} wrap>
                <Button size="large" icon={<DeleteOutlined />} color="danger" variant="solid">
                    Delete
                </Button>
                <Button size="large" icon={<EditOutlined />} color="gold" variant="solid">
                    Edit
                </Button>
                <Link href="/recipes">
                    <Button size="large" icon={<BookOutlined />} color="cyan" variant="solid">
                        Back to recipes
                    </Button>
                </Link>
            </Flex>
        </>
    );
}
