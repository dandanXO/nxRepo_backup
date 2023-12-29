export const onValidatePhoneInput = (data: string, setPhoneInput: any) => {

  const valid = data.length === 10 || data.length === 11;
  if (valid) {
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

  if (data) {
    return true
  } else {
    return false;
  }
}
