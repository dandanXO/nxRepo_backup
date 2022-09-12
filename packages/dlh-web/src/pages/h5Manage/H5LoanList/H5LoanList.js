import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import { Row, Col, Button, message } from 'antd';
import { bindActionCreators } from 'redux';
import SortItem from './SortItem/SortItem';
import { h5LoanListAction } from './index';
import styles from './H5LoanList.less';
import AddItemModal from './AddItemModal/AddItemModal';
import { axios } from 'utils';
import {injectIntl, FormattedMessage} from "react-intl";
import PropTypes from 'prop-types';


const convertParams = (obj) => {
    const isArr = Array.isArray(obj['upload']) && obj['upload'].length > 0;
    let file = '';
    if(isArr) {
        const info = obj['upload'][0];
        file = info['response'] ? info['response']['key'] : '';
    }
    return {
        loanSpeed: obj['time'],
        loanUnit: obj['timeUnit'],
        logo: file,
        name: obj['name'],
        quota: obj['money'],
        rate: obj['rate'],
        rateUnit: obj['rateUnit'],
        title: obj['description'],
        url: obj['url'],
        type: obj['type'],
        status:obj['status']
    };
}

const convertData = (obj) => {
    const fileName = {
        uid: -1,
        name: 'abc.png',
        // status: 'done',
        url: obj['logo']
    }
    return {
        fileList: { value: [fileName] },
        rateUnit: { value: obj['rateUnit'] },
        timeUnit: { value: obj['loanUnit'] },
        name: { value: obj['name'] },
        description: { value: obj['title'] },
        money: { value: obj['quota'] },
        rate: { value: obj['rate'] },
        time: { value: obj['loanSpeed'] },
        url: { value: obj['url'] },
        status: { value: obj['status'] },
        type: { value: obj['type'] }
    };
}



class H5LoanList extends Component {
    constructor(props) {
        super(props);
        this.initParams = {
            fileList: { value: [] },
            rateUnit: { value: props.intl.formatMessage({id : "page.table.dates"}) },
            timeUnit: { value: props.intl.formatMessage({id : "page.table.mins"})},
            name: { value: '' },
            description: { value: '' },
            money: { value: '' },
            rate: { value: '' },
            time: { value: '' },
            url: { value: '' },
            status:{value:'1'},
            type:{value:'1'}
        };
        this.state = {
            tableData: this.props.tableData,
            info: { ...this.initParams },
            uploadType:''
        };

        this.itemId = '';

        const _this = this;
        this.SortableItem = SortableElement(({ isLast, info }) =>
            <SortItem isLast={isLast} info={info} handleDelete={_this.handleDelete} handleEdit={_this.handleEdit}/>
        );

        this.SortableList = SortableContainer(({ items }) => {
            const SortableItem = _this.SortableItem;
            return (
                <div>
                    {
                        items.map((item, index) => {
                            const isLast = index === items.length - 1;
                            return <SortableItem key={`item-${index}`} index={index} isLast={isLast} info={item}/>
                        })
                    }
                </div>
            );

        });
    }

    //修改item
    handleEdit = (info) => {
        const { changeModalVisible } = this.props;
        //修改时先保存id
        this.itemId = info['id'];
        const data = convertData(info);
        this.setState({
            info: data
        }, () => {
            changeModalVisible(true);
        });
    }

    handleDelete = (info) => {
        const { id } = info;
        const { deleteItemData } = this.props;
        deleteItemData({ id });
    }
    renderItem = () => {
        const SortableList =  this.SortableList;
        const { tableData } = this.props;
        if(tableData.length === 0) {
            return (
                <Row className={styles.row}>
                    <Col className={styles.col} span={24}><FormattedMessage id="page.table.no.data" /></Col>
                </Row>
            );
        }

        return <SortableList items={tableData} pressDelay={200} helperClass={styles.active} onSortEnd={this.onSortEnd}/>
    }
    onSortEnd = ({ oldIndex, newIndex }) => {
        if(oldIndex === newIndex) {
            return;
        }
        const { tableData, setTableData, sortAllData, getTableData } = this.props;
        const newArr = arrayMove(tableData, oldIndex, newIndex);
        const params = newArr.map((item, index) => ({ id: item.id, sort: index + 1 }));
        setTableData(newArr);
        sortAllData(params, () => {
            getTableData({});
        });
    }

    //添加
    addItem = () => {
        const { changeModalVisible } = this.props;
        //添加时将id制空
        this.itemId = '';
        changeModalVisible(true);
    }
    //获取上传token
    getToken = () => {
        const { getToken } = this.props;
        getToken({});
    }
    //关闭弹框
    handleCancel = () => {
        const { changeModalVisible } = this.props;
        changeModalVisible(false);

    }
    //关闭弹框之后的回调
    afterClose = () => {
        this.setState({
            info: { ...this.initParams }
        });
    }
    //提交结果
    handleOk = (obj) => {
        const { addListItem, modifyItemData } = this.props;
        let params = convertParams(obj);
        if(this.itemId === '') {
            addListItem(params);
            return;
        }
        modifyItemData({ ...params, id: this.itemId });
    }
    fieldsHandleChange = (obj) => {
        this.setState(prevState => ({
            info: { ...prevState.info, ...obj }
        }));
    }

    componentDidMount() {
        const { getTableData } = this.props;
        getTableData({});

        try {      
            const _this = this;    
            axios({
                url: '/hs/admin/loanPlatform/getUploadImgToken',
                method: 'post'
            }).then((res) => {
                if(res && res.code == '200') {
                    let { data } = res;
                    _this.setState({
                        uploadType:data.ossType
                    });
                }
            });
        } catch (e) {
    
        }
    }

    render() {
        const { visible, uploadFile } = this.props;
        const { uploadType } = this.state;
        return (
            <div>
                <div className={styles.btnWrapper}>
                    <Button type={'primary'} onClick={this.addItem}><FormattedMessage id="page.table.add" /></Button>
                </div>

                <div className={styles.rowWrapper}>
                    <Row className={styles.row}>
                        <Col className={styles.col} span={2}><FormattedMessage id="page.search.list.time" /></Col>
                        <Col className={styles.col} span={2}><FormattedMessage id="page.table.product.name" /></Col>
                        <Col className={styles.col} span={3}><FormattedMessage id="page.table.subtitle" /></Col>
                        <Col className={styles.col} span={2}><FormattedMessage id="page.table.amount.range" /></Col>
                        <Col className={styles.col} span={2}><FormattedMessage id="page.table.interest.rates" /></Col>
                        <Col className={styles.col} span={2}><FormattedMessage id="page.table.loan.times" /></Col>
                        <Col className={styles.col} span={3}><FormattedMessage id="page.table.jump.link" /></Col>
                        <Col className={styles.col} span={2}><FormattedMessage id="page.table.logo.pic" /></Col>
                        <Col className={styles.col} span={2}><FormattedMessage id="page.table.display.status" /></Col>
                        <Col className={styles.col} span={2}><FormattedMessage id="page.table.display.types" /></Col>
                        <Col className={styles.col} span={2}><FormattedMessage id="page.table.operation" /></Col>
                    </Row>
                    {this.renderItem()}
                    <AddItemModal
                        visible={visible}
                        getToken={this.getToken}
                        handleOk={this.handleOk}
                        info={this.state.info}
                        fieldsHandleChange={this.fieldsHandleChange}
                        handleCancel={this.handleCancel}
                        fileInfo={uploadFile}
                        afterClose={this.afterClose}
                        uploadType={uploadType}
                    />
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    const { h5ManageState: { h5LoanListState } } = state;
    return {
        tableData: [...h5LoanListState['tableData']],
        visible: h5LoanListState['visible'],
        uploadFile: h5LoanListState['uploadFile']
    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: h5LoanListAction.hllGetTableData,
        setTableData: h5LoanListAction.hllSetTableData,
        changeModalVisible: h5LoanListAction.hllChangeModalVisible,
        getToken: h5LoanListAction.hllGetUploadToken,
        addListItem: h5LoanListAction.hllAddItem,
        sortAllData: h5LoanListAction.hllSortData,
        deleteItemData: h5LoanListAction.hllDeleteData,
        modifyItemData: h5LoanListAction.hllUpdateItem
    }, dispatch);
}

H5LoanList.PropTypes = {
    intl: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(H5LoanList));