import {Button, Form, Modal, Select} from "antd";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useForm} from "antd/es/form/Form";
import {TreeCheckbox} from "../components/TreeCheckbox";
import {useLazyGetCollectorQuery} from "../services/TodayDistributionAPI";
import {normalizeCollector} from "../components/TreeCheckbox/normalizeCollector";
import {Stage} from "../types";
import {Typography} from "antd/es";
import {StageData} from "../pages/TodayDistributionPage";
import {useLazyGetOverdueCollectorQuery} from "../services/OverdueDistributionAPI";

interface OrderDistributionModalProps {
    show: boolean;
    handleCloseModal: () => void;
    // NOTE: 回傳催收人員
    onOk: (checkedCollector: number[]) => void;
    isSelectedByOrder: boolean;
    // NOTE: 依階段分配模式，回傳所選的逾期等级
    setDistributionStage: (distributionStage: Stage) => void;
    summaryData?: StageData;
    type: "today" | "overdue",
    stage?: string;
    searchedStage: Stage;
    hasS5?: boolean;
}
export const CommonOrderDistributionModal = (props: OrderDistributionModalProps) => {


    const [triggerGetCollector , {
        // data,
        currentData,
        isLoading,
        isFetching,
        isSuccess,
        isError,
        isUninitialized,
    }] = useLazyGetCollectorQuery();

    const [triggerGetOverdueCollector , {
        // data,
        currentData: currentOverdueData,
    }] = useLazyGetOverdueCollectorQuery();

    useEffect(() => {
        if(props.type === "today") {
            triggerGetCollector(null);
        } else {
            triggerGetOverdueCollector(null);
        }

    }, [props.type]);

    const [checkedCollector, setCheckedCollector] = useState([]);

    const [checkedJob, setCheckedJob] = useState([]); //设置选择的 level3，人ㄩㄢf

    const [selectedRowKeys, setSelectedRowKeys] = useState([]); //设置选择的 level1, level2 row

    const onTreeCheckboxCheck = (collectors) => {
        const data = collectors.filter((item, index) => collectors.indexOf(item) === index);
        // console.log("collectors", data)
        setCheckedCollector(data);
    }

    const [distributionStage, setDistributionStage] = useState(props.type === "today" ? Stage.T0 : Stage.S1);
    // console.log("distributionStage", distributionStage);
    // console.log("summaryData", props?.summaryData);
    // console.log("props.searchedStage", props.searchedStage);

    useEffect(() => {
        if(props.show) {
            let stage = props.type === "today" ? Stage.T0 : Stage.S1;
            // NOTE:預設逾期等级
            setDistributionStage(stage);
            form.setFieldsValue({
                stage: stage,
            });
            // NOTE: callback
            props.setDistributionStage(stage);

        }
    }, [props.searchedStage, props.show])

    // console.log("distributionStage", distributionStage);

    const treeCheckboxData = useMemo(() => {
        const data = props.type === "today" ? currentData : currentOverdueData;

        let restrictedStageArray = []
        if(props.type === "today") {
            if(distributionStage == Stage.T0) {
                restrictedStageArray = [Stage.T_1];
            } else {
                restrictedStageArray = [];
            }
        } else {
            if(distributionStage == Stage.S1) {
                restrictedStageArray = [];
            } else if (distributionStage == Stage.S2) {
                restrictedStageArray = [Stage.S1];
            } else if (distributionStage == Stage.S3) {
                restrictedStageArray = [Stage.S1, Stage.S2];
            } else if (distributionStage == Stage.S4) {
                restrictedStageArray = [Stage.S1, Stage.S2, Stage.S3];
            } else if (distributionStage == Stage.S5) {
                restrictedStageArray = [Stage.S1, Stage.S2, Stage.S3, Stage.S4];
            }
            // if(props.hasS5 && distributionStage !== Stage.S5) {
            //     restrictedStageArray.push(Stage.S5)
            // }
        }
        return normalizeCollector(data, [Stage.NONE, ...restrictedStageArray]);
    }, [props.type, distributionStage, currentData, currentOverdueData, props.hasS5]);

    const handleSelectedAllCollector = useCallback(() => {
        setSelectedRowKeys(treeCheckboxData["allKey"]);
        setCheckedJob(treeCheckboxData["allCollectorKey"]);
        setCheckedCollector(treeCheckboxData["allCollectorKey"]);
    }, [treeCheckboxData]);

    const handleUnselectedAllCollector = useCallback(() => {
        setSelectedRowKeys([]);
        setCheckedJob([]);
        setCheckedCollector([]);
    }, []);


    const [form] = useForm();

    const renderOptionsComponent = () => {
        if(!props.isSelectedByOrder) {
            if(props.type === "today") {
                return (
                    <React.Fragment>
                        <Select.Option key={1} value={Stage.T_1}>T-1</Select.Option>
                        <Select.Option key={2} value={Stage.T0}>{Stage.T0}</Select.Option>
                    </React.Fragment>
                )
            } else {
                return (
                    <React.Fragment>
                        <Select.Option key={1} value={Stage.S1}>{Stage.S1}</Select.Option>
                        <Select.Option key={2} value={Stage.S2}>{Stage.S2}</Select.Option>
                        <Select.Option key={3} value={Stage.S3}>{Stage.S3}</Select.Option>
                        <Select.Option key={4} value={Stage.S4}>{Stage.S4}</Select.Option>
                        <Select.Option key={5} value={Stage.S5}>{Stage.S5}</Select.Option>
                    </React.Fragment>
                )
            }
        }
    }
    return (
        <Modal
            title={"分配订单"}
            open={props.show}
            onCancel={() => {
                props.handleCloseModal();
                handleUnselectedAllCollector();
            }}
            onOk={() => {
                props.onOk(checkedCollector);
                handleUnselectedAllCollector();
            }}
            width={'1000px'}
            maskClosable={false}
        >
            {!props.isSelectedByOrder && (
                <div>
                    <Form form={form}>
                        <Form.Item name="stage" label="逾期等级" rules={[{ required: true }]}>
                            <Select placeholder={"选择"} defaultValue={distributionStage} onSelect={(value) => {
                                console.log("value", value);
                                setDistributionStage(value);
                                props.setDistributionStage(value)
                            }}>
                                {renderOptionsComponent()}
                            </Select>
                        </Form.Item>
                        <Form.Item name="productName" label="待分案单量">
                            {props?.summaryData[distributionStage]?.todoTotal}
                        </Form.Item>
                    </Form>

                </div>
            )}
            {props?.summaryData[distributionStage]?.todoTotal > 0 && (
                <div>
                    <Button style={{marginRight: 8}} onClick={handleSelectedAllCollector}>全选</Button>
                    <Button style={{marginRight: 8}} onClick={handleUnselectedAllCollector}>清空重选</Button>
                    <Typography.Text>已选择 {checkedCollector.length} 个催收人员</Typography.Text>
                </div>
            )}
            {props?.summaryData[distributionStage]?.todoTotal > 0 && (
                <TreeCheckbox
                    data={treeCheckboxData}
                    selectedRowKeys={selectedRowKeys}
                    setSelectedRowKeys={setSelectedRowKeys}
                    onCheck={onTreeCheckboxCheck}
                    checkedJob={checkedJob}
                    setCheckedJob={setCheckedJob}
                />
            )}
        </Modal>
    )
}
