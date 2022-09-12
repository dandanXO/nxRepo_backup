import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {Button, message} from 'antd';
import {bindActionCreators} from 'redux';
import { CommonTable, CopyToLink, CopyText } from 'components';
import {checkRecordAction} from './index';
import {axios, checkRecordStatus} from 'utils';
import SearchList from './SearchList/SearchList';
import download from "downloadjs";
import {FormattedMessage, injectIntl} from "react-intl";
import PropTypes from 'prop-types';


const convertParams = (obj) => {
    const {time = [moment(), moment()], userPhone = '', userName = '', orderNo = '', reviewStatus = '', operatorId = ''} = obj;
    const isArr = Array.isArray(time) && time.length > 0;
    return {
        startTime: isArr ? time[0].format('YYYY-MM-DD HH:mm:ss') : '',
        endTime: isArr ? time[1].format('YYYY-MM-DD HH:mm:ss') : '',
        userPhone,
        userName,
        orderNo,
        reviewStatus,
        operatorId
    }
}


const modalTableColumns = [
    {
        title: <FormattedMessage id="page.table.score"/>,
        dataIndex: "score",
        key: "score"
    },
    {
        title: <FormattedMessage id="page.table.decision"/>,
        dataIndex: "decision",
        key: "decision"
    },
    {
        title: <FormattedMessage id="page.table.risk.name"/>,
        dataIndex: "risk_name",
        key: "risk_name"
    }
];


class CheckRecord extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            btnDisabled: false
        };
        this.pageSize = 10;
        this.searchParams = convertParams({});
        const _this = this;
        this.initTime = [
            moment(),
            moment()
        ]
        this.columns = [
            {
                title: props.intl.formatMessage({ id: "page.table.exam.time" }),
                dataIndex: 'reviewTime',
                key: 'reviewTime',
                width: '13%',
                render(text) {
                    return moment(Number(text) * 1000).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            { title: props.intl.formatMessage({ id: "page.search.list.order.no" }), dataIndex: 'orderNo', key: 'orderNo', width: '15%', render(text) { return <CopyText text={text} /> } },
            { title: props.intl.formatMessage({ id: "page.search.list.name" }), dataIndex: 'userName', key: 'userName', width: '15%', render(text) { return <CopyText text={text} /> } },
            { title: props.intl.formatMessage({ id: "page.search.list.mobile" }), dataIndex: 'userPhone', key: 'userPhone' },
            {
                title: props.intl.formatMessage({ id: "page.table.exam.status" }),
                dataIndex: 'reviewStatus',
                key: 'reviewStatus',
                render(text) {
                    return checkRecordStatus[text];
                }
            },
            {
                title: props.intl.formatMessage({ id: "windowPage.remarks" }),
                dataIndex: 'remark',
                width: '25%',
                key: 'remark',
                render: function (text) {

                    let str;
                    try {
                        str = JSON.parse(text);
                    } catch (e) {
                        str = text;
                    }

                    str = typeof str !== 'object' ? str : (str['risk_items'] || []).map(item => item['risk_name']).join(',')
                    return <CopyToLink text={str} />
                }
            },
            // {
            //     title: '操作人',
            //     dataIndex: 'operatorId',
            //     key: 'operatorId',
            //     render(text) {
            //         const { operatorData } = _this.props;
            //         const item = operatorData.find(item => Number(item.id) === Number(text));
            //         if(!item) {
            //             return '';
            //         }
            //         return item['trueName'];
            //     }
            // },
            {
                title: props.intl.formatMessage({ id: "page.table.operation.person" }),
                dataIndex: 'operatorName',
                key: 'operatorName'
            }
        ];
    }


    handlePageChange = (info) => {
        const {current, pageSize} = info;
        const {getTableData} = this.props;
        getTableData({pageNum: current, pageSize, ...this.searchParams});
    }

    exportRecord = () => {
        this.setState({btnDisabled: true});
        let hide = message.loading(this.props.intl.formatMessage({id: "page.table.exporting"}), 0);
        const _this = this;
        axios({
            url: '/hs/admin/riskReview/riskReviewDownLoad',
            method: 'post',
            responseType: 'blob',
            data: _this.searchParams
        }).then((res) => {
            hide && hide();
            this.setState({btnDisabled: false});
            download(res, this.props.intl.formatMessage({id: "page.table.exam.record.export"}, {expDate: Date.now()}));
        }).catch(() => {
            hide && hide();
            this.setState({btnDisabled: false});
        });
    }
    handleSearch = (obj) => {
        const {getTableData} = this.props;
        const params = convertParams(obj);
        this.searchParams = params;
        getTableData({pageNum: 1, pageSize: this.pageSize, ...params});
    }

    componentDidMount() {
        const {getTableData, getOperator} = this.props;
        getOperator({roleId: 21}, () => {
            getTableData({pageNum: 1, pageSize: this.pageSize, ...this.searchParams});
        });
    }

    render() {
        const {tableData: {data, pagination}, loading, operatorData} = this.props;
        return (
            <div>
                <SearchList handleSearch={this.handleSearch} operatorData={operatorData} initTime={this.initTime}/>
                <div><Button disabled={this.state.btnDisabled} type={'danger'} onClick={this.exportRecord}><FormattedMessage id="page.table.export.record"/></Button></div>
                <CommonTable
                    columns={this.columns}
                    dataSource={data}
                    pagination={pagination}
                    loading={loading}
                    handlePageChange={this.handlePageChange}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {windControlCheckState: {checkRecordState}} = state;

    return {
        tableData: checkRecordState['tableData'],
        loading: checkRecordState['loading'],
        operatorData: checkRecordState['operatorData']
    };
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: checkRecordAction.crdGetTableData,
        setTableData: checkRecordAction.crdSetTableData,
        getOperator: checkRecordAction.crdGetOperator
    }, dispatch);
}

CheckRecord.PropTypes = {
    intl: PropTypes.object.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(CheckRecord));