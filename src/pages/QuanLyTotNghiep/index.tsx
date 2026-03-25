import React, {useState, useEffect} from "react";
import { Layout, Tabs, Typography   } from "antd";
import { Registry, Decision, Diploma, FieldConfig } from "./types";
import QuanLySoVanBang from "./pages/QuanLiSoVanBan";
import CapPhatVanBang from "./pages/CapPhatVanBang";
import TraCuuVanBang from "./pages/TraCuuVanBang";
import CauHinhPhuLuc from "./pages/CauHinhPhuLuc";
import QuanLyQuyetDinh from "./pages/QuanLiQuyetDinh";

const { Header, Content } = Layout;
const { Title } = Typography;
const { TabPane } = Tabs;

const App: React.FC = () => {
  const [registries, setRegistries] = useState<Registry[]>([]);
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [fieldConfigs, setFieldConfigs] = useState<FieldConfig[]>([]);
  const [diplomas, setDiplomas] = useState<Diploma[]>([]);

  useEffect(() => {
    const savedRegistries = localStorage.getItem("registries");
    const savedDecisions = localStorage.getItem("decisions");
    const savedFieldConfigs = localStorage.getItem("fieldConfigs");
    const savedDiplomas = localStorage.getItem("diplomas");

    if (savedRegistries) setRegistries(JSON.parse(savedRegistries));
    if (savedDecisions) setDecisions(JSON.parse(savedDecisions));
    if (savedFieldConfigs) setFieldConfigs(JSON.parse(savedFieldConfigs));
    if (savedDiplomas) setDiplomas(JSON.parse(savedDiplomas));
  }, []);

  useEffect(() => {
    localStorage.setItem("registries", JSON.stringify(registries));
    localStorage.setItem("decisions", JSON.stringify(decisions));
    localStorage.setItem("fieldConfigs", JSON.stringify(fieldConfigs));
    localStorage.setItem("diplomas", JSON.stringify(diplomas));
  }, [registries, decisions, fieldConfigs, diplomas]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          background: "#ffffff",
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid #f0f0f0"
        }}
      >
        <Title level={3} style={{ margin: 0 }}>
          Hệ thống Quản lý Văn bằng
        </Title>
      </Header>

      <Content style={{ padding: 24, background: "#f0f2f5" }}>
        <div style={{ background: "#fff", padding: 24, minHeight: 400, borderRadius: 8 }}>
          <Tabs defaultActiveKey="1" type="card">
            <TabPane tab="Tra cứu Văn bằng" key="1">
              <TraCuuVanBang
                diplomas={diplomas} 
                decisions={decisions} 
                setDecisions={setDecisions} 
              />
            </TabPane>

            <TabPane tab="Quản lý Sổ" key="2">
              <QuanLySoVanBang 
                registries={registries} 
                setRegistries={setRegistries} 
              />
            </TabPane>

            <TabPane tab="Quản lý Quyết định" key="3">
              <QuanLyQuyetDinh
                decisions={decisions} 
                setDecisions={setDecisions} 
                registries={registries} 
              />
            </TabPane>

            <TabPane tab="Cấu hình Biểu mẫu" key="4">
              <CauHinhPhuLuc
                fieldConfigs={fieldConfigs} 
                setFieldConfigs={setFieldConfigs} 
              />
            </TabPane>

            <TabPane tab="Quản lý Văn bằng" key="5">
              <CapPhatVanBang
                diplomas={diplomas} 
                setDiplomas={setDiplomas} 
                decisions={decisions} 
                fieldConfigs={fieldConfigs} 
              />
            </TabPane>
          </Tabs>
        </div>
      </Content>
    </Layout>
  );
};

export default App;