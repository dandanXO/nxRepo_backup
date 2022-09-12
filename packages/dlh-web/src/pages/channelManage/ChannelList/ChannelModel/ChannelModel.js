import React, { Component } from 'react';
import { Form, Modal, Input ,Radio, Select } from 'antd';
import PropTypes from 'prop-types';
import {injectIntl, FormattedMessage} from "react-intl";


const RadioGroup = Radio.Group;
const Option = Select.Option;
const FormItem = Form.Item;

class ChannelModel extends Component{
    layout = {
        labelCol: {
            span: 5
        },
        wrapperCol: {
           span: 19
        }
    }
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleOk = () => {
        const { form: { getFieldsValue, validateFields }, handleOk } =  this.props;
        validateFields((err) => {
            if(err) {
                return;
            }
            handleOk(getFieldsValue());
        })
    }
    handleCancel = () => {
        this.props.handleCancel();
    }
    renderRole = () => {
        const { roleData } = this.props;
        //return roleData.map(item => <Option key={item.id} value={item.name} >{item.name}</Option>)//role
        return roleData.map(item => <Option key={item.id} value={item.modelName} >{item.modelName}</Option>)//mine
    }

    render() {
        let riskPlan = sessionStorage.getItem('riskPlan');
        let hide = 'none';
        let requiredRisk = false;
        if(riskPlan === 'C'){
            hide = 'black';
            requiredRisk = true;
        }
        const { visible, form: { getFieldDecorator }, intl } = this.props;
        return (
            <Modal
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                width={700}
                visible={visible}
                title={intl.formatMessage({id : "windowPage.add.modify.channel"})}>
                <div>
                    <Form>
                        <Form.Item label={intl.formatMessage({id : "page.search.list.channelId"})} {...this.layout}>
                            {
                                getFieldDecorator('name', {
                                    initialValue: '',
                                    rules: [{ required: true, message: intl.formatMessage({id : "windowPage.remarks.empty"}) }]
                                })(
                                    <Input placeholder={intl.formatMessage({id : "page.search.list.channelId.enter"})}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={intl.formatMessage({id : "windowPage.channel.hyperlink"})} {...this.layout}>
                            {
                                getFieldDecorator('url', {
                                    rules: [{ required: true, message: intl.formatMessage({id : "windowPage.remarks.empty"}) }]
                                })(
                                    <Input disabled={true} placeholder={intl.formatMessage({id : "windowPage.channel.hyperlink.enter"})}/>
                                )
                            }
                        </Form.Item>

                        <Form.Item label={intl.formatMessage({id : "page.search.list.channelCampaign"})} {...this.layout}>
                            {
                                getFieldDecorator('campaign', {
                                    initialValue: '',
                                })(
                                    <Input placeholder={intl.formatMessage({id : "page.search.list.channelCampaign.enter"})}/>
                                )
                            }
                        </Form.Item>

                        <FormItem label={intl.formatMessage({id : "page.table.risk.control.plan"})} {...this.layout} style={{display:hide}}>
                            {
                                getFieldDecorator('modelName', {
                                    rules: [{ required: requiredRisk, message: intl.formatMessage({id : "windowPage.remarks.empty"}) }]
                                })(
                                    <Select>
                                        {this.renderRole()}
                                    </Select>
                                )
                            }
                        </FormItem>
                        <Form.Item label={intl.formatMessage({id : "page.table.channel.status"})} {...this.layout}>
                            {   
                                 getFieldDecorator('enabled', {})(
                                    <RadioGroup>
                                       <Radio value={'1'}><FormattedMessage id="page.table.enabled" /></Radio>
                                       <Radio value={'0'}><FormattedMessage id="page.search.list.disable" /></Radio>
                                    </RadioGroup>                                  
                                )
                            }
                        </Form.Item>
                    </Form>
                    <div>
                        <span>
                            <p><FormattedMessage id="page.channelModel.comment1" /></p>
                            <p><FormattedMessage id="page.channelModel.comment2" /></p>
                            <p><FormattedMessage id="page.channelModel.comment3" /></p>
                            <p><FormattedMessage id="page.channelModel.comment4" /></p>
                        </span>
                    </div>
                </div>
            </Modal>
        );
    }

}

ChannelModel.propTypes = {
    visible: PropTypes.bool,
    handleOk: PropTypes.func,
    handleCancel: PropTypes.func,
    info: PropTypes.object,
    roleData: PropTypes.array,
    intl: PropTypes.object.isRequired,
    //roleData: PropTypes.array
};
ChannelModel.defaultProps = {
    visible: false,
    handleOk: () => {},
    handleCancel: () =>{},
    info: {
        name: '',
        url: '',
        modelName: '',
        campaign: '',
        enabled:''
    },
    roleData: []
};

export default Form.create({
    mapPropsToFields(props){
        const { info = {} } = props;
        return {
            name: Form.createFormField({
                value: info['name'] || ''
            }),
            url: Form.createFormField({
                value: info['url'] || ''
            }),
            modelName: Form.createFormField({
                value: info['modelName'] || ''
            }),
            campaign: Form.createFormField({
                value: info['campaign'] || ''
            }),
            enabled: Form.createFormField({
                value: info['enabled'] || ''
            })
        }
    }
})(injectIntl(ChannelModel));