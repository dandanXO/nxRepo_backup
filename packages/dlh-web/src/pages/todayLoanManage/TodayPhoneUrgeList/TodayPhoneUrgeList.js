import React, {Component} from 'react';
import {connect} from 'react-redux';
import {CommonTable} from 'components';
import {bindActionCreators} from 'redux';
import {Button, Icon, message, Modal, Tooltip} from 'antd';
import {todayPhoneUrgeListAction} from './index';
import SearchList from './SearchList/SearchList';
import styles from './TodayPhoneUrgeList.less';
import moment from "moment/moment";
import {axios, convertMoneyFormat} from "utils";
import download from "downloadjs";
import {FormattedMessage, injectIntl} from "react-intl";
import PropTypes from 'prop-types';

const convertParams = (obj = {}) => {
    const {time = [], orderStatus = '', phoneNo = '', name = '', orderNo = ''} = obj;
    const isArr = Array.isArray(time) && time.length > 0;
    return {
        fstartTime: isArr ? time[0].format('YYYY-MM-DD 00:00:00') : '',
        fendTime: isArr ? time[1].format('YYYY-MM-DD 23:59:59') : '',
        status: orderStatus,
        userPhone: phoneNo,
        userTrueName: name,
        orderNo,
        isDc: true
    };
}
const statusObj = {
    "0": <FormattedMessage id="page.search.list.repaymenting"/>,
    "1": <FormattedMessage id="page.search.list.repaid"/>,
    "3": <FormattedMessage id="page.search.list.partial.repaid"/>
}

const urgeRecordColumns = [
    {
        title: <FormattedMessage id="windowPage.add.time"/>,
        dataIndex: 'createTime',
        key: 'createTime',
        render(text) {
            return moment(Number(text)).format('YYYY-MM-DD HH:mm:ss');
        }
    },
    {title: <FormattedMessage id="page.table.revisit.remark"/>, dataIndex: 'remark', key: 'remark'},
    {title: <FormattedMessage id="page.table.revisit.person"/>, dataIndex: 'collectorname', key: 'collectorname'}
];

class PhoneUrgeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            btnDisabled: false,
            visible: false,
            dueTableData: []
        };
        const _this = this;
        this.searchStatus = {};
        this.initSearchParams = {
            time: [ moment(0, 'HH').add(-1, 'd'), moment({ hour: 23, minute: 59, seconds: 59 }) ]
        };
        this.columns = [
            {
                title: props.intl.formatMessage({id: "page.table.operation"}),
                dataIndex: 'id',
                key: 'id',
                render(text, record) {
                    const {userId} = record;
                    return (
                        <div className={styles.operatorWrapper}>
                            <Tooltip title={_this.props.intl.formatMessage({id: "page.table.revisit.record"})}>
                                <span onClick={() => _this.lookDueDetail(text)}><Icon type={'file-text'}/></span>
                            </Tooltip>
                            <Tooltip title={_this.props.intl.formatMessage({id: "page.table.view.detail"})}>
                                <span onClick={() => _this.handleLookDetail(text, userId)}>
                                    <Icon type="exception"/>
                                </span>
                            </Tooltip>
                        </div>


                    );
                }
            },
            {
                title: props.intl.formatMessage({id: "page.search.list.distribute.time"}),
                dataIndex: 'distributionTime',
                key: 'distributionTime',
                render(text) {
                    return moment(Number(text) * 1000).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            {title: props.intl.formatMessage({id: "page.search.list.order.no"}), dataIndex: 'orderNo', key: 'orderNo'},
            {
                title: <FormattedMessage id="page.search.list.product.name" />,
                dataIndex: "productName",
                key: "productName",
                render(text) { return <CopyText text={text} isEllispsis={true} /> }
            },
            {
              title: <FormattedMessage id='page.table.ad.appName' />,
              dataIndex: "appName",
              key: "appName",
              width:'10%',
              render(text) { return <CopyText text={text} isEllispsis={true} /> }
            },
            {title: props.intl.formatMessage({id: "page.search.list.name"}), dataIndex: 'userTrueName', key: 'userTrueName'},
            {title: props.intl.formatMessage({id: "page.search.list.mobile"}), dataIndex: 'userPhone', key: 'userPhone'},
            // { title: '逾期天数', dataIndex: 'expireDays', key: 'expireDays' },
            // {
            //     title: '逾期时间',
            //     dataIndex: 'expireTime',
            //     key: 'expireTime',
            //     render(text) {
            //         return moment(Number(text) * 1000).format('YYYY-MM-DD HH:mm:ss');
            //     }
            // },
            {
                title: props.intl.formatMessage({id: "page.table.loan2"}),
                dataIndex: 'deviceMoney',
                key: 'deviceMoney',
                render(text, record) {
                    return convertMoneyFormat(text);
                }
            },
            {
                title: props.intl.formatMessage({id: "page.table.reduce.amount.currency"}),
                dataIndex: 'reductionAmt',
                key: 'reductionAmt',
                render(text, record) {
                    return convertMoneyFormat(text);
                }
            },
            {
                title: props.intl.formatMessage({id: "page.search.list.order.status"}),
                dataIndex: 'status',
                key: 'status',
                render(text) {
                    return statusObj[text] || '';
                }
            },
            {
                title: props.intl.formatMessage({id: "page.table.amount.due"}),
                dataIndex: 'payable',
                key: 'payable',
                render(text, record) {
                    return convertMoneyFormat(text);
                }
            },
            {
                title: props.intl.formatMessage({ id: "page.search.list.expiration.time" }),
                dataIndex: 'expireTime',
                key: 'expireTime',
                render (text, record) {
                    return text ? moment(Number(text) * 1000).format('YYYY-MM-DD HH:mm:ss') : ''
                }
            }
            // { title: '跟进记录', dataIndex: 'record', key: 'record' },
            // { title: '最后跟进时间', dataIndex: 'lastRecordTime', key: 'lastRecordTime' },

        ];
    }

    //导出记录列表
    exportRecord = () => {
        this.setState({btnDisabled: true});
        let hide = message.loading(this.props.intl.formatMessage({id: "page.table.exporting"}), 0);
        const _this = this;
        axios({
            url: '/hs/admin/orderToday/dcListDownload',
            method: 'post',
            responseType: 'blob',
            data: _this.searchStatus
        }).then((res) => {
            hide && hide();
            this.setState({btnDisabled: false});
            download(res, this.props.intl.formatMessage({id: "page.table.today.colect.list.export"}, {expDate: Date.now()}));
        }).catch(() => {
            hide && hide();
            this.setState({btnDisabled: false});
        });
    }

    //查看详情
    handleLookDetail = (id, userId) => {
        const {history: {push}} = this.props;
        push(`/todayPhoneUrgeList/${id}`, {userId});
    }

    lookDueDetail = (text) => {
        this.setState({
            visible: true,
        });
        try {
            const _this = this;
            axios({
                url: '/hs/admin/orderToday/collectionList',
                method: 'post',
                data: {overdueId: text}
            }).then((res) => {
                if (res && res.code == '200') {
                    let {data} = res;
                    _this.setState({
                        dueTableData: res.data
                    });
                }
            });
        } catch (e) {

        }
    }

    handleOk = (e) => {
        console.log(e);
        this.setState({visible: false,});
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({visible: false,});
    }

    //搜索
    handleSubmit = (obj) => {
        const {setSearchParams, getTableData} = this.props;
        setSearchParams(obj);
        const params = convertParams(obj);
        getTableData({...params, pageNum: 1, pageSize: 10});
        this.searchStatus = params;
    }
    //分页
    handlePageChange = (info) => {
        const {pageSize, current} = info;
        const {getTableData, searchParams} = this.props;
        const params = convertParams(searchParams);
        getTableData({...params, pageSize, pageNum: current});
    }

    componentDidMount() {
        const {getTableData, tableData: {pagination}, setSearchParams} = this.props;
        setSearchParams(this.initSearchParams)
        let params = convertParams(this.initSearchParams);
        params = {...params, pageSize: pagination['pageSize'] || 10, pageNum: pagination['current'] || 1};
        getTableData(params);
    }

    render() {
        const {tableData: {data, pagination}, loading, searchParams, intl} = this.props;
        const {btnDisabled, dueTableData} = this.state;
        return (
            <div>
                <SearchList handleSubmit={this.handleSubmit} params={searchParams} />
                <div><Button type={'danger'} disabled={btnDisabled} onClick={this.exportRecord}><FormattedMessage id="page.table.export.record"/></Button></div>
                <CommonTable
                    columns={this.columns}
                    dataSource={data}
                    pagination={pagination}
                    handlePageChange={this.handlePageChange}
                    loading={loading}
                />
                <Modal
                    title={intl.formatMessage({id: "page.table.revisit.record"})}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width={800}
                >
                    <div>
                        <CommonTable columns={urgeRecordColumns} dataSource={dueTableData}/>
                    </div>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {todayLoanManageState: {todayPhoneUrgeListState}} = state;
    return {
        tableData: todayPhoneUrgeListState['tableData'],
        loading: todayPhoneUrgeListState['loading'],
        searchParams: todayPhoneUrgeListState['params']
    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: todayPhoneUrgeListAction.tpulGetTableData,
        setTableData: todayPhoneUrgeListAction.tpulSetTableData,
        setSearchParams: todayPhoneUrgeListAction.tpulChangeSearchParams
    }, dispatch);
}

PhoneUrgeList.PropTypes = {
    intl: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(PhoneUrgeList));
