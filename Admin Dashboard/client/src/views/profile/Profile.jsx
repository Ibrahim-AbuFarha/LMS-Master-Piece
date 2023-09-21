import React, { useState } from 'react';
import {
  Layout,
  Card,
  Avatar,
  Form,
  Input,
  Button,
  Typography,
  Divider,
  Space,
  message,
  Upload,
} from 'antd';
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  SaveOutlined,
  CalendarOutlined,
  BookOutlined,
} from '@ant-design/icons';
import AuthContext from '../../store/authContext';
import { useContext } from 'react';
import axios from 'axios';
const { Content } = Layout;
const { Title } = Typography;

const AdminProfilePage = () => {
  const { user, setUser } = useContext(AuthContext);
  const { img, setImg } = useState(null);
  console.log(user);

  const onFinish = async (values) => {
    console.log(values, img);

    // try {
    //   console.log(user._id);
    //   console.log('Received values:', values);
    //   const { data } = await axios.patch(
    //     `http://127.0.0.1:8000/api/v1/teachers/${user._id}`,
    //     values
    //   );
    //   console.log(data.teacher);
    //   message.success('Information has been updated');
    // } catch (error) {
    //   message.error('error');
    //   console.log(error.response.data.message);
    // }
  };

  const handleImgChange = (newImg) => {
    console.log(newImg);
    console.log(URL.createObjectURL(img));
    setImg(newImg);
    return false;
  };

  return (
    <Content style={{ padding: '24px' }}>
      <Card title="Admin Avatar" align="center">
        <Space align="center" direction="vertical">
          <Avatar size={128} src={user.img} />
          <Upload
            accept="image/*"
            multiple={false}
            beforeUpload={handleImgChange}
          >
            <Button>Select Image</Button>
          </Upload>
        </Space>
      </Card>
      <Divider />
      <Card title="Teacher Information" align="center">
        <Form
          name="adminProfileForm"
          onFinish={onFinish}
          initialValues={{
            fullName: user.fullName,
            email: user.email,
            mobile: user.mobile,
            age: user.age,
            address: user.address,
            gender: user.gender,
            course: user.course,
          }}
        >
          <Form.Item
            name="fullName"
            label="Full Name"
            rules={[
              {
                required: true,
                message: 'Please enter your full name!',
              },
            ]}
          >
            <Input prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                type: 'email',
                message: 'Please enter a valid email address!',
              },
              {
                required: true,
                message: 'Please enter your email!',
              },
            ]}
          >
            <Input prefix={<MailOutlined />} />
          </Form.Item>
          <Form.Item
            name="mobile"
            label="Mobile"
            rules={[
              {
                required: true,
                message: 'Please enter your Mobile number!',
              },
            ]}
          >
            <Input prefix={<PhoneOutlined />} />
          </Form.Item>
          <Form.Item
            name="age"
            label="Age"
            rules={[
              {
                required: true,
                message: 'Please enter your age!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="gender"
            label="Gender"
            rules={[
              {
                required: true,
                message: 'Please enter your Gender!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[
              {
                required: true,
                message: 'Please enter your address!',
              },
            ]}
          >
            <Input prefix={<CalendarOutlined />} />
          </Form.Item>
          <Form.Item
            name="course"
            label="Course"
            rules={[
              {
                required: true,
                message: 'Please enter your course!',
              },
            ]}
          >
            <Input prefix={<BookOutlined />} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" icon={<SaveOutlined />} htmlType="submit">
              Save Profile
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Divider />
      <Card title="Additional Information">
        <Card>
          <Title level={5}>Admin Roles</Title>
          <p>Assign and manage admin roles here.</p>
          {/* Add admin role management UI here */}
        </Card>
        <Card>
          <Title level={5}>Statistics</Title>
          <p>View and analyze admin-related statistics.</p>
          {/* Add admin-related statistics here */}
        </Card>
      </Card>
    </Content>
  );
};

export default AdminProfilePage;
