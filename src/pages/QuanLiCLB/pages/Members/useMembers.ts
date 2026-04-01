import { useState, useEffect } from 'react';
import { message } from 'antd';
import { Registration, Club } from '../../types';
import { load, save, KEYS } from '../../data';

export function useMembers(initialClubId?: string) {
    const [registrations, setRegistrations] = useState<Registration[]>(() =>
        load(KEYS.REGISTRATIONS, []),
    );
    const clubs = load<Club[]>(KEYS.CLUBS, []);
    const [selectedClubId, setSelectedClubId] = useState<string | undefined>(initialClubId);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [transferOpen, setTransferOpen] = useState(false);
    const [targetClubId, setTargetClubId] = useState<string | undefined>();

    useEffect(() => {
        setSelectedClubId(initialClubId);
    }, [initialClubId]);

    const members = registrations.filter(
        (r) => r.status === 'Approved' && (!selectedClubId || r.clubId === selectedClubId),
    );

    const transferMembers = () => {
        if (!targetClubId) {
            message.warning('Vui lòng chọn CLB!');
            return;
        }
        const ids = selectedRowKeys as string[];
        const updated = registrations.map((r) =>
            ids.includes(r.id) ? { ...r, clubId: targetClubId } : r,
        );
        setRegistrations(updated);
        save(KEYS.REGISTRATIONS, updated);
        setSelectedRowKeys([]);
        setTransferOpen(false);
        setTargetClubId(undefined);
        message.success(`Đã chuyển ${ids.length} thành viên!`);
    };

    return {
        members,
        clubs,
        selectedClubId,
        setSelectedClubId,
        selectedRowKeys,
        setSelectedRowKeys,
        transferOpen,
        setTransferOpen,
        targetClubId,
        setTargetClubId,
        transferMembers,
    };
}