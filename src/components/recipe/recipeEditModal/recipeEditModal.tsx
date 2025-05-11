'use client';

// import styles from './editModal.module.scss';

import { useEffect, useState } from 'react';

import { Button, Form, Input, Modal } from 'antd';

import { Recipe, updateRecipe } from '@/services/recipesService';
import { useRecipesContext } from '@/contexts/recipesContext';

interface RecipeEditModalProps {
    recipe: Recipe;
    isOpen: boolean;
    onClose: () => void;
}

interface RecipeEditFormValues {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    ingredients: string;
    directions: string;
}

export default function RecipeEditModal({ recipe, isOpen, onClose }: RecipeEditModalProps) {
    const [loading, setLoading] = useState(false);
    const [isValid, setIsValid] = useState(false);

    const { setRecipes } = useRecipesContext();

    const [form] = Form.useForm<RecipeEditFormValues>();
    const values = Form.useWatch<RecipeEditFormValues>([], form);

    useEffect(() => {
        if (recipe) {
            form.setFieldsValue(recipe);
        }
    }, [recipe, form]);

    useEffect(() => {
        form.validateFields({ validateOnly: true })
            .then(() => setIsValid(true))
            .catch(() => setIsValid(false));
    }, [form, values]);

    async function handleSubmit(values: RecipeEditFormValues) {
        setLoading(true);

        const updatedRecipe = (await updateRecipe(recipe.id, values)) as Recipe;

        setRecipes((recipes) =>
            recipes ? recipes.map((r) => (r.id === updatedRecipe.id ? updatedRecipe : r)) : recipes
        );

        setLoading(false);
        onClose();
    }

    return (
        <>
            <Modal
                title="Edit Recipe"
                open={isOpen}
                onCancel={onClose}
                centered
                footer={(_, { CancelBtn: CancelButton }) => (
                    <>
                        <CancelButton />
                        <Button
                            htmlType="submit"
                            loading={loading}
                            color="gold"
                            variant="solid"
                            disabled={!isValid}
                            onClick={() => form.submit()}>
                            Edit
                        </Button>
                    </>
                )}>
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Form.Item hidden name="id" rules={[{ required: true }]}>
                        <Input hidden value={recipe.id} />
                    </Form.Item>
                    <Form.Item name="title" label="Title" rules={[{ required: true }, { type: 'string', min: 3 }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true }, { type: 'string', min: 6 }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="imageUrl"
                        label="Image URL"
                        rules={[{ required: true }, { type: 'url', warningOnly: true }, { type: 'string', min: 6 }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="ingredients"
                        label="Ingredients"
                        rules={[{ required: true }, { type: 'string', min: 6 }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="directions"
                        label="Directions"
                        rules={[{ required: true }, { type: 'string', min: 6 }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
