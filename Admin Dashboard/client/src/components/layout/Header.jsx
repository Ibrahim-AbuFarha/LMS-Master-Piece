import React, { useContext } from "react";
import { Layout, Dropdown, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../store/authContext";

const { Header } = Layout;

const AppHeader = () => {
  //navigate to another page
  const navigate = useNavigate();

  //context consume
  const { user, logout } = useContext(AuthContext);

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  //our items on profile icon

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
