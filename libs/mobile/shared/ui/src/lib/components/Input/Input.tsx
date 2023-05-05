import React, { useEffect, useMemo, useRef, useState } from 'react';
import SuccessInputIcon from './atom/SuccessInputIcon';
import ErrorInputIcon from './atom/ErrorInputIcon';
import { InputLintContent } from './atom/InputLintContent';
import { StatusIconContainer } from './template/StatusIconContainer';
import { InputContainer } from './template/InputContainer';
import { StyledInput2, StyledTopInput } from './atom/StyledInput';
import { InputStatus, InputValidStatus } from './type';
import { useForceUpdate } from '../useForceUpdate';
import {
  LeftDefaultLabel,
  UpperDefaultLabel,
  UpperFilledLabel,
} from './atom/UpperLabel';
import styled from 'styled-components';

const InputAndMessageContainer = styled.div``;
const ErrorMessageSection = styled.div`
  color: #f82626;
  margin-left: 20px;
  padding-top: 5px;
  text-align: left;
`;
export type InputType =
  | 'text'
  | 'password'
  | 'email'
  | 'tel'
  | 'number'
  | 'button'
  | 'checkbox'
  | 'url'
  | 'color'
  | 'date'
  | 'time'
  | 'week'
  | 'datetime-local'
  | 'month'
  | 'radio'
  | 'range'
  | 'search'
  | 'file';

export interface InputProps {
  // Common
  id?: string;
  type?: InputType;
  value: any;
  disabled?: boolean;
  // placement?: Placement;
  maxLength?: number;
  minLength?: number;
  placeholder?: string;
  // Event Handler
  onFocus?: (event: React.FocusEvent) => void;
  onBlur?: (event: React.FocusEvent) => void;
  // Validation
  valid?: InputValidStatus;
  errorMessage?: string | React.ReactNode;
  hintMessage?: string | React.ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLSpanElement>) => void;
  onKeyDown?: (event: any) => void;
  onKeyUp?: (event: any) => void;
  onInput?: (event: any) => void;
  customType?: string;
  otherRegionClass?: string[];
  onClickOutsideSelf?: () => void;
  toolTipZindex?: number;
  width?: number;
  inputWidth?: string;
  theme?: {
    mode: 'early' | 'night';
  };
  isThemeControlledByComponent?: boolean;
  themeType?: 'early' | 'night';
  className?: string;
  // label type
  label?: string;
  labelType?: "none" | "top" | "left";
  style?: any;
  ref?: any;
  suffix?: string | React.ReactNode;
  outlineType?: "outlined" | "standard"; //inputContainer (standard樣式為底線的)
  textAlign?: 'right' | 'left' | 'center'
}

// NOTICE: 實際產出元件的 dot 特性
interface InputDotComponentProps<T> {
  Text: React.ComponentType<T>;
  Password: React.ComponentType<T>;
  Number: React.ComponentType<T>;
}

// 實際產出元件
export type InputInterface = React.FunctionComponent<InputProps> &
  InputDotComponentProps<InputProps>;

const Input: InputInterface = ({
  ref,
  className,
  id,
  type,
  valid,
  disabled,
  placeholder,
  minLength,
  maxLength,
  // placement,
  onFocus,
  onBlur,
  value = '',
  errorMessage,
  hintMessage,
  onChange,
  onClick,
  onInput,
  // FIXME:
  otherRegionClass,
  onClickOutsideSelf,
  toolTipZindex,
  isThemeControlledByComponent,
  themeType,
  width,
  label,
  labelType = 'top',
  style,
 inputWidth,
   suffix,
   outlineType,
   textAlign
}: InputProps) => {
  const forceUpdate = useForceUpdate();

  /* NOTE:Input elements must be either controlled or uncontrolled
        (specify either the value prop, or the defaultValue prop, but not both).
        Decide between using a controlled or uncontrolled input element and remove one of these props. More
     */
  const statusRef = useRef<InputStatus>('Idle');

  // REFACTORING: For Typescript
  const [preValid, setPreValid] = useState<InputValidStatus>('ReadyForValid');

  const targetRef = useRef(null);

  // 錯誤訊息提示
  let validMessage: string | React.ReactNode = null;
  // let hintMessage: string | React.ReactNode = null;

  const [showHintMessage, setShowHintMessage] = useState(false);

  (typeof errorMessage === 'string' || React.isValidElement(errorMessage)) &&
  disabled
    ? hintMessage
    : (validMessage = errorMessage);

  // 顯示 Tooltip
  // take out useMemo, Coz it possibly changed by other input, so value&valid wouldn't change when other input trigger it.
  const showToolTip = (() => {
    let showToolTip = false;
    if (!valid) {
      if (statusRef.current === 'Focus' || statusRef.current === 'KeyDown') {
        showToolTip = true;
      }
    }
    return showToolTip;
  })();

  const showHintToolTip = useMemo(() => {
    setShowHintMessage(!!hintMessage);
    return !!hintMessage;
  }, [hintMessage]);

  useEffect(() => {
    // NOTICE: 每次更新 valid, 設定上次的 valid Status
    if (typeof valid !== 'undefined') setPreValid(valid);
  }, [valid]);

  // Uncontrolled
  // useEffect(() => {
  //     if(props.runValid) {
  //
  //     }
  // }, [props.value])

  const [inputBefore, setInputBefore] = useState(false);

  // REFACTORING: 集中管理
  const selectRef = useRef<HTMLLabelElement | null>(null);
  useEffect(() => {
    const checkComponentSelfContent = (
      componentRef: React.MutableRefObject<HTMLLabelElement | null>,
      target: any,
      otherClass: string[] = []
    ) => {
      // console.log("componentRef.current", componentRef.current);
      if (componentRef.current && componentRef.current.contains(target)) {
        return true;
      }
      const hasOtherClass = otherClass.map((componentClass) => {
        if ((target as Element).closest(componentClass)) {
          return true;
        } else {
          return false;
        }
      });
      // REFACTORING
      // FIXME: input-tooltip-block-click 為 className 的區域不會被關閉
      if ((target as Element).closest('.input-tooltip-block-click'))
        return true;

      return hasOtherClass.indexOf(true) > -1;
    };

    const handleClickOutside = (event: MouseEvent) => {
      // console.log("handleClickOutside", event.target);
      const target = event.target;
      if (
        event.target instanceof Node &&
        !checkComponentSelfContent(selectRef, target, otherRegionClass)
      ) {
        // TODO: 不在區域內的話，執行相關函式
        setShowHintMessage(false);
        onClickOutsideSelf && onClickOutsideSelf();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // NOTICE: upperLabelType
  // const upperLabelType = statusRef.current === "Focus" || statusRef.current === "KeyDown"
  // console.log("upperLabelType", upperLabelType);

  // NOTICE:
  const labelID = id || label;
  const [isEdit, setEdit] = useState(false);

  let CustomInput: any;
  let LabelComponentElement;
  let upperLabelType = false;

  // NOTE: 版型 TOP
  if (labelType === 'top') {
    CustomInput = StyledTopInput;
    upperLabelType = true;

    // NOTE: 無編輯中
    if (!isEdit) {
      if (String(value).length === 0) {
        // NOTE: 編輯前
        LabelComponentElement = (
          <UpperFilledLabel htmlFor={labelID}>{label}</UpperFilledLabel>
        );
      } else {
        // NOTE: 編輯後
        LabelComponentElement = (
          <UpperDefaultLabel htmlFor={labelID}>{label}</UpperDefaultLabel>
        );
      }
    } else {
      // NOTE: 編輯中
      LabelComponentElement = (
        <UpperDefaultLabel htmlFor={labelID}>{label}</UpperDefaultLabel>
      );
    }

  } else if(labelType === "none") {
    //
    CustomInput = StyledTopInput;
    upperLabelType = true;
  } else {
    // NOTE: 版型 Left
    CustomInput = StyledInput2;
    upperLabelType = false;

    // Left
    LabelComponentElement = (
      <LeftDefaultLabel htmlFor={labelID}>{label}</LeftDefaultLabel>
    );
  }
  // let isFocus = statusRef.current === "Focus" || statusRef.current === "KeyDown" ;
  return (
    <div ref={ref}>
      <InputAndMessageContainer className={className} style={style}>
        <InputContainer
          onFocus={() => {
            if (disabled) return;
            setEdit(true);
          }}
          onBlur={() => {
            if (disabled) return;
            setEdit(false);
          }}
          ref={selectRef}
          width={width}
          upperLabelType={upperLabelType}
          isFocus={isEdit}
          disabled={disabled}
          outlineType={outlineType}
         
        >
          {LabelComponentElement}

          <CustomInput
            textAlign={textAlign}
            inputWidth={inputWidth}
            // NOTICE: labelID
            disabled={disabled}
            id={labelID}
            // isFocus={value.length > 0 && !isEdit}
            ref={targetRef}
            // Modal - Display
            // disabled={disabled}
            // style={prefix(props.style)}
            // Modal - Type
            type={type}
            // Modal - Data
            minLength={minLength}
            maxLength={maxLength}
            value={value}
            placeholder={placeholder}
            // placement={placement}
            // Modal - Status
            // keyStatus={statusRef.current}
            // Modal - Validation
            // runValid={typeof valid !== "undefined"}
            // prevValidStatus={preValid}
            // validStatus={typeof valid !== "undefined" ? valid : "ReadyForValid"}
            // Modal - Event Handler
            onClick={(event: any) => {
              if (disabled) return;
              // console.log("onClick")
              onClick && onClick(event);
              // statusRef.current = "Focus";
              // forceUpdate();
            }}
            // [Mouse Events]
            // onMouseOver={() => {
            //     console.log("onMouseOver");
            //     // if (keyStatus === "Idle") setKeyState("Hover");
            //     if (statusRef.current === "Idle") {
            //         statusRef.current = "Hover";
            //         forceUpdate();
            //     }
            // }}
            onMouseOut={() => {
              // console.log("onMouseOut");
              if (disabled) return;
              if (
                statusRef.current !== 'Focus' &&
                statusRef.current !== 'KeyDown'
              ) {
                statusRef.current = 'Idle';
                forceUpdate();
              }
            }}
            // [Form Events]
            // onSelect={event => {
            //     props.onSelect && props.onSelect(event);
            // }}
            onFocus={(event: any) => {
              if (disabled) return;
              // console.log("onFocus");
              // FIXME: 這段起初的意義
              // if (statusRef.current === "Hover") {
              //     // NOTE: 註解這段解決有紅色小點點問題
              statusRef.current = 'Focus';
              forceUpdate();
              // }

              // if (!inputBefore) {
              //     setInputBefore(true);
              // }

              // if (props.valid) {
              //     setRunValidAction(false);
              // }
              // Outer Interface
              onFocus && onFocus(event);
            }}
            onBlur={(event: any) => {
              if (disabled) return;
              // console.log("onBlur");
              // if (statusRef.current === "Focus" || statusRef.current === "KeyDown") {
              statusRef.current = 'Idle';
              forceUpdate();
              // }
              // NOTICE: 輸入過之後並且 Blur 就開啟判斷機制
              // setRunValidAction(true);
              // if (preValid == false && props.valid === true) {
              //     setPreValid(true);
              // }

              // Outer Interface
              onBlur && onBlur(event);
            }}
            onChange={(event: any) => {
              if (disabled) return;
              // console.log("onChange");
              // console.log("event", event.target.value);
              // if(customType === "number") {
              //     const reg: RegExp = new RegExp(/^\d{0,19}[.]?\d{0,2}$/);
              //     if (!reg.test(event.target.value)) return;
              // }
              if (!inputBefore) {
                setInputBefore(true);
                forceUpdate();
              }

              // NOTE: 並不幫忙更新值
              // SetValue(event.target.value);
              onChange && onChange(event);

              // NOTICE: broke outer code
              // props.onChange && props.onChange(event.target.value);
            }}
            onInput={(event: any) => {
                onInput && onInput(event);
            }}
            // onInvalid={event => {
            //     props.onInvalid && props.onInvalid(event);
            // }}
            // Form - button
            // onReset={event => {
            //     props.onReset && props.onReset(event);
            // }}
            // NOTICE: [Not supported] Pure Javascript Not supported IE nad not supported React
            // onSearch={event => {
            //     props.onSearch && props.onSearch(event);
            // }}
            // Form - button
            // onSubmit={event => {
            //     props.onSubmit && props.onSubmit(event);
            // }}
            // [Keyboard Events]
            onKeyDown={(event: any) => {
              if (disabled) return;
              // setRunValidAction(false);
              statusRef.current = 'KeyDown';
              forceUpdate();
              // Outer Interface
              // props.onKeyDown && props.onKeyDown(event);
              // props.onChange && props.onChange(event);
            }}
            // onKeyPress={event => {
            //     props.onKeyPress && props.onKeyPress(event);
            // }}
            // onKeyUp={event => {
            //     props.onKeyUp && props.onKeyUp(event);
            // }}
            // [Clipboard Events]
            // onCopy={event => {
            //     props.onCopy && props.onCopy(event);
            // }}
            // onCut={event => {
            //     props.onCut && props.onCut(event);
            // }}
            // onPaste={event => {
            //     props.onPaste && props.onPaste(event);
            // }}
            // NOTE:
            // onPressEnter
            // allowClear
            // suffix
            // isThemeControlledByComponent={isThemeControlledByComponent}
            // themeType={themeType}
          />
          {/*NOTICE: suffix*/}
          {suffix}
          {/*<StyledLabel />*/}
          {/*FIXME:*/}
          {inputBefore && typeof valid === 'boolean' && (
            <StatusIconContainer>
              {valid ? <SuccessInputIcon /> : <ErrorInputIcon />}
            </StatusIconContainer>
          )}
          {valid === false &&
            validMessage !== '' &&
            (statusRef.current === 'Focus' ||
              statusRef.current === 'KeyDown') && (
              // <Tooltip
              //     target={targetRef}
              //     placement={placement ? placement : "right"}
              //     show={showToolTip}
              //     customStyle
              //     zIndex={toolTipZindex}
              // >
              <InputLintContent>{validMessage}</InputLintContent>
              // </Tooltip>
            )}
          {/*Disable - Tooltip*/}
          {/*{showHintMessage && disabled === true && (*/}
          {/*    <Tooltip target={targetRef} placement={placement ? placement : "right"} show={showHintToolTip} customStyle>*/}
          {/*        <InputLintContent>{hintMessage}</InputLintContent>*/}
          {/*    </Tooltip>*/}
          {/*)}*/}
          {showHintMessage && disabled === true && (
            <InputLintContent>{hintMessage}</InputLintContent>
          )}
        </InputContainer>
        <ErrorMessageSection>{errorMessage}</ErrorMessageSection>
      </InputAndMessageContainer>
    </div>
  );
};

// const InputForwardRef = React.forwardRef((props: InputInterface, ref) => (
//     <Input ref={ref} {...props} />
// ))

function Text(props: InputProps) {
  return <Input type="text" {...props} />;
}
function Password(props: InputProps) {
  return <Input type="password" {...props} />;
}
function Number(props: InputProps) {
  return <Input type="text" customType="number" {...props} />;
}
Input.Text = Text;
// NOTICE: type=="password"，瀏覽器會將中文或是其他語系輸入法轉成英文輸入法
Input.Password = Password;
Input.Number = Number;
export default Input;
