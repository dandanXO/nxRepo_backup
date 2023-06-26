import { Button, Modal } from 'antd';
import React from 'react';

interface AdminFormModalTemplateProps {
    show: boolean;
    isEdit: boolean;
    children?: React.ReactElement;
    handleCloseModal?: () => void;
    onOk?: () => void;
    onMockFinish?: () => void;
    addTitle?: string;
    editTitle?: string;
    autoComplete?: boolean;
    onAutoCompleteTemplate?: () => void;
    width?: string;
    title?: string;
}

const AdminFormModal = (
    props: AdminFormModalTemplateProps = {
        show: false,
        isEdit: false,
    },
): JSX.Element => {
    return (
        <Modal
            title={
                !props.isEdit ? (
                    <span>
                        <span style={{ marginRight: 8 }}>{props.addTitle ? props.addTitle : `添加${props.title}`}</span>
                        {props.autoComplete && <Button onClick={props.onAutoCompleteTemplate}>自动填入范本资料</Button>}
                    </span>
                ) : (
                    <span>
                        <span style={{ marginRight: 8 }}>
                            {props.editTitle ? props.editTitle : `修改${props.title}`}
                        </span>
                        {props.autoComplete && <Button onClick={props.onAutoCompleteTemplate}>自动填入范本资料</Button>}
                    </span>
                )
            }
            open={props.show}
            onCancel={props.handleCloseModal}
            onOk={props.onOk}
            width={props.width || '800px'}
            maskClosable={false}
        >
            {props.children}
        </Modal>
    );
};

export default AdminFormModal;
