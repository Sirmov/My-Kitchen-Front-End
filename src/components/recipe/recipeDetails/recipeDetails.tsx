import { Dispatch, SetStateAction, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import {
    BookOutlined,
    CloseCircleFilled,
    DeleteOutlined,
    EditOutlined,
    ReadOutlined,
    ShoppingCartOutlined,
} from '@ant-design/icons';
import { Button, Col, Divider, Flex, Popconfirm, Row } from 'antd';

import { Recipe, deleteRecipe, updateRecipe } from '@services/recipesService';

import RecipeEditModal, { RecipeEditFormValues } from '@components/recipe/recipeEditModal/recipeEditModal';

import ImageWithFallback from '@utils/imageWithFallback/imageWithFallback';

import styles from './recipeDetails.module.scss';

interface RecipeDetailsProps {
    recipe: Recipe;
    setRecipe: Dispatch<SetStateAction<Recipe | undefined>>;
}

export default function RecipeDetails({ recipe, setRecipe }: RecipeDetailsProps) {
    const router = useRouter();
    const [popconfirmIsOpen, setPopconfirmIsOpen] = useState(false);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleEdit(values: RecipeEditFormValues) {
        setLoading(true);

        const updatedRecipe = (await updateRecipe(recipe.id, values)) as Recipe;
        setRecipe(updatedRecipe);

        setLoading(false);
        setEditModalIsOpen(false);
    }

    async function handleDelete() {
        setLoading(true);

        await deleteRecipe(recipe.id);

        router.push('/recipes');
        setPopconfirmIsOpen(false);
        setLoading(false);
    }

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
                            Ingredients
                            <ShoppingCartOutlined id={styles.ingredientsIcon} />
                        </h2>
                        <ul className={styles.recipeIngredients}>
                            {recipe?.ingredients
                                .split(', ')
                                .map((ingredient, index) => <li key={index}>{ingredient}</li>)}
                        </ul>
                    </div>
                </Col>
            </Row>
            <Divider />
            <h2 className={styles.recipeDirectionsHeading}>
                <ReadOutlined id={styles.directionsIcon} />
                Directions
            </h2>
            <ol className={styles.recipeDirections}>
                {recipe?.directions
                    .split('. ')
                    .filter((d) => d != '')
                    .map((direction, index) => <li key={index}>{direction}.</li>)}
            </ol>
            <Divider />
            <Flex className={styles.actions} justify="space-around" align="center" gap={10} wrap>
                <Popconfirm
                    key="delete"
                    open={popconfirmIsOpen}
                    icon={<CloseCircleFilled className={styles.confirmDeleteIcon} />}
                    title="Confirm Action"
                    description="Are you sure you want to delete this recipe?"
                    okText="Delete"
                    okButtonProps={{ loading: loading, variant: 'solid', color: 'red' }}
                    onConfirm={handleDelete}
                    cancelButtonProps={{ variant: 'outlined', color: 'red' }}
                    onCancel={() => setPopconfirmIsOpen(false)}>
                    <Button
                        size="large"
                        icon={<DeleteOutlined />}
                        color="danger"
                        variant="solid"
                        onClick={() => setPopconfirmIsOpen(true)}>
                        Delete
                    </Button>
                </Popconfirm>
                <Button
                    size="large"
                    icon={<EditOutlined />}
                    color="gold"
                    variant="solid"
                    onClick={() => setEditModalIsOpen(true)}>
                    Edit
                </Button>
                <Link href="/recipes">
                    <Button size="large" icon={<BookOutlined />} color="cyan" variant="solid">
                        Back to recipes
                    </Button>
                </Link>
            </Flex>
            <RecipeEditModal
                recipe={recipe}
                open={editModalIsOpen}
                loading={loading}
                onSubmit={handleEdit}
                onClose={() => setEditModalIsOpen(false)}
            />
        </>
    );
}
