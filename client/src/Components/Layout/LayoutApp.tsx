import { Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import Layout, { Content, Footer } from 'antd/es/layout/layout';
import { useState } from 'react'
import { LayoutAppProps } from './types';

import {
  HomeOutlined,
  TableOutlined
} from '@ant-design/icons';
import { getMenuItem } from "./helpers/getMenuItem";
import { MenuItem } from "./types";
import { useNavigate } from 'react-router-dom';


export const LayoutApp = ({ children }: LayoutAppProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();

  const menuItems: MenuItem[] = [
    getMenuItem('Home', '1', <HomeOutlined />, () => {
      navigate('/')
    }),
    getMenuItem('Excel upload', '2', <TableOutlined />, () => {
      navigate('/excel2json')
    })
  ]

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <Menu theme="dark" mode="inline" items={menuItems} />
      </Sider>
      <Layout>
        <Content style={{ margin: '16px 16px' }}>
          {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>SAMSUNG SDS ©2023</Footer>
      </Layout>
    </Layout>
  );
}