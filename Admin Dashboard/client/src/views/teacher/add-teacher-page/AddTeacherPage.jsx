import { Form, Input, Button, Row, Col, Select } from "antd";
import axios from "axios";
import { message } from "antd";

const AddTeacherPage = () => {
  const [form] = Form.useForm();
  const onAdd = async () => {
    try {
      const values = await form.validateFields();
      await axios.post("http://127.0.0.1:8000/api/v1/teachers", values);
      message.success("Teacher has added");
      form.resetFields();
    } catch (error) {
      message.error("error");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Basic Details</h1>
      <Form
        name="addTeacherForm"
        form={form}
        onFinish={onAdd}
        layout="vertical"
      >
        <Row gutter={50}>
          <Col span={8}>
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[
                { required: true, message: "Please enter the full name" },
              ]}
            >
              <Input size="large" placeholder="Enter Full Name" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Gender"
              name="gender"
              rules={[{ required: true, message: "Please select Gender" }]}
            >
              <Select size="large" placeholder="">
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <h1>Login Information</h1>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Email ID"
              name="email"
              rules={[{ required: true, message: "Please enter the Email ID" }]}
            >
              <Input type="email" size="large" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please enter the Password" }]}
            >
              <Input.Password size="large" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Password Confirm"
              name="passwordConfirm"
              rules={[{ required: true, message: "Please enter the Password" }]}
            >
              <Input.Password size="large" />
            </Form.Item>
          </Col>
        </Row>
        <h1>Personal Information</h1>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: "Please enter the Address" }]}
            >
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Mobile"
              name="mobile"
              rules={[{ required: true, message: "Please enter the Mobile" }]}
            >
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Course"
              name="course"
              rules={[{ required: true, message: "Please enter the grade" }]}
            >
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Age"
              name="age"
              rules={[{ required: true, message: "Please enter the age" }]}
            >
              <Input size="large" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Teacher
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddTeacherPage;
