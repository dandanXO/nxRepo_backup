import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Form, Row, Col, Input, Icon, Button ,Card} from 'antd';
import Cookies from 'js-cookie';
import { getLoginInfo, axios, getAdminUserInfo, userLogout } from 'utils';
import styles from './GoogleAuth.less';

class GoogleAuth extends Component{

    constructor(props){
        super(props);
        this.state = {
            googleAuthUrl: '',
            hasGoogleKey:''
        }
      }
    componentWillMount() {
    }


    async componentDidMount () {
        const _this = this;
        const adminUser = await getAdminUserInfo();
        const hasGoogleKey = adminUser ? adminUser.data.googleAuthKey : "";
        _this.setState({
            hasGoogleKey: hasGoogleKey
        })
        axios({
            url: '/hs/admin/auth/getGoogleAuthQRCode',
            method: 'post'
        }).then((res) => {
            const { googleAuthUrl } = res;
            _this.setState({
                googleAuthUrl: googleAuthUrl

            })
            // document.getElementById("googleAuthUrlImg").setAttribute("src",googleAuthUrl);

        })

    }

    handleCancel = (e) => {
        const {history} = this.props;
        userLogout();
        history.push("/login");
    }

    handleSubmit = (e) => {
        const { history } = this.props;
        const { dispatch, form: { getFieldsValue } } = this.props;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { googleAuthCode } = getFieldsValue();
                axios({
                    url: '/hs/admin/auth/verifyGoogleAuthQRCode',
                    method: 'post',
                    data: googleAuthCode
                }).then((res) => {
                    if (Number(res.code) === 200) {
                        Cookies.set('loginInfo', res);
                        history.push('/index');
                    }
                })
            }
        });
    }

    render () {
        const { form: { getFieldDecorator } } = this.props;
        const hasLoginInfo = getLoginInfo();
       
        if(!hasLoginInfo) {
            return <Redirect to="/login" />;
        }

        if (hasLoginInfo) {
            const { data: { googleAuthFlag, passGoogleAuth } } = hasLoginInfo;
            if ((googleAuthFlag && passGoogleAuth) || !googleAuthFlag) {
                return <Redirect to="/index" />;
            }
        }
     
        return (
            <div className={styles.margin10}>
                {(() => {
                    if (this.state.hasGoogleKey == "123456") {
                        return (
                            <div className="site-card-border-less-wrapper">

                                <Card size="Default size card" title="Google Authenticator" style={{ width: 500 }}>
                                    <p>请输入动态验证码</p>
                                    <p>
                                        <Form onSubmit={this.handleSubmit} >
                                            <Form.Item>
                                                {getFieldDecorator('googleAuthCode', {
                                                    rules: [{ required: true, message: '动态验证码不能为空' }],
                                                    initialValue: ''
                                                })(
                                                    <Input placeholder="动态验证码" />
                                                )}
                                            </Form.Item>
                                            <Form.Item>
                                                <Button type="dashed" onClick={this.handleCancel}>返回</Button>
                                                <Button size={'large'} type="primary" htmlType="submit">确定</Button>
                                            </Form.Item>
                                        </Form>
                                    </p>
                                </Card>
                            </div>)
                    } else {
                        return (
                            <div className="site-card-border-less-wrapper">
                                <Card size="Default size card" title="第一步" style={{ width: 500 }}>
                                    <p>使用Google Authenticator扫描以下QR Code</p>
                                    <p><img id="googleAuthUrlImg" src={this.state.googleAuthUrl} /></p>
                                </Card>
                                <Card size="Default size card" title="第二步" style={{ width: 500 }}>
                                    <p>请输入动态验证码</p>
                                    <p>
                                        <Form onSubmit={this.handleSubmit} >
                                            <Form.Item>
                                                {getFieldDecorator('googleAuthCode', {
                                                    rules: [{ required: true, message: '动态验证码不能为空' }],
                                                    initialValue: ''
                                                })(
                                                    <Input placeholder="动态验证码" />
                                                )}
                                            </Form.Item>
                                            <Form.Item>
                                                <Button type="dashed" onClick={this.handleCancel}>返回</Button>
                                                <Button size={'large'} type="primary" htmlType="submit">确定</Button>
                                            </Form.Item>
                                        </Form>
                                    </p>
                                </Card>
                            </div>)
                    }
                })()}
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        
    }
};

export default connect(mapStateToProps)(Form.create()(withRouter(GoogleAuth)));