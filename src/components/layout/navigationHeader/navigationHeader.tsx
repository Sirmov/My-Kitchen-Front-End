'use client';

import styles from './navigationHeader.module.scss';

import logoHorizontal from '@public/logo-horizontal.png';

import { ReactNode } from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { Button, ConfigProvider, Menu, MenuProps, Space } from 'antd';
import { EditFilled, LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { Header } from 'antd/es/layout/layout';
import MenuItem from 'antd/es/menu/MenuItem';

import { useAuthContext } from '@/contexts/authContext';

type MenuItem = Required<MenuProps>['items'][number];

export default function NavigationHeader() {
    const pathname = usePathname();
    const { auth, setAuth } = useAuthContext();

    let navigationLinks: MenuItem[] = [
        {
            label: <Link href="/">Home</Link>,
            key: '/',
        },
        {
            label: <Link href="/about">About</Link>,
            key: '/about',
        },
    ];

    let navigationButtons: ReactNode[];

    if (auth) {
        if (!navigationLinks.find((ni) => ni?.key === 'recipes')) {
            navigationLinks.splice(1, 0, {
                label: <Link href="/recipes">Recipes</Link>,
                key: '/recipes',
            });
        }

        navigationButtons = [
            <Button key={1} variant="solid" color="orange" icon={<LogoutOutlined />} onClick={() => setAuth(null)}>
                Logout
            </Button>,
        ];
    } else {
        navigationLinks = navigationLinks.filter((ni) => ni?.key !== 'recipes');

        navigationButtons = [
            <Link key={1} href="/login">
                <Button key={1} variant="solid" color="orange" icon={<LoginOutlined />}>
                    Login
                </Button>
            </Link>,
            <Link key={2} href="/register">
                <Button variant="solid" color="orange" icon={<EditFilled />} iconPosition="end">
                    Register
                </Button>
            </Link>,
        ];
    }

    return (
        <Header className={styles.header}>
            <Link className={styles.logo} href="/">
                <Image className={styles.logo} src={logoHorizontal} alt="logo" />
            </Link>

            <Menu className={styles.navigationMenu} theme="dark" mode="horizontal" items={navigationItems} />

                <Menu
                    className={styles.navigationMenu}
                    theme="dark"
                    mode="horizontal"
                    items={navigationLinks}
                    selectedKeys={[pathname]}
                />
                <Space>{navigationButtons}</Space>
            </Header>
    );
}
