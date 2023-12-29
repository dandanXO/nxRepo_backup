import {Route, Routes} from 'react-router';
import {PageOrModalPathEnum} from "../../../PageOrModalPathEnum";
import {IndexPage} from "../../../pages/IndexPage";
import {ErrorPage} from "../../../pages/ErrorPage";
import {InvitePage} from "../../../pages/InvitePage";
import {WallletPage} from "../../../pages/WallletPage";
import {GameRecordPage} from "../../../pages/GameRecordPage";
import {VIPGradePage} from "../../../pages/VIPGradePage";
import {DailySignInPage} from "../../../pages/DailySignInPage";
import {DailySignInRecordPage} from "../../../pages/DailySignInRecordPage";
import {SettingPage} from "../../../pages/SettingPage";
import {CompanyProfilePage} from "../../../pages/CompanyProfilePage";
import {InitialChargePage} from "../../../pages/InitialChargePage";
import {RechargeActivityPage} from "../../../pages/RechargeActivityPage";
import {TelegramPage} from "../../../pages/TelegramPage";
import {LicensePage} from "../../../pages/LicensePage";
import {InviteSettlementRecordPage} from "../../../pages/InviteSettlementRecordPage";
import {MyPage} from "../../../pages/MyPage";
import {WalletDepositNextPage} from "../../../pages/WalletDepositNextPage";
import {GamePage} from '../../../pages/GamePage';
import {NotificationPage} from "../../../pages/NotificationPage";
import {GameSearchPage} from "../../../pages/GameSearchPage";
import {PrivacyAgreementPage} from "../../../pages/PrivacyAgreementPage";
import {PageTemplate} from "../../../pageTemplate";
import TermsOfServicePage from "../../../pages/TermsOfServicePage";
import {useUIRouter} from "../../hooks/useUIRouter";
import useBreakpoint from "../../../hooks/useBreakpoint";


export const AppRouter = () => {

  const {
    isSetup,
    contextHolder,
  } = useUIRouter();

  const { isMobile } = useBreakpoint();

  return (
    <>
      {isSetup && (
        <Routes>
          {/*NOTE: Common*/}
          <Route path={PageOrModalPathEnum.IndexPage} element={(
            <PageTemplate showToolboxConfig={{mobile: {download: true, customerService: true}}}>
              <IndexPage />
            </PageTemplate>
          )}/>
          {/*<Route path={PageOrModalPathEnum.IndexSlotPage} element={(*/}
          {/*  <PageTemplate>*/}
          {/*    <IndexSlotPage />*/}
          {/*  </PageTemplate>*/}
          {/*)}/>*/}
          <Route path={PageOrModalPathEnum.InvitePage} element={(
            <PageTemplate showMobileHeader={false} showMobileFooter={false} showToolboxConfig={{mobile: { customerService: true }}}>
              <InvitePage/>
            </PageTemplate>
          )}/>

          <Route path={PageOrModalPathEnum.InviteSettlementRecordPage} element={(
            <PageTemplate showMobileFooter={false}>
              <InviteSettlementRecordPage/>
            </PageTemplate>
          )}/>

          <Route path={PageOrModalPathEnum.WalletPage} element={(
            <PageTemplate
              showMobileHeader={false}
              showTabbar={false}
              showMobileFooter={false}
            >
              <WallletPage />
            </PageTemplate>
          )}/>
          <Route path={PageOrModalPathEnum.WalletDepositNextPage} element={(
            <PageTemplate showMobileHeader={false} showTabbar={false} showMobileFooter={false} >
              <WalletDepositNextPage/>
            </PageTemplate>
          )}/>
          <Route path={PageOrModalPathEnum.GameRecordPage} element={(
            <PageTemplate
              showMobileHeader={false}
              showTabbar={false}
              showMobileFooter={false}
            >
              <GameRecordPage />
            </PageTemplate>
          )}/>
          <Route path={PageOrModalPathEnum.VIPGradePage} element={(
            <PageTemplate showMobileHeader={false} showMobileFooter={false} showToolboxConfig={{mobile:{ customerService: true }}}>
              <VIPGradePage />
            </PageTemplate>
          )}/>
          <Route path={PageOrModalPathEnum.DailySignInPage} element={(
            <PageTemplate
              showMobileHeader={false}
              showTabbar={false}
              showMobileFooter={false}
            >
              <DailySignInPage/>
            </PageTemplate>
          )}/>
          <Route path={PageOrModalPathEnum.DailySingInRecordPage} element={(
            <PageTemplate
              showMobileHeader={false}
              showTabbar={false}
              showMobileFooter={false}
            >
              <DailySignInRecordPage/>
            </PageTemplate>
          )}/>
          <Route path={PageOrModalPathEnum.SettingPage} element={(
            <PageTemplate
              showMobileHeader={false}
              showTabbar={false}
              showMobileFooter={false}
            >
              <SettingPage/>
            </PageTemplate>
          )}/>
          <Route path={PageOrModalPathEnum.PrivacyAgreementPage} element={(
            <PageTemplate
              showMobileHeader={false}
              showTabbar={!isMobile}
            >
              <PrivacyAgreementPage/>
            </PageTemplate>
          )}/>
          <Route path={PageOrModalPathEnum.TermsOfService} element={(
            <PageTemplate
              showMobileHeader={false}
              showTabbar={false}
              showMobileFooter={!isMobile}
            >
              <TermsOfServicePage />
            </PageTemplate>
          )}/>
          <Route path={PageOrModalPathEnum.CompanyProfilePage} element={(
            <PageTemplate>
              <CompanyProfilePage/>
            </PageTemplate>
          )}/>
          <Route path={PageOrModalPathEnum.InitialChargePage} element={(
            <PageTemplate
              showMobileHeader={false}
              showMobileFooter={false}
              showTabbar={false}
            >
              <InitialChargePage/>
            </PageTemplate>
          )}/>
          <Route path={PageOrModalPathEnum.RechargeActivityPage} element={(
            <PageTemplate showMobileHeader={false} showMobileFooter={false} showTabbar={false}>
              <RechargeActivityPage/>
            </PageTemplate>
          )}/>

          <Route path={PageOrModalPathEnum.LicensePage} element={(
            <PageTemplate
              showMobileHeader={false}
              showMobileFooter={false}
              showTabbar={false}
            >
              <LicensePage/>
            </PageTemplate>
          )}/>

          <Route path={PageOrModalPathEnum.TelegramPage} element={(
            <PageTemplate
              showMobileHeader={false}
              showMobileFooter={false}
              showTabbar={false}
            >
              <TelegramPage/>
            </PageTemplate>
          )}/>

          <Route path={PageOrModalPathEnum.GamePage} element={(
            <PageTemplate
              // common
              showMobileFooter={false}
              showDesktopFooter={false}
              showToolboxConfig={false}
              // desktop
              showDesktopHeader={false}
              showDesktopMenuDrawer={false}
              // mobile
              showMobileHeader={false}
              showTabbar={false}
            >
              <GamePage/>
            </PageTemplate>
          )}/>
          <Route path={PageOrModalPathEnum.GameSearchPage} element={(
            <PageTemplate
              showMobileHeader={false}
              showMobileFooter={false}
            >
              <GameSearchPage/>
            </PageTemplate>
          )}/>

          {/*NOTE: Mobile*/}
          <Route path={PageOrModalPathEnum.MyPage} element={(
            <PageTemplate
              showMobileHeader={false}
              showMobileFooter={false}
              showToolboxConfig={{ mobile: { customerService: true }}}
            >
              <MyPage/>
            </PageTemplate>
          )}/>
          <Route path={PageOrModalPathEnum.NotificationPage} element={(
            <PageTemplate
              showMobileHeader={false}
              showTabbar={false}
              showMobileFooter={false}
            >
              <NotificationPage/>
            </PageTemplate>
          )}/>

          {/*NOTE: Desktop*/}
          <Route path="/v2/error" element={<ErrorPage />} />
        </Routes>
      )}

      {contextHolder}
    </>
  );
};
