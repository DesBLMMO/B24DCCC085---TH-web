import React, { useEffect, useState } from 'react';
import {
  Tabs, Card, Input, Button, InputNumber, Select, DatePicker, 
  TimePicker, message, Modal, Form, Table, Row, Col, Typography, 
  Rate, Tag, Popconfirm, Space
} from 'antd';
import { 
  EditOutlined, DeleteOutlined, PlusOutlined, 
  StarOutlined, CheckCircleOutlined, MinusCircleOutlined, MessageOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

const { TabPane } = Tabs;
const { Option } = Select;
const { Title, Text } = Typography;


type LichLam = { thu: number; start: string; end: string };
type NhanVien = { id: number; ten: string; so_khach_toi_da: number; lich: LichLam[] };
type DichVu = { id: number; ten: string; gia: number; thoi_gian: number };
type LichHen = { id: number; nhanvien_id: number; dichvu_id: number; ngay: string; gio: string; trang_thai: string };
type DanhGia = { lichhen_id: number; diem: number; noi_dung: string; phan_hoi?: string };

function useStorage<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });
  useEffect(() => localStorage.setItem(key, JSON.stringify(value)), [key, value]);
  return [value, setValue];
}

export default function App() {
  const [nhanvien, setNV] = useStorage<NhanVien[]>('nv', []);
  const [dichvu, setDV] = useStorage<DichVu[]>('dv', []);
  const [lichhen, setLH] = useStorage<LichHen[]>('lh', []);
  const [danhgia, setDG] = useStorage<DanhGia[]>('dg', []);

  const [formNV] = Form.useForm();
  const [formDV] = Form.useForm();
  const [formDatLich] = Form.useForm();
  const [formDanhGia] = Form.useForm();
  const [formPhanHoi] = Form.useForm();

  const [openNV, setOpenNV] = useState(false);
  const [openDV, setOpenDV] = useState(false);
  const [openDanhGia, setOpenDanhGia] = useState<{ visible: boolean; lh_id: number | null }>({ visible: false, lh_id: null });
  const [openPhanHoi, setOpenPhanHoi] = useState<{ visible: boolean; lh_id: number | null }>({ visible: false, lh_id: null });
  
  const [editingNVId, setEditingNVId] = useState<number | null>(null);
  const [editingDVId, setEditingDVId] = useState<number | null>(null);

 
  const handleDatLich = (values: any) => {
    const { nhanvien_id, dichvu_id, ngay, gio } = values;
    const ngayStr = ngay.format('YYYY-MM-DD');
    const gioStr = gio.format('HH:mm');
    const thuDatLich = ngay.day(); 
    const now = dayjs();

    if (ngay.isBefore(now, 'day') || (ngay.isSame(now, 'day') && gio.isBefore(now))) {
      return message.error('Không thể đặt lịch trong quá khứ!');
    }

    const nv = nhanvien.find(n => n.id === nhanvien_id);
    const dv = dichvu.find(d => d.id === dichvu_id);
    if (!nv || !dv) return message.error('Thiếu thông tin NV hoặc DV!');

    const lichLamHômNay = nv.lich?.find(l => l.thu === thuDatLich);
    if (!lichLamHômNay) return message.error(`Nhân viên ${nv.ten} không làm việc ngày này!`);
    if (gioStr < lichLamHômNay.start || gioStr > lichLamHômNay.end) {
      return message.error(`Nhân viên chỉ làm từ ${lichLamHômNay.start} đến ${lichLamHômNay.end}`);
    }

    const startMoi = dayjs(`${ngayStr} ${gioStr}`);
    const endMoi = startMoi.add(dv.thoi_gian, 'minute');

    const biTrung = lichhen.some(l => {
      if (l.nhanvien_id !== nhanvien_id || l.trang_thai === 'huy' || l.ngay !== ngayStr) return false;
      const dvCu = dichvu.find(d => d.id === l.dichvu_id);
      const startCu = dayjs(`${l.ngay} ${l.gio}`);
      const endCu = startCu.add(dvCu?.thoi_gian || 30, 'minute');
      return startMoi.isBefore(endCu) && startCu.isBefore(endMoi);
    });

    if (biTrung) return message.error('Nhân viên đã bị kẹt lịch vào khoảng thời gian này!');

    const soKhachHienTai = lichhen.filter(l => l.nhanvien_id === nhanvien_id && l.ngay === ngayStr && l.trang_thai !== 'huy').length;
    if (soKhachHienTai >= nv.so_khach_toi_da) return message.error(`Nhân viên đã nhận đủ ${nv.so_khach_toi_da} khách hôm nay!`);

    setLH([...lichhen, { id: Date.now(), nhanvien_id, dichvu_id, ngay: ngayStr, gio: gioStr, trang_thai: 'cho_duyet' }]);
    message.success('Đặt lịch hẹn thành công!');
    formDatLich.resetFields();
  };

 
  const submitDanhGia = (values: any) => {
    if (openDanhGia.lh_id) {
      setDG([...danhgia, { lichhen_id: openDanhGia.lh_id, diem: values.diem, noi_dung: values.noi_dung }]);
      message.success('Đánh giá thành công!');
      setOpenDanhGia({ visible: false, lh_id: null });
      formDanhGia.resetFields();
    }
  };

  const submitPhanHoi = (values: any) => {
    if (openPhanHoi.lh_id) {
      setDG(danhgia.map(d => d.lichhen_id === openPhanHoi.lh_id ? { ...d, phan_hoi: values.phan_hoi } : d));
      message.success('Đã gửi phản hồi!');
      setOpenPhanHoi({ visible: false, lh_id: null });
      formPhanHoi.resetFields();
    }
  };

  const getDiemTrungBinh = (nvId: number) => {
    const listDG = danhgia.filter(dg => lichhen.find(lh => lh.id === dg.lichhen_id)?.nhanvien_id === nvId);
    return listDG.length ? (listDG.reduce((sum, dg) => sum + dg.diem, 0) / listDG.length).toFixed(1) : "Chưa có";
  };

 
  const thongKeNgay = () => {
    const map: any = {};
    lichhen.forEach(l => { 
      if (l.trang_thai !== 'huy') map[l.ngay] = (map[l.ngay] || 0) + 1; 
    });
    return map;
  };

  const thongKeThang = () => {
    const map: any = {};
    lichhen.forEach(l => {
      if (l.trang_thai !== 'huy') {
        const month = dayjs(l.ngay).format('YYYY-MM');
        map[month] = (map[month] || 0) + 1;
      }
    });
    return map;
  };

  const doanhThuTong = () => {
    return lichhen.filter(l => l.trang_thai === 'hoan_thanh').reduce((sum, l) => {
      const dv = dichvu.find(d => d.id === l.dichvu_id);
      return sum + (dv?.gia || 0);
    }, 0);
  };

  const doanhThuTheoNV = () => {
    const map: any = {};
    lichhen.filter(l => l.trang_thai === 'hoan_thanh').forEach(l => {
      const dv = dichvu.find(d => d.id === l.dichvu_id);
      map[l.nhanvien_id] = (map[l.nhanvien_id] || 0) + (dv?.gia || 0);
    });
    return map;
  };

  const doanhThuTheoDV = () => {
    const map: any = {};
    lichhen.filter(l => l.trang_thai === 'hoan_thanh').forEach(l => {
      const dv = dichvu.find(d => d.id === l.dichvu_id);
      map[l.dichvu_id] = (map[l.dichvu_id] || 0) + (dv?.gia || 0);
    });
    return map;
  };

  return (
    <div style={{ padding: '30px 5%', background: '#f0f2f5', minHeight: '100vh' }}>
      <Title level={2} style={{ textAlign: 'center', color: '#1890ff', marginBottom: 30 }}>
        Quản Lý Đặt Lịch Hẹn
      </Title>
      
    
      <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <Tabs defaultActiveKey="1" type="card" size="large">
          
         
          <TabPane tab="Nhân sự & Dịch vụ" key="1">
            <Row gutter={[32, 32]}>
              <Col xs={24} lg={14}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 15 }}>
                  <Title level={4} style={{ margin: 0 }}>Nhân viên</Title>
                  <Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditingNVId(null); formNV.resetFields(); setOpenNV(true); }}>Thêm NV</Button>
                </div>
                <Table dataSource={nhanvien} rowKey="id" columns={[
                    { title: 'Họ Tên', dataIndex: 'ten' },
                    { title: 'Giới hạn/Ngày', dataIndex: 'so_khach_toi_da', align: 'center' },
                    { title: 'Đánh giá', render: (r) => <span><StarOutlined style={{ color: '#faad14' }} /> {getDiemTrungBinh(r.id)}</span> },
                    { title: 'Thao tác', render: (r) => (
                      <Space>
                        <Button type="link" onClick={() => { setEditingNVId(r.id); formNV.setFieldsValue(r); setOpenNV(true); }} icon={<EditOutlined />} />
                        <Popconfirm title="Xóa nhân viên này?" onConfirm={() => setNV(nhanvien.filter(n => n.id !== r.id))}><Button type="link" danger icon={<DeleteOutlined />} /></Popconfirm>
                      </Space>
                    )}
                  ]} 
                />
              </Col>
              <Col xs={24} lg={10}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 15 }}>
                  <Title level={4} style={{ margin: 0 }}>Dịch vụ</Title>
                  <Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditingDVId(null); formDV.resetFields(); setOpenDV(true); }}>Thêm DV</Button>
                </div>
                <Table dataSource={dichvu} rowKey="id" columns={[
                    { title: 'Tên DV', dataIndex: 'ten' },
                    { title: 'Giá', render: (r) => <Text strong>{r.gia.toLocaleString()}đ</Text> },
                    { title: 'Thời gian', render: (r) => `${r.thoi_gian} phút` },
                    { title: 'Xóa', render: (r) => (
                      <Popconfirm title="Xóa DV này?" onConfirm={() => setDV(dichvu.filter(d => d.id !== r.id))}><Button type="text" danger icon={<DeleteOutlined />} /></Popconfirm>
                    )}
                  ]} 
                />
              </Col>
            </Row>
          </TabPane>

         
          <TabPane tab="Lịch hẹn" key="2">
            <Card title="Đặt lịch hẹn" style={{ marginBottom: 24 }} bordered={false} className="shadow-sm">
              <Form form={formDatLich} layout="inline" onFinish={handleDatLich}>
                <Form.Item name="nhanvien_id" rules={[{ required: true }]}><Select placeholder="Chọn NV" style={{ width: 160 }}>{nhanvien.map(n => <Option key={n.id} value={n.id}>{n.ten}</Option>)}</Select></Form.Item>
                <Form.Item name="dichvu_id" rules={[{ required: true }]}><Select placeholder="Chọn DV" style={{ width: 160 }}>{dichvu.map(d => <Option key={d.id} value={d.id}>{d.ten}</Option>)}</Select></Form.Item>
                <Form.Item name="ngay" rules={[{ required: true }]}><DatePicker placeholder="Ngày" format="YYYY-MM-DD" style={{ width: 150 }} /></Form.Item>
                <Form.Item name="gio" rules={[{ required: true }]}><TimePicker placeholder="Giờ" format="HH:mm" minuteStep={15} style={{ width: 120 }} /></Form.Item>
                <Button type="primary" htmlType="submit" style={{ width: 120 }}>Xác nhận đặt</Button>
              </Form>
            </Card>
            <Table dataSource={lichhen} rowKey="id" columns={[
                { title: 'Ngày', dataIndex: 'ngay' },
                { title: 'Giờ', dataIndex: 'gio' },
                { title: 'Nhân viên', render: (r) => nhanvien.find(n => n.id === r.nhanvien_id)?.ten },
                { title: 'Dịch vụ', render: (r) => dichvu.find(d => d.id === r.dichvu_id)?.ten },
                { title: 'Trạng thái', render: (r) => {
                  const colors = { cho_duyet: 'orange', xac_nhan: 'blue', hoan_thanh: 'green', huy: 'red' };
                  const labels = { cho_duyet: 'Chờ duyệt', xac_nhan: 'Xác nhận', hoan_thanh: 'Hoàn thành', huy: 'Đã hủy' };
                  return <Tag color={colors[r.trang_thai as keyof typeof colors]}>{labels[r.trang_thai as keyof typeof labels]}</Tag>;
                }},
                { title: 'Hành động', render: (r) => (
                  <Space>
                    {r.trang_thai === 'cho_duyet' && <Button size="small" type="primary" ghost onClick={() => setLH(lichhen.map(l => l.id === r.id ? {...l, trang_thai: 'xac_nhan'} : l))}>Xác nhận</Button>}
                    {r.trang_thai === 'xac_nhan' && <Button size="small" icon={<CheckCircleOutlined />} onClick={() => setLH(lichhen.map(l => l.id === r.id ? {...l, trang_thai: 'hoan_thanh'} : l))}>Hoàn thành</Button>}
                    {(r.trang_thai === 'cho_duyet' || r.trang_thai === 'xac_nhan') && <Popconfirm title="Hủy?" onConfirm={() => setLH(lichhen.map(l => l.id === r.id ? {...l, trang_thai: 'huy'} : l))}><Button size="small" danger>Hủy</Button></Popconfirm>}
                  </Space>
                )}
              ]} 
            />
          </TabPane>

          
          <TabPane tab="Đánh giá & Phản hồi" key="3">
            <Table dataSource={lichhen.filter(l => l.trang_thai === 'hoan_thanh')} rowKey="id" columns={[
                { title: 'Lịch hẹn', render: (r) => <Text strong>{r.ngay} {r.gio} - {nhanvien.find(n => n.id === r.nhanvien_id)?.ten}</Text> },
                { title: 'Điểm', render: (r) => {
                  const dg = danhgia.find(d => d.lichhen_id === r.id);
                  return dg ? <Rate disabled defaultValue={dg.diem} style={{ fontSize: 14 }} /> : null;
                }},
                { title: 'Nội dung', render: (r) => {
                   const dg = danhgia.find(d => d.lichhen_id === r.id);
                   return dg ? dg.noi_dung : <Button size="small" onClick={() => setOpenDanhGia({ visible: true, lh_id: r.id })}>Đánh giá</Button>;
                }},
                { title: 'Phản hồi', render: (r) => {
                  const dg = danhgia.find(d => d.lichhen_id === r.id);
                  if (!dg) return null; 
                  if (dg.phan_hoi) return <Text type="secondary">{dg.phan_hoi}</Text>;
                  return <Button size="small" onClick={() => setOpenPhanHoi({ visible: true, lh_id: r.id })}>Phản hồi</Button>;
                }}
              ]}
            />
          </TabPane>

          <TabPane tab="Thống kê" key="4">
            
            
            <Row gutter={[24, 24]}>
              <Col span={12}>
                <Card title="Tổng quan" style={{ height: '100%' }} bordered>
                  <p><Text strong>Tổng lịch hẹn:</Text> {lichhen.filter(l => l.trang_thai !== 'huy').length}</p>
                  <p><Text strong>Doanh thu tổng:</Text> <Text type="success" strong>{doanhThuTong().toLocaleString()} VNĐ</Text></p>
                </Card>
              </Col>
              <Col span={12}>
                <Card title="Lịch hẹn theo ngày" style={{ height: '100%' }} bordered>
                  {Object.entries(thongKeNgay()).length === 0 ? <Text type="secondary">Chưa có dữ liệu</Text> : 
                    Object.entries(thongKeNgay()).map(([day, count]) => (
                      <p key={day}><Text strong>{day}:</Text> {count as number} lịch</p>
                    ))
                  }
                </Card>
              </Col>

              <Col span={12}>
                <Card title="Lịch hẹn theo tháng" style={{ height: '100%' }} bordered>
                  {Object.entries(thongKeThang()).length === 0 ? <Text type="secondary">Chưa có dữ liệu</Text> : 
                    Object.entries(thongKeThang()).map(([month, count]) => (
                      <p key={month}><Text strong>{month}:</Text> {count as number} lịch</p>
                    ))
                  }
                </Card>
              </Col>
              <Col span={12}>
                <Card title="Doanh thu theo nhân viên" style={{ height: '100%' }} bordered>
                  {Object.entries(doanhThuTheoNV()).length === 0 ? <Text type="secondary">Chưa có dữ liệu</Text> : 
                    Object.entries(doanhThuTheoNV()).map(([nv_id, sum]) => (
                      <p key={nv_id}><Text strong>{nhanvien.find(n => n.id === Number(nv_id))?.ten}:</Text> {(sum as number).toLocaleString()} VNĐ</p>
                    ))
                  }
                </Card>
              </Col>

              <Col span={24}>
                <Card title="Doanh thu theo dịch vụ" style={{ height: '100%' }} bordered>
                  {Object.entries(doanhThuTheoDV()).length === 0 ? <Text type="secondary">Chưa có dữ liệu</Text> : 
                    Object.entries(doanhThuTheoDV()).map(([dv_id, sum]) => (
                      <p key={dv_id}><Text strong>{dichvu.find(d => d.id === Number(dv_id))?.ten}:</Text> {(sum as number).toLocaleString()} VNĐ</p>
                    ))
                  }
                </Card>
              </Col>
            </Row>

          </TabPane>
        </Tabs>
      </div>

      {/* ================= MODALS ================= */}

      <Modal title={editingNVId ? "Sửa NV" : "Thêm NV"} visible={openNV} onCancel={() => setOpenNV(false)} onOk={() => formNV.submit()} width={600}>
        <Form form={formNV} layout="vertical" onFinish={(v) => {
          if (editingNVId) setNV(nhanvien.map(n => n.id === editingNVId ? { ...n, ...v } : n));
          else setNV([...nhanvien, { ...v, id: Date.now(), lich: [] }]);
          setOpenNV(false);
        }}>
          <Row gutter={16}>
            <Col span={16}><Form.Item name="ten" label="Tên NV" rules={[{ required: true }]}><Input /></Form.Item></Col>
            <Col span={8}><Form.Item name="so_khach_toi_da" label="Max Khách/Ngày" initialValue={5}><InputNumber min={1} style={{ width: '100%' }} /></Form.Item></Col>
          </Row>
          <Form.List name="lich">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item {...restField} name={[name, 'thu']} rules={[{ required: true }]}><Select placeholder="Ngày" style={{ width: 120 }}><Option value={1}>Thứ 2</Option><Option value={2}>Thứ 3</Option><Option value={3}>Thứ 4</Option><Option value={4}>Thứ 5</Option><Option value={5}>Thứ 6</Option><Option value={6}>Thứ 7</Option><Option value={0}>Chủ Nhật</Option></Select></Form.Item>
                    <Form.Item {...restField} name={[name, 'start']} rules={[{ required: true }]}><Input type="time" /></Form.Item><span>-</span>
                    <Form.Item {...restField} name={[name, 'end']} rules={[{ required: true }]}><Input type="time" /></Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} style={{ color: 'red' }} />
                  </Space>
                ))}
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>Thêm ca làm việc</Button>
              </>
            )}
          </Form.List>
        </Form>
      </Modal>

      <Modal title="Dịch Vụ" visible={openDV} onCancel={() => setOpenDV(false)} onOk={() => formDV.submit()}>
        <Form form={formDV} layout="vertical" onFinish={(v) => {
          if (editingDVId) setDV(dichvu.map(d => d.id === editingDVId ? { ...d, ...v } : d));
          else setDV([...dichvu, { ...v, id: Date.now() }]);
          setOpenDV(false);
        }}>
          <Form.Item name="ten" label="Tên DV" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="gia" label="Giá (VNĐ)" rules={[{ required: true }]}><InputNumber min={0} style={{ width: '100%' }} /></Form.Item>
          <Form.Item name="thoi_gian" label="Thời gian làm (Phút)" initialValue={30}><InputNumber min={1} style={{ width: '100%' }} /></Form.Item>
        </Form>
      </Modal>

      <Modal title="Đánh giá Dịch vụ" visible={openDanhGia.visible} onCancel={() => setOpenDanhGia({ visible: false, lh_id: null })} onOk={() => formDanhGia.submit()}>
        <Form form={formDanhGia} layout="vertical" onFinish={submitDanhGia}>
          <Form.Item name="diem" label="Chất lượng" rules={[{ required: true }]}><Rate /></Form.Item>
          <Form.Item name="noi_dung" label="Nhận xét" rules={[{ required: true }]}><Input.TextArea rows={4} /></Form.Item>
        </Form>
      </Modal>

      <Modal title="Phản hồi khách hàng" visible={openPhanHoi.visible} onCancel={() => setOpenPhanHoi({ visible: false, lh_id: null })} onOk={() => formPhanHoi.submit()}>
        <Form form={formPhanHoi} layout="vertical" onFinish={submitPhanHoi}>
          <Form.Item name="phan_hoi" label="Nội dung phản hồi" rules={[{ required: true, message: 'Nhập nội dung' }]}><Input.TextArea rows={4} placeholder="Cảm ơn quý khách..." /></Form.Item>
        </Form>
      </Modal>

    </div>
  );
}