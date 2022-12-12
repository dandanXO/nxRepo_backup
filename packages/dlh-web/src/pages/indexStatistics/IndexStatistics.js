import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as indexAction from './models/actions';
import {CommonTable} from 'components';
import axios from 'axios';
import ReactDOM from 'react-dom';
import {Chart, Geom, Axis, Tooltip, Legend, Coord} from 'bizcharts';
import {Card, Col, Row} from "antd";
import PropTypes from 'prop-types';
import G2 from 'g2';
import createG2 from 'g2-react';
import { duration } from 'moment';
import { getAdminUserInfo } from 'utils';
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
        odrLoanTotalMoney: obj['odrLoanTotalMoney']
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
    {title: <FormattedMessage id="page.table.reg.today.num"/>, dataIndex: 'userRegPerCnt', key: 'userRegPerCnt'},
    {title: <FormattedMessage id="page.table.total.reg.num" />, dataIndex: 'userRegCnt', key: 'userRegCnt'},
    {title: <FormattedMessage id="page.table.num.application.day" />, dataIndex: 'applyOdrPerCnt', key: 'applyOdrPerCnt'},
    {title: <FormattedMessage id="page.table.total.num.application" />, dataIndex: 'applyOdrCnt', key: 'applyOdrCnt'},
    {title: <FormattedMessage id="page.table.today.num.trans" />, dataIndex: 'passOdrLoanPerCnt', key: 'passOdrLoanPerCnt'},
    {title: <FormattedMessage id="page.table.total.num.trans" />, dataIndex: 'passOdrLoanCnt', key: 'passOdrLoanCnt'},
    {title: <FormattedMessage id="page.table.today.lend.count" />, dataIndex: 'lengOdrPerCnt', key: 'lengOdrPerCnt'},
    {title: <FormattedMessage id="page.table.total.lend.count" />, dataIndex: 'lengOdrCnt', key: 'lengOdrCnt'},
    {title: <FormattedMessage id="page.table.today.num.order" />, dataIndex: 'totalOdrPerCnt', key: 'totalOdrPerCnt'},
    {title: <FormattedMessage id="page.table.total.num.order" />, dataIndex: 'totalOdrCnt', key: 'totalOdrCnt'},
];
//审核流量
const todayCheckColumns = [
    {title: <FormattedMessage id="page.table.remain.view.order.today" />, dataIndex: 'remainViewOdrCnt', key: 'remainViewOdrCnt'},
    {title: <FormattedMessage id="page.table.remain.review.order.today" />, dataIndex: 'remainReviewOdrCnt', key: 'remainReviewOdrCnt'},
    {title: <FormattedMessage id="page.table.final.review.order.today" />, dataIndex: 'remainFivOdrCnt', key: 'remainFivOdrCnt'},
];
//逾期统计
const overdueColumns = [
    {title: <FormattedMessage id="page.table.today.new.overdue.period" />, dataIndex: 'OdrOverDuePerCnt', key: 'OdrOverDuePerCnt'},
    {title: <FormattedMessage id="page.table.total.overdue.period"/>, dataIndex: 'OdrOverDueCnt', key: 'OdrOverDueCnt'},
    {title: <FormattedMessage id="page.table.today.new.overdue.amount" />, dataIndex: 'OdrOverDuePerMoney', key: 'OdrOverDuePerMoney'},
    {title: <FormattedMessage id="page.table.total.overdue.amount" />, dataIndex: 'OdrOverDueMoney', key: 'OdrOverDueMoney'}
];
//金额支出
const moneyOut = [
    {title: <FormattedMessage id ="page.table.today.loan.amount" />, dataIndex: 'odrLoanPerMoney', key: 'odrLoanPerMoney'},
    {title: <FormattedMessage id ="page.table.total.loan.amount" />, dataIndex: 'odrLoanMoney', key: 'odrLoanMoney'},
    {title: <FormattedMessage id ="page.table.today.lend.period.amount" />, dataIndex: 'OrderOverDueLengPerMoney', key: 'OrderOverDueLengPerMoney'},
    {title: <FormattedMessage id="page.table.total.lend.period.amount" />, dataIndex: 'OrderOverDueLengMoney', key: 'OrderOverDueLengMoney'},
    {title: <FormattedMessage id="page.table.today.amount" />, dataIndex: 'odrLoanTotalPerMoney', key: 'odrLoanTotalPerMoney'},
    {title: <FormattedMessage id="page.table.total.amount" />, dataIndex: 'odrLoanTotalMoney', key: 'odrLoanTotalMoney'},
];
//金额回收
const moneyInput = [
    {title: <FormattedMessage id="page.table.today.principal.repayment" />, dataIndex: 'payOdrPerMoney', key: 'payOdrPerMoney'},
    {title: <FormattedMessage id="page.table.total.principal.repayment" />, dataIndex: 'payOdrMoney', key: 'payOdrMoney'},
    {title: <FormattedMessage id="page.table.today.lending.repayment" />, dataIndex: 'payOdrLengPerMoney', key: 'payOdrLengPerMoney'},
    {title: <FormattedMessage id="page.table.total.lending.repayment" />, dataIndex: 'payOdrLengMoney', key: 'payOdrLengMoney'},
    {title: <FormattedMessage id="page.table.today.late.fee" />, dataIndex: 'payOdrDuePerMoney', key: 'payOdrDuePerMoney'},
    {title: <FormattedMessage id="page.table.total.late.fee" />, dataIndex: 'payOdrDueMoney', key: 'payOdrDueMoney'},
];

//待还金额
const waitBack = [
    {title: <FormattedMessage id="page.table.today.repaid.amount" />, dataIndex: 'OdrRemianPerMoney', key: 'OdrRemianPerMoney'},
    {title: <FormattedMessage id="page.table.total.repaid.amount" />, dataIndex: 'OdrRemianMoney', key: 'OdrRemianMoney'},
    {title: <FormattedMessage id="page.table.today.handling.charge" />, dataIndex: 'OdrRemianDuePerMoney', key: 'OdrRemianDuePerMoney'},
    {title: <FormattedMessage id="page.table.total.handling.charge" />, dataIndex: 'OdrRemianDueMoney', key: 'OdrRemianDueMoney'},
];

//总金额
const allMoney = [
    {title: <FormattedMessage id ="page.table.actual.loan.amount" />, dataIndex: 'realOdrLoanMoney', key: 'realOdrLoanMoney'},
    {title: <FormattedMessage id="page.table.total.repayment.amount" />, dataIndex: 'totalMoney', key: 'totalMoney'}
];

//柱形图
const Line = createG2(chart => {

    var Stat = G2.Stat;
    chart.legend({
        position: 'top'
    });
    chart.axis('day', {
        title: null
    });
    chart.axis('money', {
        title: null
    });
    chart.intervalDodge().position('day*money').color('name')
    chart.render();
});


class IndexStatistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            data2: [],
            data3: [],
            data4: [],
            dispaly: 'block',
            undisply:'none',
            width: null,
            height: null,
            showChar4:'block'
        };
    }

    getDataValue() {
        const _this = this;    //先存一下this，以防使用箭头函数this会指向我们不希望它所指向的对象。
        axios.get('/hs/admin/chart/showCharts1')
            .then(function (response) {
                _this.setState({
                    data: response.data
                });
            })
        axios.get('/hs/admin/chart/showCharts2')
            .then(function (response) {
                _this.setState({
                    data2: response.data
                });
            })
        axios.get('/hs/admin/chart/showCharts3')
            .then(function (response) {
                _this.setState({
                    data3: response.data
                });
            })
        axios.get('/hs/admin/chart/showCharts4')
            .then(function (response) {
                if(!response.data){
                    _this.setState({
                        showChar4:'none'
                    })
                }else{
                    _this.setState({
                        data4: response.data
                    });
                }
            })
    }
    componentWillMount() {
        window.addEventListener('resize', () => this.updateSize());
    }
    async componentDidMount() {
        let _this = this;

        const adminUser = await getAdminUserInfo()
        if (adminUser.data.roleId  == 1) {
            _this.getDataValue();
        } else {
            _this.setState({
                dispaly: 'none',
                undisply: 'block'
            });
        }
        _this.updateSize();    
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', () => this.updateSize());
    }

    updateSize() {
        try {
            const parentDom = ReactDOM.findDOMNode(this).parentNode;
            var bodyDom = parentDom;
            while(!!bodyDom.offsetParent){
                bodyDom = bodyDom.offsetParent;
            }
            // debugger;
            let { width, height } = this.state;
            
            width = bodyDom.clientWidth-290;
            height = bodyDom.clientHeight-147;
            
            if (!height) {
                height = width * 0.38;
            }
            this.setState({ width:width, height:height });
            // console.dir((bodyDom.clientWidth-290)+","+(bodyDom.clientHeight-147));
            // console.dir(width+","+height);
            // console.dir(this.state);
            
        } catch (ignore) {
        }
    }

    render() {
        
        const scale3 = {
            本金回款率: {
                alias: this.props.intl.formatMessage({id: "page.table.principal.repayment.rate"})
            }
        };

        const scale2 = {
            首逾率: {
                alias: this.props.intl.formatMessage({id : "page.table.first.overdue.rate"})
            }
        };
        var f = {
            padding: 0,
            overflow: 'hidden',
        };

        var he = {
            height: this.state.height/2-20,
            paddingRight:60
        };
        var chartWidth = this.state.width/2-20;
        var chartHeight = this.state.height/2-10;
        // console.dir({chartWidth:chartWidth,chartHeight:chartHeight});
        const scale = {
            转换率: {
                alias: this.props.intl.formatMessage({id : "page.table.conversion.rate"}),
            }
        }
        const  scale4 ={
            count: {
                alias: this.props.intl.formatMessage({id : "page.table.num.reg.hour"}),
                linear:'linear'
            },
            hour:{
                alias: this.props.intl.formatMessage({id : "page.table.hour"}),
                linear:'linear'
            }
        }

        const title = {
            textStyle: {
                fontSize: '12',
                textAlign: 'center',
                fill: '#151115',
            }
        }

        const line={
            fill: '#ffffff',
        }


        // console.dir("resizing");
        // console.dir(this.state);
        // console.dir(chartHeight+",");
        return (
            <div>
                <div style={{display: this.state.undisply}}>
                    <FormattedMessage id="page.welcome" />
                </div>

               <div style={{display: this.state.dispaly}}>
                   <Row gutter={12} style={{}}>
                       <Col span={12} style={he}>
                           {/*<Card type={'inner'} title={'转换率'}>*/}
                           <Chart width={chartWidth} height={chartHeight} data={this.state.data} scale={scale}>
                               <Axis name="转换率" title={title} line={line}/>
                               <Legend position="top"/>
                               <Tooltip g2-tooltip={{
                                   backgroundColor: '#000',
                                   color: '#fff',
                                   opacity: '0.8'
                               }}/>
                               <Geom type="line" position="day*转换率" size={2}/>
                               <Geom type='point' position="day*转换率" size={4} shape={'circle'}
                                     style={{stroke: '#fff', lineWidth: 1}}/>
                           </Chart>
                           {/*</Card>*/}
                       </Col>
                       <Col span={12} style={he}>
                           {/*<Card type={'inner'} title={'首逾率'}>*/}
                           <Chart width={chartWidth} height={chartHeight} data={this.state.data2} scale={scale2} >
                               <Axis name="首逾率" title={title} line={line}/>
                               <Legend position="top"/>
                               <Tooltip g2-tooltip={{
                                   backgroundColor: '#000',
                                   color: '#fff',
                                   opacity: '0.8'
                               }}/>
                               <Geom type="line" position="day*首逾率" size={2} />
                               <Geom type='point' position="day*首逾率" size={4} shape={'circle'}
                                     style={{stroke: '#fff', lineWidth: 1}}/>
                           </Chart>
                           {/*</Card>*/}
                       </Col>
                   </Row>
                   <Row gutter={12} style={{marginRTop:40}}>
                       <Col span={12} style={he}>
                           {/*<Card type={'inner'} title={'本金回款率'}>*/}
                           <Chart width={chartWidth} height={chartHeight} data={this.state.data3} scale={scale3}>
                               <Axis name="本金回款率" title={title} line={line}/>
                               <Legend position="top"/>
                               <Tooltip g2-tooltip={{
                                   backgroundColor: '#000',
                                   color: '#fff',
                                   opacity: '0.8'
                               }}/>
                               <Geom type="line" position="day*本金回款率" size={2}/>
                               <Geom type='point' position="day*本金回款率" size={4} shape={'circle'}
                                     style={{stroke: '#fff', lineWidth: 1}}/>
                           </Chart>
                           {/*</Card>*/}
                       </Col>
                       <Col span={12} style={he}>
                          <div style={{display: this.state.showChar4}}>
                              <Chart width={chartWidth} height={chartHeight} data={this.state.data4} scale={scale4}>
                                  <Axis name="count" title={title} line={line}/>
                                  <Legend position="top"/>
                                  <Tooltip g2-tooltip={{
                                      backgroundColor: '#000',
                                      color: '#fff',
                                      opacity: '0.8'
                                  }}/>
                                  <Geom type="line" position="hour*count" size={2} />
                                  <Geom type='point' position="hour*count" size={4} shape={'circle'}
                                        style={{stroke: '#fff', lineWidth: 1}}/>
                              </Chart>
                          </div>
                       </Col>
                   </Row>
               </div>
            </div>
        );
    }
 
};

IndexStatistics.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(IndexStatistics);