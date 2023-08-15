

import { useLocation, useNavigate } from 'react-router';
import { IndiaCountry } from '../../../../../../../libs/shared/domain/src/country/IndiaCountry';
import { PakistanCountry } from '../../../../../../../libs/shared/domain/src/country/PakistanCountry';
import { renderByCountry } from '../../../modules/i18n';
import PakistanConfirmBindBankCardModal from './i18n/PakistanConfirmBindBankCardModal';
import { InitialStateType } from '../../../reduxStore/modalSlice';

interface IConfirmBindBankCardModal{
    state?:InitialStateType['bindBankcardModal']
}
const ConfirmBindBankCardModal = ({state}:IConfirmBindBankCardModal) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (

          renderByCountry(
              {
                //   [IndiaCountry.country]: <IndiaExtendConfirmModal />,
                  [PakistanCountry.country]: <PakistanConfirmBindBankCardModal  state={state}/>,
              },
              <PakistanConfirmBindBankCardModal  state={state}/>
          )

  );
};

export default ConfirmBindBankCardModal;
