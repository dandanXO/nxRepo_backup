import React, { Component } from 'react';
import { Modal, Form, Select, Input, TreeSelect } from 'antd';
import PropTypes from 'prop-types';
import {injectIntl, FormattedMessage} from "react-intl";

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

const SHOW_PARENT = TreeSelect.SHOW_ALL;
class AddModal extends Component{
    layout = {
        labelCol: {
            span: 4
        },
        wrapperCol: {
            span: 20
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

    render() {
        const { visible, form: { getFieldDecorator }, handleCancel, treeData,assignRolesData, intl } = this.props;
        return (
            <Modal
                onOk={this.onOk}
                onCancel={handleCancel}
                width={800}
                maskClosable={false}
                visible={visible}
                title={intl.formatMessage({id : "windowPage.add.modify.role"})}
            >
                <Form>
                    <FormItem label={intl.formatMessage({id : "windowPage.role.name"})} {...this.layout}>
                        {
                            getFieldDecorator('name', {})(
                                <Input placeholder={intl.formatMessage({id : "windowPage.menu.name.enter"})} />
                            )
                        }
                    </FormItem>

                    <FormItem label={intl.formatMessage({id : "windowPage.menu.permission"})} {...this.layout}>
                        {
                            getFieldDecorator('menuIds', {})(
                                <TreeSelect
                                    treeDataSimpleMode={{ rootPId: 0 }}
                                    treeData={treeData}
                                    treeCheckable={true}
                                    showCheckedStrategy={SHOW_PARENT}
                                    allowClear={true}
                                    dropdownStyle={{ height: '300px' }}
                                    searchPlaceholder={intl.formatMessage({id : "page.search.list.select"})}

                                />
                            )
                        }
                    </FormItem>
                    <FormItem label={intl.formatMessage({id : "windowPage.create.role"})}  {...this.layout}>
                    {
                            getFieldDecorator('assignRoles', {})(
                                <Select
                                mode="multiple"
                                size="default"
                                placeholder="Please select"
                                //defaultValue={['a10', 'c12']}
                                //onChange={handleChange}
                                style={{ width: '100%' }}
                                >
                                {assignRolesData}
                             </Select>
                             )
                    }
                     </FormItem>

                    <FormItem label={intl.formatMessage({id : "windowPage.menu.description"})} {...this.layout}>
                        {
                            getFieldDecorator('desc', {})(
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
    treeData: PropTypes.array,
    assignRolesData: PropTypes.array,
    intl: PropTypes.object.isRequired,
};
AddModal.deafultProps = {
    visible: false,
    handleOk(){},
    handleCancel(){},
    info: {},
    treeData: [],
    assignRolesData: []
};

export default Form.create({
    mapPropsToFields(props){
        const { info = {} } = props;
        return {
            name: Form.createFormField({
                value: info['name'] || ''
            }),

            menuIds : Form.createFormField({
                value: info['menuIds'] || []
            }),

            assignRoles : Form.createFormField({
                value: info['assignRoles'] || []
            }),

            desc: Form.createFormField({
                value: info['desc'] || ''
            }),
        };
    }
})(injectIntl(AddModal));