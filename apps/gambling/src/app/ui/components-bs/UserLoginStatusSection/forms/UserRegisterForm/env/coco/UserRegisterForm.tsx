import {PhoneSvg} from "../../../../../theme/Icons/PhoneSvg";
import {KeySvg} from "../../../../../theme/Icons/KeySvg";
import {ConfirmButton} from "../../../../../theme/Buttons/ConfirmButton";
import useBreakpoint from "../../../../../../hooks/useBreakpoint";
import {Input} from "../../../../../theme/Inputs/Input";
// import {MobileInput} from "../../../../components/Inputs/MobileInput";
import {onValidatePasswordInput, onValidatePhoneInput} from "../../../UserLoginForm"
import {SecuritySvg} from "../../../../../theme/Icons/SecuritySvg";
import {usePageNavigate} from "../../../../../../hooks/usePageNavigate";
import {Captcha} from "../../Captcha";
import {HidableEyeSvg} from "../../../../../theme/Icons/HidableEyeSvg";
import {CheckableICON} from "../../../../../theme/Icons/CheckableICON";
import {PhonePrefix} from "../../../../components/PhonePrefix";
import {useUserRegisterForm} from "../../../../hooks/useUserRegisterForm";
import {IUserRegisterForm} from "../riojungle/UserRegisterForm";

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

      <Input
        type={"text"}
        className={"rounded-br-[0px] rounded-tr-[0px] border-r-[0px]"}
        // prefix={<SecuritySvg fill={"#6c7083"} className={"mr-2 w-[24px] h-[24px]"}/>}
        prefix={<SecuritySvg className={"mr-1"}/>}
        outerSuffix={<Captcha onClickCaptcha={onClickCaptcha} imgSrc={imgSrc} isLoading={isCaptchaLoading}/>}
        placeholder={ isMobile ? "Código gráfico" : "Código de verificação"}
        value={captchaInput.data}
        validation={captchaInput.isValidation}
        errorMessage={captchaInput.errorMessage}
        onChange={(event: any) => {
          onValidateCaptchaInput(event.target.value, setCaptchaInput);
        }}
      />

      <section className={"flex flex-col mb-4"}>
        <ConfirmButton
          className="!w-full my-2 "
          disable={!isChecked}
          onClick={() => isChecked && onFormConfirm()}
        >Register agora</ConfirmButton>
      </section>

      <section className={"flex flex-row items-center mb-4"}>
        <button className={"mr-2 relative top-[1px] shrink-0"} onClick={toggleCheck}>
          <CheckableICON isChecked={isChecked}/>
        </button>
        <a
          className={"text-white font-thin text-md"}
          // style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', maxWidth: '300px' }}
        >
          <span className={"text-[var(--text-tertiary)] font-medium mr-1 my-2 text-sm"} onClick={toggleCheck} >Eu concordo</span>
          <span className={"text-[var(--white)] font-medium underline break-all text-sm"} onClick={() => {
            onClickToPrivacyAgreement();
          }}>Condições e condições, política de privacidade</span>
        </a>
      </section>


    </section>
  )
}
