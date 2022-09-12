import React, { useEffect, useState } from 'react';
import { Form, Modal } from 'antd';
import { injectIntl } from "react-intl";
import PropTypes from 'prop-types';
import { FormInputNumber } from '../FormItems';

function FormModal({ width = 600, visible, title, modalHandleok, modalHandleCancel, form, dataSorce }) {
    const { getFieldsValue, resetFields } = form;
    const onOk = (e) => {
        e.preventDefault();
        modalHandleok(getFieldsValue());
    }

    const onCancel = () => {
        resetFields()
        modalHandleCancel()
    }

    const renderFormItems = (props) => {
        const { type, field } = props;
        return <FormInputNumber key={field} form={form} {...props} />;
    };

    useEffect(() => {
        if (!visible) {
            resetFields()
        }
    }, [visible])

    return (
        <Modal
            onOk={onOk}
            onCancel={onCancel}
            width={width}
            visible={visible}
            title={title}
        >
            <Form onSubmit={onOk}>
                {dataSorce.map(formItem=>renderFormItems(formItem))}
            </Form>
        </Modal>
    )
}
FormModal.PropTypes = {
    intl: PropTypes.object.isRequired,
}

export default injectIntl(Form.create()(FormModal));
