import { Header } from 'antd/es/layout/layout';
import styles from './navigationHeader.module.scss';
import { Button, Menu, MenuProps, Space } from 'antd';
import { EditFilled, LoginOutlined } from '@ant-design/icons';

type MenuItem = Required<MenuProps>['items'][number];

const navigationItems: MenuItem[] = [
    {
        label: 'Home',
        key: 'home',
    },
    {
        label: 'Author',
        key: 'author',
    },
];

export default function NavigationHeader() {
    return (
        <Header className={styles.header}>
            <div className="demo-logo" />
            <Menu className={styles.navigationMenu} theme="dark" mode="horizontal" items={navigationItems} />
            <Space>
                <Button variant="outlined" color="orange" icon={<LoginOutlined />}>
                    Login
                </Button>
                <Button variant="solid" color="orange" icon={<EditFilled />} iconPosition="end">
                    Register
                </Button>
            </Space>
        </Header>
    );
}
