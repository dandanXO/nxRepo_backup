import {PhoneSvg} from "../../../../../Icons/PhoneSvg";
import {KeySvg} from "../../../../../Icons/KeySvg";
import {ConfirmButton} from "../../../../../Buttons/ConfirmButton";
import useBreakpoint from "../../../../../../pageTemplate/hooks/useBreakpoint";
import {Input as DesktopInput, Input} from "../../../../../Inputs/Input";
import {MobileInput} from "../../../../../Inputs/MobileInput";
// import {LoginFormData} from "./UserLoginForm/LoginFormData";
import {SecuritySvg} from "../../../../../Icons/SecuritySvg";
import {HidableEyeSvg} from "../../../../../Icons/HidableEyeSvg";
import {PhonePrefix} from "../../../../components/PhonePrefix";
import {useUserForgetPasswordForm} from "../../../../hooks/useUserForgetPasswordForm";
import {IUserForgetPasswordForm} from "../../types";
import {SendSMSCodeButton} from "../../SendSMSCodeButton";


export const UserForgetPasswordForm = (props: IUserForgetPasswordForm) => {
  const {isMobile} = useBreakpoint();
  const Input = isMobile ? MobileInput : DesktopInput;

  const {
    // Phone
    phoneInput,
    onChangePhoneInput,

    // Captcha
    captchaInput,
    onChangeCaptchaInput,

    // Password
    isPasswordVisible,
    togglePasswordVisibility,
    passwordInput,
    onChangePasswordInput,

    // SMS Code
    onClickSendSMSCode,
    isValidSMSCode,

    // Form
    onFormConfirm,
  } = useUserForgetPasswordForm({
    confirmToRegister: props.confirmToRegister
  });


  return (
    <section className={"flex flex-col"}>

      <Input
        type={"number"}
        prefix={
          <>
            <PhoneSvg fill={"#6c7083"} className={"mr-1"}/>
            <PhonePrefix/>
          </>
        }
         placeholder={"Tu nùmero de celular"}
         value={phoneInput.data}
         validation={phoneInput.isValidation}
         errorMessage={phoneInput.errorMessage}
         onChange={onChangePhoneInput}
      />

      <div style={{ position: 'relative' }}>
        <Input
          type={"text"}
          prefix={<SecuritySvg className={"mr-1"}/>}
          suffix={
            <SendSMSCodeButton
              className="px-2 py-0 rounded-2xl bg-gradient-to-b from-[var(--secondary-main-from)] to-[var(--secondary-main-to)] text-[var(--white)]"
              valid={isValidSMSCode}
              onClick={onClickSendSMSCode}/>
          }
          placeholder={"Código de verificação"}
          value={captchaInput.data}
          validation={captchaInput.isValidation}
          errorMessage={captchaInput.errorMessage}
          onChange={onChangeCaptchaInput}
        />
      </div>

      <Input
        type={isPasswordVisible ? 'text' : 'password'}
        prefix={<KeySvg fill={"#6c7083"} className={"mr-1"}/>}
        suffix={(
          <div
            className="password-toggle"
            onClick={togglePasswordVisibility}
          >
            <HidableEyeSvg hide={!isPasswordVisible}/>
          </div>
        )}
        placeholder={"Senha (4-12 letras e números)"}
        value={passwordInput.data}
        validation={passwordInput.isValidation}
        errorMessage={passwordInput.errorMessage}
        onChange={onChangePasswordInput}
      />

      <section className={"flex flex-col"}>
        <ConfirmButton
          className="!w-full my-2 text-sm md:text-base"
          onClick={() => onFormConfirm()}
        >Redefinir senha</ConfirmButton>
      </section>

    </section>
  )
}
