import React, { useEffect, useState } from 'react';
import { Form, Modal, message } from 'antd';
import { injectIntl } from "react-intl";
import PropTypes from 'prop-types';
import { FormItems } from 'components';
const { FormItem } = FormItems;
function ImportModal ({ intl, form, visible, handleOk, handleCancel }) {

    useEffect(() => { 
        form.resetFields(); 
    }, [visible]);
    
    const onOk = (e) => {
        e.preventDefault();
        const { getFieldsValue } = form;
        const { phoneNo, phoneNumbers } = getFieldsValue();
        if (phoneNo === "" || (phoneNo === "0" && phoneNumbers === "")) {
            message.warning(intl.formatMessage({ id: `page.login.phone` }));
            return;
        }
        handleOk(getFieldsValue());
    }

    const renderForm = () => {

        const layout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 }
        }
        const formItems = [
            { type: 'input', field: 'phoneNo', label: 'windowPage.mobile', placeholder: 'page.table.batch.mobile.enter', required: true },
            { type: 'textarea', field: 'phoneNumbers', label: 'page.table.batch.add', placeholder: 'page.table.batch.add.format', minRows: 10 },
        ]
        return formItems.map(item => <FormItem layout={layout} {...item} form={form} />)
    }
    return (
        <Modal
            onOk={onOk}
            onCancel={handleCancel}
            width={700}
            visible={visible}
            title={intl.formatMessage({ id: "page.table.add.modify" })}
        >
            <Form>
                {renderForm()}
            </Form>
        </Modal>
    )
}

ImportModal.propTypes = {
    visible: PropTypes.bool,
    handleOk: PropTypes.func,
    handleCancel: PropTypes.func,
    intl: PropTypes.object.isRequired,
};
ImportModal.defaultProps = {
    visible: false,
    handleOk: () => {
    },
    handleCancel: () => {
    },
  
};

export default Form.create()(injectIntl(ImportModal));

