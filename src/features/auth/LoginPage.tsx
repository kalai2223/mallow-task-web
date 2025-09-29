import React from 'react';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, message, Checkbox } from 'antd';
import { useNavigate } from 'react-router-dom';

import { loginUser } from './authSlice';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import InputComponent from '../../components/InputComponent';

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);

  const [form] = Form.useForm();

  const onFinish = (values: { email: string; password: string }) => {
    dispatch(loginUser(values))
      .unwrap()
      .then(() => {
        message.success('Login successful!');
        navigate('/users'); // redirect on success
      })
      .catch(() => {
        message.error('Login failed!');
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Form
        form={form}
        onFinish={onFinish}
        style={{ padding: '40px' }}
        className="bg-white shadow-lg rounded-xl w-120"
        layout="vertical"
        initialValues={{ email: 'eve.holt@reqres.in', password: 'cityslicka' }}
      >
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <InputComponent
          name="email"
          placeholder="Please enter email"
          rules={[{ required: true, message: 'First name is required' }]}
          prefix={<UserOutlined className="text-gray-200" />}
          size="large"
        />

        <InputComponent
          name="password"
          placeholder="Please enter password"
          type="password"
          rules={[{ required: true, message: 'First name is required' }]}
          prefix={<LockOutlined className="text-gray-400" />}
          size="large"
        />
        <Form.Item name="remember" valuePropName="checked" label={null}>
          <Checkbox defaultChecked>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
