'use client';

import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Flex, Form, Input, Row, notification } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import Password from 'antd/es/input/Password';

import foodPlatter from '@public/food-platter.jpg';

import { useAuthContext } from '@contexts/authContext';

import { User, loginWithUsername } from '@services/authService';

import styles from './page.module.scss';

interface LoginFormValues {
    username: string;
    password: string;
    remember: boolean;
}

export default function LoginPage() {
    const router = useRouter();

    const [api, contextHolder] = notification.useNotification();
    const [form] = Form.useForm<LoginFormValues>();

    const { setAuth } = useAuthContext();
    const [loading, setLoading] = useState(false);

    async function handleSubmit(values: LoginFormValues) {
        setLoading(true);

        try {
            const user = await loginWithUsername(values.username, values.password);
            setAuth(user as User);
            router.push('/');
        } catch {
            api.error({
                message: `Error`,
                description: 'Username or password is not correct.',
                placement: 'topRight',
                showProgress: true,
                pauseOnHover: true,
            });
            form.resetFields();
        }

        setLoading(false);
    }

    return (
        <Row style={{ height: '90vh' }}>
            {contextHolder}
            <Col
                className={styles.imageContainer}
                style={{ backgroundImage: `url(${foodPlatter.src})` }}
                xs={{ span: 0 }}
                md={{ span: 12 }}></Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
                <Flex justify="center" align="center">
                    <div className={styles.container}>
                        <h1 className={styles.formTitle}>Login</h1>

                        <Form
                            form={form}
                            className={styles.loginForm}
                            name="loginForm"
                            initialValues={{ remember: true }}
                            onFinish={handleSubmit}>
                            <FormItem
                                name="username"
                                rules={[{ required: true, message: 'Please input your Username!' }]}>
                                <Input prefix={<UserOutlined />} placeholder="Username" />
                            </FormItem>

                            <FormItem
                                name="password"
                                rules={[{ required: true, message: 'Please input your Password!' }]}>
                                <Password prefix={<LockOutlined />} placeholder="Password" />
                            </FormItem>

                            <FormItem>
                                <Flex justify="space-between" align="center">
                                    <FormItem name="remember" valuePropName="checked" noStyle>
                                        <Checkbox>Remember me</Checkbox>
                                    </FormItem>
                                    <Link href="/forgotPassword">Forgot password?</Link>
                                </Flex>
                            </FormItem>

                            <FormItem>
                                <Button
                                    id={styles.submitButton}
                                    block
                                    size="large"
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading}>
                                    Log in
                                </Button>
                                Don&apos;t have an account? <Link href="/register">Register now!</Link>
                            </FormItem>
                        </Form>
                    </div>
                </Flex>
            </Col>
        </Row>
    );
}
