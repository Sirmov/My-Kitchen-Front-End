import styles from './recipeDetailsSkeleton.module.scss';

import Link from 'next/link';

import { Button, Col, Divider, Flex, Row, Skeleton } from 'antd';
import { ShoppingCartOutlined, ReadOutlined, DeleteOutlined, EditOutlined, BookOutlined } from '@ant-design/icons';
import SkeletonNode from 'antd/es/skeleton/Node';

export default function RecipeDetailsSkelton() {
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
                            <SkeletonNode active className={styles.recipeImageSkeleton} />
                        </div>
                        <div className={styles.recipeDetails} style={{ flex: 1 }}>
                            <Skeleton
                                active
                                title={{ width: '60%', style: { height: '20px' } }}
                                paragraph={{ rows: 3, width: ['80%', '80%', '70%'] }}
                            />
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
                            <Skeleton
                                active
                                title={false}
                                paragraph={{ rows: 6, width: ['60%', '200px', '50%', '70%', '60%', '80%'] }}
                            />
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
                <Skeleton active title={false} paragraph={{ rows: 5, width: ['60%', '40%', '50%', '70%', '60%'] }} />
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
