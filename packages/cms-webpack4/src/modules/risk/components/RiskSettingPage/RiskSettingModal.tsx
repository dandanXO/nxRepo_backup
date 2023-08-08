import { FormInstance } from 'antd';
import React from 'react';

import AdminFormModal from '../../../shared/components/common/AdminFormModal';
import { ModalContent } from '../../../shared/components/common/AdminTable';

interface RiskSettingModelProps {
    showModalContent: ModalContent;
    setShowModalContent: React.Dispatch<React.SetStateAction<ModalContent>>;
    form: FormInstance;
    onOk: () => void;
    onAutoCompleteTemplate?: () => void;
    children: React.ReactElement;
}
const RiskSettingModal = (props: RiskSettingModelProps): JSX.Element => {
    return (
        <AdminFormModal
            width={'850px'}
            show={props.showModalContent.show}
            isEdit={props.showModalContent.isEdit}
            addTitle={'添加风控配置'}
            editTitle={'修改风控配置'}
            handleCloseModal={() => {
                // console.log("handleCloseModal")
                props.form.resetFields();
                props.setShowModalContent({
                    show: false,
                    isEdit: false,
                });
            }}
            onOk={props.onOk}
            // autoComplete={true}
            // onAutoCompleteTemplate={props.onAutoCompleteTemplate}
        >
            {props.children}
        </AdminFormModal>
    );
};
export default RiskSettingModal;
