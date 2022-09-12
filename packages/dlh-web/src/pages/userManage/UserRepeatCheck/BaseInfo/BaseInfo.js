import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Card, Col, Modal, Row } from 'antd';
import { education, emerRelation, maritalStatus, position, salaryRange } from 'utils';
import styles from './BaseInfo.less';
import { FormattedMessage, injectIntl } from "react-intl";

class BaseInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            imgSrc: ''
        };
    }
    handleClick = () => {
        const {  history, location: { pathname } } = this.props;
        history.push(`${pathname}?option=operatorInfo`);
    }
    handleCancel =() => {
        this.setState({ visible: false });
    }
    handleImgPreview = (src) => {
        this.setState({
            visible: true,
            imgSrc: src
        });
    }

    render() {
        const { info, intl } = this.props;

        console.log(info);
        return (
            
            <div>
               
                <div className={styles.cardWrapper}>
                    <Card type={'inner'} title={intl.formatMessage({id : "windowPage.person.info"})}>
                        <Row gutter={24}>
                            <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="windowPage.customer.name" />：</span><span>{info.customerName || ''}</span></Col>
                            <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="windowPage.mobile" />：</span><span>{info.iphoneNumber || ''}</span></Col>
                            <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="windowPage.identity.card" />：</span><span>{info.idCard || ''}</span></Col>
                            <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="windowPage.identity.card.address" />：</span><span>{info.address || ''}</span></Col>
                            <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="windowPage.birth.date" />：</span><span>{info.birthday || ''}</span></Col>
                            {/* <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="windowPage.zodiac" />：</span><span>{info.zodiac || ''}</span></Col> */}
                            <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="windowPage.device.model" />：</span><span>{info.deviceName || ''}</span></Col>
                            <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="windowPage.device.memory" />：</span><span>{info.deviceMemory || ''}</span></Col>
                            <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="windowPage.channel" />：</span><span>{info.source || ''}</span></Col>
                            {/*<Col className={styles.col} lg={12} xl={8}><span className={styles.title}>可借金额(₹)：</span><span>{info.canLoanMoney || ''}</span></Col>*/}
                            <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="windowPage.card.no" />：</span><span>{info.cardNumber || ''}</span></Col>
                            <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="windowPage.bank" />：</span><span>{info.bank || ''}</span></Col>
                            <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="windowPage.mobile.reserve" />：</span><span>{info.bankIphoneNumber || ''}</span></Col>
                            <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="page.content.maritalStatus" />：</span><span>{maritalStatus[info.userAuthInfo.marriageStatus] || ''}</span></Col>
                            <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="page.content.salaryRange" />：</span><span>{salaryRange[info.salary]}</span></Col>
                            <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="page.table.education" />：</span><span>{education[info.userAuthInfo.education]}</span></Col>
                            <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="page.table.position" />：</span><span>{position[info.userAuthInfo.position]}</span></Col>
                        </Row>
                    </Card>
                </div>


                <div className={styles.cardWrapper}>
                    {console.log(info.userAuthInfo)}
                    <Card type={'inner'} title={intl.formatMessage({id : "windowPage.emergency.contact"})}>


                    {info.userAuthInfo.emergencyContactInfos.map((emer, i) => {  
                        return (
                        <Row gutter={24}>
                            <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="page.search.list.name" />：</span><span>{emer.name || ''}</span></Col>
                            <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="page.content.relationship" />：</span><span>{emerRelation[emer.relationShip] || ''}</span></Col>
                            <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="page.search.list.mobile" />：</span><span>{emer.phoneNr || ''}</span></Col>

                        </Row>
                        )   
                    })}
                    </Card>
                </div>


                {/*<div className={styles.cardWrapper}>*/}
                    {/*<Card type={'inner'} title={'银行卡信息'}>*/}
                        {/*<Row gutter={24}>*/}
                            {/*<Col className={styles.col} lg={12} xl={8}><span className={styles.title}>种类：</span><span>{info.bankCardType || ''}</span></Col>*/}
                            {/*<Col className={styles.col} lg={12} xl={8}><span className={styles.title}>开户银行：</span><span>{info.bank || ''}</span></Col>*/}
                            {/*<Col className={styles.col} lg={12} xl={8}><span className={styles.title}>卡号：</span><span>{info.cardNumber || ''}</span></Col>*/}
                            {/*<Col className={styles.col} lg={12} xl={8}><span className={styles.title}>预留手机号：</span><span>{info.bankIphoneNumber || ''}</span></Col>*/}
                            {/*<Col className={styles.col} lg={12} xl={8}><span className={styles.title}>添加时间：</span><span>{info.addTime || ''}</span></Col>*/}
                        {/*</Row>*/}
                    {/*</Card>*/}
                {/*</div>*/}

                <div className={styles.cardWrapper}>
                    <Card type={'inner'} title={intl.formatMessage({id : "windowPage.customer.infor"})}>
                        <Row gutter={24}>
                            <Col className={styles.col} lg={12} xl={8}>
                                <div className={styles.idCardImg} onClick={() => this.handleImgPreview(info.idCardFront)}><img className={styles.userPic} src={info.idCardFront} /></div>
                                <div className={styles.picTitle}><FormattedMessage id="windowPage.IDCard.front" /></div>
                            </Col>
                            <Col className={styles.col} lg={12} xl={8}>
                                <div className={styles.idCardImg} onClick={() => this.handleImgPreview(info.idCardBack)}><img className={styles.userPic} src={info.idCardBack} /></div>
                                <div className={styles.picTitle}><FormattedMessage id="windowPage.IDCard.back" /></div>
                            </Col>
                            <Col className={styles.col} lg={12} xl={8}>
                                <div className={styles.idCardImg} onClick={() => this.handleImgPreview(info.frontPic)}><img className={styles.userPic} src={info.frontPic} /></div>
                                <div className={styles.picTitle}><FormattedMessage id="windowPage.head.shot" /></div>
                            </Col>
                            <Col className={styles.col} lg={12} xl={8}>
                                <div className={styles.idCardImg} onClick={() => this.handleImgPreview(info.panPic)}><img className={styles.userPic} src={info.panPic} /></div>
                                <div className={styles.picTitle}><FormattedMessage id="windowPage.pan.card" /></div>
                            </Col>
                        </Row>

                    </Card>
                </div>
                <div className={styles.cardWrapper}>
                    <Card>
                        <Row gutter={24}>
                            {/* <Col className={styles.col} span={8}><span className={styles.title}><FormattedMessage id="windowPage.tongdun.score" />：</span><span>{info.score}</span></Col> */}
                            <Col className={styles.col} span={8}><span className={styles.title}><FormattedMessage id="windowPage.face.dectect.similarity"/>：</span><span>{info.similarity || ''}</span></Col>
                            <Col className={styles.col} span={8}><span className={styles.title}><FormattedMessage id="windowPage.has.upload.complete"/>：</span><span>{info.isCertified ? intl.formatMessage({ id: "page.table.yes" }) : intl.formatMessage({ id: "page.table.no" })}</span></Col>
                            {/* <Col className={styles.col} span={8}><span className={styles.title}><FormattedMessage id="windowPage.zhima.score" />：</span><span>{info.zhimafen || ''}</span></Col>*/}
                            <Col className={styles.col} span={8}><span className={styles.title}><FormattedMessage id="windowPage.risk.model.name"/>：</span><span>{info.providerDisplayName || ''}</span></Col>
                            <Col className={styles.col} span={8}><span className={styles.title}><FormattedMessage id="windowPage.risk.model.score"/>：</span><span>{info.score || ''}</span></Col>
                            {/*<Col className={styles.col} span={8}><span className={styles.title}><FormattedMessage id="windowPage.bluelight.score"/>：</span><span>{info.bluelight || ''}</span></Col>*/}
                            {/*<Col className={styles.col} span={8}><span className={styles.title}><FormattedMessage id="windowPage.destiny.score"/>：</span><span>{info.destiny || ''}</span></Col>*/}
                            {/* <Col className={styles.col} span={8}><span className={styles.title}><FormattedMessage id="windowPage.customized.score" />：</span><span>{info.customizedScore || ''}</span></Col> */}
                            {/* <Col className={styles.col} span={8}><span className={styles.title}><FormattedMessage id="windowPage.credit.report.score" />：</span><span>{info.creditReportScore || ''}</span></Col> */}
                            {/* <Col className={styles.col} span={8}><span className={styles.title}><FormattedMessage id="windowPage.epoch.score" />：</span><span>{info.epochScore || ''}</span></Col> */}
                            {/* <Col className={styles.col} span={8}><span className={styles.title}><FormattedMessage id="windowPage.shendun.score" />：</span><span>{info.shenDunscore || ''}</span></Col> */}
                        </Row>
                    </Card>

                </div>
                <div className={`${styles.cardWrapper} ${styles.bottomBtn}`}>
                    <Button type={'primary'} onClick={this.handleClick}><FormattedMessage id="windowPage.next.step" /></Button>
                </div>

                <Modal
                    onCancel={this.handleCancel}
                    width={600}
                    visible={this.state.visible}
                    footer={null}
                    title={intl.formatMessage({id : "windowPage.view.pic"})}>
                        <div className={styles.imageWrapper}>
                            <img width={'100%'} alt={'idCard'} src={this.state.imgSrc}/>
                        </div>
                </Modal>

            </div>
        );

    }
}
BaseInfo.propTypes = {
    info: PropTypes.object,
    intl: PropTypes.object.isRequired,
};
BaseInfo.defaultProps = {
    info: {
        //orderNumber: '123456789',
        //userId: '123424',
        //productName: 'hello',
        //applicationMoney: '123',
        // applicationTime: '2018-04-03 18:29:23',
        // applicationDays: '7',
        // serviceMoney: '1.00',
        // loanOption: '复审中',
        // checkPerson: '张xx',
        // hasGiveMoney: '3.00',
        // device_memory: '0',
        //
        // customerName: '李四',
        // iphoneNumber:'12345678966',
        // idCard: '123123456956621235',
        // iphoneType: 'iphone 6',
        // canLoanMoney: '600',
        // email: 'adad@163.com',
        // source: 'app',
        // address: '浙江省杭州市xxxxxx',
        //
        // bankCardType: '储蓄卡',
        // bank: '工商银行',
        // cardNumber: '1234649614131',
        // bankIphoneNumber: '12345678963',
        // addTime: '2018-04-03 18:29:23',
        //
        // idCardFront:'http://f2.topitme.com/2/b9/71/112660598401871b92l.jpg',
        // idCardBack:'http://f2.topitme.com/2/b9/71/112660598401871b92l.jpg',
        // frontPic: 'http://f2.topitme.com/2/b9/71/112660598401871b92l.jpg',
        // score: '50',
        // riskLevel:'高风险'
    }
}

export default withRouter(injectIntl(BaseInfo));
