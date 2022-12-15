import React, { Component } from 'react';
import {Modal, Form, Select, Input, Radio, message, Switch} from 'antd';
import PropTypes from 'prop-types';
import {injectIntl, FormattedMessage} from "react-intl";
import {getIsSuperAdmin} from "../../../../utils";

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

class AddModal extends Component{
    layout = {
        labelCol: {
            span: 7
        },
        wrapperCol: {
            span: 17
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            groupsData: this.props.groupsData,
            info:this.props.info
        };
    }

    onOk = () => {
        const { handleOk, form: { getFieldsValue, getFieldValue } } = this.props;

        if (getFieldValue('passwordLogin') == 1){
            let pStr = getFieldValue('password');
            if (pStr == null || String(pStr).trim().length == 0){
                message.warning('please input the password', 3);
                return;
            }
        }
        handleOk(getFieldsValue());
    }

    onCancel = () => {
        const { form: { resetFields }, handleCancel } = this.props
        resetFields();
        this.setState({ info: {} })
        handleCancel();
    }

    renderDepartment = () => {
        const { departmentData } = this.props;
        return departmentData.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)
    }
    renderRole = () => {
        const { roleData } = this.props;
        return roleData.map(item => <Option key={item.id} value={item.id} >{item.name}</Option>)
    }

    renderTeam = () => {
        const { teamsData } = this.props;
        return teamsData.map(item => <Option key={item.id} value={item.id} >{item.name}</Option>)
    }


    renderGroup = () => {
        const { groupsData } = this.props;
        return groupsData.map(item => <Option key={item.id} value={item.id} >{item.name}</Option>)
    }
    handleTeamOnChange = (value) => {
        const { getGroupsData, form: { getFieldsValue } } = this.props
        getGroupsData(value, '')
        this.setState({info: {...getFieldsValue()}})
    }

    static getDerivedStateFromProps(props, state) {
        const { form: { setFieldsValue }, groupsData, collectTeamId, collectGroupId } = props;
        if (groupsData !== state.groupsData) {
            setFieldsValue({
                ...state.info,
                collectTeamId: collectTeamId,
                collectGroupId: collectGroupId,
            });
            return {
                groupsData: groupsData
            };
        }
        return null;
    }


    renderMerchants = () => {
      const { allMerchants } = this.props
      if(!allMerchants) return;
      const ele = allMerchants.map(item => <Option key={item.merchantId} value={item.merchantId} >{item.name}</Option>);
      return [<Option key={'merchantIdOption'} value=""><FormattedMessage id="page.search.list.select" /></Option>].concat(ele)
    }

    render() {
        const { visible, form: { getFieldDecorator }, intl ,groupsData, isSuperAdmin } = this.props;
        return (
            <Modal
                onOk={this.onOk}
                onCancel={this.onCancel}
                width={500}
                visible={visible}
                title={intl.formatMessage({id : "windowPage.add.modify.staff"})}

            >
                <Form>
                    {isSuperAdmin && (
                      <FormItem
                        required={true}
                        label={intl.formatMessage({id : "page.search.list.merchantName"})}
                        {...this.layout}
                      >
                        {
                          getFieldDecorator('merchantId', {
                            initialValue: ''
                          })(
                            <Select>
                              {this.renderMerchants()}
                            </Select>
                          )
                        }
                      </FormItem>
                    )}
                    <FormItem required={true} label={intl.formatMessage({id : "page.search.list.name"})} {...this.layout}>
                        {
                            getFieldDecorator('trueName', {})(
                                <Input placeholder={intl.formatMessage({id : "page.search.list.name.enter"})} />
                            )
                        }
                    </FormItem>

                    <FormItem required={true} label={intl.formatMessage({id : "page.search.list.mobile"})} {...this.layout}>
                        {
                            getFieldDecorator('phoneNo', {})(
                                <Input placeholder={intl.formatMessage({id : "page.search.list.mobile.enter"})} />
                            )
                        }
                    </FormItem>

                    <FormItem required={true} label={intl.formatMessage({id : "page.search.list.account"})} {...this.layout}>
                      {
                        getFieldDecorator('userName', {})(
                          <Input placeholder={intl.formatMessage({id : "page.search.list.account.enter"})} />
                        )
                      }
                    </FormItem>

                    <FormItem required={true}  label={intl.formatMessage({id : "windowPage.password"})} {...this.layout}>
                      {
                        getFieldDecorator('password', {})(
                          <Input placeholder={intl.formatMessage({id : "windowPage.password"})} />
                        )
                      }
                    </FormItem>
                    <FormItem required={true} label={intl.formatMessage({id : "page.table.department"})} {...this.layout}>
                        {
                            getFieldDecorator('departmentId', {})(
                                <Select>
                                    {this.renderDepartment()}
                                </Select>
                            )
                        }
                    </FormItem>

                    <FormItem required={true} label={intl.formatMessage({id : "page.table.department.leader"})} {...this.layout}>
                      {
                        getFieldDecorator('deptManager', {
                          valuePropName: 'checked',
                          initialValue: false
                        })(
                          <Switch checkedChildren={intl.formatMessage({id : "page.table.yes"})} unCheckedChildren={intl.formatMessage({id : "page.table.no"})} />
                        )
                      }
                    </FormItem>

                    <FormItem required={true} label={intl.formatMessage({id : "page.search.list.roles"})} {...this.layout}>
                        {
                            getFieldDecorator('roleId', {})(
                                <Select>
                                    {this.renderRole()}
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem required={true} label={intl.formatMessage({ id: "page.table.collect-team" })} {...this.layout}>
                        {
                            getFieldDecorator('collectTeamId', { initialValue: "" })(
                                <Select onChange={this.handleTeamOnChange}>
                                    <Option key={'teamOption'} value=""><FormattedMessage id="page.search.list.select" /></Option>
                                    {this.renderTeam()}
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem required={true} label={intl.formatMessage({ id: "page.table.collect-group" })} {...this.layout}>
                        {
                            getFieldDecorator('collectGroupId', { initialValue: "" })(
                                <Select>
                                    {groupsData.length && <Option key={'groupOption'} value=""><FormattedMessage id="page.search.list.select" /></Option>}
                                    {this.renderGroup()}
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem label={intl.formatMessage({id : "page.search.list.status"})} {...this.layout}>
                        {
                            getFieldDecorator('enabled', {})(
                                <RadioGroup>
                                    <Radio value={1}><FormattedMessage id="page.search.list.normal" /></Radio>
                                    <Radio value={0}><FormattedMessage id= "page.search.list.freeze" /></Radio>
                                </RadioGroup>
                            )
                        }
                    </FormItem>
                    <FormItem label={intl.formatMessage({id : "page.search.list.google.auth"})} {...this.layout}>
                        {
                            getFieldDecorator('googleAuthFlag', {})(
                                <RadioGroup>
                                    <Radio value={1}><FormattedMessage id="page.table.enabled" /></Radio>
                                    <Radio value={0}><FormattedMessage id="page.table.disabled" /></Radio>
                                </RadioGroup>
                            )
                        }
                    </FormItem>
                    <FormItem label={intl.formatMessage({id : "windowPage.login.password"})} {...this.layout}>
                        {
                            getFieldDecorator('passwordLogin', {})(
                                <RadioGroup>
                                    <Radio value={1}><FormattedMessage id="page.table.enabled" /></Radio>
                                    <Radio value={0}><FormattedMessage id="page.table.disabled" /></Radio>
                                </RadioGroup>
                            )
                        }
                    </FormItem>

                </Form>
            </Modal>
        );
    }
}
AddModal.propTypes = {
    visible: PropTypes.bool,
    handleOk: PropTypes.func,
    handleCancel: PropTypes.func,
    info: PropTypes.object,
    departmentData: PropTypes.array,
    roleData: PropTypes.array,
    teamsData: PropTypes.array,
    groupsData: PropTypes.array,
    collectTeamId: PropTypes.string,
    collectGroupId: PropTypes.string,
    intl: PropTypes.object.isRequired,
};

AddModal.deafultProps = {
    visible: false,
    handleOk(){},
    handleCancel(){},
    info: {},
    departmentData: [],
    roleData: [],
    teamsData: [],
    groupsData: [],
    collectTeamId:'',
    collectGroupId:''
};

export default Form.create({
    mapPropsToFields(props){
        const { info = {} } = props;
        return {
            userName: Form.createFormField({
                value: info['userName'] || ''
            }),
            trueName: Form.createFormField({
                value: info['trueName'] || ''
            }),
            phoneNo: Form.createFormField({
                value: info['phoneNo'] || ''
            }),
            departmentId: Form.createFormField({
                value: info['departmentId'] || ''
            }),
            roleId: Form.createFormField({
                value: info['roleId'] || ''
            }),
            collectTeamId: Form.createFormField({
                value: info['collectTeamId'] || ''
            }),
            collectGroupId: Form.createFormField({
                value: info['collectGroupId'] || ''
            }),
            enabled: Form.createFormField({
                value: info['enabled']
            }),
            googleAuthFlag: Form.createFormField({
                value: info['googleAuthFlag']
            }),
            passwordLogin: Form.createFormField({
                value: info['passwordLogin']
            }),
            password: Form.createFormField({
                value: info['password'] || ''
            }),
            merchantId: Form.createFormField({
              value: info['merchantId'] || "",
            }),
            deptManager: Form.createFormField({
              value: info['deptManager'],
            }),

        };
    }
})(injectIntl(AddModal));
