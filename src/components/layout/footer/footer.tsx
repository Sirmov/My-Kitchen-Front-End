import styles from './footer.module.scss';

import { Footer as AntDFooter } from 'antd/es/layout/layout';

export default function Footer() {
    return (
        <AntDFooter className={styles.footer}>
            Copyright ©{new Date().getFullYear()} My Kitchen. All rights reserved.
        </AntDFooter>
    );
}
