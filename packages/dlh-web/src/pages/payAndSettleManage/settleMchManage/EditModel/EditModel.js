import React, { Component } from 'react';
import {Form, Modal, Input, Radio, Select, Upload, Icon, Col} from 'antd';
import PropTypes from 'prop-types';
import {injectIntl, FormattedMessage} from "react-intl";

const { TextArea } = Input;

class EditModel extends Component{
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
    beforeUpload = (file) => {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error(this.props.intl.FormattedMessage({id : "windowPage.file.not.exceed.2m"}));
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
        const { form: { getFieldsValue, validateFields }, handleOk, info } =  this.props;
        validateFields((err) => {
            if(err) {
                return;
            }
            let editInfo = getFieldsValue();
            editInfo.file1Id = this.props.info.file1Id;
            editInfo.file2Id = this.props.info.file2Id;

            console.log("info", info);
            editInfo = {
              ...info,
              ...editInfo,
            }
            handleOk(editInfo);
        })
    }

    handleCancel = () => {
        this.props.handleCancel();
    }

    renderMerchants = () => {
      const { allMerchants } = this.props
      if(!allMerchants) return;
      const ele = allMerchants.map(item => <Option key={item.merchantId} value={item.merchantId} >{item.name}</Option>);
      return ele;
    }

    render() {
        const { visible,allSettlePlatList,allSettleTypeList, form: { getFieldDecorator,getFieldsValue }, intl, isSuperAdmin } = this.props;
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
                title={intl.formatMessage({id : "windowPage.add.modify.substitue.payment.merchant"})}>
                <div>
                    <Form>
                        {isSuperAdmin && (
                          <Form.Item label={intl.formatMessage({id : "page.search.list.merchantName"})} {...this.layout}>
                            {
                              getFieldDecorator('dlhMerchantId', {
                                initialValue: ''
                              })(
                                <Select>
                                  {this.renderMerchants()}
                                </Select>
                              )
                            }
                          </Form.Item>
                        )}
                        <Form.Item label={intl.formatMessage({id : "page.search.list.payment.platId"})} {...this.layout}>
                            {
                                getFieldDecorator('platId', {
                                    initialValue: '',
                                    rules: [{ required: true, message: intl.formatMessage({id : "windowPage.remarks.empty"}) }]
                                })(
                                    <Select initialValue=''>
                                        {allSettlePlatList.length > 0 && allSettlePlatList.map((item, i) => {
                                            return <Select.Option key={i} value={item.id}>{item.platName}({item.platClass})</Select.Option>
                                        })}
                                    </Select>
                                )
                            }
                        </Form.Item>
                        <Form.Item label={intl.formatMessage({id : "page.search.list.payment.mchNo"})} {...this.layout}>
                            {
                                getFieldDecorator('mchNo', {
                                    initialValue: '',
                                    rules: [{ required: true, message: intl.formatMessage({id : "windowPage.remarks.empty"}) }]
                                })(
                                    <Input placeholder={intl.formatMessage({ id: "page.table.enter" }, { text: intl.formatMessage({id : "page.search.list.payment.mchNo"}) })}/>

                                )
                            }
                        </Form.Item>
                        <Form.Item label={intl.formatMessage({id : "page.search.list.payment.mchName"})} {...this.layout}>
                            {
                                getFieldDecorator('mchName', {
                                    rules: [{ required: true, message: intl.formatMessage({id : "windowPage.remarks.empty"}) }]
                                })(
                                    <Input disabled={false} placeholder={intl.formatMessage({ id: "page.table.enter" }, { text: intl.formatMessage({id : "page.search.list.payment.mchName"}) })}/>
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
                        <Form.Item label={intl.formatMessage({id : "windwoPage.rate.per.thousands"})} {...this.layout}>
                            {
                                getFieldDecorator('rate', {
                                    rules: [{ required: false, message: intl.formatMessage({id : "windowPage.enter.correct.value"}),whitespace: false,
                                        type:'number',max:'999999999',min:'0',
                                        transform(value) {
                                            if(value){
                                                return Number(value);
                                            }
                                        }
                                    }]
                                })(
                                    <Input disabled={false} placeholder={intl.formatMessage({id : "windwoPage.rate.per.thousands.enter"})}/>
                                )
                            }
                        </Form.Item>
                        {/* <Form.Item label={'回调主机名'} {...this.layout}>
                            {
                                getFieldDecorator('callbackHost', {
                                    rules: [{ required: false, message: ''}]
                                })(
                                    <Input disabled={false} placeholder={'请输入回调主机名'}/>
                                )
                            }
                        </Form.Item> */}
                        <Form.Item label={intl.formatMessage({id : "page.table.priority"})} {...this.layout}>
                            {
                                getFieldDecorator('sortNum', {
                                    rules: [{ required: false, message: intl.formatMessage({id : "windowPage.enter.correct.value"}) ,whitespace: false,
                                        type:'number',max:'999999999',min:'0',
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
                        {/* <Form.Item label={'是否用于首充'} {...this.layout}>
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
                        </Form.Item> */}
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
                        <Form.Item label={intl.formatMessage({id : "windowPage.business.param1"})} {...this.layout}>
                            {
                                getFieldDecorator('business1Field', {
                                    initialValue: '',
                                    rules: [{ required: false, message: intl.formatMessage({id : "windowPage.remarks.empty"}) }]
                                })(
                                    <Input placeholder={intl.formatMessage({id : "windowPage.business.param1.enter2"})}/>
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
        settleMoneyList:'',
        callbackHost:'',
        openSettleTypeList:'',
        forFirst:'',
        isEnabled:true,
        //settleTypeIds:[],
        file1Id:'',
        file2Id:'',
        sortNum:0,
        business1Field:'',
        business2Field:'',
        business3Field:''
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
            file1Id:Form.createFormField({
                value: info['file1Id']
            }),
            file2Id:Form.createFormField({
                value: info['file2Id']
            }),
            isEnabled:Form.createFormField({
                value: info['isEnabled']
            }),
            settleTypeIds:Form.createFormField({
                value: info['settleTypeIds']
            }),
            sortNum:Form.createFormField({
                value: info['sortNum']
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
            dlhMerchantId:Form.createFormField({
              value: info['dlhMerchantId']
            }),

        }
    }
})(injectIntl(EditModel));
