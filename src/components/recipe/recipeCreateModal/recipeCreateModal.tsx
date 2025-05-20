'use client';

// import styles from './editModal.module.scss';
import { useEffect, useState } from 'react';

import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal } from 'antd';

import { useRecipesContext } from '@contexts/recipesContext';

import { Recipe, createRecipe } from '@services/recipesService';

export interface RecipeEditFormValues {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    ingredients: string;
    directions: string;
}

export default function RecipeCreateModal() {
    const [isValid, setIsValid] = useState(false);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { setRecipes } = useRecipesContext();

    const [form] = Form.useForm<RecipeEditFormValues>();
    const values = Form.useWatch<RecipeEditFormValues>([], form);

    useEffect(() => {
        form.validateFields({ validateOnly: true })
            .then(() => setIsValid(true))
            .catch(() => setIsValid(false));
    }, [form, values]);

    async function handleCreate(values: RecipeEditFormValues) {
        setLoading(true);

        const recipe = (await createRecipe(
            values.title,
            values.description,
            values.ingredients,
            values.directions,
            values.imageUrl
        )) as Recipe;

        setRecipes((recipes) => (recipes ? [...recipes, recipe] : recipes));

        form.resetFields();
        setOpen(false);
        setLoading(false);
    }

    return (
        <>
            <Button variant="solid" color="green" size="large" icon={<PlusOutlined />} onClick={() => setOpen(true)}>
                Add Recipe
            </Button>
            <Modal
                title="Create Recipe"
                open={open}
                onCancel={() => setOpen(false)}
                centered
                footer={(_, { CancelBtn: CancelButton }) => (
                    <>
                        <CancelButton />
                        <Button
                            htmlType="submit"
                            loading={loading}
                            color="green"
                            variant="solid"
                            disabled={!isValid}
                            onClick={() => form.submit()}>
                            Create
                        </Button>
                    </>
                )}>
                <Form form={form} layout="vertical" onFinish={handleCreate}>
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
