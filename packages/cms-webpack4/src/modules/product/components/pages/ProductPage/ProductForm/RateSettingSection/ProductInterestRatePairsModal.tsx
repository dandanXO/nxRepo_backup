import { Card, Form, Modal } from "antd";
import { FormInstance } from 'antd/lib/form/Form'
import { CustomAntFormFieldError } from "../../../../../../shared/utils/validation/CustomAntFormFieldError";
import React from "react";
import PreAndPostInterestGroups from "../../../../../../shared/components/other/PreAndPostInterestGroups";
import { RiskRank } from "../../../../../service/product/domain/productInterestRatePair";

interface ProductInterestRatePairsModalProps {
    form: FormInstance
    customAntFormFieldError: CustomAntFormFieldError;
    setCustomAntFormFieldError: React.Dispatch<React.SetStateAction<CustomAntFormFieldError>>
    interestRatePairsTouchInput: any;
    show: boolean
    onOk: () => void;
    handleCloseModal: (event) => void;
}

export const riskLabelMap:{ label:string, key: RiskRank }[] = [
    { label: '极好', key: 'EXCELLENT'},
    { label: '良好', key: 'GOOD'},
    { label: '正常', key: 'NORMAL'},
    { label: '普通', key: 'ORDINARY'},
]

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
                            title={`风控标签：${riskLabelMap[firstField.name].label}`}
                            headStyle={{ border: "none" }}
                            bodyStyle={{ paddingTop: 0 }}
                            style={{ marginBottom: '20px' }}
                        >
                            <PreAndPostInterestGroups
                                form={form}
                                customAntFormFieldError={customAntFormFieldError}
                                setCustomAntFormFieldError={setCustomAntFormFieldError}
                                interestRatePairsTouchInput={interestRatePairsTouchInput}
                                parentName='productInterestRatePairs'
                                groupName='riskRank'
                                fieldName={[firstField.name, 'content']} />
                        </Card>
                    )
                })
            }}
        </Form.List>
    </Modal>
}
