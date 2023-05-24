import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { RootState } from '../../../reduxStore';
import CustomerServiceIcon from '../../components/images/CustomerServiceIcon.svg';
import { Button } from '../../components/layouts/Button';
import { Navigation } from '../../components/layouts/Navigation';
import { PagePathEnum } from '../PagePathEnum';
import { getToken } from '../../../modules/querystring/getToken';

const CustomerServicePage = () => {
  const navigate = useNavigate();
  const { app, indexPage } = useSelector((state: RootState) => state);
  return (
    <div>
      <Navigation
        title={'Customer Service'}
        back={() => {
          navigate(`${PagePathEnum.PersonalInfoPage}?token=${getToken()}`);
        }}
      />
      <div className="flex flex-col items-center justify-center">
        <div className="mt-16 mb-4">
          <img src={CustomerServiceIcon} alt="" />
        </div>
        <div>Service Time</div>
        <div className="mt-2 font-bold">from Monday - Friday</div>
        <div className="mb-4 font-bold">9:00 AM - 6:00 PM</div>
        <div className="mb-4">
          <a href={`mailto:${app?.init?.csEmail || ''}`}>
            <Button className={'py-2 px-6'} text={'Contact By Mail'} />
          </a>
        </div>
        <div>{`Email: ${app?.init?.csEmail || ''}`}</div>
        <div>{`Whatsapp: ${app?.init?.csWhatsApp || ''}`}</div>
        <div>{`Phone: ${app?.init?.csContactNumber || ''}`}</div>

        {indexPage?.indexAPI?.customerServiceUrl && (
          <div
            className="mt-10 text-sm text-blue-500 underline decoration-blue-500"
            onClick={() => {
              navigate('/v2/online-customer-service');
            }}
          >
            Online Customer Service
          </div>
        )}
      </div>
    </div>
  );
};
export default CustomerServicePage;
