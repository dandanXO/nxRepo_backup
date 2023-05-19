import { Button, Card, Form, Modal } from "antd";
import { FormInstance } from 'antd/lib/form/Form'
import { CustomAntFormFieldError } from "../../../../../../shared/utils/validation/CustomAntFormFieldError";
import React from "react";
import PreAndPostInterestGroups from "../../../../../../shared/components/other/PreAndPostInterestGroups";
import {
    productInterestRatesConvertToBackendMap
} from "../../hooks/useProductFormModal";
import { productInterestRatesContentKey } from "../../../../../service/product/domain/productInterestRatePair";

interface ProductInterestRatePairsModalProps {
    form: FormInstance
    customAntFormFieldError: CustomAntFormFieldError;
    setCustomAntFormFieldError: React.Dispatch<React.SetStateAction<CustomAntFormFieldError>>
    interestRatePairsTouchInput: any;
    show: boolean
    onOk: () => void;
    handleCloseModal: (event) => void;
}

export const ProductInterestRatePairsModal = (
    {
        form,
        customAntFormFieldError,
        setCustomAntFormFieldError,
        interestRatePairsTouchInput,
        show,
        onOk,
        handleCloseModal
    }:ProductInterestRatePairsModalProps) => {

    const handleClearFields = (groupIndex) => {
        const fieldValue = form.getFieldValue('productInterestRatePairs');
        fieldValue[groupIndex] = { [productInterestRatesContentKey]: [{ preInterest: '', postInterest: '', plusAmount: '' }]};
        form.setFieldValue('productInterestRatePairs', fieldValue);
        setCustomAntFormFieldError((prev) =>(
            {
                ...prev,
                productInterestRatePairs: {
                    ...prev['productInterestRatePairs'],
                    [groupIndex]: {}
                }
            }
        ))
    }

    return <Modal
        open={show}
        title='复贷利率'
        onOk={onOk}
        onCancel={handleCloseModal}
        maskClosable={false}
        width='800px'
    >
        <Form.List name='productInterestRatePairs'>
            {(firstFields)=> {
                return firstFields.map((firstField, i) => {
                    return (
                        <Card
                            key={firstField.name}
                            title={`风控标签：${productInterestRatesConvertToBackendMap[firstField.name].label}`}
                            headStyle={{ border: "none" }}
                            bodyStyle={{ paddingTop: 0 }}
                            style={{ marginBottom: '20px' }}
                            extra={<Button onClick={()=>handleClearFields(firstField.name)}>清除重填</Button>}
                        >
                            <PreAndPostInterestGroups
                                form={form}
                                customAntFormFieldError={customAntFormFieldError}
                                setCustomAntFormFieldError={setCustomAntFormFieldError}
                                interestRatePairsTouchInput={interestRatePairsTouchInput}
                                parentName='productInterestRatePairs'
                                fieldName={[firstField.name, productInterestRatesContentKey]} />
                        </Card>
                    )
                })
            }}
        </Form.List>
    </Modal>
}
