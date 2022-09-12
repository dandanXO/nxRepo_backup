import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';
import {Modal} from 'antd';
import {CommonTable} from 'components';
import {feedbackMangeAction} from "./index";
import SearchList from './SearchList/SearchList';
import PropTypes from 'prop-types';
import {injectIntl} from "react-intl";

const convertParams = (obj = {}) => {
    const {time = [], deviceModel = '', typeName = '', phoneNo = ''} = obj;
    const isArr = Array.isArray(time) && time.length > 0;

    return {
        startTime: isArr ? time[0].format('YYYY-MM-DD 00:00:00') : '',
        endTime: isArr ? time[1].format('YYYY-MM-DD 23:59:59') : '',
        deviceModel,
        typeName,
        phoneNo
    };
}


class FeedbackManage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            isShowImg: false,
            imgUrl: ''
        };
        this.pageSize = 10;
        this.searchParams = convertParams();
        const _this = this;
        this.columns = [
            {
                title: props.intl.formatMessage({id: "page.search.list.feedback.time"}),
                dataIndex: 'addTime',
                key: 'addTime',
                width: '180px',
                render(text) {
                    return moment(Number(text) * 1000).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            {title: props.intl.formatMessage({id: "page.search.list.mobile"}), dataIndex: 'phoneNo', key: 'phoneNo', width: '150px'},
            {title: props.intl.formatMessage({id: "page.search.list.client"}), dataIndex: 'deviceModel', key: 'deviceModel'},
            {title: props.intl.formatMessage({id: "page.table.version.no"}), dataIndex: 'version', key: 'version'},
            {title: props.intl.formatMessage({id: "page.search.list.question.type"}), dataIndex: 'type', key: 'type'},
            {title: props.intl.formatMessage({id: "page.table.contact.infor"}), dataIndex: 'qq', key: 'qq'},
            {title: props.intl.formatMessage({id: "page.table.feedback.content"}), dataIndex: 'remark', key: 'remark', width: '40%'},
            {
                title: props.intl.formatMessage({id: "page.table.picture"}),
                dataIndex: 'imgUrl',
                key: 'imgUrl',
                render(text) {
                    if (!text) {
                        return '';
                    }
                    const arr = text.split(',');
                    return arr.map((item, index) => <img onClick={() => _this.showImg(item)} style={{margin: '0 10px', cursor: 'pointer'}} key={index} src={item} width={'30px'}/>);
                }
            },
        ];
    }

    showImg = (item) => {
        this.setState({
            imgUrl: item
        }, () => {
            this.setState({
                isShowImg: true
            });
        });
    }


    handlePageChange = (info) => {
        const {current, pageSize} = info;
        const {getTableData} = this.props;
        getTableData({pageSize, pageNum: current, ...this.searchParams});
    }


    submit = (obj) => {
        const params = convertParams(obj);
        this.searchParams = params;
        const {getTableData} = this.props;
        getTableData({pageSize: this.pageSize, pageNum: 1, ...this.searchParams});
    }

    componentDidMount() {
        const {getTableData, getTypeData} = this.props;
        getTableData({pageSize: this.pageSize, pageNum: 1});
        getTypeData({});
    }

    render() {
        const {tableData: {data, pagination}, loading, typeData, intl} = this.props;
        const pageInfo = {...pagination, pageSizeOptions: ['10', '20', '30', '40', '50', "100", "200", "300", "400", "500", "1000", "2000", "5000"], showSizeChanger: true}
        return (
            <div>
                <SearchList submit={this.submit} typeData={typeData}/>
                <CommonTable
                    handlePageChange={this.handlePageChange}
                    columns={this.columns}
                    dataSource={data}
                    pagination={pageInfo}
                    loading={loading}
                />
                <Modal
                    onCancel={() => {
                        this.setState({isShowImg: false})
                    }}
                    width={600}
                    visible={this.state.isShowImg}
                    footer={null}
                    title={intl.formatMessage({id: "windowPage.view.pic"})}
                >
                    <div style={{textAlign: 'center'}}>
                        <img width={'500px'} src={this.state.imgUrl}/>
                    </div>
                </Modal>
            </div>
        );

    }
}

const mapStateToProps = (state) => {
    const {systemManageState: {feedbackManageState}} = state;
    return {
        tableData: feedbackManageState['tableData'],
        loading: feedbackManageState['loading'],
        typeData: feedbackManageState['typeData']
    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: feedbackMangeAction.fbmGetTableData,
        setTableData: feedbackMangeAction.fbmSetTableData,
        getTypeData: feedbackMangeAction.fbmGetTypeData
    }, dispatch)
}

FeedbackManage.PropTypes = {
    intl: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(FeedbackManage));