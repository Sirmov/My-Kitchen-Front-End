import styles from './footer.module.scss';

import { Flex } from 'antd';

import { Footer as AntDFooter } from 'antd/es/layout/layout';
import Link from 'next/link';

export default function Footer() {
    return (
        <AntDFooter className={styles.footer}>
            <Flex className={styles.footerContainer} justify="space-around" align="center">
                <ul>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/about">About</Link>
                    </li>
                </ul>
                <p>Copyright ©{new Date().getFullYear()} My Kitchen. All rights reserved.</p>
                <ul>
                    <li>
                        <p>Made with ❤️</p>
                    </li>
                    <li>sirmov0213@gmail.com</li>
                </ul>
            </Flex>
        </AntDFooter>
    );
}
