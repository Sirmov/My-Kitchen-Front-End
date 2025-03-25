'use client';

import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import styles from './page.module.scss';

import foodPlatter from '@public/food-platter.jpg';

import { Button, Checkbox, Col, Flex, Form, Input, Row } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import Password from 'antd/es/input/Password';
import Link from 'next/link';

export default function RegisterPage() {
    return (
        <Row style={{ height: '90vh' }}>
            <Col
                className={styles.imageContainer}
                style={{ backgroundImage: `url(${foodPlatter.src})` }}
                xs={{ span: 0 }}
                md={{ span: 12 }}></Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
                <div className={styles.container}>
                    <h1 className={styles.formTitle}>Register</h1>
                    <Form className={styles.registerForm} name="registerForm">
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
                            name="confirm-password"
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
                                                value
                                                    ? Promise.resolve()
                                                    : Promise.reject(new Error('Should accept agreement')),
                                        },
                                    ]}>
                                    <Checkbox>
                                        I have read the <a href="">agreement</a>
                                    </Checkbox>
                                </FormItem>
                                <Button type="primary" htmlType="submit" size="large">
                                    Register
                                </Button>
                            </Flex>
                        </FormItem>
                        Already have an account? <Link href="/login">Log in now!</Link>
                    </Form>
                </div>
            </Col>
        </Row>
    );
}
