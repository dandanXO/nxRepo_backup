import { SuccessICON } from './i18n/SuccessICON';
import { Page } from '@frontend/mobile/shared/ui';
import UploadedPaymentReceiptPage from './index';
import styled from 'styled-components';
import { WithTranslation, withTranslation } from 'react-i18next';
import { i18nUploadedPaymentReceiptPage } from './i18n/translations';
import { Button } from '../../components/layouts/Button';

const CustomPage = styled(Page)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: calc(100vh - 18px);
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

export const PureUploadedPaymentReceiptPage = withTranslation(
  i18nUploadedPaymentReceiptPage.namespace
)((props: UploadedPaymentReceiptPage) => {
  return (
    <CustomPage>
      <Content>
        <SuccessICON />
        <Title>{props.t('Upload payment receipt')}</Title>
        <Description>
          {props.t('Thank you. Your receipt has been uploaded successfully.')}
        </Description>
      </Content>
      <ControlSection>
        <Button text={'Done'} onClick={() => props.navigateToLoanDetails()} />
      </ControlSection>
    </CustomPage>
  );
});
