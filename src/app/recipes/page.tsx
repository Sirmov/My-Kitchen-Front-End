import styles from './page.module.scss';

import notebook from '@public/notebook.svg';

import { Col, Empty, Row } from 'antd';

import RecipeCard, { Recipe } from '@/components/layout/recipeCard/recipeCard';
import RecipeCardSkeleton from '@/components/layout/recipeCard/skeleton/recipeCardSkeleton';
import Image from 'next/image';

const recipes: Recipe[] = [
    {
        id: '1',
        imageUrl: 'https://matekitchen.com/wp-content/uploads/2019/08/supa-topcheta-010b.jpg',
        title: 'Супа топчета',
        description: 'Топла супа с топчета от кайма.',
    },
    {
        id: '2',
        imageUrl: 'https://matekitchen.com/wp-content/uploads/2019/08/supa-topcheta-010b.jpg',
        title: 'Супа топчета',
        description: 'Топла супа с топчета от кайма.Топла супа с топчета от кайма.Топла супа с топчета от кайма.',
    },
    {
        id: '3',
        imageUrl: 'https://matekitchen.com/wp-content/uploads/2019/08/supa-topcheta-010b.jpg',
        title: 'Супа топчета',
        description: 'Топла супа с топчета от кайма.',
    },
    {
        id: '4',
        imageUrl: 'https://matekitchen.com/wp-content/uploads/2019/08/supa-topcheta-010b.jpg',
        title: 'Супа топчета',
        description: 'Топла супа с топчета от кайма.',
    },
    {
        id: '5',
        imageUrl: 'https://matekitchen.com/wp-content/uploads/2019/08/supa-topcheta-010b.jpg',
        title: 'Супа топчета',
        description: 'Топла супа с топчета от кайма.Топла супа с топчета от кайма.Топла супа с топчета от кайма.',
    },
];

export default function Recipes() {
    return (
        <div className={styles.container}>
            <h1 className={styles.containerTitle}>My Recipes</h1>
            {recipes.length === 0 ? (
                <Empty
                    className={styles.emptyRecipes}
                    image={<Image className={styles.emptyImage} src={notebook} alt="" />}
                    description="No recipes"
                />
            ) : (
                <Row gutter={[0, { xs: 8, sm: 16, md: 24, lg: 32 }]} align={'stretch'} justify={'space-between'}>
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
                    <Col
                        xs={{ flex: '100%' }}
                        md={{ flex: '50%' }}
                        lg={{ flex: '33%' }}
                        xl={{ flex: '25%' }}
                        xxl={{ flex: '20%' }}>
                        <RecipeCardSkeleton />
                    </Col>
                    <Col flex={'auto'}></Col>
                </Row>
            )}
        </div>
    );
}
