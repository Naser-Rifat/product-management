import  { useState } from 'react'
import {  Button, Layout, Menu, theme } from 'antd';

import { MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import Sider from 'antd/es/layout/Sider';
import { Outlet, useNavigate } from 'react-router-dom';
import { Header } from 'antd/es/layout/layout';



function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate()
  return (
    <>
       <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{
        height: '100vh',
        padding:'10px'
      }}>
        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' , borderRadius: borderRadiusLG,  }} className="demo-logo-vertical">
          
          logo</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'nav 1',
              onClick: () => navigate('/'),
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'nav 2',
              onClick: () => navigate('/'),

            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
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
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>      
          <Outlet/>
      </Layout>
    </Layout>
    </>
  )
}

export default AppLayout
