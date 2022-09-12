import React, { Component } from 'react';
import { Form, Modal, Input, Radio,Select,TreeSelect } from 'antd';
import PropTypes from 'prop-types';
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
        const { visible,allSettlePlatList,allSettleTypeList, form: { getFieldDecorator,getFieldsValue } } = this.props;
        let platSettleTypeList = [];
        if(Array.isArray(allSettlePlatList) && Array.isArray(allSettleTypeList)) {
            let currentPlat = allSettlePlatList.find(item=> item.id === getFieldsValue().platId);
            if(!!currentPlat && !!currentPlat.settleTypeList){
                let typeIdArray = currentPlat.settleTypeList.split(',');
                for(let i in  typeIdArray){
                    let tempSettleType = allSettleTypeList.find(type=> type.id == typeIdArray[i]);
                    if(!!tempSettleType){
                        platSettleTypeList.push(tempSettleType);
                    }
                }
                // console.dir(platSettleTypeList);
                // console.dir(getFieldsValue());
            }
        }
        
        return (
            <Modal
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                width={700}
                visible={visible}
                title={'添加/修改支付商户'}>
                <div>
                    <Form>
                        <Form.Item label={'支付平台'} {...this.layout}>
                            {
                                getFieldDecorator('platId', {
                                    initialValue: '',
                                    rules: [{ required: true, message: '不能为空' }]
                                })(
                                    <Select initialValue=''>
                                        {allSettlePlatList.length > 0 && allSettlePlatList.map((item, i) => {
                                            return <Select.Option key={i} value={item.id}>{item.platName}({item.platClass})</Select.Option>
                                        })}
                                    </Select>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={'商户号'} {...this.layout}>
                            {
                                getFieldDecorator('mchNo', {
                                    initialValue: '',
                                    rules: [{ required: true, message: '不能为空' }]
                                })(
                                    <Input placeholder={'请输入商户号'}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={'商户名称'} {...this.layout}>
                            {
                                getFieldDecorator('mchName', {
                                    rules: [{ required: true, message: '不能为空' }]
                                })(
                                    <Input disabled={false} placeholder={'请输入商户名称'}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={'商户秘钥1'} {...this.layout}>
                            {
                                getFieldDecorator('mchKey', {
                                    rules: [{ required: false, message: '' }]
                                })(
                                    <TextArea rows={2}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={'商户秘钥2'} {...this.layout}>
                            {
                                getFieldDecorator('mchKey2', {
                                    rules: [{ required: false, message: '' }]
                                })(
                                    <TextArea rows={2}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={'费率（千分比）'} {...this.layout}>
                            {
                                getFieldDecorator('rate', {
                                    rules: [{ required: false, message: '请输入正确的数值',whitespace: false,
                                        type:'number',
                                        transform(value) {
                                            if(value){
                                                return Number(value);
                                            }
                                        }
                                    }]
                                })(
                                    <Input disabled={false} placeholder={'请输入费率（千分比）'}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={'回调主机名'} {...this.layout}>
                            {
                                getFieldDecorator('callbackHost', {
                                    rules: [{ required: false, message: ''}]
                                })(
                                    <Input disabled={false} placeholder={'请输入回调主机名'}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={'支付类型'} {...this.layout}>
                            {
                                getFieldDecorator('settleTypeIds', {
                                    rules: [{ required: false, message: ''}]
                                })(
                                    <TreeSelect
                                        treeDataSimpleMode={{ rootPId: 0 }}
                                        treeData={platSettleTypeList}
                                        treeCheckable={true}
                                        showCheckedStrategy={TreeSelect.SHOW_ALL}
                                        allowClear={true}
                                        dropdownStyle={{ height: '300px' }}
                                        searchPlaceholder={'请选择支持的支付方式'}

                                    />
                                )
                            }
                        </Form.Item>
                        <Form.Item label={'优先级'} {...this.layout}>
                            {
                                getFieldDecorator('sortNum', {
                                    rules: [{ required: false, message: '请输入正确的数值',whitespace: false,
                                        type:'number',
                                        transform(value) {
                                            if(value){
                                                return Number(value);
                                            }
                                        }
                                    }]
                                })(
                                    <div>
                                        <Input disabled={false} placeholder={'请输入优先级'}/>
                                        <span>注意 数字越大，优先级别越高</span>
                                    </div>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={'是否用于首充'} {...this.layout}>
                            {
                                getFieldDecorator('forFirst', {
                                    rules: [{ required: false, message: ''}]
                                })(
                                    <Radio.Group>
                                        <Radio value={true}>是</Radio>
                                        <Radio value={false}>否</Radio>
                                    </Radio.Group>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={'是否启用'} {...this.layout}>
                            {
                                getFieldDecorator('isEnabled', {
                                    rules: [{ required: false, message: ''}]
                                })(
                                    <Radio.Group>
                                        <Radio value={true}>启用</Radio>
                                        <Radio value={false}>不启用</Radio>
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
    allSettlePlatList: PropTypes.array,
    allSettleTypeList: PropTypes.array,
    info: PropTypes.object
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
        settleMoneyList:'',
        callbackHost:'',
        openSettleTypeList:'',
        forFirst:'',
        isEnabled:true,
        settleTypeIds:[],
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
            settleMoneyList:Form.createFormField({
                value: info['settleMoneyList']
            }),
            callbackHost:Form.createFormField({
                value: info['callbackHost']
            }),
            openSettleTypeList:Form.createFormField({
                value: info['openSettleTypeList']
            }),
            forFirst:Form.createFormField({
                value: info['forFirst']
            }),
            isEnabled:Form.createFormField({
                value: info['isEnabled']
            }),
            settleTypeIds:Form.createFormField({
                value: info['settleTypeIds']
            }),
            sortNum:Form.createFormField({
                value: info['sortNum']
            })
        }
    }
})(EditModel);