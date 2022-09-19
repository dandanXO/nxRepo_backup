import BaseSettingSection from "./BaseSettingSection";
import ProductSettingSection from "./ProductSettingSection";
import LoanSettingSection from "./LoanSettingSection";
import RateSettingSection from "./RateSettingSection";
import { UploadSettingSection } from "./UploadSettingSection";
import { Form, message, Upload, UploadProps } from "antd";
import React, { useCallback, useMemo } from "react";
import { usePostProductCreateMutation } from "../../../../api";
import { PostProductCreateRequestBody } from "../../../../types/postProductCreate";


// const uploadLogoProps: UploadProps = {
//   name: 'file',
//   action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
//   headers: {
//     authorization: 'authorization-text',
//   },
//   beforeUpload: file => {
//     const isPNG = file.type === 'image/png';
//     if (!isPNG) {
//       message.error(`${file.name} is not a png file`);
//     }
//     return isPNG || Upload.LIST_IGNORE;
//   },
//   onChange(info) {
//     if (info.file.status !== 'uploading') {
//       console.log(info.file, info.fileList);
//     }
//     if (info.file.status === 'done') {
//       message.success(`${info.file.name} file uploaded successfully`);
//     } else if (info.file.status === 'error') {
//       message.error(`${info.file.name} file upload failed.`);
//     }
//   },
// };

export const useProductForm = () => {
    const [form] = Form.useForm();
    const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 18 },
    };
    const [postProductCreate, { isLoading }] = usePostProductCreateMutation();

    const postProductCreateRequest = useCallback(
        (props: PostProductCreateRequestBody) => {
            postProductCreate(props)
                .unwrap()
                .then((data: PostProductCreateRequestBody) => {
                    // do nothing.
                })
                .catch(({ error }) => {
                    console.log(error);
                })
                .finally(() => {
                    // do nothing.
                });
        }, []);

    const handlePostProductCreate = useCallback((values) => {
        postProductCreateRequest(values);
    }, []);

    const onFinish = (values: any) => {
        const productInterestRatePairs = values.productInterestRatePairs.map(i => ({ num: Number(i.num), postInterest: Number(i.postInterest), preInterest: Number(i.preInterest) }))
        const creatProductData = {
            merchantId: Number(values.merchantId),
            productName: values.productName,
            adminUsername: values.adminUsername,
            adminPassword: values.adminPassword,
            // logo: values.logo,
            // backgroundImg: values.backgroundImg,
            logo: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
            backgroundImg: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
            amountRange: `₹ ${values.amountRangeLow} - ₹ ${values.amountRangeHigh}`,
            interestRange: `${values.interestRangeLow} - ${values.interestRangeHigh}% / day`,
            termRange: `${values.termRangeLow}-${values.termRangeHigh} days`,
            approveRate: values.approveRate,
            approveTime: `${values.approveTime} ${values.approveTimeUnit}`,
            csEmail: values.csEmail,
            csTime: `${values.csTime[0].format('HH:mm:ss')} ${values.csTime[1].format('HH:mm:ss')}`,
            loanTerm: Number(values.loanTerm),
            maxAmount: Number(values.maxAmount),
            extensible: values.extensible,
            extensibleOverdueDays: Number(values.extensibleOverdueDays),
            preInterestRate: Number(values.preInterestRate),
            postInterestRate: Number(values.postInterestRate),
            dailyRate: Number(values.dailyRate),
            extensionRate: Number(values.extensionRate),
            overdueRate: Number(values.overdueRate),
            productInterestRatePairs: productInterestRatePairs,
            top: values.top,
            tags: values.tags.join(','),
            templateType: values.templateType,
            weight: Number(values.weight),
            enabled: values.enabled,
        }
        console.log(creatProductData)
        handlePostProductCreate(creatProductData);
    };

    const FormComponent = useMemo(() => {
        return () => (
            <Form {...layout} form={form} name="control-hooks" onFinish={onFinish} initialValues={{
                // NOTICE: [antd: Form.Item] `defaultValue` will not work on controlled Field. You should use `initialValues`
                approveTimeUnit: "mins",
                extensible: false,
                top: false,
                enabled: true,
                templateType: 1,
            }}>
                <BaseSettingSection />
                <ProductSettingSection />
                <LoanSettingSection />
                <RateSettingSection />
                <UploadSettingSection />
            </Form>
        )
    }, [])
    return { productForm: form, ProductForm: FormComponent }
}
