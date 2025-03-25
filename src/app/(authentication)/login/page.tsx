'use client';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import styles from './page.module.scss';

import foodPlatter from '@public/food-platter.jpg';

import { Button, Checkbox, Col, Flex, Form, Input, Row } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import Password from 'antd/es/input/Password';
import Link from 'next/link';

function onFinish(values: any) {
    console.log(`Received values of form: ${values}`);
}

export default function LoginPage() {
    return (
        <Row style={{ height: '90vh' }}>
            <Col
                className={styles.imageContainer}
                style={{ backgroundImage: `url(${foodPlatter.src})` }}
                xs={{ span: 0 }}
                md={{ span: 12 }}></Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
                <div className={styles.container}>
                    <h1 className={styles.formTitle}>Login</h1>

                    <Form
                        className={styles.loginForm}
                        name="loginForm"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}>
                        <FormItem name="username" rules={[{ required: true, message: 'Please input your Username!' }]}>
                            <Input prefix={<UserOutlined />} placeholder="Username" />
                        </FormItem>

                        <FormItem name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
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
                            <Button block size="large" type="primary" htmlType="submit">
                                Log in
                            </Button>
                            Don&apos;t have an account? <Link href="/register">Register now!</Link>
                        </FormItem>
                    </Form>
                </div>
            </Col>
        </Row>
    );
}
