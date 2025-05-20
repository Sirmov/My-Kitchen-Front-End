'use client';

import { ReactNode, useState } from 'react';

import Link from 'next/link';

import { CloseCircleFilled, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Card, Popconfirm } from 'antd';
import Meta from 'antd/es/card/Meta';

import { useRecipesContext } from '@contexts/recipesContext';

import { Recipe, deleteRecipe, updateRecipe } from '@services/recipesService';

import RecipeEditModal, { RecipeEditFormValues } from '@components/recipe/recipeEditModal/recipeEditModal';

import ImageWithFallback from '@utils/imageWithFallback/imageWithFallback';

import styles from './recipeCard.module.scss';

export type RecipeCardProps = {
    recipe: Recipe;
};

export default function RecipeCard({ recipe }: RecipeCardProps) {
    const [popconfirmIsOpen, setPopconfirmIsOpen] = useState(false);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const { setRecipes } = useRecipesContext();

    async function handleEdit(values: RecipeEditFormValues) {
        setLoading(true);

        const updatedRecipe = (await updateRecipe(recipe.id, values)) as Recipe;

        setRecipes((recipes) =>
            recipes ? recipes.map((r) => (r.id === updatedRecipe.id ? updatedRecipe : r)) : recipes
        );

        setLoading(false);
        setEditModalIsOpen(false);
    }

    async function handleDelete() {
        setLoading(true);

        const result = await deleteRecipe(recipe.id);

        if (result === true) {
            setRecipes((recipes) => (recipes ? recipes.filter((r) => r.id !== recipe.id) : recipes));
        }

        setPopconfirmIsOpen(false);
        setLoading(false);
    }

    const actions: ReactNode[] = [
        <EditOutlined key="edit" className={styles.editIcon} onClick={() => setEditModalIsOpen(true)} />,
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
            <DeleteOutlined className={styles.deleteIcon} onClick={() => setPopconfirmIsOpen(true)} />
        </Popconfirm>,
    ];

    return (
        <Card
            className={styles.recipeCard}
            hoverable
            cover={
                <Link href={`/recipes/${recipe.id}`}>
                    <div className={styles.recipeImageContainer}>
                        <ImageWithFallback
                            src={recipe.imageUrl}
                            alt={recipe.title}
                            className={styles.recipeImage}
                            fill
                        />
                    </div>
                </Link>
            }
            actions={actions}>
            <Link href={`/recipes/${recipe.id}`}>
                <Meta title={recipe.title} description={recipe.description} />
            </Link>
            <RecipeEditModal
                recipe={recipe}
                open={editModalIsOpen}
                loading={loading}
                onSubmit={handleEdit}
                onClose={() => setEditModalIsOpen(false)}
            />
        </Card>
    );
}
