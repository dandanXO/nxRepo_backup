import cx from "classnames"
import {useState} from "react";
import {tcx} from '../../utils/tcx';
import {renderByPlatform} from "../../utils/renderByPlatform";
import {InputSection} from "./InputSection"

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

const BaseInput = (props: IInput) => {
  // const inputRef = useRef();
  const [focus, setFocus] = useState(false);
  return (
    <div className={"mb-3 md:mb-4"}>
      <div className={"flex flex-row justify-center items-center"}>
        <InputSection
          focus={focus}
          onClick={() => {
            // (inputRef && inputRef.current as any).focus()
          }}
          className={tcx("w-full",
            ["border-utils-gray", props.themeStyle === "simple"],
            props.className
          )}
          validation={props.validation}
        >
          {props.prefix}
          {props.children ? (props.children) : (
            <input
              // ref={inputRef as any}
              className={cx(props.inputClassName, "bg-transparent focus:outline-none w-full text-[var(--input-text-color)] placeholder:text-[var(--input-placeholder-color)]")}
              type={props.type || "text"}
              placeholder={props.placeholder}
              value={props.value}
              onFocus={() => {
                setFocus(true)
              }}
              onBlur={() => {
                setFocus(false)
              }}
              onChange={(event: any) => {
                props.onChange && props.onChange(event)
              }}
            />
          )}
          {props.suffix}
        </InputSection>
        {props.outerSuffix}
      </div>
      {props.validation === false && (
        <div className={"text-left text-[var(--input-invalidation-text-color)] pl-4"}>{props.errorMessage}</div>
      )}
    </div>

  )
}

export type InputValue<T> = {
  data: T;
  isValidation?: boolean;
  errorMessage?: string;
};

export const Input = renderByPlatform({
  "coco777bet": BaseInput,
  "wild777bet": BaseInput
}, BaseInput);


