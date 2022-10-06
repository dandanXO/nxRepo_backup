import React from "react";
import {Button, message, Modal} from "antd";

interface AdminFormModalTemplateProps{
    show: boolean;
    isEdit: boolean;
    children?: React.ReactElement;
    handleCloseModal?: () => void;
    onOk?: () => void;
    onMockFinish?: () => void;
    hasAddForm: boolean;
    hasEditForm: boolean;
    addTitle?: string;
    editTitle?: string;
}

const AdminFormModalTemplate = (props: AdminFormModalTemplateProps = {
    show: false,
    isEdit: false,
    hasAddForm: false,
    hasEditForm: false,
}) => {
    return (
        <Modal
            title={!props.isEdit ? (
                    <span>
                      <span style={{ marginRight: 8 }}>{props.addTitle}</span>
                      {/*<Button onClick={() => {*/}
                      {/*    props.onMockFinish()*/}
                      {/*}}>*/}
                      {/*    自动填入范本资料*/}
                      {/*</Button>*/}
                    </span>
                ) : props.editTitle
            }
            open={props.show}
            onCancel={props.handleCloseModal}
            onOk={props.onOk}
            width={'800px'}
            maskClosable={false}
        >
            {props.children}
        </Modal>
    )
}

export default AdminFormModalTemplate;
