import React, { Component} from 'react';
import Cookies from 'js-cookie';
import { withRouter } from 'react-router-dom';
import { Form, Row, Col, Input, Button, Spin } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl} from "react-intl";

import { userLogout, axios } from 'utils';
import {loginAction } from './index';
import styles from './Login.less';
import LanguageSwitch from '../../../locales/component/LanguageSwitch';


class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            text: <FormattedMessage id ="page.login.auth.code" defaultMessage="获取验证码"/>,
            disabled: false,
            googleAuthCodeRequired: false,
        };
        this.timer = null;
    }

    getCaptcha = () => {
        //post ajax
        const { dispatch, form: { getFieldValue } } = this.props;
        const phoneNo = getFieldValue('phoneNumber');
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
        const { needGoogleAuth, dispatch, form: { getFieldsValue } } = this.props;
        e.preventDefault();

        if(!needGoogleAuth) {
          // 尚未進行第一次登入
          this.props.form.validateFields((err, values) => {
            if (!err) {
              const { phoneNumber, captcha, googleAuthCode } = getFieldsValue();
              // NOTICE: UseCase:Login
              dispatch(loginAction.lgPostLogin({
                phoneNo: phoneNumber,
                code: captcha,
                googleAuthCode
              }));
            }
          });
        } else {
          // 已進行第一次登入
          const { googleAuthCode } = getFieldsValue();
          if(!googleAuthCode) {
            // 尚未輸入google驗證碼，提示錯誤
            this.setState({ ...this.state, googleAuthCodeRequired: true })
          } else {
            // 已輸入google 驗證碼，呼叫以google 驗證碼取得token API
            dispatch(loginAction.lgChangeLoading(true))
            this.verifyGoogleAuthCode(googleAuthCode)
          }
      }
    }

    verifyGoogleAuthCode = (googleAuthCode) => {
      axios({
        url: '/hs/admin/auth/verifyGoogleAuthQRCode',
        method: 'post',
        data: googleAuthCode
      }).then((res) => {
        const { dispatch, history } = this.props;
        if(Number(res.code) === 200) {
          Cookies.set('loginInfo', res);
          dispatch(loginAction.lgSetGoogleAuth(false))
          history.push('/index')
        }
        dispatch(loginAction.lgChangeLoading(false))
      })
    }

    componentWillReceiveProps(nextProps) {
        const { isCancelTimer, needGoogleAuth, form, dispatch, history } = nextProps;
        const { getFieldsValue } = form;

        // 判斷是否需要驗證Google Auth code
        if(needGoogleAuth && needGoogleAuth !== this.props.needGoogleAuth){
          const { googleAuthCode } = getFieldsValue();
          if(!googleAuthCode) {
            // 尚未輸入google驗證碼，提示錯誤
            this.setState({ ...this.state, googleAuthCodeRequired: true })
            dispatch(loginAction.lgChangeLoading(false))
          } else {
            // 已輸入google 驗證碼，呼叫以google 驗證碼取得token API
            this.verifyGoogleAuthCode(googleAuthCode)
          }
        }

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
        const { form: { getFieldDecorator }, intl, btnLoading } = this.props;
        const { text, disabled, googleAuthCodeRequired } = this.state;
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
                            <Input disabled={btnLoading} placeholder={intl.formatMessage({id:"page.login.phone"})} type="text" className={styles.antInputSt} />
                        )}
                    </Form.Item>

                        <Row>
                            <Col span={16}>
                                <Form.Item>

                                    {getFieldDecorator('captcha', {
                                        rules: [{ required: true, message: intl.formatMessage({id:"page.login.password.empty"}) }],
                                        initialValue: ''
                                    })(
                                        <Input disabled={btnLoading}  className={`${styles.antInputSt} sentry-mask`} type="text" placeholder={intl.formatMessage({id:"page.login.password"})} />
                                    )}

                                </Form.Item>
                            </Col>
                            <Col span={8} style={{textAlign: 'right'}}>
                                <Form.Item>
                                    <Button className={styles.antBtnSt} type={'primary'} size={'large'} disabled={disabled || btnLoading} onClick={this.getCaptcha}>
                                        {text}
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item validateStatus={googleAuthCodeRequired?"error": ""} help={googleAuthCodeRequired && intl.formatMessage({id:"page.login.google.auth.code.empty"})}>
                          {getFieldDecorator('googleAuthCode', {
                            initialValue: ''
                          })(
                            <Input
                              disabled={btnLoading}
                              onChange={()=>{
                                this.setState({ ...this.state, googleAuthCodeRequired: false })}
                              }
                              placeholder={intl.formatMessage({id:"page.login.google.auth.code"})}
                              type="text"
                              className={styles.antInputSt}
                            />
                          )}
                        </Form.Item>
                        <Form.Item>
                            <Button disabled={btnLoading} size={'large'} type="primary" htmlType="submit" className={styles.loginBtn}>
                              {btnLoading ? <Spin />: <FormattedMessage id="page.login.login" defaultMessage="登录"/>}
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
        isCancelTimer: loginManageState['isCancelTimer'],
        needGoogleAuth: loginManageState['needGoogleAuth'],
        googleAuthUrl: loginManageState['googleAuthUrl']
    }
};

const propTypes = {
    intl: PropTypes.object.isRequired,
  };

Login.propTypes = propTypes;

export default connect(mapStateToProps)(Form.create()(withRouter(injectIntl(Login))));
