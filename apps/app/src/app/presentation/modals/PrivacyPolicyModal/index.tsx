import { useNavigate } from 'react-router';

import { Overlay } from '@frontend/mobile/shared/ui';
import { RootState } from '../../../reduxStore';
import { useSelector } from 'react-redux';

const PrivacyPolicyModal = (props: any) => {
  const navigate = useNavigate();
  const domain: string = useSelector((state: RootState) => state.app.androidAppInfo?.domain) || '';
  const url = domain + '/privacy.html';
  return (
    <Overlay
      show={true}
      enableClose={true}
      onCancel={() => {
        navigate(-1);
      }}
      content={() => {
        return (
          <div className='h-[80vh] flex flex-col'>
            <div className={`ml-5 text-left text-xl font-bold text-ctext-primary`}>Privacy Policy</div>
            <iframe className={`w-full grow `} src={url} title="" />
          </div>
        );
      }}
    />
  );
};

export default PrivacyPolicyModal;
