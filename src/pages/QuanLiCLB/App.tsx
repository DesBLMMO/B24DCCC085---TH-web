import { useState } from 'react';
import { ConfigProvider, Layout, Menu, Typography } from 'antd';
import viVN from 'antd/es/locale/vi_VN';
import {
  TeamOutlined,
  FormOutlined,
  UserOutlined,
  BarChartOutlined,
} from '@ant-design/icons';
import ClubListPage from './pages/ClubList';
import RegistrationPage from './pages/DangKi';
import MembersPage from './pages/Members';
import ReportsPage from './pages/BaoCao';

const { Sider, Content } = Layout;

const menuItems = [
  { key: 'clubs', icon: <TeamOutlined />, label: 'Câu lạc bộ' },
  { key: 'registrations', icon: <FormOutlined />, label: 'Đơn đăng ký' },
  { key: 'members', icon: <UserOutlined />, label: 'Thành viên' },
  { key: 'reports', icon: <BarChartOutlined />, label: 'Báo cáo thống kê' },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('clubs');
  const [selectedClubId, setSelectedClubId] = useState<string | undefined>();

  const goToMembers = (clubId: string) => {
    setSelectedClubId(clubId);
    setCurrentPage('members');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'clubs':
        return <ClubListPage onViewMembers={goToMembers} />;
      case 'registrations':
        return <RegistrationPage />;
      case 'members':
        return <MembersPage initialClubId={selectedClubId} />;
      case 'reports':
        return <ReportsPage />;
      default:
        return <ClubListPage onViewMembers={goToMembers} />;
    }
  };

  return (
    <ConfigProvider locale={viVN}>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider width={220} breakpoint="lg" collapsedWidth={60} style={{ background: '#001529' }}>
          <Typography.Text
            strong
            style={{
              display: 'block',
              padding: '20px 16px',
              textAlign: 'center',
              color: '#fff',
              fontSize: 16,
              borderBottom: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            Quản lý CLB
          </Typography.Text>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[currentPage]}
            items={menuItems}
            onClick={({ key }) => {
              setCurrentPage(key);
              if (key !== 'members') setSelectedClubId(undefined);
            }}
          />
        </Sider>
        <Content style={{ padding: 24, background: '#f0f2f5', overflow: 'auto' }}>
          {renderPage()}
        </Content>
      </Layout>
    </ConfigProvider>
  );
}