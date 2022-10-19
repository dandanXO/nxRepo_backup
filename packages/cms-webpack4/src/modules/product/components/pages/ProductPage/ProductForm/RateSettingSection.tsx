import React, {CSSProperties} from "react";
import {Divider, Form, Input, Typography, Row, Col, Space, Button} from "antd";

import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {
  CustomValidator,
  NewNumberValidatorPromise,
  NumberValidator,
  PipeValidator
} from "../../../../../shared/utils/validation/validator";
import {maxOneUnitFloatReplacer} from "../../../../../shared/utils/maxOneUnitFloatReplacer";
import {CustomAntFormFieldError} from "../../../../../shared/utils/validation/CustomAntFormFieldError";

const { Paragraph, Text } = Typography;
interface RateSettingSectionProps {
  form: any;
  customAntFormFieldError: CustomAntFormFieldError
}
export const CustomLabel = (props: {style?: CSSProperties, children: string}) => <div style={{ marginRight: 8, width: 123, height: 32, lineHeight: "32px", display: "inline-block", ...props.style}}>{props.children}</div>

const RateSettingSection = (props: RateSettingSectionProps) => {
    // console.log("customAntFormFieldError", props.customAntFormFieldError);
  return (
    <React.Fragment>
      <Divider orientation="left">费率设定</Divider>
      <Paragraph style={{ margin: "0 0 0 100px" }}>
          <span>填写规则：</span>
        <ul>
          <li>所有费率至多填写至<Text strong>小数点后第一位</Text>，例如：20 或 20.5</li>
          <li><Text strong>前置利息+后置利息</Text>不得超过100%</li>
        </ul>
      </Paragraph>

      <Form.Item label="前置利息" required>
        <Form.Item name="preInterestRate" style={{display: 'inline-block', width: '180px', margin: '0 8px 0 0'}}
                   validateStatus={(props?.customAntFormFieldError?.preInterestRate as any).validateStatus}
                   help={(props?.customAntFormFieldError?.preInterestRate as any).help}
                   normalize={(value, prevValue, prevValues) => {
                       return maxOneUnitFloatReplacer(value);
                   }}
        >
          <Input allowClear placeholder="填写 0 - 100 间数字"/>
        </Form.Item>
        <Form.Item style={{display: 'inline-block', marginBottom: 0}}>%</Form.Item>
      </Form.Item>

      <Form.Item label="后置利息" required>
        <Form.Item name="postInterestRate" style={{display: 'inline-block', width: '180px', margin: '0 8px 0 0'}}
                   validateStatus={(props?.customAntFormFieldError?.postInterestRate as any).validateStatus}
                   help={(props?.customAntFormFieldError?.postInterestRate as any).help}
                   normalize={(value, prevValue, prevValues) => {
                       return maxOneUnitFloatReplacer(value);
                   }}
        >
          <Input allowClear placeholder="填写 0 - 100 间数字"/>
        </Form.Item>
        <Form.Item style={{display: 'inline-block', marginBottom: 0}}>%</Form.Item>
      </Form.Item>

      <Form.Item label="日利息" tooltip="以年利息计" required>
        <Form.Item name="dailyRate" style={{display: 'inline-block', width: '180px', margin: '0 8px 0 0'}}
                   rules={[
                     {
                       validator: async (_, value) =>NumberValidator(_, value)({
                         required: true,
                         requiredErrorMessage: "请输入日利息",
                         min: 0,
                         minMessage: "请填写0-36间数字",
                         max: 36,
                         maxMessage: "请填写0-36间数字"
                       })
                     },
                   ]}
                   normalize={(value, prevValue, prevValues) => {
                       return maxOneUnitFloatReplacer(value);
                   }}
        >
          <Input allowClear placeholder="填写 0-36 间数字"/>
        </Form.Item>
        <Form.Item style={{display: 'inline-block', marginBottom: 0}}>%</Form.Item>
      </Form.Item>

      <Form.Item label="展期利率" required>
        <Form.Item name="extensionRate" style={{display: 'inline-block', width: '180px', margin: '0 8px 0 0'}}
                   rules={[
                     {
                       validator: async (_, value) =>NumberValidator(_, value)({
                        required: true,
                        requiredErrorMessage: "请输入展期利率",
                         min: 0,
                         minMessage: "请填写0-100间数字",
                         max: 100,
                         maxMessage: "请填写0-100间数字"
                       })
                     },
                   ]}
                   normalize={(value, prevValue, prevValues) => {
                       return maxOneUnitFloatReplacer(value);
                   }}
        >
          <Input allowClear placeholder="填寫 0 - 100 间數字"/>
        </Form.Item>
        <Form.Item style={{display: 'inline-block', marginBottom: 0}}>%</Form.Item>
      </Form.Item>

      <Form.Item label="逾期费率" required>
        <Form.Item name="overdueRate" style={{display: 'inline-block', width: '180px', margin: '0 8px 0 0'}}
                   rules={[
                     {
                       validator: async (_, value) =>NumberValidator(_, value)({
                        required: true,
                        requiredErrorMessage: "请输入逾期费率",
                         min: 0,
                         minMessage: "请输入逾期费率",
                         max: 100,
                         maxMessage: "请填写0-100间数字"
                       })
                     },
                   ]}
                   normalize={(value, prevValue, prevValues) => {
                       return maxOneUnitFloatReplacer(value);
                   }}
        >
          <Input allowClear placeholder="填写 0 - 100 间数字"/>
        </Form.Item>
        <Form.Item style={{display: 'inline-block', marginBottom: 0}}>%</Form.Item>
      </Form.Item>


      <Form.Item label="复贷利率" required tooltip={
        <div>
          <span>例如：</span>
          <ul>
            <li>起始期数1，前置利息10%，后置利息15%</li>
            <li>+起始期数4，前置利息8%，后置利息12%</li>
            <li>则1~3期费率同起始期数1</li>
            <li>第4期之后费率同起始期数4</li>
          </ul>
        </div>
      }>
        <Form.List name="productInterestRatePairs">
          {(fields, { add, remove }) => {
            return (
              <>
                {fields.map(({ key, name, ...restField }, index) => (
                    <>
                        {index === 0 && (
                            <Input.Group compact>
                                <div>
                                    <CustomLabel>起始期数</CustomLabel>
                                    <CustomLabel style={{ width: 135 }}>前置利息</CustomLabel>
                                    <CustomLabel style={{ width: 135 }}>后置利息</CustomLabel>
                                    <CustomLabel>提額金额</CustomLabel>
                                </div>
                            </Input.Group>
                        )}

                      <Space key={key} size={8} style={{ marginBottom: 0 }} align="baseline">
                        <Form.Item
                          {...restField}
                          name={[name, 'num']}
                          rules={[
                            {
                              transform: (value) => Number(value),
                              validator: async (_, value) =>NumberValidator(_, value)({
                                min: 1,
                                minMessage: "请输入起始期数",
                              })
                            },
                          ]}
                        >
                          <Input placeholder="起始期数" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'preInterest']}
                          validateStatus={props?.customAntFormFieldError?.productInterestRatePairs?.[index]?.preInterest?.validateStatus || ""}
                          help={props?.customAntFormFieldError?.productInterestRatePairs?.[index]?.preInterest?.help || ""}
                          normalize={(value, prevValue, prevValues) => {
                              return maxOneUnitFloatReplacer(value);
                          }}
                        >
                          <Input placeholder="前置利息" suffix={"%"}/>
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'postInterest']}
                          validateStatus={props?.customAntFormFieldError?.productInterestRatePairs?.[index]?.postInterest?.validateStatus || ""}
                          help={props?.customAntFormFieldError?.productInterestRatePairs?.[index]?.postInterest?.help || ""}
                          normalize={(value, prevValue, prevValues) => {
                              return maxOneUnitFloatReplacer(value);
                          }}
                        >
                          <Input placeholder="后置利息" suffix={"%"}/>
                        </Form.Item>


                          <Form.Item
                              {...restField}
                              name={[name, 'plusAmount']}
                              required
                              rules={[
                                  {
                                      transform: (value) => Number(value),
                                      validator: async (_, value) =>NumberValidator(_, value)({
                                          min: 0,
                                          minMessage: "请输入提額金额",
                                      })
                                  },
                              ]}
                          >
                              <Input placeholder="提額金额"/>
                          </Form.Item>


                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    </>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    添加
                  </Button>
                </Form.Item>
              </>
            )
          }}
        </Form.List>
      </Form.Item>




    </React.Fragment>
  )
}

export default RateSettingSection;
