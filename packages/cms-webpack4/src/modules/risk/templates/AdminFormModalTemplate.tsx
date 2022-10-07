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
    autoComplete?: boolean;
    onAutoCompleteTemplate?: () => void;
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
                        {props.autoComplete && (
                            <Button onClick={props.onAutoCompleteTemplate}>自动填入范本资料</Button>
                        )}
                    </span>
                ) : (
                    <span>
                        <span style={{ marginRight: 8 }}>{props.editTitle}</span>
                        {props.autoComplete && (
                            <Button onClick={props.onAutoCompleteTemplate}>自动填入范本资料</Button>
                        )}
                    </span>
                )
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
