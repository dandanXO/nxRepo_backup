import cx from 'classnames';
import { useState } from 'react';

import { renderByPlatform } from '../../utils/renderByPlatform';
import { tcx } from '../../utils/tcx';
import { InputSection } from './InputSection';

export type IInput = {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  type?: string;
  inputmode?:
    | 'search'
    | 'text'
    | 'email'
    | 'tel'
    | 'url'
    | 'none'
    | 'numeric'
    | 'decimal'
    | undefined;
  placeholder?: string;
  value?: string;
  className?: string;
  inputClassName?: string;
  themeStyle?: 'normal' | 'simple';
  children?: React.ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  validation?: boolean;
  errorMessage?: string;
  outerSuffix?: React.ReactNode;
  pureContainer?: boolean;
  disable?: boolean;
  onClick?: () => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

const BaseInput = (props: IInput) => {
  // const inputRef = useRef();
  const [focus, setFocus] = useState(false);
  const isPureContainer =
    typeof props.pureContainer == 'undefined' ? false : props.pureContainer;
  const isDisable =
    typeof props.disable === 'undefined' ? false : props.disable;
  // console.log("isDisable props.placeholder", isDisable, props.placeholder);

  return (
    <div
      className={cx({
        'mb-3 md:mb-4': !isPureContainer,
      })}
    >
      <div className={'flex flex-row justify-center items-center'}>
        <InputSection
          focus={focus}
          onClick={() => {
            // (inputRef && inputRef.current as any).focus()
          }}
          className={tcx(
            'w-full',
            ['border-utils-gray', props.themeStyle === 'simple'],
            props.className
          )}
          validation={props.validation}
        >
          {props.prefix}
          {props.children ? (
            props.children
          ) : (
            <input
              onKeyDown={props.onKeyDown}
              // ref={inputRef as any}
              onClick={() => props.onClick && props.onClick()}
              className={cx(
                'text-sm md:text-xl bg-transparent focus:outline-none w-full text-[var(--input-text-color)] placeholder:text-[var(--input-placeholder-color)]',
                {
                  'select-none': isDisable,
                },props.inputClassName
              )}
              type={props.type || 'text'}
              inputMode={props.inputmode}
              placeholder={props.placeholder}
              value={isDisable ? '' : props.value}
              onFocus={() => {
                if (!isDisable) setFocus(true);
              }}
              onBlur={() => {
                if (!isDisable) setFocus(false);
              }}
              onChange={(event: any) => {
                if (!isDisable) props.onChange && props.onChange(event);
              }}
            />
          )}
          {props.suffix}
        </InputSection>
        {props.outerSuffix}
      </div>
      {props.validation === false && (
        <div
          className={
            'text-left text-[var(--input-invalidation-text-color)] pl-4'
          }
        >
          {props.errorMessage}
        </div>
      )}
    </div>
  );
};

export type InputValue<T> = {
  data: T;
  isValidation?: boolean;
  errorMessage?: string;
};

export const Input = renderByPlatform(
  {
    coco777bet: BaseInput,
    wild777bet: BaseInput,
    riojungle777bet:BaseInput
  },
  BaseInput
);
