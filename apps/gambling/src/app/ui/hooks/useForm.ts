export const useForm = (props: {
  onFormConfirm: () => void;
}) => {
  const onFormConfirm = () => {
    props.onFormConfirm();
  }
  return {
    onFormConfirm
  }
}
