import { WithTranslation, withTranslation } from 'react-i18next';
import styled from 'styled-components';

import { Page } from '@frontend/mobile/shared/ui';

import { Button } from '../../core-components/Button';
import { SuccessICON } from './components/i18n/SuccessICON';
import { i18nUploadedPaymentReceiptPage } from './components/i18n/translations';
import UploadedPaymentReceiptPage from './index';
import { environment } from '../../../../environments/environmentModule/environment';
import { PakistanCountry } from '@frontend/shared/domain';
import { MexicoCountry } from '@frontend/shared/domain';
import { PhilippinesCountry } from '@frontend/shared/domain';
const CustomPage = styled(Page)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100%;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 500;
  margin: 30px 0;
`;
const Description = styled.div`
  font-size: 14px;
  font-weight: 300;
  color: #aaaaaa;
  text-align: center;
`;
const ControlSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-grow: 1;
  justify-content: end;
`;

type UploadedPaymentReceiptPage = {
  navigateToLoanDetails: () => void;
} & WithTranslation;

export const PureUploadedPaymentReceiptPage = withTranslation(i18nUploadedPaymentReceiptPage.namespace)(
  (props: UploadedPaymentReceiptPage) => {
    return (
      <CustomPage>
        <Content>
          <SuccessICON />
          <Title>{props.t('Upload payment receipt')}</Title>
          <Description>{props.t('Thank you. Your receipt has been uploaded successfully.')}</Description>
        </Content>
        <ControlSection>
          <Button
              text={props.t('Done')}
              primaryTypeGradient={environment.country === PakistanCountry.country}
              outlineTheme={[MexicoCountry.country, PhilippinesCountry.country].includes(environment.country) ? 'round' : undefined}
              onClick={() => props.navigateToLoanDetails()}
          />
        </ControlSection>
      </CustomPage>
    );
  }
);
