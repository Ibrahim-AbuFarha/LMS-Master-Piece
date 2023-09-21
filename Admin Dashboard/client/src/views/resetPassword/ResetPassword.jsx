import { Alert, Input, Button, Form } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./ResetPassword.css"; // Import your CSS file for styling
import { useNavigate } from "react-router-dom";
const ResetPassword = () => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    // Handle password reset logic here
    console.log("Received values:", values);
    navigate("/newPassword");
  };

  return (
    <div className="password-reset-container">
      <div className="password-reset-form">
        <div className="password-reset-header">
          <h1>Password Reset</h1>
        </div>
        <Form onFinish={onFinish}>
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
              prefix={<UserOutlined />}
              placeholder="Email"
              className="password-reset-input"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="password-reset-button"
            >
              Reset Password
            </Button>
          </Form.Item>
          <div className="password-reset-footer">
            Remember your password? <Link to="/login">Sign In</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
