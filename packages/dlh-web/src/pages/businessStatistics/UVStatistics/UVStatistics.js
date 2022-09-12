import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {UVStatisticsAction} from './index';
import {CommonTable} from 'components';
import moment from 'moment';
import SearchList from './SearchList/SearchList';
import {message} from "antd";
import {axios} from "utils";
import download from "downloadjs";


class UVStatistics extends Component {

    columns = [
        { title: '日期',width:'120px', dataIndex: 'date', key: 'date',sorter: true,
            render(date) {
                return moment(date).format("YYYY-MM-DD");
            }},
        { title: '渠道ID', dataIndex: 'channelId', key: 'channelId',sorter: true },
        { title: '渠道名称', dataIndex: 'channelName', key: 'channelName',sorter: true },
        { title: 'UV数量', dataIndex: 'uv', key: 'uv',sorter: true },
        { title: 'PV数量', dataIndex: 'pv', key: 'pv',sorter: true },
    ];

    constructor(props) {
        super(props);
        this.state = {
            channelList : []
        };
        this.initTime = [
            moment().subtract(7, 'days'),
            moment()
        ];
        this.pageSize = 30;
        this.sorter = {};
        this.searchParams = this.convertParams({});
    }
    
    //导出记录
    exportRecord = (obj) => {
        this.setState({ btnDisabled: true });
        let hide = message.loading("正在导出", 0);
        const searchStatus = this.convertParams(obj);
        axios({
        url: "/hs/admin/newStatistics/getUVStatisticDownload",
        method: "post",
        responseType: "blob",
        data: searchStatus
        })
        .then(res => {
            hide && hide();
            this.setState({ btnDisabled: false });
            download(res, `渠道用户UV统计--${Date.now()}.xlsx`);
        })
        .catch(() => {
            hide && hide();
            this.setState({ btnDisabled: false });
        });
    };

    convertParams = (obj = {}) => {
        const { time = this.initTime , channelId = null } = obj;
        const isArr = Array.isArray(time) && time.length > 0;
        const sorter = this.sorter;
        return {
            start: isArr ? time[0].format('YYYY-MM-DD'): '',
            end: isArr? time[1].add(1, 'days').format('YYYY-MM-DD') : '',
            channelId:channelId === ''? null: channelId,
            sortField:sorter.field,
            sortOrder:sorter.order
        };
    };

    handleSearch = (obj) => {
        const { getTableData } = this.props;
        this.searchParams = this.convertParams(obj);
        getTableData({ size: this.pageSize, page: 0, ...this.searchParams });
    };

    handlePageChange = (pagination,filters, sorter) => {
        this.sorter = sorter;
        const { current, pageSize } = pagination;
        const { getTableData } = this.props;
        this.searchParams.sortField = this.sorter.field;
        this.searchParams.sortOrder = this.sorter.order;
        getTableData({ ...this.searchParams, pageSize, pageNum: current});
    };

    componentDidMount() {
        const { getTableData } = this.props;
        this.searchParams = this.convertParams({});
        getTableData({ size: this.pageSize, page: 0, ...this.searchParams });
        this.getChannelList();
    }

    getChannelList() {
        const _this = this;
        axios({
            url: '/hs/admin/channel/getChannelList',
            method: 'post',
            data: {pageSize: 1000, pageNum: 1}
        }).then((res) => {
            if(res && res.code === 200) {
                let { data } = res;
                data.records.unshift({id: '', name: "不限"});
                _this.setState({
                    channelList : data.records
                });
                
            }
        });
    }


    render() {
        const { tableData: { data, pagination }, loading } = this.props;
        const {channelList} = this.state;
        return (
            <div>
                <SearchList initTime={this.initTime} handleSearch={this.handleSearch} channelList={channelList}
                		  exportRecord={this.exportRecord}
                          btnDisable={this.state.btnDisable}
                          />
                <CommonTable handlePageChange={this.handlePageChange} columns={this.columns} dataSource={data} pagination={pagination} loading={loading} pageSize={this.pageSize}/>
            </div>
        );
    }


}

const mapStateToProps = (state) => {
    const { businessStatisticsState: { UVStatisticsState } } = state;
    return {
        tableData: UVStatisticsState['tableData'],
        loading: UVStatisticsState['loading']
    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: UVStatisticsAction.uvStatisticGetTableData,
        setTableData: UVStatisticsAction.uvStatisticSetTableData
    }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(UVStatistics);