import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Form, Row, Col, Input, Icon, Button ,Card} from 'antd';
import Cookies from 'js-cookie';
import { getLoginInfo, axios, getAdminUserInfo, userLogout } from 'utils';
import styles from './GoogleAuth.less';
import { loginAction } from "../../login/Login";

// NOTE: /hs/admin/auth/getInfo
// Response
// NOTE: res
// {
//   "showDownLoanBtn":"1",
//   "code":200,
//   "appName":"测试用",
//   "data":{
//   "collectGroupId":0,
//     "lastLogin":0,
//     "addTime":1670381505,
//     "lastIp":"",
//     "collectTeamId":0,
//     "googleAuthKey":"",
//     "departmentId":1,
//     "googleAuthFlag":1,
//     "isOnline":0,
//     "enabled":1,
//     "phoneNo":"12341234",
//     "trueName":"Eric",
//     "password":"andy5412",
//     "passwordLogin":0,
//     "merchantId":5,
//     "isLocked":0,
//     "id":35,
//     "stationId":0,
//     "deptManager":false,
//     "salt":"1",
//     "roleId":30,
//     "skinName":"",
//     "updateTime":{
//     "dayOfWeek":"SATURDAY",
//       "hour":19,
//       "month":"DECEMBER",
//       "dayOfMonth":17,
//       "dayOfYear":351,
//       "year":2022,
//       "monthValue":12,
//       "nano":0,
//       "minute":1,
//       "second":47
//   },
//   "userName":"eric",
//     "loginCount":0,
//     "token":"",
//     "regionId":0
// },
//   "announcementsForCollectors":[
//   "সতর্কীকরণ: কোন ধরনের ফটোশপ অথবা অকথ্য ভাষায় গালাগালি করলে সাথে সাথে চাকরীচ্যুত করা হবে",
//   "Waning: No photoshop, No abuse! Termination will be conducted immediately when you done this."
// ],
//   "riskPlan":"C"
// }

// NOTE: /hs/admin/auth/getGoogleAuthQRCode
// NOTE: res
// {
//   "code":200,
//   "appName":"测试用",
//   "googleAuthUrl":"https://chart.googleapis.com/chart?chs=200x200&chld=M%7C0&cht=qr&chl=otpauth://totp/12341234@测试用%3Fsecret%3DIBV74LNWMG3BBINP"
// }


class GoogleAuth extends Component{

    constructor(props){
        super(props);
        this.state = {
            googleAuthUrl: props.googleAuthUrl,
            hasGoogleKey:''
        }
      }
    componentWillMount() {
    }


    async componentDidMount () {
        const _this = this;
        const res = await axios({
          url: '/hs/admin/auth/getInfo',
          method: 'post'
        })
        let { data } = res;
        if(res && String(res.code) == "200") {
          Cookies.set("adminUser", JSON.stringify(data))
        }
        const hasGoogleKey = data.googleAuthKey;
        _this.setState({
            hasGoogleKey: hasGoogleKey
        })

        if (!this.state.googleAuthUrl) {
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
                        dispatch(loginAction.lgSetGoogleAuth(false))
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
    const { loginState: { loginManageState } } = state;
    return {
        googleAuthUrl: loginManageState['googleAuthUrl']
    }
};

export default connect(mapStateToProps)(Form.create()(withRouter(GoogleAuth)));
