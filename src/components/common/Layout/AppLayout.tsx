import { useState } from 'react';
import { Button, Layout, Menu, theme } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router-dom';

const { Sider, Header } = Layout;

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === '1') {
      navigate('/');
    }
  };

  const logoStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 32,
    margin: 16,
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: borderRadiusLG,
  };

  const headerButtonStyle = {
    fontSize: '16px',
    width: 64,
    height: 64,
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div style={logoStyle} className="demo-logo-vertical">
          logo
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'Manage Product',
              onClick: handleMenuClick,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ display: 'flex', padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={headerButtonStyle}
          />
        </Header>
        <Outlet />
      </Layout>
    </Layout>
  );
};

export default AppLayout;
