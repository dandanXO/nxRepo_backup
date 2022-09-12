import React, { useEffect, useState } from 'react';
import { Form, Modal, message } from 'antd';
import { injectIntl } from "react-intl";
import PropTypes from 'prop-types';
import { FormItems } from 'components';
const { FormItem } = FormItems;
function BlackModal ({ intl, form, visible, handleOk, handleCancel }) {

    const onOk = (e) => {
        e.preventDefault();
        const { getFieldsValue } = form;
        const { phoneNo, reason } = getFieldsValue();
        if (phoneNo === "" || (phoneNo === "0" && reason === "")) {
            message.warning(intl.formatMessage({ id: `page.login.phone` }));
            return;
        }
     
        if (phoneNo === "0" && reason !== "") {
            const reasonList = reason.split(';');
            const isReasonExist = reasonList.filter((item, index) => reasonList.indexOf(item) !== index)
            if (isReasonExist.length > 0) {
                message.warning(`${intl.formatMessage({ id: `windowPage.duplicate` })}${intl.formatMessage({ id: `page.search.list.mobile` })} ${isReasonExist}`);
                return;
            }
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
            { type: 'textarea', field: 'reason', label: 'page.table.batch.add', placeholder: 'page.table.batch.add.format', minRows: 10 },
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

BlackModal.propTypes = {
    visible: PropTypes.bool,
    handleOk: PropTypes.func,
    handleCancel: PropTypes.func,
    intl: PropTypes.object.isRequired,
};
BlackModal.defaultProps = {
    visible: false,
    handleOk: () => {
    },
    handleCancel: () => {
    },
  
};

export default Form.create({
    mapPropsToFields(props) {
        const { info = {} } = props;
        return {
            phoneNo: Form.createFormField({
                value: info['phoneNo'] || ''
            }),
            reason: Form.createFormField({
                value: info['reason'] || ''
            })
        }
    }
})(injectIntl(BlackModal));

