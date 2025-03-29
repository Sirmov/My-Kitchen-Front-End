import womanCooking from '@public/woman-cooking.jpg';

import styles from './page.module.scss';

import Image from 'next/image';

import { Col, Row } from 'antd';

export default function HomePage() {
    return (
        <>
            <Row className={styles.titleSection}>
                <Col span={14} className={styles.titleText}>
                    <h1>Take control of Your Kitchen</h1>
                    <p>Manage your recipes, prepare your shopping list, watch your supplies in your digital kitchen.</p>
                </Col>
                <Col span={10}>
                    <Image className={styles.titleImage} alt="woman-cooking" src={womanCooking} height={400} />
                </Col>
            </Row>
        </>
    );
}
