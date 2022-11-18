import * as React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import {Input, InputGroup} from './index';
import { AppThemeProvider } from '../index';
import {useCallback, useState} from "react";
import {z} from "zod";
import {InputValue} from "../../../../../../../../apps/mobile/src/app/core/types/InputValue";
import {validationInfo} from "../../../../../../../../apps/mobile/src/app/components/pages/BindBankAccountPage/validationInfo";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Component/Input',
  component: Input,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  args: {
    // theme,
  },
  argTypes: {
    styleType: {
      // name: "styleType",
      type: {
        name: 'string',
        required: false,
      },
      defaultValue: 'primary',
      description: '樣式類型',
      table: {
        type: {
          summary: 'string',
          detail: '指定限定的字串類型',
        },
        defaultValue: { summary: 'primary' },
      },
      options: ['primary', 'secondary', 'link'],
      control: {
        type: 'radio',
      },
    },
    size: {
      control: 'radio',
      options: ['small', 'large'],
      description: '尺寸',
      defaultValue: 'small',
    },
  },
  parameters: {
    docs: {
      description: {
        component: '按鈕',
      },
    },
  },
} as ComponentMeta<typeof Input>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template1: ComponentStory<typeof Input> = (args) => {

  const [ifscData, setIFSCData] = useState<InputValue<string>>({
    data: "",
    isValidation: false,
    errorMessage: "",
  });



  const [disableUTR, setDisabledUTR] = useState(false);
  const [utr, setURT] = useState<InputValue<string>>({
    data: "",
    isValidation: false,
    errorMessage: "",
  });

  const validateUtr = useCallback(() => {
    // NOTE: Scheme
    const utrScheme = z
      .string({
        invalid_type_error: "This filed need to be string",
      })
      .min(1, "This field cannot be left blank")
      .length(12, {
        message: "digits only, 12 numbers max",
      });
    // NOTE: Parse scheme
    const result = utrScheme.safeParse(utr.data);
    // NOTE: Parsed result
    if (!result.success) {
      const firstError = result.error.format();
      const errorMessage = firstError._errors[0];
      setURT({
        ...utr,
        isValidation: false,
        errorMessage,
      });
    } else {
      setURT({
        ...utr,
        isValidation: true,
        errorMessage: "",
      });
    }
  }, [utr.data]);

  return (
    <AppThemeProvider>
      {/*<Button {...args}>Confirm</Button>*/}

      <div>輸入前</div>
      <Input
        labelType="right"
        label="UTR"
        inputWidth={"200px"}
        className="mb"
        value={utr.data}
        disabled={disableUTR}
        onChange={(event) => {
          setURT({
            ...utr,
            data: event.target.value,
          });
        }}
        onBlur={() => {
          validateUtr();
        }}
        errorMessage={utr.errorMessage}
      />

      <div>輸入中(請自行 Focus)</div>
      <Input
        labelType="right"
        label="UTR"
        inputWidth={"200px"}
        className="mb"
        value={utr.data}
        disabled={disableUTR}
        onChange={(event) => {
          setURT({
            ...utr,
            data: event.target.value,
          });
        }}
        onBlur={() => {
          validateUtr();
        }}
        errorMessage={utr.errorMessage}
      />


      <div>輸入後 - 正確</div>
      <Input
        label="UTR"
        labelType="right"
        inputWidth={"200px"}
        className="mb"
        value={"123213"}
      />

      <div>輸入後 - 錯誤</div>
      <Input
        labelType="right"
        label="UTR"
        inputWidth={"200px"}
        className="mb"
        value={"123213"}
        disabled={disableUTR}
        errorMessage={"請輸入正確格式"}
      />

      <div>輸入後 - disable</div>
      <Input
        labelType="right"
        label="UTR"
        inputWidth={"200px"}
        className="mb"
        value={"123213"}
        disabled={true}
      />

    </AppThemeProvider>
  )
}

export const LabelOnLeft = Template1.bind({});


// More on args: https://storybook.js.org/docs/react/writing-stories/args
LabelOnLeft.args = {
  // styleType: 'primary',
  // size: 'small',
};




const Template2: ComponentStory<typeof Input> = (args) => {

  const [ifscData, setIFSCData] = useState<InputValue<string>>({
    data: "",
    isValidation: false,
    errorMessage: "",
  });

  const validateIFSC = useCallback(() => {
    const ifscScheme = z
      .string()
      .min(1, validationInfo.min1)
      .length(11, "IFSC must be 11 digits only.");
    const result = ifscScheme.safeParse(ifscData.data);
    if (!result.success) {
      const firstError = result.error.format();
      const errorMessage = firstError._errors[0];
      setIFSCData({
        ...ifscData,
        isValidation: false,
        errorMessage,
      });
    } else {
      setIFSCData({
        ...ifscData,
        isValidation: true,
        errorMessage: "",
      });
    }
  }, [ifscData.data]);


  return (
    <AppThemeProvider>
      {/*<Button {...args}>Confirm</Button>*/}


      <div>輸入前</div>
      <Input
        className="mb"
        label="IFSC Code"
        value={ifscData.data}
        onChange={(event) => {
          let data = event.target.value;
          data = data.replace(/[^a-zA-Z0-9]/g, "");
          setIFSCData({
            ...ifscData,
            data,
          });
        }}
        onBlur={() => {
          validateIFSC();
        }}
        errorMessage={ifscData.errorMessage}
      />

      <div>輸入中(請自行 Focus)</div>
      <Input
        className="mb"
        label="IFSC Code"
        value={ifscData.data}
        onChange={(event) => {
          let data = event.target.value;
          data = data.replace(/[^a-zA-Z0-9]/g, "");
          setIFSCData({
            ...ifscData,
            data,
          });
        }}
        onBlur={() => {
          validateIFSC();
        }}
        errorMessage={ifscData.errorMessage}
      />


      <div>輸入後 - 正確</div>
      <Input
        className="mb"
        label="IFSC Code"
        value={"1234"}
        errorMessage={ifscData.errorMessage}
      />

      <div>輸入後 - 錯誤</div>
      <Input
        className="mb"
        label="IFSC Code"
        value={"1234"}
        errorMessage={"請輸入正確格式"}
      />

      <div>輸入後 - disable</div>
      <Input
        className="mb"
        label="IFSC Code"
        value={"1234"}
        disabled={true}
      />

    </AppThemeProvider>
  )
}

export const LabelOnTop = Template2.bind({});


// More on args: https://storybook.js.org/docs/react/writing-stories/args
LabelOnTop.args = {
  // styleType: 'primary',
  // size: 'small',
};
