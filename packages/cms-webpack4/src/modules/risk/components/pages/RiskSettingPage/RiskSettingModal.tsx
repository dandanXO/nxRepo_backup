import React from "react";
import {FormInstance} from "antd";
import AdminFormModal from "../../../../shared/components/AdminFormModal";
import {ModalContent} from "../../../../shared/components/AdminTable";

interface RiskSettingModelProps {
    showModalContent: ModalContent;
    setShowModalContent: React.Dispatch<React.SetStateAction<ModalContent>>;
    form: FormInstance;
    onOk: () => void;
    onAutoCompleteTemplate?: () => void;
    children: React.ReactElement;
}
const RiskSettingModal = (props: RiskSettingModelProps) => {

    return (
        <AdminFormModal
            width={"700px"}
            show={props.showModalContent.show}
            isEdit={props.showModalContent.isEdit}
            addTitle={"添加风控配置"}
            editTitle={"修改风控配置"}
            handleCloseModal={() => {
                // console.log("handleCloseModal")
                props.form.resetFields();
                props.setShowModalContent({
                    show: false,
                    isEdit: false,
                })
            }}
            onOk={props.onOk}
            autoComplete={false}
            onAutoCompleteTemplate={props.onAutoCompleteTemplate}
        >
            {props.children}

        </AdminFormModal>
    )
}
export default RiskSettingModal;
