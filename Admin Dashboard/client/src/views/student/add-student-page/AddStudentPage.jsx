import { Form, Input, Button, Row, Col, Select, message } from "antd";
import { LMS_API } from "../../../../api/api";
const AddStudentPage = () => {
  const [form] = Form.useForm();
  //add new student
  const onAdd = async () => {
    try {
      const values = await form.validateFields();
      await LMS_API.post("/students", values);
      message.success("Student has added");
      form.resetFields();
    } catch (error) {
      message.error("error");
      console.log(error.response.data.message);
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
                { required: true, message: "Please enter your full name" },
              ]}
            >
              <Input size="large" placeholder="Enter your Full Name" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Gender"
              name="gender"
              rules={[{ required: true, message: "Please select Gender" }]}
            >
              <Select size="large" placeholder="">
                <Select.Option value="male">Male</Select.Option>
                <Select.Option value="female">Female</Select.Option>
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
              label="Grade"
              name="grade"
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
            Add Student
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddStudentPage;
