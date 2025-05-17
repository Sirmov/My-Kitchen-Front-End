'use client';

import { ReactElement } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { EditFilled, LoginOutlined, LogoutOutlined, MenuOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Dropdown, Menu, MenuProps, Space } from 'antd';
import { Header } from 'antd/es/layout/layout';
import MenuItem from 'antd/es/menu/MenuItem';

import logoHorizontal from '@public/logo-horizontal.png';

import { useAuthContext } from '@contexts/authContext';

import styles from './navigationHeader.module.scss';

type MenuItem = Required<MenuProps>['items'][number];

export default function NavigationHeader() {
    const router = useRouter();
    const pathname = usePathname();
    const { auth, setAuth } = useAuthContext();

    function handleLogout(e: React.MouseEvent) {
        e.preventDefault();
        setAuth(null);
        router.push('/');
    }

    const navigationLinks: MenuItem[] = [
        { label: <Link href="/">Home</Link>, key: '/' },
        { label: <Link href="/about">About</Link>, key: '/about' },
        ...(auth ?
            [
                { label: <Link href="/recipes">Recipes</Link>, key: '/recipes' },
                {
                    key: 'logout',
                    icon: <LogoutOutlined />,
                    label: (
                        <Link className={styles.authenticationButton} href=":" prefetch={false} onClick={handleLogout}>
                            Logout
                        </Link>
                    ),
                },
            ]
        :   [
                {
                    key: '/login',
                    icon: <LoginOutlined />,
                    label: (
                        <Link className={styles.authenticationButton} href="/login" prefetch={false}>
                            Login
                        </Link>
                    ),
                },
                {
                    key: '/register',
                    icon: <EditFilled />,
                    label: (
                        <Link className={styles.authenticationButton} href="/register" prefetch={false}>
                            Register
                        </Link>
                    ),
                },
            ]),
    ];

    const navigationButtons: ReactElement[] =
        auth ?
            [
                <Button
                    key="/logout"
                    className={styles.authenticationButton}
                    variant="solid"
                    color="orange"
                    icon={<LogoutOutlined />}
                    onClick={handleLogout}>
                    Logout
                </Button>,
            ]
        :   [
                <Link key={'/login'} href="/login">
                    <Button
                        className={styles.authenticationButton}
                        variant="solid"
                        color="orange"
                        icon={<LoginOutlined />}>
                        Login
                    </Button>
                </Link>,
                <Link key={'/register'} href="/register">
                    <Button
                        className={styles.authenticationButton}
                        variant="solid"
                        color="orange"
                        icon={<EditFilled />}
                        iconPosition="end">
                        Register
                    </Button>
                </Link>,
            ];

    return (
        <ConfigProvider
            theme={{
                components: {
                    Menu: {
                        darkItemBg: '#854c0b',
                        darkItemSelectedBg: '#ff6f1f',
                        darkPopupBg: '#854c0b',
                        itemColor: '#ffffff',
                        darkSubMenuItemBg: '#ff6f1f',
                    },
                    Dropdown: {
                        colorBgElevated: '#854c0b', // background of dropdown
                    },
                },
            }}>
            <Header className={styles.header}>
                <Link className={styles.logo} href="/">
                    <Image className={styles.logo} src={logoHorizontal} alt="logo" />
                </Link>

                <Menu
                    className={styles.navigationMenu}
                    theme="dark"
                    mode="horizontal"
                    items={navigationLinks}
                    selectedKeys={[pathname]}
                />

                <div className={styles.hamburgerDropdown}>
                    <Dropdown
                        trigger={['click']}
                        menu={{
                            className: styles.hamburgerMenu,
                            theme: 'dark',
                            mode: 'vertical',
                            items: navigationLinks,
                            selectedKeys: [pathname],
                        }}
                        overlayClassName={styles.dropdownOverlay}>
                        <Button className={styles.hamburgerButton} type="text" icon={<MenuOutlined />} />
                    </Dropdown>
                </div>

                <Space className={styles.navigationButtons}>{navigationButtons}</Space>
            </Header>
        </ConfigProvider>
    );
}
