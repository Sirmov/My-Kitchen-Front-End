import womanCooking from '@public/woman-cooking.jpg';

import styles from './page.module.scss';

import Image from 'next/image';
import Link from 'next/link';

import { Button, Col, Flex, Row } from 'antd';
import { BoxPlotOutlined, FileTextOutlined, GithubOutlined, ShoppingCartOutlined } from '@ant-design/icons';

export default function HomePage() {
    return (
        <>
            <section className={styles.heroSection}>
                <Row align="middle">
                    <Col xs={24} md={14} className={styles.heroText}>
                        <h1>Take Control of Your Kitchen</h1>
                        <p>
                            Manage your recipes, prepare your shopping lists, and track your pantry items - everything
                            in one open source app.
                        </p>
                        <Link href="/register">
                            <button className={styles.getStarted} id={styles.getStarted}>
                                <span className={styles.panGroup}>
                                    <span className={styles.fire}>🔥</span>
                                    <span className={styles.pan}>🍳</span>
                                </span>
                                Get Started Now
                            </button>
                        </Link>
                    </Col>
                    <Col xs={24} md={10} className={styles.heroImageWrapper}>
                        <Image
                            className={styles.heroImage}
                            alt="Woman Cooking"
                            src={womanCooking}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </Col>
                </Row>
            </section>

            <section className={styles.howItWorksSection}>
                <h2>How It Works</h2>
                <Row gutter={[32, 32]} justify="center" align="stretch">
                    {[
                        {
                            icon: <FileTextOutlined className={styles.stepIcon} />,
                            title: 'Add Recipes',
                            description: 'Store and organize your favorite meals.',
                        },
                        {
                            icon: <ShoppingCartOutlined className={styles.stepIcon} />,
                            title: 'Generate Lists',
                            description: 'Turn recipes into shopping lists in a click.',
                        },
                        {
                            icon: <BoxPlotOutlined className={styles.stepIcon} />,
                            title: 'Track Pantry',
                            description: 'Keep tabs on your ingredients and supplies.',
                        },
                    ].map((step, index) => (
                        <Col key={index} xs={24} sm={8}>
                            <div className={styles.stepCard}>
                                {step.icon}
                                <h3>{step.title}</h3>
                                <p>{step.description}</p>
                            </div>
                        </Col>
                    ))}
                </Row>
                <Link href="/about">
                    <Button type="link" className={styles.sectionLink}>
                        Learn more about how it works →
                    </Button>
                </Link>
            </section>

            <section className={styles.communitySection}>
                <h2>Join the Community</h2>
                <p>
                    My Kitchen is open source. Contribute on GitHub, suggest features, or help translate. Everyone’s
                    welcome.
                </p>
                <Flex justify="center" align="center" gap={'2rem'} className={styles.communityLinks}>
                    <Link href="https://github.com/Sirmov/My-Kitchen-Front-End" target="_blank">
                        <Button type="link" icon={<GithubOutlined />} className={styles.communityButton}>
                            View on GitHub
                        </Button>
                    </Link>
                    <Link href="https://github.com/Sirmov/My-Kitchen-Front-End" target="_blank">
                        <Button type="link" className={styles.communityButton}>
                            Contribute →
                        </Button>
                    </Link>
                </Flex>
            </section>
        </>
    );
}
