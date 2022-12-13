import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {loginAction, loginState} from './index';
import { withRouter } from 'react-router-dom';
import { Form, Row, Col, Input, Icon, Button } from 'antd';
import styles from './Login.less';
import { FormattedMessage, injectIntl} from "react-intl";
import LanguageSwitch from '../../../locales/component/LanguageSwitch';
import { userLogout } from 'utils';

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            text: <FormattedMessage id ="page.login.auth.code" defaultMessage="获取验证码"/>,
            disabled: false,
        };
        this.timer = null;
    }

    getCaptcha = () => {
        //post ajax
        const { dispatch, form: { getFieldValue } } = this.props;
        const phoneNo = getFieldValue('phoneNumber');
        console.log(phoneNo)
        // NOTICE: UseCase:GetLoginCode
        dispatch(loginAction.lgGetCode({ phoneNo }));
        let index = 60;
        this.setState({
            text: <FormattedMessage id ="page.login.reacquire" values={{index : index}} defaultMessage="重新获取({ index }S)"/>,
            disabled: true
        });
        this.timer = setInterval(() => {
            index--;
            if(index === 0) {
                clearInterval(this.timer);
                this.setState({
                    text: <FormattedMessage id ="page.login.auth.code" defaultMessage="获取验证码"/>,
                    disabled:false
                });
                return;
            }
            this.setState({
                text: <FormattedMessage id ="page.login.reacquire" values={{index : index}} defaultMessage="重新获取({ index }S)"/>,
                disabled: true
            });
        },1000)
    }

    handleSubmit = (e) => {
        const { dispatch, form: { getFieldsValue } } = this.props;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { phoneNumber, captcha } = getFieldsValue();
                // NOTICE: UseCase:Login
                dispatch(loginAction.lgPostLogin({
                    phoneNo: phoneNumber,
                    code: captcha
                }));
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        const { isCancelTimer, dispatch } = nextProps;
        if(isCancelTimer && isCancelTimer !== this.props.isCancelTimer) {
            clearInterval(this.timer);
            this.setState({
                text: <FormattedMessage id ="page.login.auth.code" defaultMessage="获取验证码"/>,
                disabled: false,
            }, () => {
                dispatch(loginAction.lgCancelTimer(false));
            })
        }
    }
    componentDidMount() {
        userLogout();
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }
    render() {
        const { form: { getFieldDecorator }, intl } = this.props;
        const { text, disabled } = this.state;
        return (
            <div className={styles.loginBg}>
                <LanguageSwitch />
                <div className={styles.formContent}>
                <div className={styles.formTitle}><FormattedMessage id="page.login.admin" defaultMessage="后台管理系统"/></div>
                <div className={styles.formBg}>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('phoneNumber', {
                            rules: [{ required: true, message: intl.formatMessage({id:"page.login.phone.empty"})}],
                            initialValue: ''
                        })(
                            <Input placeholder={intl.formatMessage({id:"page.login.phone"})} type="text" className={styles.antInputSt} />
                        )}
                    </Form.Item>

                        <Row>
                            <Col span={16}>
                                <Form.Item>

                                    {getFieldDecorator('captcha', {
                                        rules: [{ required: true, message: intl.formatMessage({id:"page.login.password.empty"}) }],
                                        initialValue: ''
                                    })(
                                        <Input  className={styles.antInputSt} type="text" placeholder={intl.formatMessage({id:"page.login.password"})} />
                                    )}

                                </Form.Item>
                            </Col>
                            <Col span={8} style={{textAlign: 'right'}}>
                                <Form.Item>
                                    <Button className={styles.antBtnSt} type={'primary'} size={'large'} disabled={disabled} onClick={this.getCaptcha}>
                                        {text}
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item>
                            <Button size={'large'} type="primary" htmlType="submit" className={styles.loginBtn}>
                                <FormattedMessage id="page.login.login" defaultMessage="登录"/>
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    const { loginState: { loginManageState } } = state;
    return {
        btnLoading: loginManageState['btnLoading'],
        isCancelTimer: loginManageState['isCancelTimer']
    }
};

const propTypes = {
    intl: PropTypes.object.isRequired,
  };

Login.propTypes = propTypes;

export default connect(mapStateToProps)(Form.create()(withRouter(injectIntl(Login))));
