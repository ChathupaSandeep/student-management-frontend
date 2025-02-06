import React from "react";
import { Layout, theme } from "antd";
import { Outlet } from "react-router-dom"; // Import Outlet for route rendering

const { Content } = Layout;

const MainLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Content style={{ minHeight: "92vh" }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
            margin: 24,
          }}
        >
          <Outlet /> {/* 👈 This is where the routed page components render */}
        </div>
      </Content>
    </Layout>
  );
};

export default MainLayout;
