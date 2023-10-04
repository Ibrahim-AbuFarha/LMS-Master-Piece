import React from "react";
import { Input, Button, Form, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  MobileOutlined,
} from "@ant-design/icons";
import "./SignUp.css";
import { Link } from "react-router-dom";
import { LMS_API } from "../../../api/api";

const SignUpForm = () => {
  const signUp = async (values) => {
    try {
      console.log(values);

      const { data } = await LMS_API.post("/teachers/signUpTeacher", values);
      console.log(data);
      message.success(
        "You will be notified when the admin accept your request"
      );
    } catch (error) {
      message.error("this email is already exist ");
    }
  };

  const onFinish = (values) => {
    signUp(values);
  };

  return (
    <div className="signUp-container">
      <div className="signUp-form">
        <div className="signUp-header">
          <h1>Sign Up</h1>
        </div>
        <Form onFinish={onFinish}>
          <Form.Item
            name="fullName"
            rules={[{ required: true, message: "Please enter your username!" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Full name"
              className="signUp-input"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter your email address!",
                type: "email",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Email"
              className="signUp-input"
            />
          </Form.Item>
          <Form.Item
            name="mobile"
            rules={[
              {
                required: true,
                message: "Please enter your mobile number!",
                type: "mobile",
              },
            ]}
          >
            <Input
              prefix={<MobileOutlined />}
              placeholder="Mobile"
              className="signUp-input"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              className="signUp-input"
            />
          </Form.Item>
          <Form.Item
            name="passwordConfirm"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm Password"
              className="signUp-input"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="signUp-button">
              Sign Up
            </Button>
          </Form.Item>
          <div className="signUp-footer">
            Already have an account? <Link to={"/login"}>Sign In</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignUpForm;
