import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, message, Table, Tooltip, Icon, Switch, Popconfirm } from 'antd';
import { bindActionCreators } from 'redux';
import { adManageAction } from './index';
import styles from './AdManage.less';
import AddItemModal from './AddItemModal/AddItemModal';
import moment from "moment";
import { CommonTable } from 'components';
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FormattedMessage, injectIntl } from "react-intl";


class AdManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemModalVisible: false,
            editingItem: {},
            pagination: {
                pageSize: 10,
                pageSizeOptions: ['10', '20', '30', '40', '50', "100", "200", "300", "400", "500"],
                showSizeChanger: true
            }
        };
    }

    eventTagsOptions = {
        REJECTED: '被拒',
        BLACK_LIST: '拉黑',
        REPAYMENT_1TH_TIMES: '还款成功1次',
        REPAYMENT_2TH_TIMES: '还款成功2次',
        REPAYMENT_ABOVE_2TH_TIMES: '还款成功2次(含)以上',
    };

    refresh = () => {
        const {  getAdRecordData } = this.props;
        const { pagination: { pageSize, current } } = this.state;
        getAdRecordData({ size: pageSize, page: current -1 });
    }

    //添加
    addItem = () => {
        this.setState({ itemModalVisible: true, editingItem: {} });
    }
    //关闭弹框
    handleCancel = () => {
        this.setState({ itemModalVisible: false, editingItem: {} });
    }
    //提交结果
    handleOk = (formData) => {
        console.log(formData);
        const { addItem, modifyItemData } = this.props;
        const params = formData;
        const callback = () => this.refresh();

        if (!formData.id) {
            addItem(params, callback);
        } else {
            modifyItemData(params, callback);
        }
        this.setState({ itemModalVisible: false, editingItem: {} });
    }

    toggleDisplayAdSwitch = (checked) => { // true | false
        const { displaySwitch } = this.props;
        displaySwitch({ enabled: checked });
    }

    enableAd = (record, enabled) => {
        const { enabledSwitch } = this.props;
        enabledSwitch({ id: record.id, enabled }, () => this.refresh());
    }

    modifyAd = (record) => {
        this.setState({ itemModalVisible: true, editingItem: record });
    }

    deleteAd = (record) => {
        const { deleteItemData } = this.props;
        deleteItemData({ id: record.id }, () => this.refresh());
    }

    //分页
    handlePageChange = (pagination) => {
        const { current, pageSize } = pagination;
        const { getAdRecordData } = this.props;
        this.setState({ pagination })

        getAdRecordData({ size: pageSize, page: current -1 });
    }

    componentDidMount() {
        const { pagination: { pageSize } } = this.state;
        this.props.getViewData({ size: pageSize, page: 0 });
    }

    render() {
        const _this = this;
        const { intl, viewData: { page, pageInfo }, loading, displayAdSwitch } = this.props;
        const { pagination } = this.state;

        const paginationConfig = { ...pagination, ...pageInfo };
        const dataSource = page.records;
        const columns = [
            {
                title: 'Logo',
                dataIndex: 'logoUrl',
                key: 'logoUrl',
                render(text) {
                    return (<a href={text} target={'_blank'}><img src={text} width="50px"/></a>);
                }
            },
            {
                title: <FormattedMessage id='page.table.ad.appName' />,
                dataIndex: 'appName',
                key: 'appName',
            },
            {
                title: <FormattedMessage id='page.table.ad.title' />,
                dataIndex: 'title',
                key: 'title',
            },
            {
                title: <FormattedMessage id='page.table.ad.quota' />,
                dataIndex: 'quota',
                key: 'quota',
            },
            {
                title: <FormattedMessage id='page.table.ad.loan.success.rate' />,
                dataIndex: 'successRate',
                key: 'successRate',
                render(text) {
                    return text + '%';
                },
            },
            {
                title: <FormattedMessage id='page.table.ad.loan.interest.rate' />,
                dataIndex: 'interestRate',
                key: 'interestRate',
                render(text) {
                    return text + '%';
                },
            },
            {
                title: <FormattedMessage id='page.table.ad.loan.terms' />,
                dataIndex: 'terms',
                key: 'terms',
                render(text) {
                    return text + ' '+ intl.formatMessage({id : "windowPage.day"});
                },
            },
            // {
            //     title: <FormattedMessage id='page.table.ad.eventTags' />,
            //     dataIndex: 'eventTags',
            //     key: 'eventTags',
            //     width: 200,
            //     render(field) {
            //         return field.map(s => _this.eventTagsOptions[s]).join(", ");
            //     },
            // },
            {
                title: <FormattedMessage id='page.table.ad.linkUrl' />,
                dataIndex: 'linkUrl',
                key: 'linkUrl',
                width: 400,
                render(text) {
                    return (
                        <CopyToClipboard text={text} onCopy={() => message.success('复制成功', 2)} >
                            <span>{text}</span>
                        </CopyToClipboard>
                    );
                },
            },
            {
                title: <FormattedMessage id='page.table.ad.sort' />,
                dataIndex: 'sort',
                key: 'sort',
            },
            {
                title: <FormattedMessage id='windowPage.add.time' />,
                dataIndex: 'createTime',
                key: 'createTime',
                render(text) {
                    return moment(text).format('YYYY-MM-DD HH:mm:ss');
                },
            },
            {
                title: <FormattedMessage id='page.table.ad.enabled' />,
                dataIndex: 'enabled',
                key: 'enabled',
                render(field) {
                    return field ? <FormattedMessage id='page.table.enabled' /> : <FormattedMessage id='page.table.disabled' />;
                },
            },
            {
                title: <FormattedMessage id='page.table.operation' />,
                dataIndex: 'id',
                key: 'operation',
                render(text, record) {
                    return (
                        <div className={styles.recordWrapper}>
                            <Tooltip title={record.enabled ? <FormattedMessage id='page.table.disabled'/> : <FormattedMessage id='page.table.enabled'/> }>
                                <span onClick={() => _this.enableAd(record, !record.enabled)}><Icon type={'control'}/></span>
                            </Tooltip>
                            <Tooltip title={ <FormattedMessage id='page.table.modify'/> }>
                                <span onClick={() => _this.modifyAd(record)}><Icon type={'edit'}/></span>
                            </Tooltip>
                            <Tooltip title={ <FormattedMessage id='page.table.delete'/> }>
                                <Popconfirm title={ <FormattedMessage id='page.table.confirm.delete'/> } onConfirm={() => _this.deleteAd(record)}>
                                    <span><Icon type={'delete'}/></span>
                                </Popconfirm>
                            </Tooltip>
                        </div>
                    );
                },
            },
        ];

        const { itemModalVisible, editingItem } = this.state;

        return (
            <div>
                <div className={styles.btnWrapper}>
                    <Button type={'primary'} onClick={this.addItem}><FormattedMessage id='page.table.add' /> </Button>

                    <span style={{ 'paddingLeft': '50px' }}>
                        <FormattedMessage id='windowPage.admanage.display.switch' /> <Switch checkedChildren="yes" unCheckedChildren="no" checked={displayAdSwitch} onChange={this.toggleDisplayAdSwitch}/>
                    </span>
                </div>

                <div className={styles.recordWrapper}>
                    <CommonTable
                        loading={loading}
                        rowKey="id"
                        dataSource={dataSource}
                        columns={columns}
                        pagination={paginationConfig}
                        handlePageChange={this.handlePageChange}
                    />

                    <AddItemModal
                        visible={itemModalVisible}
                        handleOk={this.handleOk}
                        info={editingItem}
                        handleCancel={this.handleCancel}
                    />
                </div>
            </div>
        );
    }
}

AdManage.defaultProps = {
    viewData: {
        page: {
            records: []
        },
        pageInfo: {
            total: 0
        }
    },
    displayAdSwitch: true,
    loading: true
};

const mapStateToProps = (state) => {
    const { h5ManageState: { adManageState } } = state;
    return {
        viewData: adManageState['viewData'],
        displayAdSwitch: adManageState['displayAdSwitch'],
        loading: adManageState['loading']
    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getViewData: adManageAction.admGetViewData,
        getAdRecordData: adManageAction.admGetAdRecordData,
        addItem: adManageAction.admAddItem,
        deleteItemData: adManageAction.admDeleteItem,
        modifyItemData: adManageAction.admUpdateItem,
        displaySwitch: adManageAction.admDisplaySwitch,
        enabledSwitch: adManageAction.admEnabledSwitch
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(AdManage));