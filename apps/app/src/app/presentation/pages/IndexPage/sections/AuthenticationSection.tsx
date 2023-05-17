import { Button } from '../../../components/layouts/Button';
import {useDispatch} from "react-redux";
import {IndexPageSagaAction} from "../userUsecaseSaga/indexPageActions";

export const AuthenticationSection = () => {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(IndexPageSagaAction.user.authenticateSaga())
  }
  return (
    <div className={'authentication'}>
      <Button onClick={onClick} dataTestingID={'limit-button'} text={'Get my limit'} />
    </div>
  );
};
