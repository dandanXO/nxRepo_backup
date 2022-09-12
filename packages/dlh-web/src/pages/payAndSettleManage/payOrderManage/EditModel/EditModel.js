import React, { Component } from 'react';
import { Form, Modal, Input, Radio,Select,TreeSelect } from 'antd';
import PropTypes from 'prop-types';
import {injectIntl, FormattedMessage} from "react-intl";


const { TextArea } = Input;

class EditModel extends Component{
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

    render() {
        const { visible,allPayPlatList,allPayTypeList, form: { getFieldDecorator,getFieldsValue }, intl } = this.props;
        let platPayTypeList = [];
        if(Array.isArray(allPayPlatList) && Array.isArray(allPayTypeList)) {
            let currentPlat = allPayPlatList.find(item=> item.id === getFieldsValue().platId);
            if(!!currentPlat && !!currentPlat.payTypeList){
                let typeIdArray = currentPlat.payTypeList.split(',');
                for(let i in  typeIdArray){
                    let tempPayType = allPayTypeList.find(type=> type.id == typeIdArray[i]);
                    if(!!tempPayType){
                        platPayTypeList.push(tempPayType);
                    }
                }
                // console.dir(platPayTypeList);
                // console.dir(getFieldsValue());
            }
        }
        
        return (
            <Modal
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                width={700}
                visible={visible}
                title={intl.formatMessage({id : "windowPage.add.modify.repayment.business"})}>
                <div>
                    <Form>
                        <Form.Item label={intl.formatMessage({id : "page.search.list.repayement.platfrom"})} {...this.layout}>
                            {
                                getFieldDecorator('platId', {
                                    initialValue: '',
                                    rules: [{ required: true, message: intl.formatMessage({id : "windowPage.remarks.empty"}) }]
                                })(
                                    <Select initialValue=''>
                                        {allPayPlatList.length > 0 && allPayPlatList.map((item, i) => {
                                            return <Select.Option key={i} value={item.id}>{item.platName}({item.platClass})</Select.Option>
                                        })}
                                    </Select>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={ intl.formatMessage({id : "page.search.list.business.no"})} {...this.layout}>
                            {
                                getFieldDecorator('mchNo', {
                                    initialValue: '',
                                    rules: [{ required: true, message:  intl.formatMessage({id : "windowPage.remarks.empty"}) }]
                                })(
                                    <Input placeholder={ intl.formatMessage({id : "page.search.list.business.no.enter"})}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={ intl.formatMessage({id : "page.search.list.business.name"})} {...this.layout}>
                            {
                                getFieldDecorator('mchName', {
                                    rules: [{ required: true, message:  intl.formatMessage({id : "windowPage.remarks.empty"}) }]
                                })(
                                    <Input disabled={false} placeholder={ intl.formatMessage({id : "page.search.list.business.name.enter"})}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={ intl.formatMessage({id : "windowPage.merchant.secret.key1"})} {...this.layout}>
                            {
                                getFieldDecorator('mchKey', {
                                    rules: [{ required: false, message: '' }]
                                })(
                                    <TextArea rows={2}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={ intl.formatMessage({id : "windowPage.merchant.secret.key2"})} {...this.layout}>
                            {
                                getFieldDecorator('mchKey2', {
                                    rules: [{ required: false, message: '' }]
                                })(
                                    <TextArea rows={2}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={ intl.formatMessage({id : "windwoPage.rate.per.thousands"})} {...this.layout}>
                            {
                                getFieldDecorator('rate', {
                                    rules: [{ required: false, message:  intl.formatMessage({id : "windowPage.enter.correct.value"}),whitespace: false,
                                        type:'number',
                                        transform(value) {
                                            if(value){
                                                return Number(value);
                                            }
                                        }
                                    }]
                                })(
                                    <Input disabled={false} placeholder={ intl.formatMessage({id : "windwoPage.rate.per.thousands.enter"})}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={ intl.formatMessage({id : "wnidowPage.callback.host.name"})} {...this.layout}>
                            {
                                getFieldDecorator('callbackHost', {
                                    rules: [{ required: false, message: ''}]
                                })(
                                    <Input disabled={false} placeholder={ intl.formatMessage({id : "wnidowPage.callback.host.name.enter"})}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={ intl.formatMessage({id : "windowPage.payment.type"})} {...this.layout}>
                            {
                                getFieldDecorator('payTypeIds', {
                                    rules: [{ required: false, message: ''}]
                                })(
                                    <TreeSelect
                                        treeDataSimpleMode={{ rootPId: 0 }}
                                        treeData={platPayTypeList}
                                        treeCheckable={true}
                                        showCheckedStrategy={TreeSelect.SHOW_ALL}
                                        allowClear={true}
                                        dropdownStyle={{ height: '300px' }}
                                        searchPlaceholder={ intl.formatMessage({id : "windowPage.select.support.repayment.method"})}

                                    />
                                )
                            }
                        </Form.Item>
                        <Form.Item label={ intl.formatMessage({id : "page.table.priority"})} {...this.layout}>
                            {
                                getFieldDecorator('sortNum', {
                                    rules: [{ required: false, message:  intl.formatMessage({id : "windowPage.enter.correct.value"}),whitespace: false,
                                        type:'number',
                                        transform(value) {
                                            if(value){
                                                return Number(value);
                                            }
                                        }
                                    }]
                                })(
                                    <div>
                                        <Input disabled={false} placeholder={ intl.formatMessage({id : "windowPage.enter.priority.ente"})}/>
                                        <span><FormattedMessage id="windowPage.attention" />&nbsp;<FormattedMessage id="windowPage.higer.num.high.priority" /></span>
                                    </div>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={ intl.formatMessage({id : "windowPage.whether.first.recharge"})} {...this.layout}>
                            {
                                getFieldDecorator('forFirst', {
                                    rules: [{ required: false, message: ''}]
                                })(
                                    <Radio.Group>
                                        <Radio value={true}><FormattedMessage id="page.table.yes" /></Radio>
                                        <Radio value={false}><FormattedMessage id="page.table.no" /></Radio>
                                    </Radio.Group>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={ intl.formatMessage({id : "page.table.is.enabled"})} {...this.layout}>
                            {
                                getFieldDecorator('isEnabled', {
                                    rules: [{ required: false, message: ''}]
                                })(
                                    <Radio.Group>
                                        <Radio value={true}><FormattedMessage id="page.table.enabled" /></Radio>
                                        <Radio value={false}><FormattedMessage id="page.table.disabled" /></Radio>
                                    </Radio.Group>
                                )
                            }
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        );
    }

}

EditModel.propTypes = {
    visible: PropTypes.bool,
    handleOk: PropTypes.func,
    handleCancel: PropTypes.func,
    allPayPlatList: PropTypes.array,
    allPayTypeList: PropTypes.array,
    info: PropTypes.object,
    intl: PropTypes.object.isRequired,
};
EditModel.defaultProps = {
    visible: false,
    handleOk: () => {},
    handleCancel: () =>{},
    info: {
        mchNo:'',
        mchName:'',
        mchKey:'',
        mchKey2:'',
        platId:'',
        rate:'',
        openTime:'',
        payMoneyList:'',
        callbackHost:'',
        openPayTypeList:'',
        forFirst:'',
        isEnabled:true,
        payTypeIds:[],
        sortNum:0
    }
};

export default Form.create({
    mapPropsToFields(props){
        const { info = {} } = props;
        return {
            mchNo:Form.createFormField({
                value: info['mchNo']
            }),
            mchName:Form.createFormField({
                value: info['mchName']
            }),
            mchKey:Form.createFormField({
                value: info['mchKey']
            }),
            mchKey2:Form.createFormField({
                value: info['mchKey2']
            }),
            platId:Form.createFormField({
                value: info['platId']
            }),
            rate:Form.createFormField({
                value: info['rate']
            }),
            openTime:Form.createFormField({
                value: info['openTime']
            }),
            payMoneyList:Form.createFormField({
                value: info['payMoneyList']
            }),
            callbackHost:Form.createFormField({
                value: info['callbackHost']
            }),
            openPayTypeList:Form.createFormField({
                value: info['openPayTypeList']
            }),
            forFirst:Form.createFormField({
                value: info['forFirst']
            }),
            isEnabled:Form.createFormField({
                value: info['isEnabled']
            }),
            payTypeIds:Form.createFormField({
                value: info['payTypeIds']
            }),
            sortNum:Form.createFormField({
                value: info['sortNum']
            })
        }
    }
})(injectIntl(EditModel));