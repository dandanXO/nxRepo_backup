import React, { Component } from 'react';
import { Form, Modal, Input,Radio,Select,TreeSelect} from 'antd';
import PropTypes from 'prop-types';
import {injectIntl, FormattedMessage} from "react-intl";
import { axios } from 'utils';

const RadioGroup = Radio.Group;

const SHOW_PARENT = TreeSelect.SHOW_ALL;
class ChannelUserModel extends Component{
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
        this.state = {
            channelList : []
        };
    }
    

    handleOk = () => {
        const { form: { getFieldsValue, validateFields,showField }, handleOk } =  this.props;
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

    componentDidMount() {
        try {
            const _this = this;
            axios({
                url: '/hs/admin/channel/getChannelList',
                method: 'post',
                data: {pageSize: 1000, pageNum: 1}
            }).then((res) => {
                if(res && res.code == '200') {
                    let { data } = res;
                    _this.setState({
                        channelList: data.records
                    });
                }
            });
        } catch (e) {
    
        }
    }

    radioRender(){
        //const { info } = this.state;
        //console.log("state:" + info['state']);
        // return <Radio value={'1'}>启用</Radio><Radio value={'0'}>禁用</Radio>;
    }

    render() {
        const { visible, form: { getFieldDecorator }, intl} = this.props;
        let { channelList } = this.state;
        // id: item.id, pId: item.parentId, value: item.id + '', label: item.name
        let arr = [
            {"id":1,"pId":0,"value":"1","label": intl.formatMessage({id : "page.table.new.customer.registrations.amount"})},
            {"id":2,"pId":0,"value":"2","label": intl.formatMessage({id : "page.table.new.customer.application.qantity"})},
            {"id":3,"pId":0,"value":"3","label": intl.formatMessage({id : "page.table.new.customer.loan.qantity"})}
        ]
        console.log("content:" + JSON.stringify(arr));
        return (
            <Modal
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                width={700}
                visible={visible}
                title={intl.formatMessage({id : "windowPage.add.modify.channel.user.website"})} >
                <div>
                    <Form>
                        <Form.Item label={intl.formatMessage({id : "page.search.list.channelId"})} {...this.layout}>
                            {
                                getFieldDecorator('channelId', {
                                    rules: [{ required: true, message: intl.formatMessage({id : "windowPage.remarks.empty"}) }]
                                })(
                                    <Select initialValue=''>
                                        <Select.Option key='' value=''><FormattedMessage id="page.search.list.select" /></Select.Option>
                                        {channelList.length > 0 && channelList.map((item, i) => {
                                            return <Select.Option key={i} value={item.id}>{item.name}({item.id})</Select.Option>
                                        })}
                                    </Select>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={intl.formatMessage({id : "page.search.list.login.account"})} {...this.layout}>
                            {
                                getFieldDecorator('userPhone', {
                                    initialValue: '',
                                    rules: [{ required: true, message: intl.formatMessage({id : "windowPage.remarks.empty"}) }]
                                })(
                                    <Input placeholder={intl.formatMessage({id : "page.search.list.login.account.enter"})}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={intl.formatMessage({id : "windowPage.user.password"})} {...this.layout}>
                            {
                                getFieldDecorator('pass', {
                                    initialValue: '',
                                    rules: [{ required: true, message: intl.formatMessage({id : "windowPage.user.password.empty"}) }]
                                })(
                                    <Input placeholder={intl.formatMessage({id : "windowPage.channel.user.password"})+'('+intl.formatMessage({id : "windowPage.new.user.required.password"})+')'}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={intl.formatMessage({id : "page.search.list.user.status"})} {...this.layout}>
                            {   
                                 getFieldDecorator('state', {})(
                                    <RadioGroup>
                                       <Radio value={'1'}><FormattedMessage id="page.table.enabled" /></Radio>
                                       <Radio value={'0'}><FormattedMessage id="page.search.list.disable" /></Radio>
                                    </RadioGroup>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={intl.formatMessage({id : "windowPage.display.field"})} {...this.layout}>
                            {   
                                getFieldDecorator('showField', {
                                    rules: [{ required: true, message: intl.formatMessage({id : "windowPage.remarks.empty"}) }]
                                })(
                                    <TreeSelect
                                        treeDataSimpleMode={{ rootPId: 0 }}
                                        treeData={arr}
                                        treeCheckable={true}
                                        showCheckedStrategy={SHOW_PARENT}
                                        allowClear={true}
                                        dropdownStyle={{ height: '150px' }}
                                        searchPlaceholder={intl.formatMessage({id : "page.search.list.select"})}
                                    />
                                )
                            }
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        );
    }

}

ChannelUserModel.propTypes = {
    visible: PropTypes.bool,
    handleOk: PropTypes.func,
    handleCancel: PropTypes.func,
    info: PropTypes.object,
    intl: PropTypes.object.isRequired,
};
ChannelUserModel.defaultProps = {
    visible: false,
    handleOk: () => {},
    handleCancel: () =>{},
    info: {
        userName:'', 
        userPhone:'',
        pass:'', 
        channelId:'', 
        state:'',
        showField:''
    }
};

export default Form.create({
    mapPropsToFields(props){
        const { info = {} } = props;
        return {
            userName: Form.createFormField({
                value: info['userName'] || ''
            }),
            userPhone: Form.createFormField({
                value: info['userPhone'] || ''
            }),
            pass: Form.createFormField({
                value: info['pass'] || ''
            }),
            channelId: Form.createFormField({
                value: info['channelId'] || ''
            }),
            state: Form.createFormField({
                value: info['state'] || ''
            }),
            showField: Form.createFormField({
                value: info['showField'] || ''
            })           
        }
    }
})(injectIntl(ChannelUserModel));