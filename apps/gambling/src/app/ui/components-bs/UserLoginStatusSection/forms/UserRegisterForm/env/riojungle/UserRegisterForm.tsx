import {PhoneSvg} from "../../../../../Icons/PhoneSvg";
import {KeySvg} from "../../../../../Icons/KeySvg";

import useBreakpoint from "../../../../../../pageTemplate/hooks/useBreakpoint";
import {Input} from "../../../../../Inputs/Input";

import {IOpenNotificationWithIcon} from "../../../../../../pageTemplate";
import {onValidatePasswordInput, onValidatePhoneInput} from "../../../UserLoginForm/env/coco/UserLoginForm"

import {SecuritySvg} from "../../../../../Icons/SecuritySvg";
import {usePageNavigate} from "../../../../../../router/hooks/usePageNavigate";
import {Captcha} from "../../Captcha";
import {HidableEyeSvg} from "../../../../../Icons/HidableEyeSvg";
import {CheckableICON} from "../../../../../Icons/CheckableICON";
import {PhonePrefix} from "../../../../components/PhonePrefix";
import {useUserRegisterForm} from "../../../../hooks/useUserRegisterForm";
import {renderByPlatform} from "../../../../../../utils/renderByPlatform";

import {ConfirmButton as CocoConfirmButton} from "../../../../../Buttons/ConfirmButton";
import {ConfirmButton} from "../../../../components/ConfirmButton";

export type IUserRegisterForm = {
  confirmToRegister: () => void;
  openNotificationWithIcon: (props: IOpenNotificationWithIcon) => void;
}

export const UserRegisterForm = (props: IUserRegisterForm) => {
  const {isMobile} = useBreakpoint();
  const {
    onClickToPrivacyAgreement
  } = usePageNavigate();

  const {
    phoneInput,
    setPhoneInput,
    confirmPhoneInput,
    setConfirmPhoneInput,
    onValidateConfirmPhoneInput,
    isPasswordVisible,
    passwordInput,
    setPasswordInput,
    togglePasswordVisibility,
    onClickCaptcha,
    imgSrc,
    isCaptchaLoading,
    captchaInput,
    setCaptchaInput,
    onValidateCaptchaInput,
    isChecked,
    onFormConfirm,
    toggleCheck,
  } = useUserRegisterForm({
    confirmToRegister: props.confirmToRegister,
  });

  return (
    <section className={"flex flex-col"}>
      <Input
        type={"number"}
        className={'bg-[var(--grayscale-30)]'}
        prefix={
          <>
            {/*<PhoneSvg fill={"#6c7083"} className={"mr-2 w-[24px] h-[24px]"}/>*/}
            <PhoneSvg className={"mr-1"}/>
            <PhonePrefix/>
          </>
        }
        placeholder={"Tu nùmero de celular"}
        value={phoneInput.data}
        validation={phoneInput.isValidation}
        errorMessage={phoneInput.errorMessage}
        onChange={(event: any) => {
          onValidatePhoneInput(event.target.value, setPhoneInput);
        }}
      />

      <Input
        type={"number"}
        className={'bg-[var(--grayscale-30)]'}
        prefix={
          <>
            {/*<PhoneSvg fill={"#6c7083"} className={"mr-2 w-[24px] h-[24px]"}/>*/}
            <PhoneSvg className={"mr-1"}/>
            <PhonePrefix/>
          </>
        }
        placeholder={"Confirme o número do celular"}
        value={confirmPhoneInput.data}
        validation={confirmPhoneInput.isValidation}
        errorMessage={confirmPhoneInput.errorMessage}
        onChange={(event: any) => {
          onValidateConfirmPhoneInput(phoneInput.data, event.target.value, setConfirmPhoneInput);
        }}
      />

      <Input
        type={isPasswordVisible ? 'text' : 'password'}
        className={'bg-[var(--grayscale-30)]'}
        // prefix={<KeySvg fill={"#6c7083"} className={"mr-2 w-[24px] h-[24px]"}/>}
        prefix={<KeySvg className={"mr-1"}/>}
        placeholder={"Senha (4-12 letras e números)"}
        value={passwordInput.data}
        validation={passwordInput.isValidation}
        errorMessage={passwordInput.errorMessage}
        onChange={(event: any) => {
          onValidatePasswordInput(event.target.value, setPasswordInput);
        }}
        suffix={(
          <div
            className="password-toggle"
            onClick={togglePasswordVisibility}
          >
            <HidableEyeSvg hide={!isPasswordVisible}/>
          </div>
        )}
      />

      <section className="flex">
        <div className="flex-1">
          <Input
            type={"text"}
            className={"mr-3 md:mr-5 bg-[var(--grayscale-30)]"}
            // prefix={<SecuritySvg fill={"#6c7083"} className={"mr-2 w-[24px] h-[24px]"}/>}
            prefix={<SecuritySvg className={"mr-1"} />}
            placeholder={"Código de verificação"}
            value={captchaInput.data}
            validation={captchaInput.isValidation}
            errorMessage={captchaInput.errorMessage}
            onChange={(event: any) => {
              onValidateCaptchaInput(event.target.value, setCaptchaInput);
            }}
          />
        </div>
        <Captcha className="rounded-lg" onClickCaptcha={onClickCaptcha} imgSrc={imgSrc} isLoading={isCaptchaLoading} />
      </section>

      <section className={"flex flex-col mb-4"}>
        {/*NOTICE: refactor*/}
        {renderByPlatform({
          "u1": (
            <CocoConfirmButton
              className="!w-full my-2 "
              disable={!isChecked}
              onClick={() => isChecked && onFormConfirm()}
            >
              Register agora
            </CocoConfirmButton>
          ),
          "riojungle777bet": (
            <div
              onClick={() => isChecked && onFormConfirm()}
            >
              <ConfirmButton
                disable={!isChecked}
              >Register agora</ConfirmButton>
            </div>
          ),
        }, (
          <CocoConfirmButton
            className="!w-full my-2 "
            disable={!isChecked}
            onClick={() => isChecked && onFormConfirm()}
          >
            Register agora
          </CocoConfirmButton>
        ))}



      </section>

      <section className={"flex flex-row items-center mb-4"}>
        <button className={"mr-2 relative top-[1px] shrink-0"} onClick={toggleCheck}>
          <CheckableICON isChecked={isChecked}/>
        </button>
        <a className={"text-white font-thin text-md"}>
          <span className={"text-[var(--text-tertiary)] font-medium mr-1 my-2 text-sm"} onClick={toggleCheck} >Eu concordo</span>
          <span className={"text-[var(--state-info-main)] font-medium break-all text-sm"} onClick={() => {
            onClickToPrivacyAgreement();
          }}>Condições, política de privacidade</span>
        </a>
      </section>


    </section>
  )
}
