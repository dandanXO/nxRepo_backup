import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './CheckResult.less';
import { Form, Radio, Input, Button, Popconfirm, Select } from 'antd';
import {injectIntl, FormattedMessage} from "react-intl";

const Option = Select.Option;

const {TextArea} = Input;
import {covertUrlParams} from 'utils';

const refuseReason = [
    <FormattedMessage id='refuseReason.no.answer.turn.off' />,
    <FormattedMessage id='refuseReason.no.need.wrongly.click' />,
    <FormattedMessage id='refuseReason.low.version.unwilling.update' />,
    <FormattedMessage id='refuseReason.fee.too.high' />,
    <FormattedMessage id='refuseReason.period.too.short' />,
    <FormattedMessage id='refuseReason.troublesome.operation' />,
    <FormattedMessage id='refuseReason.other' />
];
const backListReason = [
    <FormattedMessage id='backListReason.you.dun.not.pass' />,
    <FormattedMessage id='backListReason.lost.mode.lock' />,
    <FormattedMessage id='backListReason.no.num.no.sim' />,
    <FormattedMessage id='backListReason.short.signal.too.much' />,
    <FormattedMessage id='backListReason.address.book.not.know.much' />,
    <FormattedMessage id='backListReason.other' />
];


class CheckResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowConfirm: false,
            radioValue: '1',
            isShowRemark: false
        };
    }
    formItemLayout = {
        labelCol: {span: 4},
        wrapperCol: {span: 20}
    }
    prevHandleClick = () => {
        const { history, location: { pathname } } = this.props;
        history.push(`${pathname}?option=operatorInfo`);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const _this = this;
        const {form: {getFieldsValue, validateFields}} = this.props;
        validateFields((err, values) => {
            if(err) {
                return;
            }
            _this.props.handleSubmit(getFieldsValue());
        })

    }
    handleChange = (e) => {
        const { form: { setFieldsValue } } = this.props;
        const value = e.target.value;
        const isShowConfirm = value === '2';
        this.setState({
            isShowConfirm,
            radioValue: value,
            isShowRemark: false
        }, () => {
            if(value === "1") {
                setFieldsValue({ reason: '' });
                return;
            }
            setFieldsValue({
                reason: value === '2' ? backListReason[0] : refuseReason[0]
            });
        });
    }

    selectChange = (e) => {
        console.log(e);
        this.setState({
            isShowRemark: e ===  this.props.intl.formatMessage({id : 'backListReason.other'})
        })
    }

    renderRemark = () => {
        const { isLastCheck, form: { getFieldDecorator }, intl } = this.props;
        const { radioValue, isShowRemark } = this.state;
        if(isLastCheck || radioValue === '1') {
            return (
                <Form.Item {...this.formItemLayout} label={intl.formatMessage({id : "windowPage.reason"})}>
                    {
                        getFieldDecorator('reason', {
                            initialValue: ''
                        })(
                            <TextArea rows={6}/>
                        )
                    }
                </Form.Item>
            );
        }
        const data = String(radioValue) === '0' ? refuseReason : backListReason;
        const ele = data.map((item, index) => {  
                           const txt = this.props.intl.formatMessage({id: item.props.id});
                           return <Option value={txt} key={index} >{txt}</Option>
                    });
        return [
            <Form.Item key={'0'} {...this.formItemLayout} label={intl.formatMessage({id : "windowPage.reason"})}>
                {
                    getFieldDecorator('reason', {
                        initialValue: intl.formatMessage({id : "windowPage.not.accept.icloud"})
                    })(
                        <Select onChange={this.selectChange}>
                            {ele}
                        </Select>
                    )
                }
            </Form.Item>
        ].concat(isShowRemark ? [
            <Form.Item key={'1'} {...this.formItemLayout} label={intl.formatMessage({id : "windowPage.remarks"})}>
                {
                    getFieldDecorator('remark', {
                        initialValue: '',
                        rules: [
                            { required: true, message: intl.formatMessage({id : "windowPage.remarks.empty"}) }
                        ]
                    })(
                        <TextArea rows={6}/>
                    )
                }
            </Form.Item>
        ] : []);

    }



    renderRadio = () => {
        const {isLastCheck, intl} = this.props;
        return !isLastCheck ?
            <Radio.Group onChange={this.handleChange}>
                <Radio.Button value="1"><FormattedMessage id="windowPage.exam.pass" /></Radio.Button>
                <Radio.Button value="0"><FormattedMessage id="windowPage.exam.not.pass" /></Radio.Button>
                <Radio.Button value="2"><FormattedMessage id="windowPage.enter.blacklist" /></Radio.Button>
            </Radio.Group> :
            <Radio.Group>
                <Radio.Button value="1"><FormattedMessage id="windowPage.exam.pass" /></Radio.Button>
                <Radio.Button value="0"><FormattedMessage id="windowPage.disallowance" /></Radio.Button>
            </Radio.Group>
    }

    render() {
        const {form: {getFieldDecorator}, loading, intl} = this.props;
        return (
            <div className={styles.checkWrapper}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item {...this.formItemLayout} label={intl.formatMessage({id : "windowPage.exam.result"})}>
                        {
                            getFieldDecorator('checkOption', {
                                initialValue: '1'
                            })(
                                this.renderRadio()
                            )
                        }
                    </Form.Item>
                    {
                        this.renderRemark()
                    }
                    {/*<Form.Item {...this.formItemLayout} label={'原因'}>*/}
                        {/*{*/}
                            {/*getFieldDecorator('reason', {*/}
                                {/*initialValue: ''*/}
                            {/*})(*/}
                                {/*<Select>*/}
                                {/*</Select>*/}
                            {/*)*/}
                        {/*}*/}
                    {/*</Form.Item>*/}
                    {/*<Form.Item {...this.formItemLayout} label={'备注'}>*/}
                        {/*{*/}
                            {/*getFieldDecorator('remark', {*/}
                                {/*initialValue: ''*/}
                            {/*})(*/}
                                {/*<TextArea rows={6}/>*/}
                            {/*)*/}
                        {/*}*/}
                    {/*</Form.Item>*/}
                    <Form.Item className={styles.formItem} wrapperCol={{offset: 4}}>
                        <Button type={'primary'} onClick={this.prevHandleClick}><FormattedMessage id="windowPage.previous.step" /></Button>
                        {
                            this.state.isShowConfirm ? (
                                <Popconfirm title={intl.formatMessage({id : "windowPage.confirm.enter.blacklist"})} onConfirm={this.handleSubmit}>
                                    <Button loading={loading} type="primary" htmlType="submit"><FormattedMessage id="windowPage.submit" /></Button>
                                </Popconfirm>
                            ) :  <Button loading={loading} type="primary" htmlType="submit"><FormattedMessage id="windowPage.submit" /></Button>
                        }

                    </Form.Item>
                </Form>
            </div>
        );
    }

}

CheckResult.propTypes = {
    handleSubmit: PropTypes.func,
    loading: PropTypes.bool,
    isLastCheck: PropTypes.bool,
    intl: PropTypes.object.isRequired,
}
CheckResult.defaultProps = {
    handleSubmit() {
    },
    loading: false,
    isLastCheck: false
}
export default withRouter(Form.create()(injectIntl(CheckResult)));