'use client';

// import styles from './editModal.module.scss';
import { useEffect, useState } from 'react';

import { Button, Form, Input, Modal } from 'antd';

import { Recipe } from '@services/recipesService';

interface RecipeEditModalProps {
    recipe: Recipe;
    open: boolean;
    loading: boolean;
    onClose: () => void;
    onSubmit: (values: RecipeEditFormValues) => Promise<void>;
}

export interface RecipeEditFormValues {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    ingredients: string;
    directions: string;
}

export default function RecipeEditModal({ recipe, open, loading, onClose, onSubmit }: RecipeEditModalProps) {
    const [isValid, setIsValid] = useState(false);

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

    return (
        <>
            <Modal
                title="Edit Recipe"
                open={open}
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
                <Form form={form} layout="vertical" onFinish={onSubmit}>
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
