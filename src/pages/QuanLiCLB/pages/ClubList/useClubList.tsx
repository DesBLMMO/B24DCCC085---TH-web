import { useState } from 'react';
import { Form, message } from 'antd';
import dayjs from 'dayjs';
import { Club } from '../../types';
import { load, save, KEYS } from '../../data';

export function useClubList() {
    const [clubs, setClubs] = useState<Club[]>(() => load(KEYS.CLUBS, []));
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<Club | null>(null);
    const [form] = Form.useForm();

    const updateClubs = (list: Club[]) => {
        setClubs(list);
        save(KEYS.CLUBS, list);
    };

    const openAdd = () => {
        setEditing(null);
        form.resetFields();
        form.setFieldsValue({ active: true });
        setModalOpen(true);
    };

    const openEdit = (club: Club) => {
        setEditing(club);
        form.setFieldsValue({
            ...club,
            foundedDate: club.foundedDate ? dayjs(club.foundedDate) : null,
        });
        setModalOpen(true);
    };

    const handleOk = async () => {
        const values = await form.validateFields();
        const data = {
            ...values,
            foundedDate: values.foundedDate?.format('YYYY-MM-DD') || '',
        };
        if (editing) {
            updateClubs(clubs.map((c) => (c.id === editing.id ? { ...c, ...data } : c)));
            message.success('Cập nhật CLB thành công!');
        } else {
            updateClubs([...clubs, { ...data, id: Date.now().toString() }]);
            message.success('Thêm CLB thành công!');
        }
        setModalOpen(false);
    };

    const handleDelete = (id: string) => {
        updateClubs(clubs.filter((c) => c.id !== id));
        message.success('Đã xóa CLB!');
    };

    return { clubs, modalOpen, setModalOpen, editing, form, openAdd, openEdit, handleOk, handleDelete };
}