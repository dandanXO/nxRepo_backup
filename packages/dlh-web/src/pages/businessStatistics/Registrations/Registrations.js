
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { registrationsAction, registrationsState } from './index';
import moment from 'moment';
import { message } from 'antd';
import SearchList from './SeachList/SearchList';
import less from './Registrations.less';
import { axios } from 'utils';
import download from 'downloadjs';
import { injectIntl ,FormattedMessage} from "react-intl";
import PropTypes from 'prop-types';
import { CommonTable } from 'components';
import TableTitle from './TableTitle';
import conf from 'conf';

class Registrations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initTime: [
                moment().subtract(9, 'days'),
                moment()
            ],
        };
        this.searchParams = {...this.convertParams(), page: 0, size: 10 };
        const precent = props.intl.formatMessage({ id: "page.table.percentage" });

        this.operationColumns = [
            // Pan卡认证量(百分比)
            {
                title: <TableTitle text={"page.table.new.customer.pancard.verify.qty"} />,className: 'operation',
                dataIndex: 'panCount',
                key: 'panCount',
                render (text, record) {
                    const { panCountRate } = record;
                    if (!text) { return ''; }
                    return <div><div>{text}</div><div>({panCountRate})</div></div>;
                }
            },
            // 新客实名认证量(百分比)
            {
                title: <TableTitle text={"page.table.new.customer.realname.verify.qty"} />,className: 'operation',
                dataIndex: 'idCardCount',
                key: 'idCardCount',
                render (text, record) {
                    const { idCardRate } = record;
                    if (!text) { return ''; }
                    return <div><div>{text}</div><div>({idCardRate})</div></div>;
                }
            },
            // 新客紧急联系人认证量(百分比)
            {
                title: <TableTitle text={"page.table.new.customer.emergency.contact.person.verification.qty"} />,className: 'operation',
                dataIndex: 'authCount',
                key: 'authCount',
                width: 100,
                render (text, record) {
                    const { authRate } = record;
                    if (!text) { return ''; }
                    return <div><div>{text}</div><div>({authRate})</div></div>;
                }
            },
            // Face id认证量(百分比)
            {
                title: <TableTitle text={"page.table.new.customer.liveness.verification.qty"} />,className: 'operation',
                dataIndex: 'livenessCount',
                key: 'livenessCount',
                render (text, record) {
                    const { livenessCountRate } = record;
                    if (!text) { return ''; }
                    return <div><div>{text}</div><div>({livenessCountRate})</div></div>;
                }
            },
            // 绑卡认证
            {
                title: <TableTitle text={"page.table.new.customer.bind.card.verification.qty"} />,className: 'operation',
                dataIndex: 'bankCount',
                key: 'bankCount',
                render (text, record) {
                    const { bankRate } = record;
                    if (!text) {
                        return '';
                    }
                    return <div><div>{text}</div><div>({bankRate})</div></div>;
                }
            },
            // 风控通过(百分比)
            {
                title: <TableTitle text={"page.table.new.customer.examPassed.qty"} />,className: 'operation',
                dataIndex: 'examPassCount',
                key: 'examPassCount',
                render (text, record) {
                    const { examPassCountRate } = record;
                    if (!text) {
                        return '';
                    }
                    return <div><div>{text}</div><div>({examPassCountRate})</div></div>;
                }
            },
        ]

        this.columns = [
            {
                title: "",className: '',
                children: [
                    // 日期
                    { title: props.intl.formatMessage({ id: "page.table.date" }), dataIndex: 'day', key: 'day', },
                    // 新客总注册量
                    { title: props.intl.formatMessage({ id: "page.table.new.customer.registration.quantity" }), dataIndex: 'registerCount', key: 'registerCount', width: 60, },
                ]
            },
            {
                title: <FormattedMessage id="page.table.user.authorization" />,className: 'authorizationTitle',
                children: [
                    // '相冊上传量'
                    {
                        title: <TableTitle text={"page.table.photo.albums.upload.amount"} />,className: 'authorization',
                        dataIndex: 'photoCount',
                        key: 'photoCount',
                        render (text, record) {
                            const { photoCountRate } = record;
                            if (!text) { return ''; }
                            return (<div><div>{text}</div><div>({photoCountRate})</div></div>);
                        }
                    },
                    // 通讯录认证
                    {
                        title: <TableTitle text={"page.table.new.customer.address.book.amount"} />,className: 'authorization',
                        dataIndex: 'contactCount',
                        key: 'contactCount',
                        render (text, record) {
                            const { contactRate } = record;
                            if (!text) { return ''; }
                            return <div><div>{text}</div><div>({contactRate})</div></div>;
                        }
                    },
                    // AppList认证,
                    {
                        title: <TableTitle text={"page.table.apps.install.upload.amount"} />,className: 'authorization',
                        dataIndex: 'appsCount',
                        key: 'appsCount',
                        render (text, record) {
                            const { appsCountRate } = record;
                            if (!text) { return ''; }
                            return <div><div>{text}</div><div>({appsCountRate})</div></div>;
                        }
                    },
                    // 短信通话认证,
                    {
                        title: <TableTitle text={"paga.table.sms.call.upload.amount"} />,className: 'authorization',
                        dataIndex: 'cdrCount',
                        key: 'cdrCount',
                        width: 100,
                        render (text, record) {
                            const { cdrCountRate } = record;
                            if (!text) { return ''; }
                            return <div><div>{text}</div><div>({cdrCountRate})</div></div>;
                        }
                    },
                ]
            },
            {
                title: <FormattedMessage id="page.table.user.operation" />,className: 'operationTitle',
                children: conf.Registrations?this.operationColumns:this.operationColumns.filter(i=>i.key!=="panCount")
            },
          
            {
                title: "",className: '',
                children: [ 
                    // 新客总申请量
                    { title: props.intl.formatMessage({ id: "page.table.new.customer.application.qty" }), dataIndex: 'applyCount', key: 'applyCount', },
                    // 訂單申请率
                    {
                        title: props.intl.formatMessage({ id: "page.table.new.customer.application.rate" }), dataIndex: 'applyCount', key: 'applyCount', render (text, record) {
                            const { examPassCount } = record;
                            let applicationRate = Number(text) / Number(examPassCount);
                            return Number(applicationRate) ? Number(applicationRate)+'%' : '0%';
                        }
                    },
                    // 新客放款量
                    { title: props.intl.formatMessage({ id: "page.table.new.customer.loan.qantity" }), dataIndex: 'loanCount', key: 'loanCount', },
                    // 新客申请转化率
                    { title: props.intl.formatMessage({ id: "page.table.new.customer.application.conversion.rate" }), dataIndex: 'applyRate', key: 'applyRate', },
                    // 新客放款转化率
                    { title: props.intl.formatMessage({ id: "page.table.new.customer.loan.conversion.rate" }), dataIndex: 'loanRate', key: 'loanRate', }
                ]
            },

        ];
    }

    convertParams = (obj = {}) => {
        const { time = this.state.initTime, channelId = '' } = obj;
        const isArr = Array.isArray(time) && time.length > 0;
        const startTime = isArr ? time[0].format('YYYY-MM-DD 00:00:00') : '';
        const endTime = isArr ? time[1].format('YYYY-MM-DD 23:59:59') : '';
        return { channelId, startTime, endTime };
    }

    handleSearch = (obj) => {
        const { getTableData } = this.props;
        const params = this.convertParams(obj);
        this.searchParams = params;
        getTableData({ ...params, page: 0, size: 10 });
    }

    handlePageChange = (info) => {
        const { current, pageSize } = info;
        const { getTableData } = this.props;
        getTableData({ ...this.searchParams, page: current - 1, size: pageSize });
    }

    handleExport = (obj) => {
        const params = this.convertParams(obj);
        let hide = message.loading(this.props.intl.formatMessage({ id: "page.table.exporting" }), 0);

        console.log(params)
        axios({
            url: '/hs/admin/statistics/dayRegisterStatisticDownLoad',
            method: 'post',
            responseType: 'blob',
            data: params
        }).then((res) => {
            hide && hide();
            download(res, this.props.intl.formatMessage({ id: "page.table.daily.conversion.rate.statistics.export" }, { expDate: Date.now() }));
        }).catch((err) => {
            hide && hide();
            console.log(err)
        });
    }

    componentDidMount () {
        const { getSourceData, getTableData } = this.props;
        const params = this.convertParams({ time: this.state.initTime, channelId: '' });
        getTableData({ ...params, page: 0, size: 10 });
        getSourceData({ pageSize: 10000, pageNum: 1 });
        console.log(conf)
    }

    render () {
        const { sourceData, tableData:{data,pagination}, loading } = this.props;
        return (
            <div>
                <SearchList
                    handleSearch={this.handleSearch}
                    handleExport={this.handleExport}
                    initTime={this.state.initTime}
                    loading={loading}
                    sourceData={sourceData}
                />
                <div className={less.tableTop}>
                    <CommonTable
                        columns={this.columns}
                        dataSource={data}
                        loading={loading}
                        bordered
                        handlePageChange={this.handlePageChange}
                        pagination={pagination}
                    />
                </div>
            </div>
        );

    }
}

const mapStateToProps = (state) => {
    const { businessStatisticsState: { registrationsState } } = state;
    return {
        tableData: registrationsState['tableData'],
        loading: registrationsState['loading'],
        sourceData: registrationsState['sourceData'],
    };
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: registrationsAction.regGetTableData,
        setTableData: registrationsAction.regSetTableData,
        getSourceData: registrationsAction.regGetSourceData,
    }, dispatch);
}

Registrations.PropTypes = {
    intl: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Registrations));