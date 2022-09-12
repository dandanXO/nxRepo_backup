import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Card, Button, Row, Col, Upload, Icon, Modal, message, Tooltip} from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import PropTypes from 'prop-types';
import {CommonTable} from 'components';
import styles from './ICloudInfo.less';
import {covertUrlParams} from 'utils';
import {injectIntl, FormattedMessage} from "react-intl";

class ICloudInfo extends Component {


    constructor(props) {
        super(props);
        this.state = {
            previewImage: '',
            previewVisible: false,
            fileList: (this.props.data.picList || []).map((item,index) => ({
                uid: -(index+1),
                status: 'done',
                name: `${index}.png`,
                url: item,
                thumbUrl: item
            })),
            hasCopy: false
        };
        const _this = this;
        this.recordColumns = [
            {
                title: props.intl.formatMessage({id : "windowPage.serial.no"}),
                dataIndex: 'id',
                key: 'id'
            },
            {
                title: props.intl.formatMessage({id : "windowPage.icloud.account"}),
                dataIndex: 'icloudNo',
                key: 'icloudNo',
                render(text) {
                    return (
                        <div className={styles.textWrapper}>
                            <span className={styles.rowText}>{text}</span>

                                <CopyToClipboard text={text} onCopy={_this.onCopy}>
                                    <Tooltip title={this.props.intl.formatMessage({id : "page.table.copy"})}>
                                        <span className={styles.copyWrapper}><Icon type={'copy'}/></span>
                                    </Tooltip>
                                </CopyToClipboard>


                        </div>
                    );
                }
            },
            {
                title: props.intl.formatMessage({id : "windowPage.password"}),
                dataIndex: 'icloudPwd',
                key: 'icloudPwd',
                render(text) {
                    return (
                        <div className={styles.textWrapper}>
                            <span className={styles.rowText}>{text}</span>

                                <CopyToClipboard text={text} onCopy={_this.onCopy}>
                                    <Tooltip title={this.props.intl.formatMessage({id : "page.table.copy"})}>
                                        <span className={styles.copyWrapper}><Icon type={'copy'}/></span>
                                    </Tooltip>
                                </CopyToClipboard>

                        </div>
                    );
                }
            }
        ]
    }


    onCopy = () => {
        message.success(this.props.intl.formatMessage({id : "page.table.copy.success"}), 2);
    }

    renderColumns = () => {
        const { isLastCheck, intl } = this.props;
        const _this = this;
        return !isLastCheck ? this.recordColumns : this.recordColumns.concat([
                {
                    title: intl.formatMessage({id : "windowPage.new.password"}),
                    dataIndex: 'icloudPwdNew',
                    key: 'icloudPwdNew',
                    render(text) {
                        if(!text) {
                            return intl.formatMessage({id : "age.table.none"});
                        }
                        return (
                            <div className={styles.textWrapper}>
                                <span className={styles.rowText}>{text}</span>
                                <CopyToClipboard text={text} onCopy={_this.onCopy}>
                                    <Tooltip title={intl.formatMessage({id : "page.table.copy"})}>
                                        <span className={styles.copyWrapper}><Icon type={'copy'}/></span>
                                    </Tooltip>
                                </CopyToClipboard>



                            </div>
                        );
                    }
                },
                {
                    title: intl.formatMessage({id : "windowPage.password.question1"}),
                    dataIndex: 'icloudSecurityQuestion1',
                    key: 'icloudSecurityQuestion1',
                    render(text, record) {
                        const { icloudSecurityAnswer1 } = record;
                        return (
                            <div>
                                <div><FormattedMessage id="windowPage.question" />：{text}</div>
                                <div><FormattedMessage id="windowPage.answer" />：{icloudSecurityAnswer1}</div>
                            </div>
                        );
                    }
                },
                {
                    title: intl.formatMessage({id : "windowPage.password.question2"}),
                    dataIndex: 'icloudSecurityQuestion2',
                    key: 'icloudSecurityQuestion2',
                    render(text, record) {
                        const { icloudSecurityAnswer2 } = record;
                        return (
                            <div>
                                <div><FormattedMessage id="windowPage.question" />：{text}</div>
                                <div><FormattedMessage id="windowPage.answer" />：{icloudSecurityAnswer2}</div>
                            </div>
                        );
                    }
                },
                {
                    title: intl.formatMessage({id : "windowPage.password.question3"}),
                    dataIndex: 'icloudSecurityQuestion3',
                    key: 'icloudSecurityQuestion3',
                    render(text, record) {
                        const { icloudSecurityAnswer3 } = record;
                        return (
                            <div>
                                <div><FormattedMessage id="windowPage.question" />：{text}</div>
                                <div><FormattedMessage id="windowPage.answer" />：{icloudSecurityAnswer3}</div>
                            </div>
                        );
                    }
                }]
        )

    }

    clickUploadBtn = () => {
        //上传之前先判断是否分配icloud
        const { data: { accountInfo = [] }, intl } = this.props;
        if(!accountInfo || accountInfo.length === 0) {
            message.warn(intl.formatMessage({id : "windowPage.assign.icloud.first"}));
            return false;
        }
        //请求接口拿到上传token
        this.props.clickUploadBtn();
    }


    renderImg = () => {
        const {data: { picList = [] }} = this.props;
        return (
            <div className={styles.iCloudImgWrapper}>
                <Row gutter={176}>
                    {
                        picList.map((item, index) => {
                            return (
                                <Col span={12} key={index}><img width={'100%'} alt={'img'} src={item}/></Col>
                            );
                        })
                    }
                </Row>
            </div>

        );
    }

    //render iCloud table header
    renderTableTitle = () => {
        const { data: {accountInfo = []}, isLastCheck, distributeAccount, btnDisabled } = this.props;
        const isDistribute = accountInfo.length === 0;
        // const ele = isDistribute ? '分配' : '重新分配';
        return (
            <Row>
                <Col span={12}>
                    <FormattedMessage id="windowPage.icloud.info" />
                </Col>
                {
                    isLastCheck ?
                        <Col className={styles.btnWrapper} span={12}>
                            <Button onClick={this.modifyPassword} type={'primary'}><FormattedMessage id="windowPage.change.password" /></Button>
                        </Col> :
                        <Col className={styles.btnWrapper} span={12}>
                            <Button disabled={btnDisabled} onClick={() => distributeAccount(false)} type={'primary'}><FormattedMessage id="windowPage.assign.inactive.account" /></Button>
                            <Button disabled={btnDisabled} onClick={() => distributeAccount(true)} type={'primary'}><FormattedMessage id="windowPage.assign.active.account" /></Button>
                        </Col>
                }
            </Row>

        );
    }
    againUpload = () => {
        this.setState({ fileList: [] });
        this.props.clickUploadBtn();
    }
    //render Upload plus icon
    renderUploadIcon = () => {
        const {fileList} = this.state;
        //最多显示3张
        if (fileList.length >= 2) {
            return (
                <div onClick={this.againUpload} className={styles.plus}>
                    <Icon type={'plus'}/>
                    <div><FormattedMessage id="windowPage.reupload" /></div>
                </div>
            );
        }
        return (
            <div onClick={this.clickUploadBtn} className={styles.plus}>
                <Icon type={'plus'}/>
                <div><FormattedMessage  id="windowPage.upload.pic" /></div>
            </div>
        );
    }
    //picture preview
    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true
        });
    }
    handleCancel = () => this.setState({previewVisible: false})

    handleChange = (info) => {
        const {file, fileList} = info;
        if (file.status === 'error') {
            message.error(this.props.intl.formatMessage({id : "windowPage.upload.failed"}));
        }
        this.setState({fileList}, () => {
            console.log(this.state.fileList)
            this.props.uploadSuccessCb(info.fileList);
        });
    }
    handleRemove = () => {
        return false;
    }

    prevHandleClick = () => {
        const { history, location: { pathname } } = this.props;
        history.push(`${pathname}?option=operatorInfo`);
    }
    nextHandleClick = () => {
        const { history, location: { pathname } } = this.props;
        history.push(`${pathname}?option=checkResult`);
    }
    modifyPassword = () => {
        const { data, modifyPassword } = this.props;
        const { accountInfo = [] } = data;
        if(accountInfo.length > 0) {
            const id = accountInfo[0]['id'];
            modifyPassword(id);
        }
    }


    render() {
        const {data, isLastCheck, intl} = this.props;
        const columns = this.renderColumns();
        const {previewImage, previewVisible, fileList} = this.state;
        console.log(fileList)
        return (
            <div>
                <div className={styles.cardWrapper}>
                    <CommonTable
                        title={this.renderTableTitle}
                        columns={columns} dataSource={data.accountInfo || []}/>
                </div>
                {/*<div className={styles.cardWrapper}>*/}
                    {/*<Card type={'inner'} title={'手机型号'}>*/}
                        {/*<Row gutter={24}>*/}
                            {/*<Col className={styles.col} span={24}><span*/}
                                {/*className={styles.title}>手机型号：</span><span>{data.iphoneType}</span></Col>*/}
                        {/*</Row>*/}
                    {/*</Card>*/}
                {/*</div>*/}
                <div className={styles.cardWrapper}>
                    <Card type={'inner'} title={intl.formatMessage({id : "windowPage.customer.screenshot.data"})}>
                        {
                            isLastCheck ?
                                this.renderImg() :
                                <div>
                                    <Upload
                                        action={'http://up.qiniup.com'}
                                        listType="picture-card"
                                        fileList={fileList}
                                        disabled={(data.accountInfo || []).length === 0}
                                        data={data['uploadInfo']}
                                        showUploadList={{ showPreviewIcon: true, showRemoveIcon: false }}
                                        onPreview={this.handlePreview}
                                        onChange={this.handleChange}
                                        onRemove={this.handleRemove}
                                    >
                                        {this.renderUploadIcon()}
                                    </Upload>

                                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                        <div className={styles.imgWrapper}>
                                            <img alt="img" style={{width: '100%'}} src={previewImage}/>
                                        </div>
                                    </Modal>
                                </div>
                        }

                    </Card>
                </div>
                <div className={`${styles.cardWrapper} ${styles.bottomBtn}`}>
                    <Button type={'primary'} onClick={this.prevHandleClick}><FormattedMessage id="windowPage.previous.step" /></Button>
                    <Button type={'primary'} onClick={this.nextHandleClick}><FormattedMessage id="windowPage.next.step" /></Button>
                </div>
            </div>
        );
    }
}

ICloudInfo.propTypes = {
    data: PropTypes.object,
    clickUploadBtn: PropTypes.func,
    uploadSuccessCb: PropTypes.func,
    isLastCheck: PropTypes.bool,
    distributeAccount: PropTypes.func,
    modifyPassword: PropTypes.func,
    btnDisabled: PropTypes.bool,
    intl: PropTypes.object.isRequired,
}
ICloudInfo.defaultProps = {
    data: {
        accountInfo: [],
        // iphoneType: 'iphone 6',
        picList: [],
        uploadInfo: {
            token: '',
            key: ''
        },
        orderId: ''
    },
    isLastCheck: false,
    clickUploadBtn: ()  => {
    },
    uploadSuccessCb() {

    },
    distributeAccount() {},
    modifyPassword(){},
    btnDisabled: false
}

export default withRouter(injectIntl(ICloudInfo));