import styled from "styled-components";
import cx from "classnames"
import {useState} from "react";
import { tcx } from '../../utils/tcx';


export const InputSection = styled.a<{
  focus?: boolean;
  validation?: boolean;
}>`
  //border: 1px solid transparent;
  /* border: 1px solid var(--main-primary-main); */
  /* border-radius: 25px; */

  //box-shadow: inset 0 0 36px 5px rgba(255,255,255,.08);

  /* padding: 14px 16px; */
  display: flex;
  flex-direction: row;

  transition: all .4s;

  /* border-color: var(--main-primary-main); */
  ${(props) => props.focus && `
    border-color: #01FF52;
  `}
  ${(props) => props.validation === false && `
    border-color: #E47174;
  `}

`

export type IInput = {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  type?: string;
  placeholder?: string;
  value?: string;
  className?: string;
  inputClassName?: string;
  themeStyle?: "normal" | "simple";
  children?: React.ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  validation?: boolean;
  errorMessage?: string;
  outerSuffix?: React.ReactNode;

}

export const Input = (props: IInput) => {
  // const inputRef = useRef();
  const [focus, setFocus] = useState(false);
  return (
    <div className={"mb-4"}>
      <div className={"flex flex-row justify-center items-center"}>
        <InputSection focus={focus} onClick={() => {
          // (inputRef && inputRef.current as any).focus()
        }}
        className={tcx("w-full rounded-3xl border-main-primary-main border-solid border py-4 px-3.5 ",
          // "active:!border-2 active:!border-[#01FF52]": !props.themeStyle,
          ["border-utils-gray", props.themeStyle === "simple"],
          props.className
        )}
                      validation={props.validation}
        >
          {props.prefix}
          {props.children ? (props.children) : (
            <input
              // ref={inputRef as any}
              className={cx(props.inputClassName, "bg-transparent focus:outline-none w-full text-[#c1c1c1] placeholder-color")}
              type={props.type || "text"}
              placeholder={props.placeholder}
              value={props.value}
              onFocus={() => {
                setFocus(true)
              }}
              onBlur={() => {
                setFocus(false)
              }}
              onChange={(event) => {
                props.onChange && props.onChange(event)
              }}
            />
          )}
          {props.suffix}
        </InputSection>
        {props.outerSuffix}
      </div>
      {props.validation === false && (
        <div className={"text-left text-[#E47174] pl-4"}>{props.errorMessage}</div>
      )}
    </div>

  )
}

export type InputValue<T> = {
  data: T;
  isValidation?: boolean;
  errorMessage?: string;
};
