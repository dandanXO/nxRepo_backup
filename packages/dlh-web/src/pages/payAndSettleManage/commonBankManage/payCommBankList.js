import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Tooltip, Modal } from 'antd';
import moment from 'moment';
import SearchList from './SearchList/SearchList';
import EditModel from './EditModel/EditModel';
import { CommonTable } from 'components';
import { bindActionCreators } from 'redux';
import { payCommBankListAction } from './index';
import styles from './payCommBankList.less';
import { axios } from 'utils';

class PayCommBankList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modelId: null,
            allCommonBankNameList:[],
            allCommonBankCardTypeList:[]
        };
        const _this = this;
        this.columns =[
            {
                title: '银行名称',
                dataIndex: 'name',
                key: 'name'
            },{
                title: '银行代码',
                dataIndex: 'code',
                key: 'code'
            },{
                title: '分行名称',
                dataIndex: 'branchName',
                key: 'branchName'
            },{
                title: '银行卡名称',
                dataIndex: 'cardName',
                key: 'cardName'
            },{
                title: '银行卡类型',
                dataIndex: 'cardType',
                key: 'cardType'
            },{
                title: '银行卡开头',
                dataIndex: 'cardBin',
                key: 'cardBin'
            },{
                title: '银行卡开头长度',
                dataIndex: 'cardBinLength',
                key: 'cardBinLength'
            },{
                title: '银行卡号长度',
                dataIndex: 'numLength',
                key: 'numLength'
            },{
                title: '优先级',
                dataIndex: 'sortNum',
                key: 'sortNum'
            },{
                title: '是否启用',
                dataIndex: 'isEnabled',
                key: 'isEnabled',
                render(text) {
                    var showStr = !!text && text ? '启用' : '不启用';
                    return (
                        <div>
                            <span>{showStr}</span>
                        </div>

                    );
                }
            },{
                title: '操作',
                dataIndex: 'id',
                key: 'id',
                render(text, record) {
                    return (
                        <div className={styles.recordWrapper}>
                            <Tooltip title={"修改"}>
                                <span onClick={() => _this.modifyModel(record)}><Icon type={'file-text'}/></span>
                            </Tooltip>
                            <Tooltip title={"删除"}>
                                <span onClick={() => _this.deleteModel(record)}><Icon type={'delete'}/></span>
                            </Tooltip>
                        </div>
                    );
                }
            },
        ];
        this.searchParams = {};
    }

    //添加
    handleAddModel = () => {
        const { changeModalVisible, changeModalInfo, info } = this.props;
        this.setState({ modelId: null });
        changeModalVisible(true);
        changeModalInfo({  name:'',nameTW:'',nameEN:'',code:'',branchName:'',cardName:'',cardType:'',cardBin:'',cardBinLength:'',numLength:'',isEnabled:true,sortNum:99 });
    }
    //修改
    modifyModel = (record) => {
        const { id,name,nameTW,nameEN,code,branchName,cardName,cardType,cardBin,cardBinLength,numLength,isEnabled,sortNum} = record;
        const { changeModalVisible, changeModalInfo, info } = this.props;
        this.setState({ modelId: id });
        changeModalInfo({ name,nameTW,nameEN,code,branchName,cardName,cardType,cardBin,cardBinLength,numLength,isEnabled,sortNum });
        changeModalVisible(true);
    }
    //删除
    deleteModel = (record) => {
        const confirm = Modal.confirm;
        const { id } = record;
        const { deleteModel } = this.props;
        confirm({
            title: '确认操作',
            content: '确定要删除该银行卡BIN记录么？',
            onOk() {
              deleteModel({id});
            },
            onCancel() {},
          });

    }

    handleModalCancel = () => {
        const { changeModalVisible } = this.props;
        changeModalVisible(false);
    }

    handleModalOk = (obj) => {
        const { modelId } = this.state;
        const { addModel, updateModel } = this.props;
        if(modelId) {
            updateModel({ ...obj, id: modelId });
            return;
        }
        addModel(obj);
    }

    handleSearch = (obj) => {
        let { name, cardName, branchName, cardType } = obj;
        const { getTableData } = this.props;
        const params = { name, cardName, branchName, cardType, pageSize: 10, pageNum: 1 };
        this.searchParams = params;
        getTableData(params);
    }
    
    handlePageChange = (pagination) => {
        const { current, pageSize } = pagination;
        const { getTableData } = this.props;
        getTableData({ ...this.searchParams, pageSize, pageNum: current});
    }



    componentDidMount() {
        const { getTableData } = this.props;
        getTableData({ pageSize: 10, pageNum: 1 });
    }

    render() {
        const { tableData: { data, pagination }, loading, visible, info } = this.props;
        return (
            <div>
                <SearchList  handleSearch={this.handleSearch} />
                <Button type={'primary'} onClick={this.handleAddModel}>添加</Button>
                <CommonTable handlePageChange={this.handlePageChange} columns={this.columns} dataSource={data} pagination={pagination} loading={loading}/>
                <EditModel visible={visible}  info={info} handleCancel={this.handleModalCancel} handleOk={this.handleModalOk}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { payAndSettleManageState: { payCommBankListState } } = state;
    
    return {
        tableData: payCommBankListState['data'],
        loading: payCommBankListState['loading'],
        visible: payCommBankListState['visible'],
        info: payCommBankListState['modalInfo']
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData:       payCommBankListAction.payCommBankGetTableData,
        changeModalVisible: payCommBankListAction.payCommBankChangeModalVisible,
        changeModalInfo:    payCommBankListAction.payCommBankChangeModalInfo,
        addModel:         payCommBankListAction.payCommBankAddTableData,
        updateModel:      payCommBankListAction.payCommBankUpdateTableData,
        deleteModel:        payCommBankListAction.deleteModel
    },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PayCommBankList);