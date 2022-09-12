import React, { Component } from 'react';
import { Icon, Tooltip,Popconfirm, message,Button,Modal } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import { CommonTable } from 'components';
import { axios, orderStatus } from 'utils';
import {convertMoneyFormat} from "utils";
import {injectIntl, FormattedMessage} from "react-intl";

const loanStatus = {
    0: <FormattedMessage id="loan.status.zero" />,
    1: <FormattedMessage id="loan.status.one" />,
    4: <FormattedMessage id="loan.status.four" />,
    5: <FormattedMessage id="loan.status.five" />
}


const getParams = () => {
    return {
        remark: {
            value: ''
        },
        smsCode: {
            value: ''
        }
    };
}



class DetailModal extends Component{

    constructor(props) {
        super(props);
        const _this = this;
        this.state = {

            adminUserInfo:{},
     
        };
    
        this.columns = [
            { title: props.intl.formatMessage({id : "page.search.list.order.no"}), dataIndex: 'orderNo', key: 'orderNo' },
            { title: props.intl.formatMessage({id : "page.search.list.name"}), dataIndex: 'userTrueName', key: 'userTrueName' },
            { title: props.intl.formatMessage({id : "page.search.list.mobile"}), dataIndex: 'userPhone', key: 'userPhone' },
            {
                title: props.intl.formatMessage({id : "page.search.list.appication.time"}),
                dataIndex: 'addTime',
                key: 'addTime',
                render(text) {
                    return moment(Number(text) * 1000).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            {
                title: props.intl.formatMessage({id : "page.search.list.extend.time"}),
                dataIndex: 'lengTime',
                key: 'lengTime',
                render(text) {
                    return text == null || text == undefined ? '-' : moment(Number(text) * 1000).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            { title: props.intl.formatMessage({id : "page.table.loan.period"}), dataIndex: 'lendDays', key: 'lendDays' },
            {
                title: props.intl.formatMessage({id : "page.search.list.expiration.time"}),
                dataIndex: 'expireTime',
                key: 'expireTime',
                render(text) {
                    return moment(Number(text) * 1000).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            {
                title: props.intl.formatMessage({id : "page.table.extend.num.period"}),
                dataIndex: 'lengPeriod',
                key: 'lengPeriod',
                render(text, record) {
                    return isNaN(text) ? "-":text +1;
                }
            },
            {
                title: props.intl.formatMessage({id : "page.table.extend.fee.curreny"}),
                dataIndex: 'hadPaidLengMoney',
                key: 'hadPaidLengMoney',
                render(text, record) {
                    return convertMoneyFormat(text);
                }
            },
            {
                title: props.intl.formatMessage({id : "page.table.operation"}),
                dataIndex: 'id',
                key: 'id',
                render(text, record, index){

                    if(!record.lengTime){
                        return (
                            <div>
                                {//超级管理员，方可操作
                                // (!!adminUserInfo && adminUserInfo.roleId == 1) && <Popconfirm title={'确认要删除该条展期吗？'} onConfirm={() => _this.deleteLengRecord(record)}>
                                //     <Tooltip title={"删除该条展期"}>
                                //         <span><Icon type="close" /></span>
                                //     </Tooltip>
                                // </Popconfirm>
                                <Tooltip title={_this.props.intl.formatMessage({id : "windowPage.extend.callback"})}>
                                <span onClick={() => _this.props.handleDeleteModel(record)}><Icon type={'edit'}/></span>
                                </Tooltip>
                                }                     
                            </div>
                        );
                    }
                }
            }
        ]
    }

 

    render() {
        const { visible, afterClose, modalData: { data, pagination,total }, modalLoading, handlePageChange, handleCancel, intl } = this.props;
        return (
            <Modal
                footer={null}
                width={1000}
                visible={visible}
                onCancel={handleCancel}
                afterClose={afterClose}
                title={intl.formatMessage({id : "windowPage.extend.hist.list"})}>
                   
                <div>
                    <CommonTable
                        columns={this.columns}
                        loading={modalLoading}
                        pagination={pagination}
                        dataSource={data}
                        pageSize={10}
                        handlePageChange={handlePageChange}
                    />
                    
                </div>
            </Modal>
        );
    }


    componentDidMount() {
        const _this = this;
       
        axios({
            url: '/hs/admin/auth/getInfo',
            method: 'post'
        }).then((res) => {
         
            if(res && res.code == '200') {
                let { data } = res;
                _this.setState({
                    adminUserInfo: data,
                   
                });
            }
        });
    }

 //删掉展期信息
 deleteLengRecord = (obj) => {
        
    Modal.confirm({
        title: this.props.intl.formatMessage({id :"page.table.confirm.operation"}),
        content:  this.props.intl.formatMessage({id :"windowPage.extend.info.delete.confirm"}),
        onOk() {
            console.log(obj)
            try {
                axios({
                    url: '/hs/admin/order/deleteLengRecord',
                    method: 'post',
                    data: {id:obj.id}
                }).then((res) => {
                    if(res && res.code == '200') {
                        message.success(res.data.msg || res.data);
                    }else{
                        message.error(res.data.msg || res.data);
                    }
                    
                    document.getElementsByClassName("ant-modal-close-x")[0].click();
                    setTimeout(function(){
                        document.getElementsByClassName("ant-btn-primary")[0].click(); //页面刷新
                    },1000);  
                });
            } catch (e) {
            }
        },
        onCancel() {},
      });
};



}

DetailModal.propTypes = {
    visible: PropTypes.bool,
    modalData: PropTypes.object,
    modalLoading: PropTypes.bool,
    afterClose: PropTypes.func,
    handlePageChange: PropTypes.func,
    handleCancel: PropTypes.func,
    handleDeleteModel: PropTypes.func,
    currentDetailPage: PropTypes.Number,
    intl: PropTypes.object.isRequired,
};
DetailModal.defaultProps = {
    visible: false,
    modalData: {},
    modalLoading: false,
    currentDetailPage:1,
    afterClose() {
    },
    handlePageChange() {
    },
    handleCancel() {

    },
    handleDeleteModel(){}
    
};
export default injectIntl(DetailModal);