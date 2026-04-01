export interface Club {
    id: string;
    name: string;
    foundedDate: string;
    description: string;
    president: string;
    active: boolean;
    avatar: string;
}

export interface Registration {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    gender: 'Nam' | 'Nữ';
    address: string;
    specialty: string;
    clubId: string;
    reason: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    rejectNote: string;
    createdAt: string;
}

export interface ActionHistory {
    id: string;
    registrationId: string;
    action: 'Approved' | 'Rejected';
    note: string;
    timestamp: string;
}