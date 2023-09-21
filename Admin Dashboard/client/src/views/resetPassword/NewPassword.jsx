import React from "react";
import { Input, Button, Form } from "antd";
import { LockOutlined } from "@ant-design/icons";
import "./NewPassword.css"; // Import your CSS file for styling
import { useNavigate } from "react-router-dom";
const NewPasswordForm = () => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    // Handle setting a new password logic here
    console.log("Received values:", values);
    navigate("/login");
  };

  return (
    <div className="new-password-container">
      <div className="new-password-form">
        <div className="new-password-header">
          <h1>Set New Password</h1>
        </div>
        <Form onFinish={onFinish}>
          <Form.Item
            name="newPassword"
            rules={[
              { required: true, message: "Please enter your new password!" },
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="New Password"
              className="new-password-input"
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Please confirm your new password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Confirm New Password"
              className="new-password-input"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="new-password-button"
            >
              Set Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default NewPasswordForm;
