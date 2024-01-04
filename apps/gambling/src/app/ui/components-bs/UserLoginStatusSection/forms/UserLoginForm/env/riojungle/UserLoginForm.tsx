import {PhoneSvg} from "../../../../../Icons/PhoneSvg";
import {KeySvg} from "../../../../../Icons/KeySvg";
import {HidableEyeSvg} from "../../../../../Icons/HidableEyeSvg";
import {PhonePrefix} from "../../../../components/PhonePrefix";
import {useUserLoginForm} from "../../../../hooks/useUserLoginForm";

import {ConfirmButton} from "../../../../components/ConfirmButton";

import {Input} from "../../../../../Inputs/Input";
import {IUserLoginForm} from "../../types";
import {onValidatePhoneInput} from "../../OnValidatePhoneInput";
import {onValidatePasswordInput} from "../../OnValidatePasswordInput";


export const UserLoginForm = (props: IUserLoginForm) => {
  const {
    phoneInput,
    setPhoneInput,
    isPasswordVisible,
    passwordInput,
    setPasswordInput,
    togglePasswordVisibility,
    onFormConfirm,
  } = useUserLoginForm({
    confirmToLogin: props.confirmToLogin
  });

  return (
    <div className={"form"}>
      <div className={"flex flex-col"}>

        <Input
            type="number"
            prefix={
              <>
                {/*<PhoneSvg fill="#6c7083" className="mr-2 w-[24px] h-[24px]" />*/}
                <PhoneSvg className="mr-1" />
                <PhonePrefix/>
              </>
            }
            placeholder="Tu número de celular"
            value={phoneInput.data}
            validation={phoneInput.isValidation}
            errorMessage={phoneInput.errorMessage}
            onChange={(event: any) => onValidatePhoneInput(event.target.value, setPhoneInput)}
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
              onValidatePasswordInput(event.target.value, setPasswordInput)
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

        <section className={"flex flex-col"}>
          <button
            className={"text-[var(--white)] text-right mb-3 ml-3 text-[var(--state-info-main)]"}
            onClick={() => {
              props.onSwitchToForgetPassword();
            }}
          >esqueça a senha</button>

          <div className={"w-full"} onClick={() => onFormConfirm()}>
            <ConfirmButton>Entrar</ConfirmButton>
          </div>

        </section>

      </div>
    </div>
  )
}
