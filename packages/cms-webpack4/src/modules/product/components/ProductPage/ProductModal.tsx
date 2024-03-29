import { Modal } from 'antd';
import React from 'react';

interface ProductModalProps {
    isEdit?: boolean;
    show?: boolean;
    handleCloseModal: (event) => void;
    onOk: () => void;
    // onMockFinish: () => void;
    children?: React.ReactElement;
}

const ProductModal = (props: ProductModalProps): JSX.Element => {
    return (
        <Modal
            title={
                !props.isEdit ? (
                    <span>
                        <span style={{ marginRight: 8 }}>添加产品</span>
                        {/*<Button onClick={() => props.onMockFinish()}>自动填入范本资料</Button>*/}
                    </span>
                ) : (
                    '修改产品'
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
    );
};

export { ProductModal };
