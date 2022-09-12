import React, { Component } from 'react';
import { Modal, Form, Select, Input } from 'antd';
import PropTypes from 'prop-types';
import {injectIntl, FormattedMessage} from "react-intl";

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class AddModal extends Component{
    layout = {
        labelCol: {
            span: 7
        },
        wrapperCol: {
            span: 17
        }
    }
    constructor(props) {
        super(props);
        this.state = {};
    }

    onOk = () => {
        const { handleOk, form: { getFieldsValue } } = this.props;
        handleOk(getFieldsValue());
    }
    renderPerson() {
        const { personData } = this.props;
        const ele = personData.map(item => <Option key={item.id} value={item.id}>{item['trueName']}</Option>);
        return [<Option value={'-1'} key={''}><FormattedMessage id="page.table.none" /></Option>].concat(ele);
    }

    renderDepartment() {
        const { departmentData } = this.props;
        return departmentData.map(item => <Option key={item.id} value={item.id}>{item['name']}</Option>)
    }

    render() {
        const { visible, form: { getFieldDecorator }, handleCancel, intl } = this.props;
        return (
            <Modal
                onOk={this.onOk}
                onCancel={handleCancel}
                width={500}
                visible={visible}
                title={intl.formatMessage({id : "windowPage.add.modify.department"})}
            >
                <Form>
                    <FormItem label={intl.formatMessage({id : "page.search.list.department.name"})} {...this.layout}>
                        {
                            getFieldDecorator('name', {})(
                                <Input placeholder={intl.formatMessage({id : "windowPage.menu.name.enter"})} />
                            )
                        }
                    </FormItem>
                    <FormItem label={intl.formatMessage({id : "page.table.in-charge.person"})} {...this.layout}>
                        {
                            getFieldDecorator('managerUserId', {})(
                                <Select>
                                    {this.renderPerson()}
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem label={intl.formatMessage({id : "page.table.superior.department"})} {...this.layout}>
                        {
                            getFieldDecorator('pid', {})(
                                <Select>
                                    {this.renderDepartment()}
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem label={intl.formatMessage({id : "windowPage.remarks"})} {...this.layout}>
                        {
                            getFieldDecorator('remark', {})(
                                <TextArea rows={4}/>
                            )
                        }
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}
AddModal.propTypes = {
    visible: PropTypes.bool,
    handleOk: PropTypes.func,
    handleCancel: PropTypes.func,
    info: PropTypes.object,
    personData: PropTypes.array,
    departmentData: PropTypes.array,
    intl: PropTypes.object.isRequired,
};
AddModal.deafultProps = {
    visible: false,
    handleOk(){},
    handleCancel(){},
    info: {},
    personData: [],
    departmentData: []
};

export default Form.create({
    mapPropsToFields(props){
        const { info = {} } = props;
        return {
            name: Form.createFormField({
                value: info['name'] || ''
            }),
            managerUserId: Form.createFormField({
                value: info['managerUserId'] || ''
            }),
            pid: Form.createFormField({
                value: info['pid'] || ''
            }),
            remark: Form.createFormField({
                value: info['remark'] || ''
            }),
        };
    }
})(injectIntl(AddModal));