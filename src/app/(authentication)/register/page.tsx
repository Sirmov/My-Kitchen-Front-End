'use client';

import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Flex, Form, Input, Row, notification } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import Password from 'antd/es/input/Password';

import foodPlatter from '@public/food-platter.jpg';

import { useAuthContext } from '@contexts/authContext';

import { User, register } from '@services/authService';

import styles from './page.module.scss';

interface RegisterFormValues {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    agreement: boolean;
}

export default function RegisterPage() {
    const router = useRouter();

    const [api, contextHolder] = notification.useNotification();
    const [form] = Form.useForm<RegisterFormValues>();

    const { setAuth } = useAuthContext();
    const [loading, setLoading] = useState(false);

    async function handleSubmit(values: RegisterFormValues) {
        setLoading(true);

        try {
            const user = await register(values.username, values.email, values.password);
            setAuth(user as User);
            router.push('/');
        } catch {
            api.error({
                message: `Error`,
                description: 'Something went wrong. Please try again later.',
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
                        <h1 className={styles.formTitle}>Register</h1>
                        <Form className={styles.registerForm} name="registerForm" form={form} onFinish={handleSubmit}>
                            <FormItem
                                name="email"
                                rules={[
                                    {
                                        type: 'email',
                                        message: 'The input is not valid Email!',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your email!',
                                    },
                                ]}>
                                <Input prefix={<MailOutlined />} placeholder="Email" />
                            </FormItem>
                            <FormItem
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                ]}>
                                <Input prefix={<UserOutlined />} placeholder="Username" />
                            </FormItem>
                            <FormItem
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                                hasFeedback>
                                <Password prefix={<LockOutlined />} placeholder="Password" />
                            </FormItem>
                            <FormItem
                                name="confirmPassword"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please confirm your password!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(
                                                new Error('The new password that you entered do not match!')
                                            );
                                        },
                                    }),
                                ]}>
                                <Password prefix={<LockOutlined />} placeholder="Confirm Password" />
                            </FormItem>
                            <FormItem>
                                <Flex justify="space-between" align="center">
                                    <FormItem
                                        name="agreement"
                                        valuePropName="checked"
                                        noStyle
                                        rules={[
                                            {
                                                validator: (_, value) =>
                                                    value ?
                                                        Promise.resolve()
                                                    :   Promise.reject(new Error('Should accept agreement')),
                                            },
                                        ]}>
                                        <Checkbox>
                                            I have read the <a href="">agreement</a>
                                        </Checkbox>
                                    </FormItem>
                                    <Button
                                        id={styles.submitButton}
                                        type="primary"
                                        htmlType="submit"
                                        size="large"
                                        loading={loading}>
                                        Register
                                    </Button>
                                </Flex>
                            </FormItem>
                            Already have an account? <Link href="/login">Log in now!</Link>
                        </Form>
                    </div>
                </Flex>
            </Col>
        </Row>
    );
}
