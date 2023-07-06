import { ProColumns, ProTable } from '@ant-design/pro-components';
import { Modal } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface LoginLogsModalProps {
    open: boolean;
    collectorId: string;
    onCancel: () => void;
}

const CollectorLoginLogsModal = ({ open, collectorId, onCancel }: LoginLogsModalProps): JSX.Element => {
    const { t } = useTranslation();

    const mockData = [
        { loginTime: '2022-08-21 10:03:12', ip: '121.198.4.111' },
        { loginTime: '2022-08-21 09:03:12', ip: '157.100.188.100' },
    ];

    const columns: ProColumns[] = [{}];

    return (
        <Modal
            open={open}
            title={t('urgeCollection:collectorLoginIPRecord')}
            footer={null}
            width="50%"
            onCancel={onCancel}
        >
            <ProTable toolBarRender={false} search={false} dataSource={mockData} columns={columns} />
        </Modal>
    );
};

export default CollectorLoginLogsModal;
