import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import AdminPage from "../../../../shared/components/AdminPage";
import {ProColumns} from "@ant-design/pro-components";
import {GetProductListResponseProduct} from "../../../../product/service/product/domain/getProductList";
import {
    useLazyGetRiskManageListQuery,
    useLazyGetRiskManageQuery,
    useLazyGetRiskModelMenuQuery,
    usePostRiskManageCreateMutation,
    usePutRiskManageCreateMutation
} from "../../../service/RiskApi";
import {useForm} from "antd/es/form/Form";
import {AdminTable, ModalContent} from "../../../../shared/components/AdminTable";
import RiskSettingForm from "./RiskSettingForm";
import RiskSettingModal from "./RiskSettingModal";
import {GetRiskManageResponse} from "../../../service/response/GetRiskManageResponse";
import {RiskManageList} from "../../../domain/vo/RiskManageList";
import {MssRiskRankVo} from "../../../domain/vo/MssRiskRankVo";
import { CustomAntFormFieldError } from "../../../../shared/utils/validation/CustomAntFormFieldError";


export type FormResponseData = GetRiskManageResponse;

export const RiskSettingPage = () => {

    // NOTE: UI Loading
    const [loading, setLoading] = useState(false);


    // NOTE: Fetch
    const [triggerGetList, { currentData, isLoading, isFetching }] = useLazyGetRiskManageListQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    });

    // useHook
    useEffect(() => {
        triggerGetList(null);
    }, []);


    useEffect(() => {
        setLoading(isFetching);
    }, [isFetching])

    // NOTE: Edit
    const [editID, setEditID] = useState<number>();

    // NOTE: Table
    const columns = useMemo(() => {
        const columns: ProColumns<RiskManageList>[] = [
            {
                key: 'option',
                title: '操作',
                valueType: 'option',
                render: (text, record, _, action) => {
                    return [
                        <a key="editable" onClick={() => {
                            // console.log("record", record);
                            setEditID(record.id);
                            setShowModalContent({
                                show: true,
                                isEdit: true,
                            });
                            setCustomAntFormFieldError({});
                        }}>修改</a>,
                    ]
                },
                width: 80,
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
            { key: 'modelName', title: '风控名称', dataIndex: 'modelName', initialValue: "" },
            {
                key: 'enabled',
                title: '状态', dataIndex: 'enabled', valueType: 'select', initialValue: 'all',
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
    const [form] = useForm()

    // NOTICE: Modal
    // NOTE: autoComplete
    const onAutoCompleteTemplate = useCallback(() => {
        const mockRequest = {
            modelName: String(new Date().getTime()),
            remark: "remark",
            // firstLoan: [
             //     {providerRank: 'A', loanCount: '8000'},
            //     {providerRank: 'B', loanCount: '6000'},
            //     {providerRank: 'C', loanCount: '4000'},
            //     {providerRank: 'D', loanCount: '2000'},
            //     {providerRank: 'E', loanCount: '0'},
            // ],
            // repeatLoan: [
            //     {providerRank: 'A', loanCount: '8000'},
            //     {providerRank: 'B', loanCount: '6000'},
            //     {providerRank: 'C', loanCount: '4000'},
            //     {providerRank: 'D', loanCount: '2000'},
            //     {providerRank: 'E', loanCount: '0'},
            // ],
            firstLoan: [
                { max: 50, min: 58, loanCount: '4000', balance: '200', providerRank: 'A' },
                { max: 49, min: 39, loanCount: 3000, balance: '99', providerRank: 'B' },
                { max: 38, min: 32, loanCount: 2000, balance: '88', providerRank: 'C' },
                { max: 31, min: 22, loanCount: 1000, balance: '77', providerRank: 'D' },
                { max: 21, min: 12, loanCount:0, balance: '66', providerRank: 'E' }
            ],
            repeatLoan: [
                { max: 50, min: 58, loanCount: 4000, balance: '200', providerRank: 'A' },
                { max: 49, min: 39, loanCount: 3000, balance: '99', providerRank: 'B' },
                { max: 38, min: 32, loanCount: 2000, balance: '88', providerRank: 'C' },
                { max: 31, min: 22, loanCount: 1000, balance: '77', providerRank: 'D' },
                { max: 21, min: 12, loanCount: 0, balance: '66', providerRank: 'E' }
            ],
            riskModelName: 1,
            useRcQuota: true,
            enabled: true,
        }
        form.setFieldsValue(mockRequest)
    }, [form])

    // NOTE: OK
    const onOk = useCallback(() => {
        form.submit();
    }, [form])

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
            rankStrategy:'KEY_VALUE',
            oldRankStrategy:'KEY_VALUE'
        } as DeepPartial<FormResponseData>;
    }, [])

    // NOTE: 2. Get Data
    // NOTE: 2.1 Menus
    const [triggerGetRiskMenu, { currentData: currentRiskMenuData, isLoading: isRiskMenuLoading }] = useLazyGetRiskModelMenuQuery();

    // NOTICE: Loading
    useEffect(() => {
        triggerGetRiskMenu({});
    }, []);


    // NOTE: 2.2 Risks
    const [triggerGetRisk , { data: previousRiskData, currentData: currentFormData, isLoading: isRiskLoading, isFetching: isRiskFetching, isSuccess: isRiskSuccess }] = useLazyGetRiskManageQuery();
    // console.log("isRiskFetching", isRiskFetching);
    // console.log("currentRiskMenuData", currentRiskMenuData);
    // console.log("currentFormData", currentFormData);
    // console.log("isRiskLoading", isRiskLoading);
    // console.log("isRiskFetching", isRiskSuccess);


    useEffect(() => {
        const loading = isRiskMenuLoading || isRiskLoading;
        setLoading(loading);
    }, [isRiskMenuLoading, isRiskLoading])



    useEffect(() => {
        if(showModalContent.isEdit) {
            triggerGetRisk({
                modelId: String(editID),
            });
        }
    }, [showModalContent.isEdit])


    // NOTE: 3. Set form fields from data
    useEffect(() => {

        // NOTICE:
        if(!showModalContent.isEdit) return;

        if(!currentFormData) return;
        const targetMenu = currentRiskMenuData.filter(menu => menu.riskModelName === currentFormData.riskModelName)
        const id = targetMenu && targetMenu[0] && targetMenu[0].id || undefined;
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
        })

    }, [showModalContent.isEdit, currentFormData])


    // NOTE: POST or Put form data
    const [triggerPostRisk, { data: postRiskData, isLoading: isPostRiskLoading , isSuccess: isPostRiskSuccess }] = usePostRiskManageCreateMutation();
    const [triggerPutRisk, { data: putRiskData, isLoading: isPutRiskLoading, isSuccess: isPutRiskSuccess }] = usePutRiskManageCreateMutation();

    const [customAntFormFieldError, setCustomAntFormFieldError] = useState<CustomAntFormFieldError>({})


    const compareCount = (index, loanLength, loan, field) => {

        const isFirstField = index === 0;
        const isLastField = index === loanLength - 1;
        const prevIndex = isFirstField ? 0 : index - 1;
        const nextIndex = isLastField ? index - 1 : index + 1;

        const loanCount = Number(loan[index][field]);
        const prevField = Number(loan[prevIndex][field]);
        const nextField = Number(loan[nextIndex][field]);

        const comparePrev = isFirstField ? loanCount <= nextField : loanCount >= prevField;
        const compareNext = isLastField ? loanCount >= nextField : loanCount <= nextField;

        return comparePrev || compareNext;

    }

    const validateByValue = (formType, loan) => {

        let formFieldError = {};
        let isError = false;
        loan.map((i, index) => {
            const isLoanCountError = compareCount(index, loan.length, loan, 'loanCount')
            const loanCountValidateError = validateField(i.loanCount, '笔数');
            if (isLoanCountError) {
                isError = true;
            }
            formFieldError = {
                ...formFieldError,
                ...{
                    [`${formType}_loanCount_${index}`]: {
                        validateStatus: loanCountValidateError.isValidateError || isLoanCountError ? "error" : '',
                        help: loanCountValidateError.errorMessage
                    },
                    [`${formType}_error`]: {
                        validateStatus: isError ? "error" : '',
                        help: isError ?
                            <div>
                                <div>以上填写格式可能有以下错误，请再次检查并修正：</div>
                                <div>▪ 所有字段都必须填写。</div>
                                <div>▪ 最高可放款笔数需由大至小填写大于0的整数。</div>
                                <div>▪ 各级距数值应小于上一级并大于下一级。</div>
                            </div> : '',
                    },
                }
            }
        })

        setCustomAntFormFieldError(prev => ({ ...prev, ...formFieldError }));
        return isError;
    }
    const validateByScore=(formType,loan)=>{

        let formFieldError = {};
        let isError = false;
        loan.map((i, index) => {
            const isFirstField = index === 0;
            const isLastField = index === loan.length - 1;
            const max = Number(i.max);
            const min = Number(i.min);
            const isMaxError = isFirstField ? max <= min : max <= min || max !== Number(loan[index - 1].min) - 1;
            const isMinError = isLastField ? max <= min : max <= min || min !== Number(loan[index + 1].max) + 1;
            const isLoanCountError = compareCount(index, loan.length, loan, 'loanCount');
            const isBalanceError = compareCount(index, loan.length, loan, 'balance');

            const maxValidate = validateField(i.max, '值');
            const minValidate = validateField(i.min, '值');
            const loanCountValidate = validateField(i.loanCount, '笔数');
            const balanceValidate = validateField(i.balance, '最高可借总额');

            if (isMaxError || isMinError || isLoanCountError || isBalanceError) {
                isError = true;
            }

            formFieldError = {
                ...formFieldError,
                ...{
                    [`${formType}_max_${index}`]: {
                        validateStatus: maxValidate.isValidateError || isMaxError ? "error" : '',
                        help: maxValidate.errorMessage
                    },
                    [`${formType}_min_${index}`]: {
                        validateStatus: minValidate.isValidateError || isMinError ? "error" : '',
                        help: minValidate.errorMessage
                    },
                    [`${formType}_loanCount_${index}`]: {
                        validateStatus: loanCountValidate.isValidateError|| isLoanCountError  ? "error" : '',
                        help: loanCountValidate.errorMessage
                    },
                    [`${formType}_balance_${index}`]: {
                        validateStatus: balanceValidate.isValidateError || isBalanceError ? "error" : '',
                        help: balanceValidate.errorMessage
                    },
                    [`${formType}_error`]: {
                        validateStatus: isError? "error" : '',
                        help: isError?
                            <div>
                                <div>以上填写格式可能有以下错误，请再次检查并修正：</div>
                                <div>▪ 所有字段必须由大至小填写大于0的整数。</div>
                                <div>▪ 各级距数值需连贯且数值应小于上一级并大于下一级。</div>
                            </div> : '',
                    },
                }
            }
        })
        setCustomAntFormFieldError(prev=>({...prev,...formFieldError}));
        return isError;
    }


    const validateByCount=(formType, loan)=>{

        let formFieldError = {};
        let isError = false;
        loan.map((i, index) => {

            const isRepaymentCountError = index !== 4 && compareCount(index, loan.length - 1, loan, 'repaymentCount');
            const isLoanCountError = compareCount(index, loan.length, loan, 'loanCount');
            const isBalanceError = compareCount(index, loan.length, loan, 'balance');

            const repaymentCount = index !== 4 ? i.repaymentCount : i.overdueDaysReject;
            const repaymentCouuntText = index !== 4 ? "笔数" : "超過逾期天数";

            const repaymentCountValidate = validateField(repaymentCount, repaymentCouuntText);
            const loanCountValidate = validateField(i.loanCount, '笔数');
            const balanceValidate = validateField(i.balance, '最高可借总额');

            if (isRepaymentCountError || isLoanCountError || isBalanceError) {
                isError =true;
            }
            formFieldError = {
                ...formFieldError,
                ...{
                    [`${formType}_repaymentCount_${index}`]: {
                        validateStatus: repaymentCountValidate.isValidateError || isRepaymentCountError ? "error" : '',
                        help: repaymentCountValidate.errorMessage
                    },
                    [`${formType}_loanCount_${index}`]: {
                        validateStatus: loanCountValidate.isValidateError || isLoanCountError ? "error" : '',
                        help: loanCountValidate.errorMessage
                    },
                    [`${formType}_balance_${index}`]: {
                        validateStatus: balanceValidate.isValidateError || isBalanceError ? "error" : undefined,
                        help: balanceValidate.errorMessage
                    },
                    [`${formType}_error`]: {
                        validateStatus: isError ? "error" : '',
                        help: isError ?
                            <div>
                                <div>以上填写格式可能有以下错误，请再次检查并修正：</div>
                                <div>▪ 所有字段必须由大至小填写大于0的整数。</div>
                                <div>▪ 各级距数值应小于上一级并大于下一级。</div>
                            </div> : '',
                    },
                }
            }
        })

        setCustomAntFormFieldError(prev=>({...prev,...formFieldError}));
        return isError;
    }

    const validateTypeSelector = (formType) => {

        const { rankStrategy, oldRankStrategy, firstLoan, repeatLoan } = form.getFieldsValue();
        const validateType = formType === 'firstLoan' ? rankStrategy : oldRankStrategy;
        const loan = formType === 'firstLoan' ? firstLoan : repeatLoan;
        const isLoanFormNotFilled = loan.map(i => Object.values(i).includes(undefined)).includes(true);
        if (isLoanFormNotFilled) return;
        return validateType === 'KEY_VALUE'
            ? validateByValue(formType, loan) : validateType === 'SCORE'
            ? validateByScore(formType, loan) : validateByCount(formType, loan);

    }
    const validateField = (fieldValue,placeholder) => {
        const isValidateError = fieldValue < 0 || isNaN(fieldValue) || fieldValue === '';
        const errorMessage = fieldValue < 0 || isNaN(fieldValue) ? '请输入大于0的整数' : (fieldValue === ''||fieldValue === undefined)  ? `请输入${placeholder}` : '';
        return {
            isValidateError,
            errorMessage
        }
    }

    // NOTE: onFieldsChange
    const onFieldsChange = useCallback((changedFields, allFields) => {
       console.log(changedFields)
        const formType = changedFields[0].name[0];
        const index = changedFields[0].name[1];
        const fieled = changedFields[0].name[2];
        let formFieldError = {};
        const errorText={
            loanCount:'笔数',
            min:'值',
            max:'值',
            balance:'最高可借总额',
            overdueDaysReject:'超過逾期天数',
            repaymentCount:'笔数',
        }

        const fieldError = validateField(changedFields[0].value, errorText[fieled]);
        formFieldError = {
            [`${formType}_${fieled}_${index}`]: {
                validateStatus: fieldError.isValidateError ? "error" : '',
                help: fieldError.errorMessage
            }
        }
        setCustomAntFormFieldError((prev) => {
            return { ...prev, ...formFieldError }
        });

        if (formType === 'firstLoan' || formType === 'repeatLoan') {
            validateTypeSelector(formType)
        }

    }, [])


    // NOTICE: Form.3 onFinish
    const onFinish = useCallback(() => {
        const fields = form.getFieldsValue();
        // NOTE: Fetch RiskModel
        const riskModel = currentRiskMenuData.filter(menu => menu.id === fields["riskModelName"])[0];
        const riskModelName = riskModel.riskModelName;

        // NOTICE: Edit
        const isEdit = showModalContent.isEdit;
        const modelId = editID;

        const isFirstLoanError = validateTypeSelector("firstLoan");
        const isRepeatLoanError = validateTypeSelector("repeatLoan");

        if (isFirstLoanError || isRepeatLoanError) return;


        // console.log("fields.before", JSON.parse(JSON.stringify(fields)));
        Object.keys(fields).map(key => {

            if(key === "firstLoan" || key === "repeatLoan") {
                const formType = key === "firstLoan" ? fields.rankStrategy : fields.oldRankStrategy;
                console.log('formType',formType)
                fields[key].map((record, index) => {
                    fields[key][index] = {
                        // 风控评分等级
                        rank: ["EXCELLENT", "GOOD", "NORMAL", "ORDINARY", "REJECT"][index],

                        // 排序
                        sort: index + 1,

                        // 级距类型 0: 首贷, 1: 复借
                        type: key === "firstLoan" ? 0 : 1 , // 0 | 1

                        // 对应风控商等级
                        providerRank: formType === "KEY_VALUE" ? record.providerRank : null,

                        // 最高可放款笔数
                        loanCount: Number(record.loanCount),

                        // 终始阀值(exclude)
                        max: formType === "SCORE" ? Number(record.max) : null,

                        // 起始阀值(include)
                        min: formType === "SCORE" ? Number(record.min) : null,

                        // 最高可借金额
                        balance:formType !== "KEY_VALUE" ? Number(record.balance) : null,

                        // 还款笔数阀值
                        repaymentCount:formType === "REPAY_COUNT" && index!==4  ? Number(record.repaymentCount) : null,

                        // 逾期天数超过N天拒绝
                        overdueDaysReject:formType === "REPAY_COUNT" && index===4 ? Number(record.overdueDaysReject) : null,


                    } as MssRiskRankVo

                    // NOTE: Edit
                    if(isEdit) {
                        fields[key][index]["modelId"] = modelId;
                        fields[key][index]["id"] = record.id;
                    }
                })
            } else if(key === "riskModelName") {
                fields["riskModelName"] = riskModelName;
            }
        });
        // NOTE: Edit
        if(isEdit) {
            fields["modelId"] = modelId;
            delete fields.modelName;
        }
        // console.log("fields.after", fields);

        // NOTE: Create or Edit
        const triggerAPI = !showModalContent.isEdit ? triggerPostRisk : triggerPutRisk;
        // console.log("triggerAPI", !showModalContent.isEdit ? "triggerPostRisk" : "triggerPutRisk");
        // console.log("fields", fields);

        // NOTE: Request
        triggerAPI(fields).unwrap().then((responseData) => {
            form.resetFields();

            triggerGetList(null);

            setShowModalContent({
                show: false,
                isEdit: false,
            })
        })
    }, [showModalContent.isEdit, editID, currentRiskMenuData])

    // NOTICE: Form.4 onFinishFailed
    const onFinishFailed = useCallback(() => {
    }, [])

    // NOTICE: Form.5 onValuesChange
    const onValuesChange = useCallback((changedFields, allFields) => {
    }, [])


    const onAddCallback = useCallback(() => {
        setCustomAntFormFieldError({});
        setShowModalContent({
            show: true,
            isEdit: false,
        });
    }, [])


    // NOTE: Post | PUT Data
    return (
        <AdminPage
            navigator={{
                ancestor: {
                    path: "",
                    breadcrumbName: "首页",
                },
                parent: {
                    path: "",
                    breadcrumbName: "风控管理",
                },
                self: {
                    path: "",
                    breadcrumbName:"风控配置"
                }
            }}
            // searchable={false}
        >
            <>
                <AdminTable<GetProductListResponseProduct>
                    tableHeaderColumns={columns}
                    tableDatasource={currentData}
                    loading={loading}
                    onSearchClick={(props: RiskManageList) => {
                        return [];
                    }}
                    // NOTE: 新增
                    setShowModalContent={setShowModalContent}
                    searchable={false}
                    hasEditForm={false}
                    onAddCallback={onAddCallback}
                    triggerGetList={()=>triggerGetList(null)}

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
                        // customAntFormFieldError={customAntFormFieldError}
                        // setCustomAntFormFieldError={setCustomAntFormFieldError}
                    />
                </RiskSettingModal>
            </>
        </AdminPage>
    )
}