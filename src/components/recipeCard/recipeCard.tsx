'use client';

import styles from './recipeCard.module.scss';

import { ReactNode, useState } from 'react';

import Link from 'next/link';

import { Card, Popconfirm } from 'antd';
import Meta from 'antd/es/card/Meta';
import { CloseCircleFilled, DeleteOutlined, EditOutlined } from '@ant-design/icons';

import { Recipe } from '@/services/recipesService';

import ImageWithFallback from '@/utils/imageWithFallback/imageWithFallback';

export type RecipeCardProps = {
    recipe: Recipe;
};

export default function RecipeCard({ recipe }: RecipeCardProps) {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const showPopconfirm = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setConfirmLoading(true);

        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    const actions: ReactNode[] = [
        <EditOutlined key="edit" className={styles.editIcon} />,
        <Popconfirm
            key="delete"
            open={open}
            icon={<CloseCircleFilled className={styles.confirmDeleteIcon} />}
            title="Confirm Action"
            description="Are you sure you want to delete this recipe?"
            okText="Delete"
            okButtonProps={{ loading: confirmLoading, variant: 'solid', color: 'red' }}
            onConfirm={handleOk}
            cancelButtonProps={{ variant: 'outlined', color: 'red' }}
            onCancel={handleCancel}>
            <DeleteOutlined className={styles.deleteIcon} onClick={showPopconfirm} />
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
        </Card>
    );
}
