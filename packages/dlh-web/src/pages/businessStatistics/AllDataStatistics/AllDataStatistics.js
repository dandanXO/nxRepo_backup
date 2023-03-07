import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col, Card } from 'antd';
import {allDataStatisticsAction} from './index';
import { CommonTable } from 'components';
import {convertMoneyFormat} from "utils";
import PropTypes from 'prop-types';
import {injectIntl, FormattedMessage} from "react-intl";


const convertData = (obj) => {
    const flowData = [{
        userRegPerCnt: obj['userRegPerCnt'],
        userRegCnt: obj['userRegCnt'],
        applyOdrPerCnt: obj['applyOdrPerCnt'],
        applyOdrCnt: obj['applyOdrCnt'],
        passOdrLoanPerCnt: obj['passOdrLoanPerCnt'],
        passOdrLoanCnt: obj['passOdrLoanCnt'],
        lengOdrPerCnt: obj['lengOdrPerCnt'],
        lengOdrCnt: obj['lengOdrCnt'],
        totalOdrPerCnt: obj['totalOdrPerCnt'],
        totalOdrCnt: obj['totalOdrCnt']
    }];
    const checkData = [{
        remainViewOdrCnt: obj['remainViewOdrCnt'],
        remainReviewOdrCnt: obj['remainReviewOdrCnt'],
        remainFivOdrCnt: obj['remainFivOdrCnt']
    }];
    const overdueData = [{
        OdrOverDuePerCnt: obj['OdrOverDuePerCnt'],
        OdrOverDueCnt: obj['OdrOverDueCnt'],
        OdrOverDuePerMoney: obj['OdrOverDuePerMoney'],
        OdrOverDueMoney: obj['OdrOverDueMoney']
    }];
    const moneyOutData = [{
        odrLoanPerMoney: obj['odrLoanPerMoney'],
        odrLoanMoney: obj['odrLoanMoney'],
        OrderOverDueLengPerMoney: obj['OrderOverDueLengPerMoney'],
        OrderOverDueLengMoney: obj['OrderOverDueLengMoney'],
        odrLoanTotalPerMoney: obj['odrLoanTotalPerMoney'],
        odrLoanTotalMoney: obj['odrLoanTotalMoney'],
        toDaySumRealMoney: obj['toDaySumRealMoney']
    }];
    const moneyInputData = [{
        payOdrPerMoney: obj['payOdrPerMoney'],
        payOdrMoney: obj['payOdrMoney'],
        payOdrLengPerMoney: obj['payOdrLengPerMoney'],
        payOdrLengMoney: obj['payOdrLengMoney'],
        payOdrDuePerMoney: obj['payOdrDuePerMoney'],
        payOdrDueMoney: obj['payOdrDueMoney']
    }];
    const waitBackData = [{
        OdrRemianPerMoney: obj['OdrRemianPerMoney'],
        OdrRemianMoney: obj['OdrRemianMoney'],
        OdrRemianDuePerMoney: obj['OdrRemianDuePerMoney'],
        OdrRemianDueMoney: obj['OdrRemianDueMoney']
    }];
    const allMoneyData = [{
        realOdrLoanMoney: obj['realOdrLoanMoney'],
        totalMoney: obj['totalMoney']
    }];
    return {
        flowData,
        checkData,
        overdueData,
        moneyOutData,
        moneyInputData,
        waitBackData,
        allMoneyData
    };
}



//今日流量
const flowColumns = [
    { title: <FormattedMessage id="page.table.reg.today.num" /> , dataIndex: 'userRegPerCnt', key: 'userRegPerCnt' },
    { title: <FormattedMessage id="page.table.total.reg.num" />, dataIndex: 'userRegCnt', key: 'userRegCnt' },
    { title: <FormattedMessage id="page.table.num.application.day" />, dataIndex: 'applyOdrPerCnt', key: 'applyOdrPerCnt' },
    { title: <FormattedMessage id="page.table.total.num.application" />, dataIndex: 'applyOdrCnt', key: 'applyOdrCnt' },
    { title: <FormattedMessage id="page.table.today.num.trans" />, dataIndex: 'passOdrLoanPerCnt', key: 'passOdrLoanPerCnt' },
    { title: <FormattedMessage id="page.table.total.num.trans" />, dataIndex: 'passOdrLoanCnt', key: 'passOdrLoanCnt' },
    { title: <FormattedMessage id="page.table.today.lend.count" />, dataIndex: 'lengOdrPerCnt', key: 'lengOdrPerCnt' },
    { title: <FormattedMessage id="page.table.total.lend.count" />, dataIndex: 'lengOdrCnt', key: 'lengOdrCnt' },
    { title: <FormattedMessage id="page.table.total.num.day" />, dataIndex: 'totalOdrPerCnt', key: 'totalOdrPerCnt' },
    { title: <FormattedMessage id="page.table.total.num.order" />, dataIndex: 'totalOdrCnt', key: 'totalOdrCnt' },
];
//审核流量
const todayCheckColumns = [
    { title: <FormattedMessage id="page.table.remain.view.order.today" />, dataIndex: 'remainViewOdrCnt', key: 'remainViewOdrCnt' },
    { title: <FormattedMessage id="page.table.remain.review.order.today" />, dataIndex: 'remainReviewOdrCnt', key: 'remainReviewOdrCnt' },
    { title: <FormattedMessage id="page.table.final.review.order.today" />, dataIndex: 'remainFivOdrCnt', key: 'remainFivOdrCnt' },
];
//逾期统计
const overdueColumns = [
    { title: <FormattedMessage id="page.table.today.new.overdue.period" />, dataIndex: 'OdrOverDuePerCnt', key: 'OdrOverDuePerCnt' },
    { title: <FormattedMessage id="page.table.total.overdue.period" />, dataIndex: 'OdrOverDueCnt', key: 'OdrOverDueCnt' },
    {
        title: <FormattedMessage id="page.table.today.new.overdue.amount" />,
        dataIndex: 'OdrOverDuePerMoney',
        key: 'OdrOverDuePerMoney',
        render(text, record) {
            return convertMoneyFormat(text);
        }
    },
    {
        title: <FormattedMessage id="page.table.total.overdue.amount" />,
        dataIndex: 'OdrOverDueMoney',
        key: 'OdrOverDueMoney',
        render(text, record) {
            return convertMoneyFormat(text);
        }
    }
];
//金额支出
const moneyOut = [
    {
        title: <FormattedMessage id="page.table.today.loan.amount" />,
        dataIndex: 'odrLoanPerMoney',
        key: 'odrLoanPerMoney',
        render(text, record) {
            return convertMoneyFormat(text);
        }
    },
    {
        title: <FormattedMessage id="page.table.total.loan.amount" />,
        dataIndex: 'odrLoanMoney',
        key: 'odrLoanMoney',
        render(text, record) {
            return convertMoneyFormat(text);
        }
    },
    {
        title: <FormattedMessage id="page.table.today.lend.period.amount" />,
        dataIndex: 'OrderOverDueLengPerMoney',
        key: 'OrderOverDueLengPerMoney',
        render(text, record) {
            return convertMoneyFormat(text);
        }
    },
    {
        title: <FormattedMessage id="page.table.total.lend.period.amount" />,
        dataIndex: 'OrderOverDueLengMoney',
        key: 'OrderOverDueLengMoney',
        render(text, record) {
            return convertMoneyFormat(text);
        }
    },
    {
        title: <FormattedMessage id="page.table.today.amount" />,
        dataIndex: 'odrLoanTotalPerMoney',
        key: 'odrLoanTotalPerMoney',
        render(text, record) {
            return convertMoneyFormat(text);
        }
    },
    {
        title: <FormattedMessage id="page.table.total.amount" />,
        dataIndex: 'odrLoanTotalMoney',
        key: 'odrLoanTotalMoney',
        render(text, record) {
            return convertMoneyFormat(text);
        }
    },
];
//金额回收
const moneyInput = [
    {
        title: <FormattedMessage id="page.table.today.principal.repayment" />,
        dataIndex: 'payOdrPerMoney',
        key: 'payOdrPerMoney',
        render(text, record) {
            return convertMoneyFormat(text);
        }
    },
    {
        title: <FormattedMessage id="page.table.total.principal.repayment" />,
        dataIndex: 'payOdrMoney',
        key: 'payOdrMoney',
        render(text, record) {
            return convertMoneyFormat(text);
        }
    },
    {
        title: <FormattedMessage id="page.table.today.lending.repayment" />,
        dataIndex: 'payOdrLengPerMoney',
        key: 'payOdrLengPerMoney',
        render(text, record) {
            return convertMoneyFormat(text);
        }
    },
    {
        title: <FormattedMessage id="page.table.total.lending.repayment" />,
        dataIndex: 'payOdrLengMoney',
        key: 'payOdrLengMoney',
        render(text, record) {
            return convertMoneyFormat(text);
        }
    },
    {
        title: <FormattedMessage id="page.table.today.late.fee" />,
        dataIndex: 'payOdrDuePerMoney',
        key: 'payOdrDuePerMoney',
        render(text, record) {
            return convertMoneyFormat(text);
        }
    },
    {
        title: <FormattedMessage id="page.table.total.late.fee" />,
        dataIndex: 'payOdrDueMoney',
        key: 'payOdrDueMoney',
        render(text, record) {
            return convertMoneyFormat(text);
        }
    },
];

//待还金额
const waitBack = [
    {
        title: <FormattedMessage id="page.table.today.repaid.amount" />,
        dataIndex: 'OdrRemianPerMoney',
        key: 'OdrRemianPerMoney',
        render(text, record) {
            return convertMoneyFormat(text);
        }
    },
    {
        title: <FormattedMessage id="page.table.total.repaid.amount" />,
        dataIndex: 'OdrRemianMoney',
        key: 'OdrRemianMoney',
        render(text, record) {
            return convertMoneyFormat(text);
        }
    },
    {
        title: <FormattedMessage id="page.table.today.handling.charge" />,
        dataIndex: 'OdrRemianDuePerMoney',
        key: 'OdrRemianDuePerMoney',
        render(text, record) {
            return convertMoneyFormat(text);
        }
    },
    {
        title: <FormattedMessage id="page.table.total.handling.charge" />,
        dataIndex: 'OdrRemianDueMoney',
        key: 'OdrRemianDueMoney',
        render(text, record) {
            return convertMoneyFormat(text);
        }
    },
];

//总金额
const allMoney = [
    {
        title: <FormattedMessage id="page.table.accumulated.loan.principal" />,
        dataIndex: 'realOdrLoanMoney',
        key: 'realOdrLoanMoney',
        render(text, record) {
            return convertMoneyFormat(text);
        }
    },
    {
        title: <FormattedMessage id="page.table.accumulated.contract.payment.late.fee" />,
        dataIndex: 'totalMoney',
        key: 'totalMoney',
        render(text, record) {
            return convertMoneyFormat(text);
        }
    }
];

class AllDataStatistics extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const { getTableData } = this.props;
        getTableData({});
    }
    render() {
        const { tableData, loading , intl} = this.props;
        const {
            flowData,
            checkData,
            overdueData,
            moneyOutData,
            moneyInputData,
            waitBackData,
            allMoneyData
        } = convertData(tableData);
        return (
            <div>
                <Card style={{background:'transparent'}} type={'inner'} title={intl.formatMessage({id : "page.table.traffic.statistics"})}>
                    <Row style={{marginBottom: '20px'}}>
                        <Col span={4}>
                            <FormattedMessage id="page.table.today" />
                        </Col>
                        <Col span={4}>
                            <div><FormattedMessage id="page.table.num.reg" />(<FormattedMessage id= "page.table.PCS" />)</div>
                            <div>{tableData['userRegPerCnt']  || 0}</div>
                        </Col>
                        <Col span={4}>
                            <div><FormattedMessage id="page.table.num.application" />(<FormattedMessage id="page.table.PCS" />)</div>
                            <div>{tableData['applyOdrPerCnt'] || 0}</div>
                        </Col>
                        <Col span={4}>
                            <div><FormattedMessage id="page.table.num.pass.order" />(<FormattedMessage id="page.table.PCS" />)</div>
                            <div>{tableData['passOdrLoanPerCnt'] || 0}</div>
                        </Col>
                        <Col span={4}>
                            <div><FormattedMessage id="page.table.num.extend" />(<FormattedMessage id="page.table.PCS" />)</div>
                            <div>{tableData['lengOdrPerCnt'] || 0}</div>
                        </Col>
                        <Col span={4}>
                            <div><FormattedMessage id="page.table.total.num.order" />(<FormattedMessage id="page.table.PCS" />)</div>
                            <div>{tableData['totalOdrPerCnt'] || 0}</div>
                        </Col>
                        
                    </Row>
                    <Row>
                        <Col span={4}>
                            <FormattedMessage id="page.table.tot" />
                        </Col>
                        <Col span={4}>
                            <div><FormattedMessage id="page.table.num.reg" />(<FormattedMessage id="page.table.PCS" />)</div>
                            <div>{tableData['userRegCnt'] || 0}</div>
                        </Col>
                        <Col span={4}>
                            <div><FormattedMessage id="page.table.num.application" />(<FormattedMessage id="page.table.PCS" />)</div>
                            <div>{tableData['applyOdrCnt'] || 0}</div>
                        </Col>
                        <Col span={4}>
                            <div><FormattedMessage id="page.table.num.pass.order" />(<FormattedMessage id="page.table.PCS" />)</div>
                            <div>{tableData['passOdrLoanCnt'] || 0}</div>
                        </Col>
                        <Col span={4}>
                            <div><FormattedMessage id="page.table.num.extend" />(<FormattedMessage id="page.table.PCS" />)</div>
                            <div>{tableData['lengOdrCnt'] || 0}</div>
                        </Col>
                        <Col span={4}>
                            <div><FormattedMessage id="page.table.total.num.order" />(<FormattedMessage id="page.table.PCS" />)</div>
                            <div>{tableData['totalOdrCnt'] || 0}</div>
                        </Col>
                    </Row>
                </Card>
                <div>
                    <Row gutter={16}>
                        <Col span={12}>
                            <CommonTable size={'middle'} dataSource={checkData} columns={todayCheckColumns} pagination={null} title={() => <div><FormattedMessage id="page.table.exam.statis" /></div>}/>
                        </Col>
                        <Col span={12}>
                            <CommonTable size={'middle'} dataSource={overdueData} columns={overdueColumns} pagination={null} title={() => <div><FormattedMessage id="page.table.overdue.statis" /></div>}/>
                        </Col>
                    </Row>
                </div>

                <Row gutter={16} style={{ marginBottom: '20px' }}>
                    <Col span={12}>
                        <Card style={{background:'transparent'}} type={'inner'} title={intl.formatMessage({id : "page.table.expenditure.amount.currency"})}>
                            <Row style={{ marginBottom: '20px' }}>
                                <Col span={8}>
                                    <div><FormattedMessage id="page.table.today.loan.amount.currency" /></div>
                                    <div>{convertMoneyFormat(tableData['odrLoanPerMoney'])}</div>
                                </Col>
                                {/*<Col span={8}>*/}
                                    {/*<div>今日展期额(₹)</div>*/}
                                    {/*<div>{tableData['OrderOverDueLengPerMoney'] || 0}</div>*/}
                                {/*</Col>*/}
                                {/* <Col span={8}>
                                    <div>今日总放款额(₹)</div>
                                    <div>{convertMoneyFormat(tableData['odrLoanTotalPerMoney'])}</div>
                                </Col> */}
                                <Col span={8}>
                                    <div><FormattedMessage id="page.table.today.loan.principal.currency" /></div>
                                    <div>{convertMoneyFormat(tableData['toDaySumRealMoney'])}</div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8}>
                                    <div><FormattedMessage id="page.table.total.loan.amount.currency" /></div>
                                    <div>{convertMoneyFormat(tableData['odrLoanMoney'])}</div>
                                </Col>
                                {/*<Col span={8}>*/}
                                    {/*<div>总展期额(₹)</div>*/}
                                    {/*<div>{tableData['OrderOverDueLengMoney'] || 0}</div>*/}
                                {/*</Col>*/}
                                {/* <Col span={8}>
                                    <div>放款总额(₹)</div>
                                    <div>{convertMoneyFormat(tableData['odrLoanTotalMoney'])}</div>
                                </Col> */}
                                <Col span={8}>
                                    <div><FormattedMessage id="page.table.total.loan.principal.currency" /></div>
                                    <div>{convertMoneyFormat(tableData['realOdrLoanMoney'])}</div>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card style={{background:'transparent'}} type={'inner'} title={intl.formatMessage({id : "page.table.amount.recovered.currency"})}>
                            <Row style={{ marginBottom: '20px' }}>
                                <Col span={12}>
                                    <div><FormattedMessage id="page.table.today.principal.repayment.currency" /></div>
                                    <div>{convertMoneyFormat(tableData['payOdrPerMoney'])}</div>
                                </Col>
                                {/*<Col span={8}>*/}
                                    {/*<div>今日展期费回款(₹)</div>*/}
                                    {/*<div>{tableData['payOdrLengPerMoney'] || 0}</div>*/}
                                {/*</Col>*/}
                                <Col span={12}>
                                    <div><FormattedMessage id="page.table.today.late.fee.currency" /></div>
                                    <div>{convertMoneyFormat(tableData['payOdrDuePerMoney'])}</div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <div><FormattedMessage id="page.table.accumulated.contract.amount.exclude.late.fee.currency" /></div>
                                    <div>{convertMoneyFormat(tableData['payOdrMoney'])}</div>
                                </Col>
                                {/*<Col span={8}>*/}
                                    {/*<div>总展期费回款(₹)</div>*/}
                                    {/*<div>{tableData['payOdrLengMoney'] || 0}</div>*/}
                                {/*</Col>*/}
                                <Col span={12}>
                                    <div><FormattedMessage id="page.table.total.late.fee.currency" /></div>
                                    <div>{convertMoneyFormat(tableData['payOdrDueMoney'])}</div>
                                </Col>
                            </Row>
                        </Card>

                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Card style={{background:'transparent'}} type={'inner'} title={intl.formatMessage({id : "page.table.amount.repaid.currency"})}>
                            {/*<Row style={{ marginBottom: '20px' }}>*/}
                            {/*<Col span={12}>*/}
                            {/*<div>今日待还金额(₹)</div>*/}
                            {/*<div>{tableData['OdrRemianPerMoney'] || 0}</div>*/}
                            {/*</Col>*/}
                            {/*<Col span={12}>*/}
                            {/*<div>今日手续费(₹)</div>*/}
                            {/*<div>{tableData['OdrRemianDuePerMoney'] || 0}</div>*/}
                            {/*</Col>*/}

                            {/*</Row>*/}
                            <Row>
                                <Col span={12}>
                                    <div><FormattedMessage id="page.table.accumulated.outstand.contract.amount.currency" /></div>
                                    <div>{convertMoneyFormat(tableData['OdrRemianMoney'])}</div>
                                </Col>
                                <Col span={12}>
                                    <div><FormattedMessage id="page.table.accumulated.outstand.principal.currency" /></div>
                                    <div>{convertMoneyFormat(tableData['OdrRemianDueMoney'])}</div>
                                </Col>
                            </Row>
                        </Card>

                    </Col>
                    <Col span={12}>
                        <Card style={{background:'transparent'}} type={'inner'} title={intl.formatMessage({id : "page.table.total.amount.currency"})}>
                            <Row>
                                <Col span={12}>
                                    <div><FormattedMessage id="page.table.accumulated.loan.amount.currency" /></div>
                                    <div>{convertMoneyFormat(tableData['realOdrLoanMoney'])}</div>
                                </Col>
                                <Col span={12}>
                                    <div><FormattedMessage id="page.table.accumulated.contract.amount.include.late.fee.currency" /></div>
                                    <div>{convertMoneyFormat(tableData['totalMoney'])}</div>
                                </Col>

                            </Row>
                        </Card>

                    </Col>
                </Row>

                {/*<div>*/}
                {/*<CommonTable size={'middle'} dataSource={flowData} columns={flowColumns} pagination={null} loading={loading} title={() => <div>流量统计</div>}/>*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*<Row gutter={40}>*/}
                {/*<Col span={12}>*/}
                {/*<CommonTable size={'middle'} dataSource={checkData} columns={todayCheckColumns} pagination={null} loading={loading} title={() => <div>审核统计</div>}/>*/}
                {/*</Col>*/}
                {/*<Col span={12}>*/}
                {/*<CommonTable size={'middle'} dataSource={overdueData} columns={overdueColumns} pagination={null} loading={loading} title={() => <div>逾期统计</div>}/>*/}
                {/*</Col>*/}
                {/*</Row>*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*<CommonTable size={'middle'} dataSource={moneyOutData} columns={moneyOut} pagination={null} loading={loading} title={() => <div>金额支出</div>}/>*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*<CommonTable size={'middle'} dataSource={moneyInputData} columns={moneyInput} pagination={null} loading={loading} title={() => <div>金额回收</div>}/>*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*<Row gutter={40}>*/}
                {/*<Col span={12}>*/}
                {/*<CommonTable size={'middle'} dataSource={waitBackData} columns={waitBack} pagination={null} loading={loading} title={() => <div>待还金额</div>}/>*/}

                {/*</Col>*/}
                {/*<Col span={12}>*/}
                {/*<CommonTable size={'middle'} dataSource={allMoneyData} columns={allMoney} pagination={null} loading={loading} title={() => <div>总金额</div>}/>*/}
                {/*</Col>*/}
                {/*</Row>*/}
                {/*</div>*/}


            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { businessStatisticsState: { allDataStatisticsState } } = state;
    return {
        tableData: allDataStatisticsState['tableData'],
        loading: allDataStatisticsState['loading']
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: allDataStatisticsAction.adsGetTableData
    }, dispatch);
}

AllDataStatistics.PropTypes={
    intl: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(AllDataStatistics));