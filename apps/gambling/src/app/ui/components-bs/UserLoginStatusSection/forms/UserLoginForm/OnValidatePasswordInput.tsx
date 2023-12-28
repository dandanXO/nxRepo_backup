export const onValidatePasswordInput = (data: string, setPasswordInput: any) => {

  const passwordRex = /^[a-zA-Z0-9]+$/;
  const valid = passwordRex.test(data) && !data.includes(' ') && data.length >= 4 && data.length <= 12;
  if (valid) {
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

  if (valid) {
    return true
  } else {
    return false;
  }
}
