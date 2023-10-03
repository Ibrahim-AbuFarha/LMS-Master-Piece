import React, { useContext } from "react";
import { Layout, Menu, Dropdown, Avatar } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../store/authContext";

const { Header } = Layout;

const AppHeader = () => {
  const navigate = useNavigate();
  // Sample user data
  // const user = {
  //   name: 'Admin User',
  //   profilePicture: 'URL_TO_YOUR_PROFILE_PICTURE',
  // };

  const { user, logout } = useContext(AuthContext);

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menu = (
    <Menu>
      <Menu.Item key="profile">
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" onClick={handleLogout}>
        <LogoutOutlined /> Logout
      </Menu.Item>
    </Menu>
  );

  const items = [
    {
      label: <Link to="/profile">Profile</Link>,
      key: "0",
    },
    {
      label: <div onClick={handleLogout}>Logout</div>,
      key: "1",
    },
  ];

  return (
    <Header
      style={{
        background: "#fff",
        padding: "0",
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginRight: "50px",
          cursor: "pointer",
        }}
      >
        <Dropdown
          menu={{
            items,
          }}
          trigger={["click"]}
        >
          <span style={{ display: "flex", alignItems: "center" }}>
            <Avatar size={32} icon={<UserOutlined />} src={user.img} />
            <span style={{ marginLeft: "8px" }}>{user.fullName}</span>
          </span>
        </Dropdown>
      </div>
    </Header>
  );
};

export default AppHeader;
