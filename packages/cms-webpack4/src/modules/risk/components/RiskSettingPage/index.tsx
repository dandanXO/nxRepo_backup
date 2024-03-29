import { ProColumns } from '@ant-design/pro-components';
import { useForm } from 'antd/es/form/Form';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { GetProductListResponseProduct } from '../../../product/service/product/domain/getProductList';
import AdminPage from '../../../shared/components/common/AdminPage';
import { AdminTable, ModalContent } from '../../../shared/components/common/AdminTable';
import { ProColumnsOperationConstant } from '../../../shared/components/common/ProColumnsOperationConstant';
import { DeepPartial } from '../../../shared/types/custom';
import { CustomAntFormFieldError } from '../../../shared/utils/validation/CustomAntFormFieldError';
import { MssRiskRankVo } from '../../domain/vo/MssRiskRankVo';
import { RiskManageList } from '../../domain/vo/RiskManageList';
import {
    useLazyGetRiskManageListQuery,
    useLazyGetRiskManageQuery,
    useLazyGetRiskModelMenuQuery,
    usePostRiskManageCreateMutation,
    usePutRiskManageCreateMutation,
} from '../../service/RiskApi';
import { GetRiskManageResponse } from '../../service/response/GetRiskManageResponse';
import RiskSettingForm from './RiskSettingForm';
import RiskSettingModal from './RiskSettingModal';

export type FormResponseData = GetRiskManageResponse;

const RiskSettingPage = (): JSX.Element => {
    // NOTE: UI Loading
    const [loading, setLoading] = useState(false);

    // NOTE: Fetch
    const [triggerGetList, { currentData, isFetching }] = useLazyGetRiskManageListQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false,
    });

    // useHook
    useEffect(() => {
        triggerGetList(null);
    }, []);

    useEffect(() => {
        setLoading(isFetching);
    }, [isFetching]);

    // NOTE: Edit
    const [editID, setEditID] = useState<number>();

    // NOTE: Table
    const columns = useMemo(() => {
        const columns: ProColumns<RiskManageList>[] = [
            {
                key: 'option',
                title: '操作',
                valueType: 'option',
                render: (text, record) => {
                    return [
                        <a
                            key="editable"
                            onClick={() => {
                                // console.log("record", record);
                                setEditID(record.id);
                                setShowModalContent({
                                    show: true,
                                    isEdit: true,
                                });
                                setCustomAntFormFieldError({});
                            }}
                        >
                            修改
                        </a>,
                    ];
                },
                width: ProColumnsOperationConstant.width['1'],
            },
            {
                key: 'id',
                dataIndex: 'id',
                hideInSearch: true,
                hideInTable: true,
                // NOTICE:
                // tooltip: "",
                // ellipsis: false,
                // copyable: true,
                // hideInSearch: false,
                // hideInTable: false,
                // hideInForm: false,
                // hideInDescriptions: false,
                // onFilter: true,
                // disable: true,
            },
            { key: 'modelName', title: '风控名称', dataIndex: 'modelName', initialValue: '' },
            {
                key: 'enabled',
                title: '状态',
                dataIndex: 'enabled',
                valueType: 'select',
                initialValue: 'all',
                valueEnum: {
                    all: { text: '全部', status: 'Default' },
                    true: { text: '启用', status: 'Success' },
                    false: { text: '停用', status: 'Default' },
                },
                width: 80,
            },
            { key: 'createTime', title: '创建时间', dataIndex: 'createTime', valueType: 'dateTime' },
            { key: 'updateTime', title: '更新时间', dataIndex: 'updateTime', valueType: 'dateTime' },
        ];
        return columns;
    }, []);

    // NOTICE: Form
    const [form] = useForm();

    // NOTICE: Modal
    // NOTE: autoComplete
    // const onAutoCompleteTemplate = useCallback(() => {
    //     const mockRequest = {
    //         modelName: String(new Date().getTime()),
    //         remark: "remark",
    //         // firstLoan: [
    //         //     {providerRank: 'A', loanCount: '8000'},
    //         //     {providerRank: 'B', loanCount: '6000'},
    //         //     {providerRank: 'C', loanCount: '4000'},
    //         //     {providerRank: 'D', loanCount: '2000'},
    //         //     {providerRank: 'E', loanCount: '0'},
    //         // ],
    //         // repeatLoan: [
    //         //     {providerRank: 'A', loanCount: '8000'},
    //         //     {providerRank: 'B', loanCount: '6000'},
    //         //     {providerRank: 'C', loanCount: '4000'},
    //         //     {providerRank: 'D', loanCount: '2000'},
    //         //     {providerRank: 'E', loanCount: '0'},
    //         // ],
    //         firstLoan: [
    //             { max: 50, min: 58, loanCount: '4000', balance: '200', providerRank: 'A' },
    //             { max: 49, min: 39, loanCount: 3000, balance: '99', providerRank: 'B' },
    //             { max: 38, min: 32, loanCount: 2000, balance: '88', providerRank: 'C' },
    //             { max: 31, min: 22, loanCount: 1000, balance: '77', providerRank: 'D' },
    //             { max: 21, min: 12, loanCount: 0, balance: '66', providerRank: 'E' }
    //         ],
    //         repeatLoan: [
    //             { max: 50, min: 58, loanCount: 4000, balance: '200', providerRank: 'A' },
    //             { max: 49, min: 39, loanCount: 3000, balance: '99', providerRank: 'B' },
    //             { max: 38, min: 32, loanCount: 2000, balance: '88', providerRank: 'C' },
    //             { max: 31, min: 22, loanCount: 1000, balance: '77', providerRank: 'D' },
    //             { max: 21, min: 12, loanCount: 0, balance: '66', providerRank: 'E' }
    //         ],
    //         riskModelName: 1,
    //         useRcQuota: true,
    //         enabled: true,
    //     };
    //     form.setFieldsValue(mockRequest);
    // }, [form]);

    // NOTE: OK
    const onOk = useCallback(() => {
        form.submit();
    }, [form]);

    // NOTICE: Modal
    const [showModalContent, setShowModalContent] = useState<ModalContent>({
        show: false,
        isEdit: false,
    });

    // const [firstLoanType, setFirstLoanType] = useState('KEY_VALUE');
    // NOTICE: Form

    // NOTE: 1. Initial Data
    const initialValues = useMemo(() => {
        // NOTICE: select and switch need initialValue if you want to select one
        return {
            useRcQuota: true,
            enabled: true,
            rankStrategy: 'KEY_VALUE',
            oldRankStrategy: 'KEY_VALUE',
        } as DeepPartial<FormResponseData>;
    }, []);

    // NOTE: 2. Get Data
    // NOTE: 2.1 Menus
    const [triggerGetRiskMenu, { currentData: currentRiskMenuData, isLoading: isRiskMenuLoading }] =
        useLazyGetRiskModelMenuQuery();

    // NOTICE: Loading
    useEffect(() => {
        triggerGetRiskMenu({});
    }, []);

    // NOTE: 2.2 Risks
    const [triggerGetRisk, { currentData: currentFormData, isLoading: isRiskLoading }] = useLazyGetRiskManageQuery();
    // console.log("isRiskFetching", isRiskFetching);
    // console.log("currentRiskMenuData", currentRiskMenuData);
    // console.log("currentFormData", currentFormData);
    // console.log("isRiskLoading", isRiskLoading);
    // console.log("isRiskFetching", isRiskSuccess);

    useEffect(() => {
        const loading = isRiskMenuLoading || isRiskLoading;
        setLoading(loading);
    }, [isRiskMenuLoading, isRiskLoading]);

    useEffect(() => {
        if (showModalContent.isEdit) {
            triggerGetRisk({
                modelId: String(editID),
            });
        }
    }, [showModalContent.isEdit]);

    // NOTE: 3. Set form fields from data
    useEffect(() => {
        // NOTICE:
        if (!showModalContent.isEdit) return;

        if (!currentFormData) return;
        const targetMenu = currentRiskMenuData.filter((menu) => menu.riskModelName === currentFormData.riskModelName);
        const id = (targetMenu && targetMenu[0] && targetMenu[0].id) || undefined;
        form.setFieldsValue({
            modelName: currentFormData.modelName,
            riskModelName: id,
            firstLoan: currentFormData.firstLoan,
            repeatLoan: currentFormData.repeatLoan,
            useRcQuota: currentFormData.useRcQuota,
            oldUseRcQuota: currentFormData.oldUseRcQuota,
            enabled: currentFormData.enabled,
            remark: currentFormData.remark,
            oldRankStrategy: currentFormData.oldRankStrategy,
            rankStrategy: currentFormData.rankStrategy,
        });
    }, [showModalContent.isEdit, currentFormData]);

    // NOTE: POST or Put form data
    const [triggerPostRisk] = usePostRiskManageCreateMutation();
    const [triggerPutRisk] = usePutRiskManageCreateMutation();

    const [customAntFormFieldError, setCustomAntFormFieldError] = useState<CustomAntFormFieldError>({});

    // 比對 最高可放款笔数、最高可借总额大小值
    const compareCount = (index, loanLength, loan, field) => {
        const isFirstField = index === 0;
        const isLastField = index === loanLength - 1;
        const prevIndex = isFirstField ? 0 : index - 1;
        const nextIndex = isLastField ? index - 1 : index + 1;

        const loanCount = Number(loan[index][field]);
        const prevField = Number(loan[prevIndex][field]);
        const nextField = Number(loan[nextIndex][field]);

        const comparePrev = isFirstField ? loanCount < nextField : loanCount > prevField;
        const compareNext = isLastField ? loanCount > nextField : loanCount < nextField;

        return comparePrev || compareNext;
    };

    // 比對 最大值、最小值，最小值會依下一階的最大值連動並自動填入 (分數類型:範圍)
    const compareMinAndMax = (index, loanLength, loan, field, formType) => {
        const isFirstField = index === 0;
        const isLastField = index === loanLength - 1;
        const max = Number(loan[index].max);
        const min = Number(loan[index].min);
        const prevIndex = isFirstField ? 0 : index - 1;
        const nextIndex = isLastField ? index - 1 : index + 1;
        const loanCount = Number(loan[index][field]);
        const prevField = Number(loan[prevIndex][field]);
        const nextField = Number(loan[nextIndex][field]);

        if (field === 'max') {
            setMinValue(formType, index);
        }

        const comparePrev = isFirstField ? loanCount <= nextField : loanCount >= prevField;
        const compareNext = isLastField ? loanCount >= nextField : loanCount <= nextField;
        const isMaxOrMinError = max <= min;

        return comparePrev || compareNext || isMaxOrMinError;
    };

    const errorMessage = (validateType) => {
        return validateType === 'KEY_VALUE' ? (
            <div>
                <div>{'以上填写格式可能有以下错误，请再次检查并修正：'}</div>
                <div>{'▪ 所有字段都必须填写。'}。</div>
                <div>{'▪ 最高可放款笔数和最高可借总额需由大至小填写≥0的整数。'}</div>
                <div>{'▪ 填写示例：极好等级的值应≥良好的值；良好的值≥正常的值。其他依此类推。'}</div>
            </div>
        ) : validateType === 'SCORE' ? (
            <div>
                <div>{'以上填写格式可能有以下错误，请再次检查并修正：'}</div>
                <div>{'▪ 所有字段必须由大至小填写≥0的整数。'}</div>
                <div>{'▪ 填写示例1：良好等级的值应>正常等级的值、并<极好等级的值。其他依此类推。'}</div>
                <div>{'▪ 填写示例2：极好等级的最高可放款笔数和最高可借总额数值应≥良好等级的值。其他依此类推。'}</div>
            </div>
        ) : (
            <div>
                <div>{'以上填写格式可能有以下错误，请再次检查并修正：'}</div>
                <div>{'▪ 所有字段必须由大至小填写≥0的整数。'}</div>
                <div>{'▪ 除”超过逾期天数”字段之外，极好等级的值应≥良好等级的值。其他依此类推。'}</div>
            </div>
        );
    };

    const validateFirstAndRepeatLoanForm = (formType, loan, validateType) => {
        let formFieldError = {};
        let isFormError = false;
        const errorText = {
            loanCount: '笔数',
            min: '值',
            max: '值',
            balance: '最高可借总额',
            overdueDaysReject: '超過逾期天数',
            repaymentCount: '笔数',
        };

        loan.map((i, index) => {
            const isError = Object.keys(i).map((key) => {
                if (loan.length === 1 && key === 'index') return;
                if (key === 'providerRank' || key === 'id' || key === 'overdueDaysReject' || key === 'autoLoan') return;

                const loanLength = key === 'repaymentCount' ? loan.length - 1 : loan.length;
                const compareError =
                    loan.length !== 1
                        ? key === 'min' || key === 'max'
                            ? compareMinAndMax(index, loanLength, loan, key, formType)
                            : compareCount(index, loanLength, loan, key)
                        : false;

                const fieldIndex = loan.length === 1 ? i['index'] : index;
                const validateError = validateField(i[key], errorText[key]);

                formFieldError = {
                    ...formFieldError,
                    ...{
                        [`${formType}_${key}_${fieldIndex}`]: {
                            validateStatus: validateError.isValidateError || compareError ? 'error' : '',
                            help: validateError.errorMessage,
                        },
                    },
                };
                return compareError;
            });

            if (isError.includes(true)) {
                isFormError = true;
            }

            formFieldError = {
                ...formFieldError,
                ...{
                    [`${formType}_error`]: {
                        validateStatus: isFormError ? 'error' : '',
                        help: isFormError ? errorMessage(validateType) : '',
                    },
                },
            };
        });

        setCustomAntFormFieldError((prev) => ({ ...prev, ...formFieldError }));
        return isFormError;
    };

    const validateTypeSelector = (formType, changedField) => {
        const { rankStrategy, oldRankStrategy, firstLoan, repeatLoan } = form.getFieldsValue();
        const validateType = formType === 'firstLoan' ? rankStrategy : oldRankStrategy;
        const loan = formType === 'firstLoan' ? firstLoan : repeatLoan;
        const isLoanFormNotFilled = loan
            .map((i) =>
                Object.keys(i)
                    .filter((key) => key !== 'min' && key !== 'autoLoan')
                    .map((field) => i[field])
                    .includes(undefined),
            )
            .includes(true);
        const validateForm = isLoanFormNotFilled ? changedField : loan;
        return validateFirstAndRepeatLoanForm(formType, validateForm, validateType);
    };
    const validateField = (fieldValue, placeholder) => {
        const isValidateError = fieldValue < 0 || isNaN(fieldValue) || fieldValue === '';
        const errorMessage =
            fieldValue < 0 || isNaN(fieldValue)
                ? '请输入大于0的整数'
                : fieldValue === '' || fieldValue === undefined
                ? `请输入${placeholder}`
                : '';
        return {
            isValidateError,
            errorMessage,
        };
    };

    // 分數類型:範圍 - 填完最大值，自動填入最小值
    const setMinValue = (formType, index) => {
        const { firstLoan, repeatLoan } = form.getFieldsValue();
        if (index !== 0 || index === firstLoan.length - 1) {
            if (formType === 'firstLoan') {
                Object.assign(firstLoan[index - 1], { ...firstLoan[index - 1], min: Number(firstLoan[index].max) });
                form.setFieldsValue({ firstLoan });
            }
            if (formType === 'repeatLoan') {
                Object.assign(repeatLoan[index - 1], { ...repeatLoan[index - 1], min: Number(repeatLoan[index].max) });
                form.setFieldsValue({ repeatLoan });
            }
        }
    };

    // NOTE: onFieldsChange
    const onFieldsChange = useCallback((changedFields) => {
        const formType = changedFields[0].name[0];
        const fieldIndex = changedFields[0].name[1];
        const field = changedFields[0].name[2];
        const value = changedFields[0].value;

        const changedField = [{ [field]: value, index: fieldIndex }];

        if (field === 'max') {
            setMinValue(formType, fieldIndex);
        }

        if (formType === 'firstLoan' || formType === 'repeatLoan') {
            validateTypeSelector(formType, changedField);
        }
    }, []);

    // NOTICE: Form.3 onFinish
    const onFinish = useCallback(() => {
        const fields = form.getFieldsValue();
        // NOTE: Fetch RiskModel
        const riskModel = currentRiskMenuData.filter((menu) => menu.id === fields['riskModelName'])[0];
        const riskModelName = riskModel.riskModelName;

        // NOTICE: Edit
        const isEdit = showModalContent.isEdit;
        const modelId = editID;

        const isFirstLoanError = validateTypeSelector('firstLoan', []);
        const isRepeatLoanError = validateTypeSelector('repeatLoan', []);

        if (isFirstLoanError || isRepeatLoanError) return;

        // console.log("fields.before", JSON.parse(JSON.stringify(fields)));
        Object.keys(fields).map((key) => {
            if (key === 'firstLoan' || key === 'repeatLoan') {
                const formType = key === 'firstLoan' ? fields.rankStrategy : fields.oldRankStrategy;
                fields[key].map((record, index) => {
                    // console.log(record.autoLoan)
                    fields[key][index] = {
                        // 风控评分等级
                        rank: ['EXCELLENT', 'GOOD', 'NORMAL', 'ORDINARY', 'REJECT'][index],

                        // 排序
                        sort: index + 1,

                        // 级距类型 0: 首贷, 1: 复借
                        type: key === 'firstLoan' ? 0 : 1, // 0 | 1

                        // 对应风控商等级
                        providerRank: formType === 'KEY_VALUE' ? record.providerRank : null,

                        // 最高可放款笔数
                        loanCount: Number(record.loanCount),

                        // 终始阀值(exclude)
                        max: formType === 'SCORE' ? Number(record.max) : null,

                        // 起始阀值(include)
                        min: formType === 'SCORE' ? Number(record.min) : null,

                        // 最高可借金额
                        balance: Number(record.balance),

                        // 还款笔数阀值
                        repaymentCount:
                            formType === 'REPAY_COUNT' && index !== 4 ? Number(record.repaymentCount) : null,

                        // 逾期天数超过N天拒绝
                        overdueDaysReject:
                            formType === 'REPAY_COUNT' && index === 4 ? Number(record.overdueDaysReject) : null,

                        // 自動放款
                        autoLoan: record.autoLoan,
                    } as MssRiskRankVo;

                    // NOTE: Edit
                    if (isEdit) {
                        fields[key][index]['modelId'] = modelId;
                        fields[key][index]['id'] = record.id;
                    }
                });
            } else if (key === 'riskModelName') {
                fields['riskModelName'] = riskModelName;
            }
        });
        // NOTE: Edit
        if (isEdit) {
            fields['modelId'] = modelId;
            delete fields.modelName;
        }
        // console.log("fields.after", fields);

        // NOTE: Create or Edit
        const triggerAPI = !showModalContent.isEdit ? triggerPostRisk : triggerPutRisk;
        // console.log("triggerAPI", !showModalContent.isEdit ? "triggerPostRisk" : "triggerPutRisk");
        // console.log("fields", fields);

        // NOTE: Request
        triggerAPI(fields)
            .unwrap()
            .then(() => {
                form.resetFields();

                triggerGetList(null);

                setShowModalContent({
                    show: false,
                    isEdit: false,
                });
            });
    }, [showModalContent.isEdit, editID, currentRiskMenuData]);

    const onAddCallback = useCallback(() => {
        setCustomAntFormFieldError({});
        setShowModalContent({
            show: true,
            isEdit: false,
        });
    }, []);

    // NOTE: Post | PUT Data
    return (
        <AdminPage
            navigator={{
                ancestor: {
                    path: '',
                    breadcrumbName: '首页',
                },
                parent: {
                    path: '',
                    breadcrumbName: '风控管理',
                },
                self: {
                    path: '',
                    breadcrumbName: '风控配置',
                },
            }}
            // searchable={false}
        >
            <>
                <AdminTable<GetProductListResponseProduct>
                    hasAddForm={true}
                    tableHeaderColumns={columns}
                    tableDatasource={currentData}
                    loading={loading}
                    onSearchClick={() => {
                        return [];
                    }}
                    // NOTE: 新增
                    setShowModalContent={setShowModalContent}
                    searchable={false}
                    hasEditForm={false}
                    onAddCallback={onAddCallback}
                    triggerToRefreshList={() => triggerGetList(null)}
                />

                <RiskSettingModal
                    showModalContent={showModalContent}
                    // 關閉
                    setShowModalContent={setShowModalContent}
                    form={form}
                    onOk={onOk}
                    // onAutoCompleteTemplate={onAutoCompleteTemplate}
                >
                    <RiskSettingForm
                        form={form}
                        isEdit={showModalContent.isEdit}
                        id={editID}
                        initialValues={initialValues}
                        onFieldsChange={onFieldsChange}
                        onFinish={onFinish}
                        currentRiskMenuData={currentRiskMenuData}
                        customAntFormFieldError={customAntFormFieldError}
                        setCustomAntFormFieldError={setCustomAntFormFieldError}
                    />
                </RiskSettingModal>
            </>
        </AdminPage>
    );
};

export default RiskSettingPage;
