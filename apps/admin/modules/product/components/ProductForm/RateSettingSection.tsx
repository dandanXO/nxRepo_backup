import React from "react";
import {Divider, Form, Input, Typography, Row, Col, Space, Button} from "antd";

import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {
  CustomValidator,
  NewNumberValidatorPromise,
  NumberValidator,
  PipeValidator
} from "../../utils/validator";
import {CustomAntFormFieldError} from "../../hooks/useProductFormModal";

const { Paragraph, Text } = Typography;
interface RateSettingSectionProps {
  form: any;
  customAntFormFieldError: CustomAntFormFieldError
}
const RateSettingSection = (props: RateSettingSectionProps) => {
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
                   validateStatus={props?.customAntFormFieldError?.preInterestRate.validateStatus}
                   help={props?.customAntFormFieldError?.preInterestRate.help}
                   // rules={[
                   //   {
                   //     transform: (value) => Number(value),
                   //     validator: async (_, value) =>NumberValidator(_, value)({
                   //       min: 1,
                   //       minMessage: "请输入前置利息",
                   //       max: 100,
                   //       maxMessage: "请填写1-100间数字"
                   //     })
                   //     validator: async (_, value) => PipeValidator(_, value)([
                   //       NewNumberValidatorPromise(value, {
                   //         min: 1,
                   //         minMessage: "请输入後置利息",
                   //         max: 100,
                   //         maxMessage: "请填写1-100间数字"
                   //       }),
                   //       CustomValidator((resolve, reject) => {
                   //         const preInterestRate = value;
                   //         const postInterestRate = props.form.getFieldValue("postInterestRate");
                   //         console.log("preInterestRate", preInterestRate);
                   //         console.log("postInterestRate", postInterestRate);
                   //         if(preInterestRate + postInterestRate > 100) {
                   //           reject("前置利息＋后置利息不得超过100%");
                   //         }else {
                   //           resolve();
                   //         }
                   //       })
                   //     ]),
                   //   },
                   // ]}
        >
          <Input allowClear placeholder="填写 0 - 100 间数字"
                 // onChange={async () => {
                 //    const preInterestRate = props.form.getFieldValue("preInterestRate");
                 //    const postInterestRate = props.form.getFieldValue("postInterestRate");
                 //    console.log("preInterestRate", preInterestRate);
                 //    console.log("postInterestRate", postInterestRate);
                 //    if(postInterestRate === "") {
                 //      return;
                 //    }
                 //    if(Number(preInterestRate) + Number(postInterestRate) > 100) {
                 //      // const values = await props.form.validateFields(['preInterestRate', 'postInterestRate']);
                 //      // console.log("values", values);
                 //      alert("> 100");
                 //    }
                 //  }}
          />
        </Form.Item>
        <Form.Item style={{display: 'inline-block', marginBottom: 0}}>%</Form.Item>
      </Form.Item>

      <Form.Item label="后置利息" required>
        <Form.Item name="postInterestRate" style={{display: 'inline-block', width: '180px', margin: '0 8px 0 0'}}
                   validateStatus={props?.customAntFormFieldError?.postInterestRate.validateStatus}
                   help={props?.customAntFormFieldError?.postInterestRate.help}
                   // rules={[
                   //   {
                   //     transform: (value) => Number(value),
                   //     validator: async (_, value) =>NumberValidator(_, value)({
                   //       min: 1,
                   //       minMessage: "请输入後置利息",
                   //       max: 100,
                   //       maxMessage: "请填写1-100间数字"
                   //     })
                   //   },
                   // ]}
        >
          <Input allowClear placeholder="填写 0 - 100 间数字"
                 // onChange={async () => {
                 //    const preInterestRate = props.form.getFieldValue("preInterestRate");
                 //    const postInterestRate = props.form.getFieldValue("postInterestRate");
                 //    console.log("preInterestRate", preInterestRate);
                 //    console.log("postInterestRate", postInterestRate);
                 //    if(postInterestRate === "") {
                 //      return;
                 //    }
                 //    if(Number(preInterestRate) + Number(postInterestRate) > 100) {
                 //      // const values = await props.form.validateFields(['preInterestRate', 'postInterestRate']);
                 //      // console.log("values", values);
                 //      alert("> 100");
                 //    }
                 //
                 //  }}
          />
        </Form.Item>
        <Form.Item style={{display: 'inline-block', marginBottom: 0}}>%</Form.Item>
      </Form.Item>

      <Form.Item label="日利息" tooltip="以年利息计" required>
        <Form.Item name="dailyRate" style={{display: 'inline-block', width: '180px', margin: '0 8px 0 0'}}
                   rules={[
                     {
                       transform: (value) => Number(value),
                       validator: async (_, value) =>NumberValidator(_, value)({
                         min: 0,
                         minMessage: "请输入日利息",
                         max: 36,
                         maxMessage: "请填写0-36间数字"
                       })
                     },
                   ]}
        >
          <Input allowClear placeholder="填写 1-36 间数字"/>
        </Form.Item>
        <Form.Item style={{display: 'inline-block', marginBottom: 0}}>%</Form.Item>
      </Form.Item>

      <Form.Item label="展期利率" required>
        <Form.Item name="extensionRate" style={{display: 'inline-block', width: '180px', margin: '0 8px 0 0'}}
                   rules={[
                     {
                       transform: (value) => Number(value),
                       validator: async (_, value) =>NumberValidator(_, value)({
                         min: 1,
                         minMessage: "请输入展期利率",
                         max: 100,
                         maxMessage: "请填写1-100间数字"
                       })
                     },
                   ]}
        >
          <Input allowClear placeholder="填寫 0 - 100 間數字"/>
        </Form.Item>
        <Form.Item style={{display: 'inline-block', marginBottom: 0}}>%</Form.Item>
      </Form.Item>

      <Form.Item label="逾期费率" required>
        <Form.Item name="overdueRate" style={{display: 'inline-block', width: '180px', margin: '0 8px 0 0'}}
                   rules={[
                     {
                       transform: (value) => Number(value),
                       validator: async (_, value) =>NumberValidator(_, value)({
                         min: 1,
                         minMessage: "请输入逾期费率",
                         max: 100,
                         maxMessage: "请填写1-100间数字"
                       })
                     },
                   ]}
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
                {fields.map(({ key, name, ...restField }) => (
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
                      required
                      rules={[
                        {
                          transform: (value) => Number(value),
                          validator: async (_, value) =>NumberValidator(_, value)({
                            min: 0,
                            minMessage: "请输入前置利息",
                            max: 100,
                            maxMessage: "请填写0-100间数字"
                          })
                        },
                      ]}
                    >
                      <Input placeholder="前置利息" suffix={"%"}/>
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'postInterest']}
                      required
                      rules={[
                        {
                          transform: (value) => Number(value),
                          validator: async (_, value) =>NumberValidator(_, value)({
                            min: 0,
                            minMessage: "请输入后置利息",
                            max: 100,
                            maxMessage: "请填写0-100间数字"
                          })
                        },
                      ]}
                    >
                      <Input placeholder="后置利息" suffix={"%"}/>
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
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
