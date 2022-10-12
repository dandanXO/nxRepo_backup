import React, { Component } from 'react';
import { Card, Col, Form, Input, Modal, Row, Select, Tabs } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';
import { CommonTable } from 'components';
import { education, emerRelation, maritalStatus, orderStatus, position, salaryRange } from 'utils';
import styles from './InfoModal.less';
import { FormattedMessage, injectIntl } from "react-intl";

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const TabPane = Tabs.TabPane;


const contactsColumns = [
    { title: <FormattedMessage id="page.search.list.name"/>, dataIndex: 'contactsName', key: 'contactsName' },
    {
        title: <FormattedMessage id="windowPage.mobile"/>,
        dataIndex: 'contactsPhone',
        key: 'contactsPhone',
        render(text) {
            return text || '';
        }
    }
];

const smsColumns = [
    { title: <FormattedMessage id="page.table.phone"/>, dataIndex: 'phone', key: 'phone', width: '20%' },
    { title: <FormattedMessage id="page.table.content"/>, dataIndex: 'content', key: 'content', width: '60%' },
    { title: <FormattedMessage id="page.table.time"/>, dataIndex: 'time', key: 'time', width: '20%', render: time => moment(time * 1000).format('YYYY-MM-DD HH:mm:ss') },
]

const operatorColumns = [
    { title: <FormattedMessage id="windowPage.phone.no"/>, dataIndex: 'phoneNo', key: 'phoneNo' },
    { title: <FormattedMessage id="windowPage.phone.label"/>, dataIndex: 'phoneTag', key: 'phoneTag' },
    { title: <FormattedMessage id="windowPage.area"/>, dataIndex: 'area', key: 'area' },
    { title: <FormattedMessage id="windowPage.call.active.six"/>, dataIndex: 'callCountActive6month', key: 'callCountActive6month' },
    { title: <FormattedMessage id="windowPage.call.passive.six"/>, dataIndex: 'callCountPassive6month', key: 'callCountPassive6month' },
    { title: <FormattedMessage id="windowPage.call.recent.three"/>, dataIndex: 'callCount3month', key: 'callCount3month' },
    { title: <FormattedMessage id="windowPage.call.time.three"/>, dataIndex: 'callTime3month', key: 'callTime3month' },
    { title: <FormattedMessage id="windowPage.call.count.six"/>, dataIndex: 'callCount6month', key: 'callCount6month' },
    { title: <FormattedMessage id="windowPage.call.time.six"/>, dataIndex: 'callTime6month', key: 'callTime6month' },
];

const applyColumns = [
    {
        title: <FormattedMessage id="page.search.list.appication.time"/>,
        dataIndex: 'applyTime',
        key: 'applyTime',
        render(text) {
            return moment(Number(text) * 1000).format('YYYY-MM-DD HH:mm:ss');
        }
    },
    { title: <FormattedMessage id="windowPage.order.no"/>, dataIndex: 'orderNo', key: 'orderNo' },
    { title: <FormattedMessage id="page.search.list.product.name"/> , dataIndex: 'productName', key: 'productName' },
    { title: <FormattedMessage id="page.table.appName"/> , dataIndex: 'appName', key: 'appName' },
    { title: <FormattedMessage id="page.table.application.amount"/>, dataIndex: 'deviceMoney', key: 'deviceMoney' },
    { title: <FormattedMessage id="windowPage.appication.period"/>, dataIndex: 'lendDays', key: 'lendDays' },
    {
        title: <FormattedMessage id="page.search.list.order.status"/>,
        dataIndex: 'status',
        key: 'status',
        render(text) {
            return orderStatus[text];
        }
    }
]

class InfoModal extends Component {
    layout = {
        labelCol: {
            span: 4
        },
        wrapperCol: {
            span: 20
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            activeKey: '1'
        };
    }

    handleChange = (key) => {
        const { info, handleChange } = this.props;
        this.setState({
            activeKey: key
        });
        switch (Number(key)) {
            case 2:
                info['applyData'].length === 0 && handleChange(key);
                console.log(info['applyData'])
                break;
            case 3:
                info['contactsData'].length === 0 && handleChange(key);
                break;
            case 4:
                info['operatorData'].length === 0 && handleChange(key);
                break;
            case 5:
                info['smsLogData'].length === 0 && handleChange(key);
                break;
            default:
                return false;
        }
    }
    afterClose = () => {
        this.setState({
            activeKey: '1'
        });
    }

    //用户信息
    renderUserInfo = () => {
        const { info: { userInfo = {} }, intl } = this.props;
        return (
            <div>
                <Card type={'inner'} title={intl.formatMessage({ id: "windowPage.person.info" })}>
                    <Row gutter={16}>
                        <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="page.search.list.name"/>：</span><span>{userInfo.nameTrue || ''}</span></Col>
                        <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="windowPage.mobile"/>：</span><span>{userInfo.phoneNo || ''}</span></Col>
                        <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="windowPage.identity.card"/>：</span><span>{userInfo.idcardNo || ''}</span></Col>
                        <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="windowPage.home.address"/>：</span><span>{userInfo.address || ''}</span></Col>
                        <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="windowPage.bank"/>：</span><span>{userInfo.bankName || ''}</span></Col>
                        <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="windowPage.card.no"/>：</span><span>{userInfo.bankCardNo}</span></Col>
                        <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="windowPage.mobile.reserve"/>：</span><span>{userInfo.bankPhone}</span></Col>
                        <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="windowPage.reg.channel"/>：</span><span>{userInfo.channelName}</span></Col>
                        <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="page.search.list.blacklist"/>：</span><span>{userInfo.isBlack ? <FormattedMessage id="page.table.yes"/> : <FormattedMessage id="page.table.no"/>}</span></Col>
                        <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="windowPage.loan.success"/>：</span><span>{userInfo.successCount}</span></Col>
                        <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="page.content.maritalStatus"/>：</span><span>{maritalStatus[userInfo.marriageStatus] || ''}</span></Col>
                        <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="page.content.salaryRange"/>：</span><span>{salaryRange[userInfo.salaryRange] || ''}</span></Col>
                        <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="page.table.education"/>：</span><span>{education[userInfo.education] || ''}</span></Col>
                        <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="page.table.position"/>：</span><span>{position[userInfo.position] || ''}</span></Col>
                    </Row>
                    <Row gutter={16}>
                        <Col className={styles.col} lg={12} xl={24}><span className={styles.title}><FormattedMessage id="windowPage.customer.source"/>：</span><span>{userInfo.userSource}</span></Col>
                    </Row>
                </Card>

                <div className={styles.cardWrapper}>
                    <Card type={'inner'} title={intl.formatMessage({ id: "windowPage.emergency.contact" })}>

                        {userInfo.emergencyContacts && userInfo.emergencyContacts.map((emer, i) => {
                            return (
                                <Row gutter={24}>
                                    <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="page.search.list.name"/>：</span><span>{emer.name || ''}</span></Col>
                                    <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="page.content.relationship"/>：</span><span>{emerRelation[emer.relationShip] || ''}</span></Col>
                                    <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="page.search.list.mobile"/>：</span><span>{emer.phoneNr || ''}</span></Col>

                                </Row>
                            )
                        })}
                    </Card>
                </div>


                <div className={styles.card}>
                    <Card type={'inner'} title={intl.formatMessage({ id: "windowPage.customer.image" })}>
                        <Row gutter={8}>
                            <Col className={`${styles.col}`} lg={12} xl={8}>
                                {
                                    userInfo['idcardFrontPhoto'] && <img className={styles.imgCol} width={'100%'} src={userInfo['idcardFrontPhoto']}/>
                                }
                            </Col>
                            <Col className={`${styles.col}`} lg={12} xl={8}>
                                {
                                    userInfo['idcardBackPhoto'] && <img className={styles.imgCol} width={'100%'} src={userInfo['idcardBackPhoto']}/>
                                }

                            </Col>
                            <Col className={`${styles.col}`} lg={12} xl={8}>
                                {
                                    userInfo['idcardPortraitPhoto'] && <img className={styles.imgCol} width={'100%'} src={userInfo['idcardPortraitPhoto']}/>
                                }
                            </Col>
                            <Col className={`${styles.col}`} lg={12} xl={8}>
                                {
                                    userInfo['panPhoto'] && <img className={styles.imgCol} width={'100%'} src={userInfo['panPhoto']}/>
                                }
                            </Col>
                        </Row>

                    </Card>
                </div>

                <Card type={'inner'} title={intl.formatMessage({ id: "windowPage.auth.info" })}>
                    <Row gutter={16}>
                        <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="windowPage.auth.pan"/>：</span><span>{userInfo.isPan ? intl.formatMessage({ id: "page.table.yes" }) : intl.formatMessage({ id: "page.table.no" })}</span></Col>
                        <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="windowPage.auth.real.name"/>：</span><span>{userInfo.isIdcard ? intl.formatMessage({ id: "page.table.yes" }) : intl.formatMessage({ id: "page.table.no" })}</span></Col>
                        <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="windowPage.auth.contact.list"/>：</span><span>{userInfo.isContacts ? intl.formatMessage({ id: "page.table.yes" }) : intl.formatMessage({ id: "page.table.no" })}</span></Col>
                        <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="windowPage.auth.operator"/>：</span><span>{userInfo.isYys ? intl.formatMessage({ id: "page.table.yes" }) : intl.formatMessage({ id: "page.table.no" })}</span></Col>
                        <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="windowPage.auth.bank.card"/>：</span><span>{userInfo.isBank ? intl.formatMessage({ id: "page.table.yes" }) : intl.formatMessage({ id: "page.table.no" })}</span></Col>
                        {/* <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="windowPage.auth.zhima" />：</span><span>{userInfo.isZhimafen ? intl.formatMessage({id : "page.table.yes"}) : intl.formatMessage({id : "page.table.no"})}</span></Col> */}
                        <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="windowPage.auth.liveness"/>：</span><span>{userInfo.isLiveness ? intl.formatMessage({ id: "page.table.yes" }) : intl.formatMessage({ id: "page.table.no" })}</span></Col>
                        <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="windowPage.auth.emergency.contact"/>：</span><span>{userInfo.isAuth ? intl.formatMessage({ id: "page.table.yes" }) : intl.formatMessage({ id: "page.table.no" })}</span></Col>
                    </Row>
                </Card>
                <Card type={'inner'} title={intl.formatMessage({ id: "windowPage.auth.info" })}>
                    <Row gutter={16}>
                        <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="windowPage.face.dectect.value"/>：</span><span>{userInfo.similarity}</span></Col>
                        <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="windowPage.risk.model.name"/>：</span><span>{userInfo.providerDisplayName}</span></Col>
                        <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="windowPage.risk.model.score"/>：</span><span>{userInfo.score}</span></Col>
                        <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="windowPage.has.upload.complete"/>：</span><span>{userInfo.isCertified ? intl.formatMessage({ id: "page.table.yes" }) : intl.formatMessage({ id: "page.table.no" })}</span></Col>
                        {/*<Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="windowPage.bluelight.score"/>：</span><span>{userInfo.bluelight}</span></Col>*/}
                        {/*<Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="windowPage.destiny.score"/>：</span><span>{userInfo.destiny}</span></Col>*/}
                        {/* <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="windowPage.customized.score" />：</span><span>{userInfo.customizedScore}</span></Col> */}
                        {/* <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="windowPage.credit.report.score" />：</span><span>{userInfo.creditReportScore}</span></Col> */}
                        {/* <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="windowPage.sxyjcf.score" />：</span>
                            <span>
                                <FormattedMessage id="windowPage.sxyjcf.credit.score" />: {userInfo.sxyjcfCreditScore}, 
                                <FormattedMessage id="windowPage.sxyjcf.cheat.score" />: {userInfo.sxyjcfCheatScore}, 
                                <FormattedMessage id="windowPage.sxyjcf.close.rate" />: {userInfo.sxyjcfCloseRate}
                            </span>
                        </Col>
                        <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="windowPage.epoch.score" />：</span><span>{userInfo.epochScore}</span></Col>
                        <Col className={styles.col} lg={12} xl={8}><span className={styles.title}><FormattedMessage id="windowPage.shendun.score" />：</span><span>{userInfo.shenDunScore}</span></Col> */}
                    </Row>
                </Card>
            </div>
        );
    }

    render() {
        const { visible, handleCancel, info, loading, intl } = this.props;
        return (
            <Modal
                footer={null}
                onCancel={handleCancel}
                width={1100}
                visible={visible}
                title={intl.formatMessage({ id: "windowPage.user.details" })}
                afterClose={this.afterClose}
            >
                <div>
                    <Tabs activeKey={this.state.activeKey} onChange={this.handleChange} animated={false}>
                        <TabPane tab={intl.formatMessage({ id: "windowPage.user.info" })} key="1">
                            {this.renderUserInfo()}
                        </TabPane>
                        <TabPane tab={intl.formatMessage({ id: "windowPage.order.info" })} key="2">
                            <CommonTable loading={loading} columns={applyColumns} dataSource={info['applyData']}/>
                        </TabPane>
                        <TabPane tab={intl.formatMessage({ id: "windowPage.contact.list" })} key="3">
                            <CommonTable loading={loading} columns={contactsColumns} dataSource={info['contactsData']}/>
                        </TabPane>

                        {/* <TabPane tab={intl.formatMessage({id :"windowPage.operator"})} key="4">
                            <CommonTable loading={loading} columns={operatorColumns} dataSource={info['operatorData']}/>
                        </TabPane> */}
                        <TabPane tab={intl.formatMessage({ id: "windowPage.sms.log" })} key="5">
                            <CommonTable loading={loading} columns={smsColumns} dataSource={info['smsLogData']}/>
                        </TabPane>
                    </Tabs>
                </div>

            </Modal>
        );
    }
}

InfoModal.propTypes = {
    visible: PropTypes.bool,
    handleCancel: PropTypes.func,
    info: PropTypes.object,
    handleChange: PropTypes.func,
    loading: PropTypes.bool,
    intl: PropTypes.object.isRequired,
};
InfoModal.defaultProps = {
    visible: false,
    handleCancel() {
    },
    info: {
        userInfo: {
            nameTrue: 'zs',
            phoneNo: '12345678963',
            idcardNo: '12345678912345675',
            address: 'xxxxxxxxx',
            bankName: 'bankName',
            bankCardNo: '661616131331313',
            bankPhone: '12345678963',
            channelName: '123',
            isBlack: 'false',
            successCount: '1',
            idcardFrontPhoto: 'xxx',
            idcardBackPhoto: 'xxx',
            idcardPortraitPhoto: 'xxx',
            panPhoto: 'xxx',
            isIdcard: '1',
            isContacts: '1',
            isYys: '1',
            isBank: '2',
            isZhimafen: '2',
            similarity: '13',
            zhimafen: '600',
            tdreportPoint: '22',
            userSource: ''
        },

    },
    handleChange() {
    },
    loading: false
};
export default injectIntl(InfoModal);