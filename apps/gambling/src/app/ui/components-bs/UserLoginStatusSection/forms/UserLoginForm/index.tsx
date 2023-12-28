import {PhoneSvg} from "../../../Icons/PhoneSvg";
import {KeySvg} from "../../../Icons/KeySvg";

import {IOpenNotificationWithIcon} from "../../../../pageTemplate";


import {HidableEyeSvg} from "../../../Icons/HidableEyeSvg";
import {PhonePrefix} from "../../components/PhonePrefix";
import {useUserLoginForm} from "../../hooks/useUserLoginForm";


import {renderByPlatform} from "../../../../utils/renderByPlatform";

import {ConfirmButton} from "../../components/ConfirmButton";
import {ConfirmButton as CocoConfirmButton} from "../../../theme/Buttons/ConfirmButton";

import {Input} from "../../../theme/Inputs/Input";

export const onValidatePhoneInput = (data: string, setPhoneInput: any) => {

  const valid = data.length === 10 || data.length === 11;
  if(valid) {
    setPhoneInput({
      data,
      isValidation: true,
      errorMessage: "",
    });
  } else {
    setPhoneInput({
      data,
      isValidation: false,
      errorMessage: "Número de celular de 10 ou 11 dígitos",
    })
  }

  if(data) {
    return true
  } else {
    return false;
  }
}


export const onValidatePasswordInput = (data: string, setPasswordInput: any) => {

  const passwordRex = /^[a-zA-Z0-9]+$/;
  const valid = passwordRex.test(data) && !data.includes(' ') && data.length >= 4 && data.length <= 12;
  if(valid) {
    setPasswordInput({
      data,
      isValidation: true,
      errorMessage: "",
    });
  } else {
    setPasswordInput({
      data,
      isValidation: false,
      errorMessage: "Senha (4-12 letras e números)",
    })
  }

  if(valid) {
    return true
  } else {
    return false;
  }
}


type IUserLoginForm = {
  confirmToLogin: () => void;
  openNotificationWithIcon: (props: IOpenNotificationWithIcon) => void;
  onSwitchToForgetPassword: () => void;
}
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
            className={"text-[var(--white)] text-center mb-3 ml-3"}
            onClick={() => {
              props.onSwitchToForgetPassword();
            }}
          >Esqueça A Eenha?</button>

          {renderByPlatform({
            "coco777bet": (
              <div className={"w-full"} onClick={() => onFormConfirm()}>
                <CocoConfirmButton className="!w-full text-sm md:text-base my-2" >Entrar</CocoConfirmButton>
              </div>
            ),
            "riojungle777bet": (
              <div className={"w-full"} onClick={() => onFormConfirm()}>
                <ConfirmButton>Entrar</ConfirmButton>
              </div>
            )
          }, (
            <div className={"w-full"} onClick={() => onFormConfirm()}>
              <CocoConfirmButton className="!w-full text-sm md:text-base my-2" >Entrar</CocoConfirmButton>
            </div>
          ))}

        </section>

      </div>
    </div>
  )
}
