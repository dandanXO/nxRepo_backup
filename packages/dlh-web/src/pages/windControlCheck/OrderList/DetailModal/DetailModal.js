import React, { Component } from 'react';
import { Modal, Card, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import styles from './DetailModal.less';
import {injectIntl} from "react-intl";

class DetailModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            imgSrc: '',
            modelScoreList:[]
        };
    }

    handleImgPreview = (src) => {
        this.setState({
            visible: true,
            imgSrc: src
        });
    }
    handleCancel = () => {
        this.setState({
            visible: false
        });
    }
    render() {
        const { visible, info, handleCancel, intl } = this.props;
        // console.info(JSON.stringify(info));
        return (
            <Modal
                onCancel={handleCancel}
                width={1100}
                visible={visible}
                footer={null}
                title={intl.formatMessage({id: "windowPage.order.details"})}>
                    <div>
                        <div className={styles.cardWrapper}>
                            <Card type={'inner'} title={intl.formatMessage({id: "windowPage.business.info"})}>
                                <Row gutter={16}>
                                    <Col className={styles.col} lg={12} xl={8}><span className={styles.title}>{intl.formatMessage({id : "windowPage.order.no"})}：</span><span>{info.orderNumber || ''}</span></Col>
                                    <Col className={styles.col} lg={12} xl={8}><span className={styles.title}>{intl.formatMessage({id : "windowPage.userID"})}：</span><span>{info.userId || ''}</span></Col>
                                    <Col className={styles.col} lg={12} xl={8}><span className={styles.title}>{intl.formatMessage({id : "page.table.application.amount"})}：</span><span>{info.applicationMoney || ''}</span></Col>
                                    <Col className={styles.col} lg={12} xl={8}><span className={styles.title}>{intl.formatMessage({id : "page.search.list.appication.time"})}：</span><span>{info.applicationTime || ''}</span></Col>
                                    <Col className={styles.col} lg={12} xl={8}><span className={styles.title}>{intl.formatMessage({id : "windowPage.application.day"})}：</span><span>{info.applicationDays || ''}</span></Col>
                                    <Col className={styles.col} lg={12} xl={8}><span className={styles.title}>{intl.formatMessage({id : "windowPage.services.charge"})}：</span><span>{info.serviceMoney || ''}</span></Col>
                                    <Col className={styles.col} lg={12} xl={8}><span className={styles.title}>{intl.formatMessage({id : "windowPage.loan.status"})}：</span><span>{info.loanOption || ''}</span></Col>
                                    <Col className={styles.col} lg={12} xl={8}><span className={styles.title}>{intl.formatMessage({id : "page.table.examiner"})}：</span><span>{info.checkPerson || ''}</span></Col>
                                    <Col className={styles.col} lg={12} xl={8}><span className={styles.title}>{intl.formatMessage({id : "page.table.loan.amount"})}：</span><span>{info.hasGiveMoney || ''}</span></Col>
                                </Row>
                            </Card>
                        </div>

                        <div className={styles.cardWrapper}>
                            <Card type={'inner'} title={intl.formatMessage({id : "windowPage.person.info"})}>
                                <Row gutter={24}>
                                    <Col className={styles.col} lg={12} xl={8}><span className={styles.title}>{intl.formatMessage({id: "windowPage.customer.name"})}：</span><span>{info.customerName || ''}</span></Col>
                                    <Col className={styles.col} lg={12} xl={8}><span className={styles.title}>{intl.formatMessage({id : "windowPage.mobile"})}：</span><span>{info.iphoneNumber || ''}</span></Col>
                                    <Col className={styles.col} lg={12} xl={8}><span className={styles.title}>{intl.formatMessage({id : "windowPage.identity.card"})}：</span><span>{info.idCard || ''}</span></Col>
                                    <Col className={styles.col} lg={12} xl={8}><span className={styles.title}>{intl.formatMessage({id : "windowPage.avail.loan.amount"})}：</span><span>{info.canLoanMoney || ''}</span></Col>
                                    <Col className={styles.col} lg={12} xl={16}><span className={styles.title}>{intl.formatMessage({id : "windowPage.home.address"})}：</span><span>{info.address || ''}</span></Col>
                                    <Col className={styles.col} lg={12} xl={8}><span className={styles.title}>{intl.formatMessage({id : "windowPage.channel"})}：</span><span>{info.source || ''}</span></Col>

                                    <Col className={styles.col} lg={12} xl={8}><span className={styles.title}>{intl.formatMessage({id : "windowPage.bank.cardType"})}：</span><span>{info.bankCardType || ''}</span></Col>
                                    <Col className={styles.col} lg={12} xl={8}><span className={styles.title}>{intl.formatMessage({id : "windowPage.bank"})}：</span><span>{info.bank || ''}</span></Col>
                                    <Col className={styles.col} lg={12} xl={8}><span className={styles.title}>{intl.formatMessage({id : "windowPage.card.no"})}：</span><span>{info.cardNumber || ''}</span></Col>
                                    <Col className={styles.col} lg={12} xl={8}><span className={styles.title}>{intl.formatMessage({id: "windowPage.mobile.reserve"})}：</span><span>{info.bankIphoneNumber || ''}</span></Col>
                                    <Col className={styles.col} lg={12} xl={8}><span className={styles.title}>{intl.formatMessage({id : "windowPage.add.time"})}：</span><span>{info.addTime || ''}</span></Col>
                                     {/*<Col className={styles.col} lg={12} xl={8}><span className={styles.title}>{intl.formatMessage({id : "windowPage.tongdun.score"})}：</span><span>{info.score}</span></Col>*/}
                                     {/*<Col className={styles.col} lg={12} xl={8}><span className={styles.title}>{intl.formatMessage({id : "windowPage.risk.level"})}：</span><span>{info.riskLevel || ''}</span></Col>*/}
                                     {/*<Col className={styles.col} lg={12} xl={8}><span className={styles.title}>{intl.formatMessage({id : "windowPage.zhima.score"})}：</span><span>{info.zhimafen || ''}</span></Col>*/}

                                     {/*<Col className={styles.col} lg={12} xl={8}><span className={styles.title}>{intl.formatMessage({id : "windowPage.model.05.score"})}：</span><span>{info.modelScore5 || ''}</span></Col>*/}
                                     {/*<Col className={styles.col} lg={12} xl={8}><span className={styles.title}>{intl.formatMessage({id : "windowPage.model.06.score"})}：</span><span>{info.modelScore6 || ''}</span></Col>*/}
                                     {/*<Col className={styles.col} lg={12} xl={8}><span className={styles.title}>{intl.formatMessage({id : "windowPage.model.07.score"})}：</span><span>{info.modelScore7 || ''}</span></Col>*/}
                                     {/*<Col className={styles.col} lg={12} xl={8}><span className={styles.title}>{intl.formatMessage({id : "windowPage.model.08.score"})}：</span><span>{info.modelScore8 || ''}</span></Col>*/}
                                     {/*<Col className={styles.col} lg={12} xl={8}><span className={styles.title}>{intl.formatMessage({id : "windowPage.riskD.model.score"})}：</span><span>{undefined != info.userRiskD ? info.userRiskD.modelScore :''}</span></Col>*/}
                                     {/*<Col className={styles.col} lg={12} xl={8}><span className={styles.title}>风控K模型分：</span><span>{undefined != info.userRmsRiskX ? info.userRmsRiskX.xScore.toFixed(2) :''}</span></Col>*/}

                                </Row>
                            </Card>
                        </div>

                        <div className={styles.cardWrapper}>
                            <Card type={'inner'} title={intl.formatMessage({id : "windowPage.customer.infor"})}>
                                <Row gutter={24}>
                                    <Col className={styles.col} span={8}>
                                        <div className={styles.idCardImg} onClick={() => this.handleImgPreview(info.idCardFront)}><img className={styles.userPic} src={info.idCardFront} /></div>
                                        <div className={styles.picTitle}>{intl.formatMessage({id : "windowPage.IDCard.front"})}</div>
                                    </Col>
                                    <Col className={styles.col} span={8}>
                                        <div className={styles.idCardImg} onClick={() => this.handleImgPreview(info.idCardBack)}><img className={styles.userPic} src={info.idCardBack} /></div>
                                        <div className={styles.picTitle}>{intl.formatMessage({id : "windowPage.IDCard.back"})}</div>
                                    </Col>
                                    <Col className={styles.col} span={8}>
                                        <div className={styles.idCardImg} onClick={() => this.handleImgPreview(info.frontPic)}><img className={styles.userPic} src={info.frontPic} /></div>
                                        <div className={styles.picTitle}>{intl.formatMessage({id : "windowPage.head.shot"})}</div>
                                    </Col>
                                </Row>
                            </Card>
                        </div>
                    </div>
                <Modal
                    onCancel={this.handleCancel}
                    width={600}
                    visible={this.state.visible}
                    footer={null}
                    mask={false}
                    title={intl.formatMessage({id : "windowPage.view.pic"})}>
                    <div className={styles.imageWrapper}>
                        <img width={'100%'} alt={'idCard'} src={this.state.imgSrc}/>
                    </div>
                </Modal>
            </Modal>
        );
    }
}

DetailModal.propTypes = {
    visible: PropTypes.bool,
    handleCancel: PropTypes.func,
    info: PropTypes.object,
    intl : PropTypes.object.isRequired,

}
DetailModal.defaultProps = {
    visible: false,
    handleCancel() {},
    info: {}
};

export default injectIntl(DetailModal);
