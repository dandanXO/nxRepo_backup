import React, { useEffect, useState } from 'react';
import { Form, Modal,Row,Col,message } from 'antd';
import { injectIntl } from "react-intl";
import PropTypes from 'prop-types';
import { FormItems } from 'components';
const { FormItem } = FormItems;
function RecallSettingModal ({intl, form, info, visible, title, handleEditOK, onCancel, conditionsData }) {

    const onOk = (e) => {
        e.preventDefault();
        const { getFieldsValue } = form;
        const { name, daysAfter, SMSContent } = getFieldsValue();
        if (!name || !daysAfter || !SMSContent) {
            const messageText = !name ? 'name' : !daysAfter ? 'daysAfter' : 'SMSContent';
            message.warning(intl.formatMessage({ id: `page.table.recallSetting.${messageText}.enter` }));
            return;
        }
        handleEditOK({ id: info.id, ...getFieldsValue() });
    }
    const renderCondition = () => {
        return conditionsData.map(item => <Option key={item.code} value={item.code} >{item.name}</Option>)
   }

    const { enable ,recallConditionCode } = info
    const renderForm = () => {
        const formItems = [
            { type: 'input', field: 'name', label: 'page.table.name', placeholder: 'page.table.recallSetting.name.enter' },
            { type: 'select', field: 'recallConditionCode', label: 'page.table.recallSetting.condition', value: recallConditionCode, renderOptions: renderCondition },
            { type: 'number', field: 'daysAfter', label: 'page.table.recallSetting.daysAfter', placeholder: 'page.table.recallSetting.daysAfter.enter', min: 0 },
            { type: 'switch', field: 'enable', label: 'page.table.is.enabled', value: enable },
        ]
        return formItems.map(item => <FormItem {...item} form={form} required={true} />)
    }
    return (
        <Modal
            onOk={onOk}
            onCancel={onCancel}
            width={1000}
            visible={visible}
            title={title}
        >
            <Form>
                <Row>
                    <Col lg={10}>
                        {renderForm()}
                    </Col>
                    <Col lg={10}>
                        <FormItem label={'page.table.recallSetting.SMSContent'} field={'SMSContent'} placeholder={'page.table.recallSetting.SMSContent.enter'} minRows={9} form={form} required={true} />
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}
RecallSettingModal.PropTypes = {
    intl: PropTypes.object.isRequired,
}
export default Form.create({
    mapPropsToFields (props) {
        const { info = {} } = props;
        return {
            name: Form.createFormField({
                value: info['name'] || ''
            }),
            recallConditionCode: Form.createFormField({
                value: info['recallConditionCode'] || "1"
            }),
            daysAfter: Form.createFormField({
                value: info['daysAfter'] || ""
            }),
            enable: Form.createFormField({
                value: info['enable'] || false
            }),
            SMSContent: Form.createFormField({
                value: info['SMSContent'] || ''
            }),
        };
    }
})(injectIntl(RecallSettingModal));
