import React, { Component } from 'react';
import { Modal, Form, Select, Input } from 'antd';
import PropTypes from 'prop-types';
import {injectIntl, FormattedMessage} from "react-intl";

const FormItem = Form.Item;
const Option = Select.Option;

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
    renderOption() {
        const { selectData } = this.props;
        const ele = selectData.map(item => <Option key={item.id} value={item.id + ''}>{item.name}</Option>);
        return [<Option value={'0'} key={'0'}><FormattedMessage id="windowPage.top.level.menu" /></Option>].concat(ele);
    }

    render() {
        const { visible, form: { getFieldDecorator }, handleCancel, intl } = this.props;
        return (
            <Modal
                onOk={this.onOk}
                onCancel={handleCancel}
                width={500}
                visible={visible}
                title={intl.formatMessage({id : "windowPage.add.modify.menu"})}
            >
                <Form>
                    <FormItem label={intl.formatMessage({id : "page.table.menu.name"})} {...this.layout}>
                        {
                            getFieldDecorator('name', {})(
                                <Input placeholder={intl.formatMessage({id : "windowPage.menu.name.enter"})} />
                            )
                        }
                    </FormItem>
                    <FormItem label={intl.formatMessage({id : "windowPage.parent.menu"})} {...this.layout}>
                        {
                            getFieldDecorator('parentId', {})(
                                <Select>
                                    {this.renderOption()}
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem label={intl.formatMessage({id : "windowPage.menu.URL"})} {...this.layout}>
                        {
                            getFieldDecorator('actionUrl', {})(
                                <Input placeholder={intl.formatMessage({id : "windowPage.menu.URL.enter"})} />
                            )
                        }
                    </FormItem>
                    <FormItem label={intl.formatMessage({id : "windowPage.icon.name"})} {...this.layout}>
                        {
                            getFieldDecorator('iconCss', {})(
                                <Input placeholder={intl.formatMessage({id : "windowPage.icon.name.enter"})} />
                            )
                        }
                    </FormItem>
                    <FormItem label={intl.formatMessage({id : "windowPage.sort.value"})} {...this.layout}>
                        {
                            getFieldDecorator('sortOrder', {})(
                                <Input placeholder={intl.formatMessage({id : "windowPage.sort.value"})} />
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
    selectData: PropTypes.array,
    intl: PropTypes.object.isRequired,
};
AddModal.deafultProps = {
    visible: false,
    handleOk(){},
    handleCancel(){},
    info: {},
    selectData: []
};

export default Form.create({
    mapPropsToFields(props){
        const { info = {} } = props;
        return {
            name: Form.createFormField({
                value: info['name'] || ''
            }),
            actionUrl: Form.createFormField({
                value: info['actionUrl'] || ''
            }),
            iconCss: Form.createFormField({
                value: info['iconCss'] || ''
            }),
            parentId: Form.createFormField({
                value: info['parentId'] || '0'
            }),
            sortOrder: Form.createFormField({
                value: info['sortOrder'] || '50'
            }),
        };
    }
})(injectIntl(AddModal));