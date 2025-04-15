'use client';

import styles from './navigationHeader.module.scss';

import logoHorizontal from '@public/logo-horizontal.png';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import { Button, Menu, MenuProps, Space } from 'antd';
import { EditFilled, LoginOutlined } from '@ant-design/icons';
import { Header } from 'antd/es/layout/layout';
import MenuItem from 'antd/es/menu/MenuItem';

import { useAuthContext } from '@/contexts/authContext';

type MenuItem = Required<MenuProps>['items'][number];

export default function NavigationHeader() {
    const router = useRouter();
    const { auth } = useAuthContext();

    let navigationItems: MenuItem[] = [
        {
            label: <Link href="/">Home</Link>,
            key: 'home',
        },
        {
            label: <Link href="/about">About</Link>,
            key: 'about',
        },
    ];

    if (auth) {
        if (!navigationItems.find((ni) => ni?.key === 'recipes')) {
            navigationItems.splice(1, 0, {
                label: <Link href="/recipes">Recipes</Link>,
                key: 'recipes',
            });
        }
    } else {
        navigationItems = navigationItems.filter((ni) => ni?.key !== 'recipes');
    }

    return (
        <Header className={styles.header}>
            <Image className={styles.logo} src={logoHorizontal} alt="logo" />

            <Menu className={styles.navigationMenu} theme="dark" mode="horizontal" items={navigationItems} />

            {!auth && (
                <Space>
                    <Button
                        variant="outlined"
                        color="orange"
                        icon={<LoginOutlined />}
                        onClick={() => router.push('/login')}>
                        Login
                    </Button>
                    <Button
                        variant="solid"
                        color="orange"
                        icon={<EditFilled />}
                        iconPosition="end"
                        onClick={() => router.push('/register')}>
                        Register
                    </Button>
                </Space>
            )}
        </Header>
    );
}
