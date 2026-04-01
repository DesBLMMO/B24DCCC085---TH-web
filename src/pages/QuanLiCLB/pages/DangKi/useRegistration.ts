import { useState } from 'react';
import { Form, message } from 'antd';
import { Registration, ActionHistory } from '../../types';
import { load, save, KEYS } from '../../data';

type ModalState =
    | { type: 'none' }
    | { type: 'add' }
    | { type: 'edit'; record: Registration }
    | { type: 'detail'; record: Registration }
    | { type: 'history' }
    | { type: 'reject'; ids: string[] };

export function useRegistration() {
    const [registrations, setRegistrations] = useState<Registration[]>(() =>
        load(KEYS.REGISTRATIONS, []),
    );
    const [history, setHistory] = useState<ActionHistory[]>(() => load(KEYS.HISTORY, []));
    const [modal, setModal] = useState<ModalState>({ type: 'none' });
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [rejectNote, setRejectNote] = useState('');
    const [form] = Form.useForm();

    const closeModal = () => setModal({ type: 'none' });

    const updateRegs = (list: Registration[]) => {
        setRegistrations(list);
        save(KEYS.REGISTRATIONS, list);
    };

    const addHistory = (entries: ActionHistory[]) => {
        const updated = [...history, ...entries];
        setHistory(updated);
        save(KEYS.HISTORY, updated);
    };

    const openAdd = () => {
        form.resetFields();
        form.setFieldsValue({ gender: 'Nam' });
        setModal({ type: 'add' });
    };

    const openEdit = (reg: Registration) => {
        form.setFieldsValue(reg);
        setModal({ type: 'edit', record: reg });
    };

    const handleOk = async () => {
        const values = await form.validateFields();
        if (modal.type === 'edit') {
            updateRegs(registrations.map((r) => (r.id === modal.record.id ? { ...r, ...values } : r)));
            message.success('Cập nhật thành công!');
        } else {
            updateRegs([
                ...registrations,
                {
                    ...values,
                    id: Date.now().toString(),
                    status: 'Pending',
                    rejectNote: '',
                    createdAt: new Date().toISOString(),
                },
            ]);
            message.success('Thêm đơn đăng ký thành công!');
        }
        closeModal();
    };

    const handleDelete = (id: string) => {
        updateRegs(registrations.filter((r) => r.id !== id));
        message.success('Đã xóa đơn đăng ký!');
    };

    const approve = (ids: string[]) => {
        updateRegs(
            registrations.map((r) =>
                ids.includes(r.id) ? { ...r, status: 'Approved' as const } : r,
            ),
        );
        addHistory(
            ids.map((id) => ({
                id: Date.now().toString() + '_' + id,
                registrationId: id,
                action: 'Approved' as const,
                note: '',
                timestamp: new Date().toISOString(),
            })),
        );
        setSelectedRowKeys([]);
        message.success(`Đã duyệt ${ids.length} đơn!`);
    };

    const confirmReject = () => {
        if (modal.type !== 'reject') return;
        if (!rejectNote.trim()) {
            message.warning('Vui lòng nhập lý do từ chối!');
            return;
        }
        const ids = modal.ids;
        updateRegs(
            registrations.map((r) =>
                ids.includes(r.id) ? { ...r, status: 'Rejected' as const, rejectNote } : r,
            ),
        );
        addHistory(
            ids.map((id) => ({
                id: Date.now().toString() + '_' + id,
                registrationId: id,
                action: 'Rejected' as const,
                note: rejectNote,
                timestamp: new Date().toISOString(),
            })),
        );
        setSelectedRowKeys([]);
        setRejectNote('');
        closeModal();
        message.success(`Đã từ chối ${ids.length} đơn!`);
    };

    const openReject = (ids: string[]) => {
        setRejectNote('');
        setModal({ type: 'reject', ids });
    };

    return {
        registrations,
        modal,
        setModal,
        closeModal,
        form,
        selectedRowKeys,
        setSelectedRowKeys,
        history,
        rejectNote,
        setRejectNote,
        openAdd,
        openEdit,
        handleOk,
        handleDelete,
        approve,
        openReject,
        confirmReject,
    };
}