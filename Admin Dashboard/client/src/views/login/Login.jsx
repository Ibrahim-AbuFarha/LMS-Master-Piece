import React from 'react';
import { Alert, Input, Button, Form, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './LoginForm.css'; // Import your CSS file for styling
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import AuthContext from '../../store/authContext';
const LoginForm = () => {
  const { logIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const signIn = async (values) => {
    try {
      const { data } = await axios.post(
        'http://127.0.0.1:8000/api/v1/teachers/signInTeacher',
        values,
        { withCredentials: true }
      );

      console.log(data);
      logIn(data.teacher);
      navigate('/');
    } catch (error) {
      console.log(error);
      message.error('email or password is not correct ');
    }
  };
  const onFinish = (values) => {
    signIn(values);
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="login-header">
          <h1>Login</h1>
        </div>
        <Form onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please enter a valid  Email!',
                type: 'email',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Email"
              className="login-input"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              className="login-input"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-button">
              Login
            </Button>
          </Form.Item>
          <div className="login-footer">
            Don't have an account? <Link to="/signUp">Sign Up</Link>
          </div>
          <div className="login-footer">
            <Link to="/resetPassword">Forgot your password?</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
