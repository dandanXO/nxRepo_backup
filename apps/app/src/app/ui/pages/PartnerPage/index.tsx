import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { RootState } from '../../../reduxStore';
import { Navigation } from '../../core-components/Navigation';
import { Page } from '../../core-components/Page';

const PartnerPage = () => {
  const navigate = useNavigate();
  const { init } = useSelector((state: RootState) => state.app);
  return (
    <Page className={`flex flex-col`}>
      <Navigation
        title={'Partner'}
        back={() => {
          navigate(-1);
        }}
      />
      <iframe
        className={`w-full grow`}
        src={init?.partnershipUrl || ''}
        title=""
      />
    </Page>
  );
};

export default PartnerPage;
