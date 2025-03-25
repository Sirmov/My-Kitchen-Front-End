import '@ant-design/v5-patch-for-react-19';

import './globals.scss';

import type { Metadata } from 'next';

import { AntdRegistry } from '@ant-design/nextjs-registry';
import { App, ConfigProvider, Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';

import Footer from '@/components/layout/footer/footer';
import NavigationHeader from '@/components/layout/navigationHeader/navigationHeader';

export const metadata: Metadata = {
    title: {
        default: 'My Kitchen',
        template: 'My Kitchen - %s',
    },
    description: 'Self-hosted free and open source kitchen manager',
};

export default function RootLayout({ children }: React.PropsWithChildren) {
    return (
        <html lang="en">
            <body>
                <ConfigProvider theme={{ cssVar: true }}>
                    <App>
                        <Layout>
                            <NavigationHeader />
                            <Content>
                                <AntdRegistry>{children}</AntdRegistry>
                            </Content>
                            <Footer />
                        </Layout>
                    </App>
                </ConfigProvider>
            </body>
        </html>
    );
}
