import React, { Component } from 'react';
import { Modal, Form, Select, Input, Button } from 'antd';
import PropTypes from 'prop-types';
import styles from './AddBlackModal.less';
import {axios} from "utils";
import {injectIntl} from "react-intl";

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
let _this = null;
class AddBlackModal extends Component{
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
            text: props.intl.formatMessage({id : "windowPage.captcha.code"}),
            disabled: false,
        };
        this.timer = null;
        _this = this;
    }


    getCaptcha = () => {
        //post ajax
        // const { info } = this.props;
        let jsonStr = sessionStorage.getItem('adminUser');
        let adminUser = JSON.parse(jsonStr);
        let loginUserPhone = adminUser.phoneNo;
        console.log("当前登录号码:" + loginUserPhone);
        try {
            axios({
                url: '/hs/admin/auth/sendVerifyCode',
                method: 'post',
                data: {phoneNo: loginUserPhone}
            }).then((res) => {
                if(res && res.code == '200') {
                    let index = 60;
                    this.setState({
                        text: this.props.intl.formatMessage({id : "windowPage.reacquire"}, {indexTime : index}),
                        disabled: true
                    });
                    this.timer = setInterval(() => {
                        index--;
                        if(index === 0) {
                            clearInterval(this.timer);
                            this.setState({
                                text: this.props.intl.formatMessage({id : "windowPage.captcha.code"}),
                                disabled:false
                            });
                            return;
                        }
                        this.setState({
                            text: this.props.intl.formatMessage({id : "windowPage.reacquire"}, {indexTime : index}),
                            disabled: true
                        });
                    },1000)
                }
            });
        } catch (e) {
    
        }        
    }




    onOk = () => {
        const { handleOk, form: { getFieldsValue, validateFields } } = this.props;
        validateFields((err) => {
            if(err) {
                return;
            }
            handleOk(getFieldsValue());
        });
    }

    render() {
        const { visible, form: { getFieldDecorator }, handleCancel, intl} = this.props;
        const { disabled,text } = this.state;
        return (
            <Modal
                onOk={this.onOk}
                onCancel={handleCancel}
                width={600}
                visible={visible}
                title={intl.formatMessage({id: "page.table.add.blacklist"})}
            >
                <Form>


               

                    <FormItem label={intl.formatMessage({id: "windowPage.mobile"})} {...this.layout}>
                    {
                        getFieldDecorator('userPhone', {
                            rules: [
                                { required: true, pattern: new RegExp("^[0-9]*$"), message: intl.formatMessage({id: "windowPage.mobile.format.incorrect"})},
                                 { len: 11, message: intl.formatMessage({id: "windowPage.mobile.length"}) }
                            
                            ],
                            initialValue: ''
                        })(
                            <Input className={styles.inputCode} placeholder={intl.formatMessage({id: "windowPage.mobile.enter"})} />
                        )
                    }
                    </FormItem>     
                    <FormItem label={intl.formatMessage({id: "windowPage.real.name"})} {...this.layout}>
                    {
                        getFieldDecorator('userTrueName', {
                            rules: [{ required: true, message: intl.formatMessage({id: "windowPage.real.name.empty"})}],
                            initialValue: ''
                        })(
                            <Input className={styles.inputCode} placeholder={intl.formatMessage({id: "windowPage.real.name.enter"})} />
                        )
                    }
                    </FormItem>    
                    <FormItem label={intl.formatMessage({id: "windowPage.identity.card"})} {...this.layout}>
                    {
                        getFieldDecorator('userIdCard', {
                            rules: [{ required: true, message: intl.formatMessage({id: "windowPage.identity.card.empty"})}],
                            initialValue: ''
                        })(
                            <Input className={styles.inputCode} placeholder={intl.formatMessage({id: "windowPage.identity.card.enter"})} />
                        )
                    }
                    </FormItem>    

                    <FormItem label={intl.formatMessage({id: "windowPage.confirm.captcha.code"})} {...this.layout}>
                        {
                            getFieldDecorator('smsCode', {
                                rules: [{ required: true, message: intl.formatMessage({id: "windowPage.captcha.code.empty"}) }],
                                initialValue: ''
                            })(
                                <Input className={styles.inputCode} placeholder={intl.formatMessage({id: "windowPage.captcha.code.enter"})} />
                            )
                        }
                       <Button className={styles.captcha} type={'primary'} size={'default'} disabled={disabled} onClick={this.getCaptcha}>{text}</Button>
                    </FormItem>
                
                    <FormItem label={intl.formatMessage({id: "windowPage.remarks"})} {...this.layout}>
                        {
                            getFieldDecorator('refundReason', {
                                rules: [
                                    { required: true, message: intl.formatMessage({id: "windowPage.remarks.empty"})}
                                ]
                            })(
                                <TextArea rows={4}/>
                            )
                        }
                    </FormItem>
                </Form>

               
                <div className={styles.desc_div}>
                    <span className={styles.desc}>
                        <p>{intl.formatMessage({id: "page.addBlacklist.comment1"})}</p>
                        <p>{intl.formatMessage({id: "page.addBlacklist.comment2"})}</p>
                        <p>{intl.formatMessage({id: "page.addBlacklist.comment3"})}</p>
                        <p>{intl.formatMessage({id: "page.addBlacklist.comment4"})}</p>
                        <p>&nbsp;&nbsp;{intl.formatMessage({id: "page.addBlacklist.comment5"})}</p>
                        <p>&nbsp;&nbsp;{intl.formatMessage({id: "page.addBlacklist.comment6"})}<b>{intl.formatMessage({id: "page.addBlacklist.comment7"})}</b>{intl.formatMessage({id: "page.addBlacklist.comment8"})}</p>
                        <p>{intl.formatMessage({id: "page.addBlacklist.comment9"})}</p>
                    </span>
                </div>
                

            </Modal>
        );
    }
}
AddBlackModal.propTypes = {
    visible: PropTypes.bool,
    handleOk: PropTypes.func,
    handleCancel: PropTypes.func,
    info: PropTypes.object,
    intl : PropTypes.object.isRequired,
};
AddBlackModal.deafultProps = {
    visible: false,
    handleOk(){},
    handleCancel(){},
    info: {},
};

export default Form.create({
    mapPropsToFields(props){
        const { info = {} } = props;
        return {
            refundReason: Form.createFormField({
                value: info['refundReason'] || ''
            }),
        };
    }
})(injectIntl(AddBlackModal));