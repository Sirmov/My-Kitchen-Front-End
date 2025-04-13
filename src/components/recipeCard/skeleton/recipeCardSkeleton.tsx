import styles from './recipeCardSkeleton.module.scss';

import { ReactNode } from 'react';

import { Card } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import SkeletonNode from 'antd/es/skeleton/Node';

const actions: ReactNode[] = [
    <EditOutlined key="edit" className={styles.editIcon} />,
    <DeleteOutlined key="delete" className={styles.deleteIcon} />,
];

export default function RecipeCardSkeleton() {
    return (
        <Card
            className={styles.recipeCardSkeleton}
            hoverable
            loading
            cover={
                <div className={styles.recipeSkeletonImageContainer}>
                    <SkeletonNode active className={styles.recipeSkeltonImage} />
                </div>
            }
            actions={actions}></Card>
    );
}
