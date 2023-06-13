import { useDispatch } from 'react-redux';

import { Button } from '../../../components/layouts/Button';
import { IndexPageSagaAction } from '../userUsecaseSaga/indexPageActions';

export const AuthenticationSection = () => {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(IndexPageSagaAction.user.authenticateSaga());
  };
  return (
    <div className={'authentication'}>
      <Button className='open-index-button border-0' onClick={onClick} dataTestingID={'limit-button'} text={'Get my limit'} />
    </div>
  );
};
