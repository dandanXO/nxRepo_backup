import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Form, Row, Col, Input, Icon, Button ,Card} from 'antd';
import Cookies from 'js-cookie';
import { hasLogin,hasGoogleAuth, axios } from 'utils';
import styles from './GoogleAuth.less';

class GoogleAuth extends Component{

    constructor(props){
        super(props);
        this.state = {
            googleAuthUrl: ''
        }
      }
    // componentWillMount() {
    //     const _this = this;
    //     axios({
    //         url: '/hs/admin/auth/getGoogleAuthQRCode',
    //         method: 'post'
    //     }).then((res) => {
    //         const {googleAuthUrl} = res;
    //         _this.setState({
    //             googleAuthUrl : googleAuthUrl

    //         })

    //     })
    //     //document.getElementsByClassName("ant-modal-close-x")
    // }


    componentDidMount() {
        const _this = this;
        axios({
            url: '/hs/admin/auth/getGoogleAuthQRCode',
            method: 'post'
        }).then((res) => {
            const {googleAuthUrl} = res;
            _this.setState({
                googleAuthUrl : googleAuthUrl

            })
            // document.getElementById("googleAuthUrlImg").setAttribute("src",googleAuthUrl);

        })
        
    }

    handleCancel = (e) => {
        const {history} = this.props;
        Cookies.remove("isLogin");
        Cookies.remove("isGoogleAuth");
        history.push("/login");
    
    }

    handleSubmit = (e) => {
        const {history} = this.props;
        const { dispatch, form: { getFieldsValue } } = this.props;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { googleAuthCode } =getFieldsValue();
                let submitData = {"code":googleAuthCode};
                const _this = this;
                axios({
                    url: '/hs/admin/auth/verifyGoogleAuthQRCode',
                    method: 'post',
                    data:googleAuthCode
                }).then((res) => {
                    console.log(res);

                    
                    const {
                        data,
                     
                      } = res;
                 
            
                      if (Number(res.code) !== 200) {
                        //session过期
                        if (Number(res.code) === 400) {
                          // showModal('session过期，请重新登录！');
                          setTimeout(() => {
                            Cookies.remove("isLogin");
                            Cookies.remove("isGoogleAuth");
                            history.push("/login");
                          }, 1500);
                          return;
                        }
                      
                        const obj = data.data;
                        let msg;
                        //{code:500,message:'aa'}这种格式
                        if (!obj) {
                          msg = data["message"];
                        } else {
                          if (typeof obj === "string") {
                            try {
                              const realObj = JSON.parse(obj);
                              msg = realObj["msg"];
                            } catch (e) {
                              msg = "系统错误";
                            }
                          } else {
                            msg = obj["msg"];
                          }
                        }

                    // Cookies.set('isGoogleAuth', 'ok');
                    // history.push('/index');
                    // document.getElementById("googleAuthUrlImg").setAttribute("src",googleAuthUrl);
        
                }else{
                    Cookies.set('isGoogleAuth', 'ok');
                    history.push('/index');
               }

                    // Cookies.set('isGoogleAuth', 'ok');
                    // history.push('/index');
                    // document.getElementById("googleAuthUrlImg").setAttribute("src",googleAuthUrl);
        
                })
                

             
            }
        });
    }

    render() {
        const { form: { getFieldDecorator } } = this.props;
        const isLogin = hasLogin();
        const isGoogleAuth = hasGoogleAuth();

        if(!isLogin) {
            return <Redirect to="/login" />;
        }

        if(isGoogleAuth){
            return <Redirect to="/index" />;
        }

       
        let adminUser;
        do{
        let jsonStr = sessionStorage.getItem('adminUser');
         adminUser = JSON.parse(jsonStr);
        }while(adminUser==null)
        let hasGoogleKey = adminUser.googleAuthKey;

        var  authBox ;
   

        return (

            <div className={styles.margin10}>
                 
                {(() => {
                    if (hasGoogleKey=="123456") {
                    return (
                        <div className="site-card-border-less-wrapper">

            <Card size="Default size card" title="Google Authenticator"  style={{ width: 500 }}>
            <p>请输入动态验证码</p>
          
            <p>

            <Form onSubmit={this.handleSubmit} >
                    <Form.Item>
                        {getFieldDecorator('googleAuthCode', {
                            rules: [{ required: true, message: '动态验证码不能为空' }],
                            initialValue: ''
                        })(
                            <Input    placeholder="动态验证码" />
                        )}
                    </Form.Item>

                    <Form.Item>
                         <Button type="dashed" onClick={this.handleCancel}>返回</Button>
                         <Button size={'large'} type="primary" htmlType="submit">
                         确定
                         </Button>
                    </Form.Item>
             </Form>       


             </p>
            </Card>


            </div>
                    )
                    } else {
                    return (
                        <div className="site-card-border-less-wrapper">




                        <Card title="Default size card" title="第一步" style={{ width: 500 }}>
                        <p>使用Google Authenticator扫描以下QR Code</p>
                        <p><img id="googleAuthUrlImg" src={this.state.googleAuthUrl} /></p>
                       
                        </Card>
                        <Card size="Default size card" title="第二步"  style={{ width: 500 }}>
                        <p>请输入动态验证码</p>
                      
                        <p>
         
                        <Form onSubmit={this.handleSubmit} >
                                <Form.Item>
                                    {getFieldDecorator('googleAuthCode', {
                                        rules: [{ required: true, message: '动态验证码不能为空' }],
                                        initialValue: ''
                                    })(
                                        <Input    placeholder="动态验证码" />
                                    )}
                                </Form.Item>
         
                                <Form.Item>
                                     <Button type="dashed" onClick={this.handleCancel}>返回</Button>
                                     <Button size={'large'} type="primary" htmlType="submit">
                                     确定
                                     </Button>
                                </Form.Item>
                         </Form>       
         
         
                         </p>
                        </Card>
         
         
                        </div>
                    )
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