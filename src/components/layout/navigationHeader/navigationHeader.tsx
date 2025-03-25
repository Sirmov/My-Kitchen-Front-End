import styles from './navigationHeader.module.scss';

import Link from 'next/link';

import { Button, Menu, MenuProps, Space } from 'antd';
import { EditFilled, LoginOutlined } from '@ant-design/icons';
import { Header } from 'antd/es/layout/layout';

type MenuItem = Required<MenuProps>['items'][number];

const navigationItems: MenuItem[] = [
    {
        label: <Link href="/">Home</Link>,
        key: 'home',
    },
    {
        label: <Link href="/author">Author</Link>,
        key: 'author',
    },
];

export default function NavigationHeader() {
    return (
        <Header className={styles.header}>
            <div className="demo-logo" />
            <Menu className={styles.navigationMenu} theme="dark" mode="horizontal" items={navigationItems} />
            <Space>
                <Link href="/login">
                    <Button variant="outlined" color="orange" icon={<LoginOutlined />}>
                        Login
                    </Button>
                </Link>
                <Link href="/register">
                    <Button variant="solid" color="orange" icon={<EditFilled />} iconPosition="end">
                        Register
                    </Button>
                </Link>
            </Space>
        </Header>
    );
}
