import React, { Component } from 'react';
import { Form, Modal, Input, Radio,Select,TreeSelect,Upload,Icon,TimePicker,Checkbox } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import {injectIntl, FormattedMessage} from "react-intl";


const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;

const weekday = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
let plainOptions = [];
let defaultCheckedList = [];   

class EditModel extends Component{
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
        this.state = {
            file1Id:'',
            file2Id:''
        };

    }
    beforeUpload = (file) => {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error(this.props.intl.formatMessage({id : "windowPage.file.not.exceed.2m"}));
        }
        return isLt2M;
    }
    handleFile1Change = (info) => {
        if (info.file.status === 'uploading') {
            return;
        }
        if (info.file.status === 'done') {
            // console.dir(info);
            let res = info.file.response;
            if(res.code != 200){
                alert(res.message);
            } else {
                this.props.info.file1Id = res.data.id;
                alert(this.props.intl.formatMessage({id : "windowPage.attach1.upload.success"}));
            }
            
        }
    }
    handleFile2Change = (info) => {
        if (info.file.status === 'uploading') {
            return;
        }
        if (info.file.status === 'done') {
            let res = info.file.response;
            if(res.code != 200){
                alert(res.message);
            } else {
                this.props.info.file2Id = res.data.id;
                alert(this.props.intl.formatMessage({id : "windowPage.attach2.upload.success"}));
            }
        }
    }
    handleOk = () => {
        const { form: { getFieldsValue, validateFields }, handleOk } =  this.props;
        validateFields((err) => {
            if(err) {
                return;
            }
            let editInfo = getFieldsValue();
            editInfo.file1Id = this.props.info.file1Id;
            editInfo.file2Id = this.props.info.file2Id;
            handleOk(editInfo);
        })
    }
    handleCancel = () => {
        this.props.handleCancel();
    }

    render() {
        const { visible,allPayPlatList,allPayTypeList, form: { getFieldDecorator,getFieldsValue },intl } = this.props;
        plainOptions = [];
        defaultCheckedList = [];
        weekday.forEach(day =>{ 
            plainOptions.push(intl.formatMessage({id : day}));
            defaultCheckedList.push(intl.formatMessage({id : day})); 
        });
 
        let platPayTypeList = [];
        if(Array.isArray(allPayPlatList) && Array.isArray(allPayTypeList)) {
            let currentPlat = allPayPlatList.find(item=> item.id === getFieldsValue().platId);
            if(!!currentPlat && !!currentPlat.payTypeList){
                let typeIdArray = currentPlat.payTypeList.split(',');
                for(let i in  typeIdArray){
                    if('' == typeIdArray[i]){continue;}
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
                title={intl.formatMessage({id :"windowPage.add.modify.repayment.business"})}>
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
                        <Form.Item label={intl.formatMessage({id : "page.search.list.business.no"})} {...this.layout}>
                            {
                                getFieldDecorator('mchNo', {
                                    initialValue: '',
                                    rules: [{ required: true, message: intl.formatMessage({id : "windowPage.remarks.empty"}) }]
                                })(
                                    <Input placeholder={intl.formatMessage({id : "page.search.list.business.no.enter"})}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={intl.formatMessage({id : "page.search.list.business.name"})} {...this.layout}>
                            {
                                getFieldDecorator('mchName', {
                                    rules: [{ required: true, message: intl.formatMessage({id : "windowPage.remarks.empty"}) }]
                                })(
                                    <Input disabled={false} placeholder={intl.formatMessage({id : "page.search.list.business.name.enter"})}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={intl.formatMessage({id : "windowPage.business.key"})} {...this.layout}>
                            {
                                getFieldDecorator('appKey', {
                                    rules: [{ required: false, message: intl.formatMessage({id : "windowPage.remarks.empty"})}]
                                })(
                                    <Input disabled={false} placeholder={intl.formatMessage({id : "page.editModel.comment1"})}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={intl.formatMessage({id : "windowPage.merchant.secret.key1"})} {...this.layout}>
                            {
                                getFieldDecorator('mchKey', {
                                    rules: [{ required: false, message: '' }]
                                })(
                                    <TextArea rows={2} placeholder={intl.formatMessage({id : "windowPage.merchant.no.modify.empty"})}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={intl.formatMessage({id : "windowPage.merchant.secret.key2"})} {...this.layout}>
                            {
                                getFieldDecorator('mchKey2', {
                                    rules: [{ required: false, message: '' }]
                                })(
                                    <TextArea rows={2} placeholder={intl.formatMessage({id : "windowPage.merchant.no.modify.empty"})}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={intl.formatMessage({id : "windowPage.payment.type"})} {...this.layout}>
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
                                        searchPlaceholder={intl.formatMessage({id : "windowPage.select.support.repayment.method"})}

                                    />
                                )
                            }
                        </Form.Item>
                        <Form.Item label={intl.formatMessage({id : "page.table.priority"})} {...this.layout}>
                            {
                                getFieldDecorator('sortNum', {
                                    rules: [{ required: false, message: intl.formatMessage({id : "windowPage.enter.correct.value"}),whitespace: false,
                                        type:'number',
                                        transform(value) {
                                            if(value){
                                                return Number(value);
                                            }
                                        }
                                    }]
                                })(
                                    <Input disabled={false} placeholder={intl.formatMessage({id : "windowPage.enter.priority.enter"})}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={intl.formatMessage({id : "windowPage.attention"})} {...this.layout}>
                            <span style={{color:'red'}}><FormattedMessage id="windowPage.higer.num.high.priority" /></span>
                        </Form.Item>
                        <Form.Item label={intl.formatMessage({id : "windowPage.attachment"})} {...this.layout}>
                            <span>
                            <Upload
                                name="file"
                                listType="picture-card"
                                className="uploader"
                                showUploadList={false}
                                action="/hs/payCenter/uploadFile"
                                beforeUpload={this.beforeUpload}
                                onChange={this.handleFile1Change}
                                >
                                <div>
                                    <Icon type={this.state.loading ? 'loading' : 'upload'} />
                                    <div className="ant-upload-text"><FormattedMessage id="windowPage.upload.attachment1" /></div>
                                </div>
                            </Upload>
                            <Upload
                                name="file"
                                listType="picture-card"
                                className="uploader"
                                showUploadList={false}
                                action="/hs/payCenter/uploadFile"
                                beforeUpload={this.beforeUpload}
                                onChange={this.handleFile2Change}
                                >
                                <div>
                                    <Icon type={this.state.loading ? 'loading' : 'upload'} />
                                    <div className="ant-upload-text"><FormattedMessage id="windowPage.upload.attachment2" /></div>
                                </div>
                            </Upload>
                            </span>
                        </Form.Item>
                        <Form.Item label={intl.formatMessage({id : "windowPage.business.param1"})} {...this.layout}>
                            {
                                getFieldDecorator('business1Field', {
                                    initialValue: '',
                                    rules: [{ required: false, message: intl.formatMessage({id : "windowPage.remarks.empty"}) }]
                                })(
                                    <Input placeholder={intl.formatMessage({id : "windowPage.business.param1.enter"})}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={intl.formatMessage({id : "windowPage.business.param2"})} {...this.layout}>
                            {
                                getFieldDecorator('business2Field', {
                                    initialValue: '',
                                    rules: [{ required: false, message: intl.formatMessage({id : "windowPage.remarks.empty"}) }]
                                })(
                                    <Input placeholder={intl.formatMessage({id : "windowPage.business.param2.enter"})}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={intl.formatMessage({id : "windowPage.business.param3"})} {...this.layout}>
                            {
                                getFieldDecorator('business3Field', {
                                    initialValue: '',
                                    rules: [{ required: false, message: intl.formatMessage({id : "windowPage.remarks.empty"}) }]
                                })(
                                    <Input placeholder={intl.formatMessage({id : "windowPage.business.param3.enter"})}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={intl.formatMessage({id : "windowPage.business open.day"})} {...this.layout}>
                            {
                                getFieldDecorator('openDays', {
                                    
                                    rules: [{ required: false, message: intl.formatMessage({id : "windowPage.remarks.empty"}) }]
                                })(
                                    <CheckboxGroup
                                    options={plainOptions}
                                    value={this.state.checkedList}
                                    defaultValue={defaultCheckedList}
                                    />
                                )
                            }
                        </Form.Item>
                        <Form.Item label={intl.formatMessage({id : "windowPage.business.open.time"})} {...this.layout}>
                            {
                                getFieldDecorator('startTime', {
                                    initialValue: '',
                                    rules: [{ required: false, message: intl.formatMessage({id : "windowPage.remarks.empty"})}]
                                })(
                                    <TimePicker placeholder={intl.formatMessage({id : "windowPage.business.open.time"})}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={intl.formatMessage({id : "windowPage.business.end.time"})} {...this.layout}>
                            {
                                getFieldDecorator('endTime', {
                                    initialValue: '',
                                    rules: [{ required: false, message: intl.formatMessage({id : "windowPage.remarks.empty"}) }]
                                })(
                                    <TimePicker placeholder={intl.formatMessage({id : "windowPage.business.close.time"})}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={intl.formatMessage({id : "page.table.use.for.repayment"})} {...this.layout}>
                            {
                                getFieldDecorator('enabledRepaied', {
                                    rules: [{ required: false, message: ''}]
                                })(
                                    <Radio.Group>
                                        <Radio value={true}><FormattedMessage id="page.table.yes" /></Radio>
                                        <Radio value={false}><FormattedMessage id="page.table.no" /></Radio>
                                    </Radio.Group>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={intl.formatMessage({id : "page.table.bind.bank.card"})} {...this.layout}>
                            {
                                getFieldDecorator('enabledAuthBank', {
                                    rules: [{ required: false, message: ''}]
                                })(
                                    <Radio.Group>
                                        <Radio value={true}><FormattedMessage id="page.table.yes" /></Radio>
                                        <Radio value={false}><FormattedMessage id="page.table.no" /></Radio>
                                    </Radio.Group>
                                )
                            }
                        </Form.Item>
                        
                        <Form.Item label={intl.formatMessage({id : "page.table.is.enabled"})} {...this.layout}>
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
        sortNum:0,
        file1Id:'',
        file2Id:'',
        enabledRepaied:true,
        enabledAuthBank:false,
        business1Field:'',business2Field:'',business3Field:'',
        openDays:[],
        startTime:'',
        endTime:'',
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
            }),
            file1Id:Form.createFormField({
                value: info['file1Id']
            }),
            file2Id:Form.createFormField({
                value: info['file2Id']
            }),
            enabledRepaied:Form.createFormField({
                value: info['enabledRepaied']
            }),
            enabledAuthBank:Form.createFormField({
                value: info['enabledAuthBank']
            }),
            business1Field:Form.createFormField({
                value: info['business1Field']
            }),
            business2Field:Form.createFormField({
                value: info['business2Field']
            }),
            business3Field:Form.createFormField({
                value: info['business3Field']
            }),
            openDays:Form.createFormField({
                value: info['openDays']
            }),
            startTime:Form.createFormField({        
                //value: moment(info['startTime'],'HH:mm:ss')
                //value: moment(startTime).format('YYYY-MM-DD HH:mm:ss')
                value: typeof(info['startTime']) == 'string' && info['startTime'].length>13 ? moment(info['startTime'].substring(info['startTime'].length -13,info['startTime'].length - 5), 'HH:mm:ss') : ""
            }),
            endTime:Form.createFormField({
                //value: moment(info['endTime'],'HH:mm:ss')
                //value: moment(endTime).format('YYYY-MM-DD HH:mm:ss')
                value: typeof(info['endTime']) == 'string' && info['endTime'].length>13 ? moment(info['endTime'].substring(info['endTime'].length -13,info['endTime'].length - 5), 'HH:mm:ss') : ""
            }),
        }
    }
})(injectIntl(EditModel));