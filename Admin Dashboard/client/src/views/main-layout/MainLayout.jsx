import { Layout } from 'antd';
import Sidebar from '../../components/layout/sidebar';
import Header from '../../components/layout/Header';
const { Content } = Layout;

import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <Layout
      style={{
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <Sidebar />
      <Layout>
        <Header
          style={{
            padding: 0,
            background: 'black',
          }}
        />
        <Content
          style={{
            padding: 20,
            overflow: 'scroll',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
