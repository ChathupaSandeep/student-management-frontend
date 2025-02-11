import React from "react";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

const items = [
  { key: "1", label: "Home", path: "/" },
  { key: "2", label: "Students", path: "/students" },
  { key: "3", label: "Courses", path: "/courses" },
];

function MainHeader() {
  const navigate = useNavigate();

  return (
    <Header style={{ display: "flex", alignItems: "center" }}>
      <div className="demo-logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        style={{ flex: 1, minWidth: 0 }}
        onClick={(e) =>
          navigate(items.find((item) => item.key === e.key)?.path || "/")
        }
        items={items}
      />
    </Header>
  );
}

export default MainHeader;
