import { Navigation } from '../../components/layouts/Navigation';
import { Outlet } from 'react-router';
import { Page } from '../../components/layouts/Page';
import { LoginForm } from './LoginForm';
import {AppTempFlag} from "../../../../main";
import {useEffect} from "react";

const LoginPage = () => {
  useEffect(() => {
    AppTempFlag.isWebview = false;
  });

  return (
    <Page className="flex flex-col">
      <Navigation
      // back={() => navigate(-1)}
      // to={() => navigate('log-out-modal')}
      // toIcon={<div className={`text-slate-400`}>Exit</div>}
      />
      <div className={`px-4 grow flex flex-col`}>
        <div className={`text-3xl font-bold`}>Create</div>
        <div className={`text-3xl font-bold `}>Your Account</div>
        <div className={`text-sm mt-2 mb-10`}>
          A 6 digit OTP will be sent via SMS to verify your mobile number
        </div>
        <div className={`grow flex flex-col`}>
          <LoginForm />
        </div>
      </div>
      <Outlet />
    </Page>
  );
};

export default LoginPage;
