import { Navigation } from '../../components/layouts/Navigation';
import { Outlet } from 'react-router';
import { Page } from '../../components/layouts/Page';
import { LoginForm } from './LoginForm';

const LoginPage = () => {
  return (
    <Page className="flex flex-col">
      <Navigation
      // back={() => navigate(-1)}
      // to={() => navigate('log-out-modal')}
      // toIcon={<div className={`text-slate-400`}>Exit</div>}
      />
      <div className={`flex grow flex-col px-4`}>
        <div className={`text-3xl font-bold`}>Create</div>
        <div className={`text-3xl font-bold `}>Your Account</div>
        <div className={`mt-2 mb-10 text-sm`}>A 6 digit OTP will be sent via SMS to verify your mobile number</div>
        <div className={`flex grow flex-col`}>
          <LoginForm />
        </div>
      </div>
      <Outlet />
    </Page>
  );
};

export default LoginPage;
