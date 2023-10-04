import { Menu, Layout, Typography } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  UserAddOutlined,
  AppstoreOutlined,
  LaptopOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";


//items menu of sideBar
const items = [
  { key: "", label: "Home", icon: <HomeOutlined /> },
  {
    key: "RequestsApproval",
    label: "RequestsApproval",
    icon: <ProfileOutlined />,
  },
  {
    label: "Students",

    children: [
      {
        key: "All Students",
        label: "All Students",
        icon: <UserOutlined />,
      },
      {
        key: "Add Student",
        label: "Add Student",
        icon: <UserAddOutlined />,
      },
    ],
  },
  {
    label: "Teacher",

    children: [
      { key: "All Teacher", label: "All Teacher", icon: <UserOutlined /> },
      { key: "Add Teacher", label: "Add Teacher", icon: <UserAddOutlined /> },
    ],
  },
  {
    label: "My Classes",
    key: "My Classes",
    icon: <LaptopOutlined />,
  },
  {
    label: "Courses",
    type: "group",
    children: [
      { label: "My Courses", key: "My Courses", icon: <AppstoreOutlined /> },
    ],
  },
];

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <Layout.Sider>
      <Typography.Title level={2} style={{ color: "white", padding: "24px" }}>
        TailAdmin
      </Typography.Title>
      <Menu
        theme="dark"
        mode="inline"
        items={items}
        onClick={(e) => navigate(e.key.replaceAll(" ", ""))}
      ></Menu>
    </Layout.Sider>
  );
};

export default Sidebar;
