import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon, message, Modal, Popconfirm, Tooltip } from 'antd';
import { bindActionCreators } from 'redux';
import SearchList from './SearchList/SearchList';
import WhiteModel from './WhiteModel/WhiteModel';
import { CommonTable, CopyText } from 'components';
import { whiteListManageAction } from './index';
import styles from './WhiteListManage.less';
import moment from 'moment';
import download from 'downloadjs';
import { axios } from 'utils';
import { FormattedMessage, injectIntl } from "react-intl";
import PropTypes from 'prop-types';

const convertarams = (obj = {}) => {
    const { time = [], userPhone = '', userTrueName = '' } = obj;
    const isArr = Array.isArray(time) && time.length > 0;
    return {
        yStartTime: isArr ? time[0].format('YYYY-MM-DD 00:00:00') : '',
        yEndTime: isArr ? time[1].format('YYYY-MM-DD 23:59:59') : '',
        userPhone,
        userTrueName
    };
}

class WhiteListManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            itemWhiteId: null,
            btnDisabled: false,
            selectedRowKeys: []
        };
        this.pageSize = 10;
        this.searchParams = convertarams({});
        const _this = this;
        this.columns = [
            {
                title: props.intl.formatMessage({ id: "windowPage.add.time" }),
                dataIndex: 'addTime',
                key: 'addTime',
                render(text) {
                    return moment(Number(text) * 1000).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            /*{
                title: props.intl.formatMessage({id : "page.search.list.name"}),
                dataIndex: 'userTrueName',
                key: 'userTrueName'
            },*/
            {
                title: props.intl.formatMessage({ id: "windowPage.mobile" }),
                dataIndex: 'phoneNo',
                key: 'phoneNo',
                render(text) { return <CopyText text={text} /> } 
            }
            // {
            //     title: '身份证号',
            //     dataIndex: 'idcardNo',
            //     key: 'idcardNo'
            // },
            // ,{
            //     title: '备注',
            //     dataIndex: 'reason',
            //     key: 'reason',
            //     width: '20%'
            // }
            // ,
            // {
            //     title: '操作人',
            //     dataIndex: 'operatorName',
            //     key: 'operatorName'
            // }
            , {
                title: props.intl.formatMessage({ id: "page.table.operation" }),
                dataIndex: 'id',
                key: 'id',
                width: '10%',
                render(text, record) {
                    return (
                        <div>
                            {/* <Tooltip title={"修改"}>
                                <span onClick={() => _this.modifyWhite(record)}><Icon type={'edit'}/></span>
                            </Tooltip>    */}
                            {
                                <Popconfirm title={props.intl.formatMessage({ id: "page.table.delete.info.confirm" })} onConfirm={() => _this.removeById(record)}>
                                    <Tooltip title={props.intl.formatMessage({ id: "page.table.delete" })}>
                                        <span><Icon type="close"/></span>
                                    </Tooltip>
                                </Popconfirm>
                            }
                        </div>
                    );
                }
            }
        ];
    }

    //导出信息
    exportList = () => {
        this.setState({ btnDisabled: true });
        let hide = message.loading(this.props.intl.formatMessage({ id: "page.table.exporting" }), 0);
        const _this = this;
        axios({
            url: '/hs/admin/white/whiteDownload',
            method: 'post',
            responseType: 'blob',
            data: _this.searchParams
        }).then((res) => {
            hide && hide();
            this.setState({ btnDisabled: false });
            download(res, this.props.intl.formatMessage({ id: "page.table.whitelist.export" }, { expDate: Date.now() }));
        }).catch(() => {
            hide && hide();
            this.setState({ btnDisabled: false });
        });
    }

    //删除所有
    deleteAll = () => {
        Modal.confirm({
            title: '确认操作',
            content: '确认要继续清除所有白名单数据？',
            onOk() {
                try {
                    axios({
                        url: '/hs/admin/white/deleteAll',
                        method: 'post'
                    }).then((res) => {
                        if (res && res.code == '200') {
                            message.success(res.data);
                        } else {
                            message.error(res.data);
                        }
                        setTimeout(function () {
                            document.getElementsByClassName("ant-btn-primary")[0].click(); //页面刷新
                        }, 2000);
                    });
                } catch (e) {
                }
            },
            onCancel() {
            },
        });
    }

    //导出信息
    uploadData = () => {
    }

    //删除单条信息
    removeById = (obj) => {
        Modal.confirm({
            title: this.props.intl.formatMessage({ id: "page.table.confirm.operation" }),
            content: this.props.intl.formatMessage({ id: "page.table.continue.delete.info" }),
            onOk() {
                try {
                    axios({
                        url: '/hs/admin/white/delete',
                        method: 'post',
                        data: { id: obj.id }
                    }).then((res) => {
                        if (res && res.code == '200') {
                            message.success(res.data);
                        } else {
                            message.error(res.data);
                        }
                        setTimeout(function () {
                            document.getElementsByClassName("ant-btn-primary")[0].click(); //页面刷新
                        }, 2000);
                    });
                } catch (e) {
                }
            },
            onCancel() {
            },
        });
    }

    //删除单条信息
    removeBatch = (obj) => {
        const { selectedRowKeys } = this.state;
        if (!selectedRowKeys || selectedRowKeys.length === 0) {
            message.error(this.props.intl.formatMessage({ id: "windowPage.remarks.empty" }))
            return;
        }

        Modal.confirm({
            title: this.props.intl.formatMessage({ id: "page.table.confirm.operation" }),
            content: this.props.intl.formatMessage({ id: "page.table.continue.delete.info" }),
            onOk() {
                try {
                    axios({
                        url: '/hs/admin/white/remove-batch',
                        method: 'post',
                        data: { ids: [ ...selectedRowKeys ] }
                    }).then((res) => {
                        if (res && res.code == '200') {
                            message.success(res.data);
                        } else {
                            message.error(res.data);
                        }
                        setTimeout(function () {
                            document.getElementsByClassName("ant-btn-primary")[0].click(); //页面刷新
                        }, 2000);
                    });
                } catch (e) {
                }
            },
            onCancel() {
            },
        });
    }
    //添加
    handleAddWhite = () => {
        const { changeModalVisible, changeModalInfo, info } = this.props;
        this.setState({ itemWhiteId: null });
        changeModalVisible(true);
        changeModalInfo({ userTrueName: '', phoneNo: '', idcardNo: '', reason: '' });
    }
    //修改
    modifyWhite = (record) => {
        const { id, userTrueName, phoneNo, idcardNo, reason } = record;
        const { changeModalVisible, changeModalInfo, info } = this.props;
        this.setState({ itemWhiteId: id });
        changeModalInfo({ userTrueName, phoneNo, idcardNo, reason });
        changeModalVisible(true);
    }

    handleModalCancel = () => {
        const { changeModalVisible } = this.props;
        changeModalVisible(false);
    }

    handleModalOk = (obj, callback) => {
        const { itemWhiteId } = this.state;
        const { addWhite, updateWhite } = this.props;
        if (itemWhiteId || itemWhiteId === 0) {
            updateWhite({ ...obj, id: itemWhiteId });
            return;
        }
        addWhite(obj, callback);
    }

    componentDidMount() {
        const { getTableData } = this.props;
        getTableData({ pageSize: this.pageSize, pageNum: 1, ...this.searchParams });
    }

    componentWillUnmount() {
        const { setTableData } = this.props;
        setTableData({
            data: [],
            pagination: {}
        })
    }

    handleSearch = (obj) => {
        const { getTableData } = this.props;
        const params = convertarams(obj);
        this.setState({ selectedRowKeys: [] });
        getTableData({ pageSize: this.pageSize, pageNum: 1, ...params });
    }
    handlePageChange = (info) => {
        const { current, pageSize } = info;
        const { getTableData } = this.props;
        this.setState({ selectedRowKeys: [] });
        getTableData({ pageNum: current, pageSize, ...this.searchParams });
    }

    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    };

    render() {
        const { btnDisabled, selectedRowKeys } = this.state;
        const { tableData: { data, pagination }, loading, visible, info } = this.props;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };

        return (
            <div>
                <SearchList submit={this.handleSearch}/>
                <div>
                    <span className={styles.margin10}><Button type={'primary'} onClick={this.removeBatch}><FormattedMessage id="page.table.delete"/></Button></span>
                    <span className={styles.margin10}><Button type={'primary'} onClick={this.handleAddWhite}><FormattedMessage id="page.table.add"/></Button></span>
                    <span className={styles.margin10}><Button type={'danger'} disabled={btnDisabled} onClick={this.exportList}><FormattedMessage id="page.table.export"/></Button></span>
                    <span className={styles.margin10}><Button type={'primary'} disabled={btnDisabled} onClick={this.deleteAll}><FormattedMessage id="page.table.clear"/></Button></span>
                </div>
                <CommonTable handlePageChange={this.handlePageChange} columns={this.columns} rowSelection={rowSelection} dataSource={data} pagination={pagination} loading={loading}/>
                <WhiteModel visible={visible} info={info} handleCancel={this.handleModalCancel} handleOk={this.handleModalOk}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { windControlCheckState: { whiteListManageState } } = state;
    return {
        tableData: whiteListManageState['data'],
        loading: whiteListManageState['loading'],
        visible: whiteListManageState['visible'],
        info: whiteListManageState['modalInfo'],
    }
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: whiteListManageAction.wlmGetTableData,
        setTableData: whiteListManageAction.wlmSetTableData,
        changeModalInfo: whiteListManageAction.wlmChangeModalInfo,
        changeModalVisible: whiteListManageAction.wlmChangeModalVisible,
        addWhite: whiteListManageAction.wlmAddTableData,
        updateWhite: whiteListManageAction.wlmUpdateTableData
    }, dispatch)
}

WhiteListManage.PropTypes = {
    intl: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(WhiteListManage));