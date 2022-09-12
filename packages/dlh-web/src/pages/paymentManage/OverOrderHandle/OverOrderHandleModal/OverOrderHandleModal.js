import React, { Component } from 'react';
import { Modal, Form, Input, message,Row,Col,Icon,Button } from 'antd';
import PropTypes from 'prop-types';
import styles from '../OverOrderHandle.less';
import {axios} from "utils";
import {injectIntl, FormattedMessage} from "react-intl";

const FormItem = Form.Item;
const { TextArea } = Input;

class OverOrderHandleModal extends Component{
    layout = {
        labelCol: {
            span: 6
        },
        wrapperCol: {
            span: 14
        }
    }
    
    constructor(props) {
        super(props);
        this.state = {
            text: props.intl.formatMessage({id : "windowPage.captcha.code"}),
            disabled: false,
        };
        this.timer = null;
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
                        text: this.props.intl.formatMessage({id : "windowPage.reacquire"},{indexTime : index}),
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
                            text:  this.props.intl.formatMessage({id : "windowPage.reacquire"},{indexTime : index}),
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
        })
    }

    render() {
        const { visible, form: { getFieldDecorator }, handleCancel, info, modalLoading, intl } = this.props;
        const { disabled,text } = this.state;
        return (
            <Modal
                onOk={this.onOk}
                onCancel={handleCancel}
                width={600}
                visible={visible}
                title={intl.formatMessage({id : "windowPage.wrong.order.maintain"})}
                confirmLoading={modalLoading}
                afterClose={this.afterClose}
            >
            <div>
                    <Row gutter={16}>
                        <Col className={styles.col} lg={12} xl={12}>
                            <label className={styles.title_red}><FormattedMessage id="windowPage.customer.name" />：</label>
                            <span>{info['userTrueName'] || ''}</span>
                        </Col>
                        <Col className={styles.col} lg={12} xl={12}>
                            <label className={styles.title}><FormattedMessage id="windowPage.mobile" />：</label>
                            <span>{info['userPhone'] || ''}</span>
                        </Col>
                        <Col className={styles.col} lg={12} xl={12}>
                            <label className={styles.title_red}><FormattedMessage id="windowPage.order.no" />：</label>
                            <span>{info['orderNo'] || ''}</span>
                        </Col>
                        <Col className={styles.col} lg={12} xl={12}>
                            <label className={styles.title}><FormattedMessage id="page.search.list.order.status" />：</label>
                            <span><FormattedMessage id="windowPage.cleared" /></span>
                        </Col>
                        <Col className={styles.col} lg={12} xl={12}>
                            <label className={styles.title}><FormattedMessage id="page.table.contract.amount" />：</label>
                            <span>{info['deviceMoney'] || ''}</span>
                        </Col>
                        <Col className={styles.col} lg={12} xl={12}>
                            <label className={styles.title}><FormattedMessage id="page.table.days.overdue" />：</label>
                            <span>{info['expireDay'] || ''}</span>
                        </Col>
                        <Col className={styles.col} lg={12} xl={12}>
                            <label className={styles.title}><FormattedMessage id="page.table.amount.paid" />：</label>
                            <span>{info['hadPaidMoney'] || ''}</span>
                        </Col>
                        <Col className={styles.col} lg={12} xl={12}>
                            <label className={styles.title}><FormattedMessage id="page.table.reduce.amount" />：</label>
                            <span>{info['reductionMoney'] || ''}</span>
                        </Col>
                     </Row>
            </div>
                <Form>
                    <FormItem label={intl.formatMessage({id : "windowPage.reset.captcha.code"})} {...this.layout}>
                        {
                            getFieldDecorator('smsCode', {
                                rules: [{ required: true, message: intl.formatMessage({id : "windowPage.captcha.code.empty"}) }],
                                initialValue: ''
                            })(
                                <Input className={styles.inputCode} placeholder={intl.formatMessage({id : "windowPage.captcha.code.enter"})} />
                            )
                        }
                       <Button className={styles.captcha} type={'primary'} size={'default'} disabled={disabled} onClick={this.getCaptcha}>{text}</Button>
                    </FormItem>
                    <FormItem label={intl.formatMessage({id : "windowPage.remarks"})} {...this.layout}>
                        {
                            getFieldDecorator('remark', {})(
                                <TextArea rows={2}/>
                            )
                        }
                    </FormItem>
                </Form>
                <div className={styles.desc_div}>
                    <span className={styles.desc}>
                        <p><FormattedMessage id="page.overOrder.comment1" /></p>
                        <p><FormattedMessage id="page.overOrder.comment2" /></p>
                        <p><FormattedMessage id="page.overOrder.comment3" /></p>
                        <p><FormattedMessage id="page.overOrder.comment4" /></p>
                        <p>&nbsp;<FormattedMessage id="page.overOrder.comment5" /></p>
                        <p>&nbsp;<FormattedMessage id="page.overOrder.comment6" /></p>
                        <p>&nbsp;<FormattedMessage id="page.overOrder.comment7" /></p>
                        <p><FormattedMessage id="page.overOrder.comment8" /></p>
                    </span>
                </div>
            </Modal>
        );
    }
}
OverOrderHandleModal.propTypes = {
    visible: PropTypes.bool,
    handleOk: PropTypes.func,
    handleCancel: PropTypes.func,
    info: PropTypes.object,
    modalLoading: PropTypes.bool,
    onChange: PropTypes.func,
    intl: PropTypes.object.isRequired,
};
OverOrderHandleModal.deafultProps = {
    visible: false,
    handleOk(){},
    handleCancel(){},
    info: {},
    modalLoading: false,
    onChange: () => {}
};

export default Form.create({
    mapPropsToFields(props){
        const { info = {} } = props;
        return {
            remark: Form.createFormField({
                ...info['smsCode'],
                value: info['smsCode'].value
            }),
            remark: Form.createFormField({
                ...info['remark'],
                value: info['remark'].value
            })
        };
    }
})(injectIntl(OverOrderHandleModal));