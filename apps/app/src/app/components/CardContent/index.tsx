import styled from 'styled-components';
import React from 'react';
import { flexCreator, Button, Divider } from "@frontend/mobile/shared/ui";
import LoanBrand from '../LoanBrand';

import nextIcon_gray from '../../../../../../libs/mobile/shared/ui/src/lib/components/images/next_icon_gray.svg';
import nextIcon from '../../../../../../libs/mobile/shared/ui/src/lib/components/images/next_icon.svg';

import {i18nComponents} from "../i18n/translations";
import {useTranslation} from "react-i18next";

const FlexRowItem = styled.div`
  ${flexCreator('row', 'space-between', 'center')};
  width: 100%;
`;

const CardContentStyled = styled.div`
  ${flexCreator('column', 'space-between', 'center')};
  width: 100%;
`;

const CardHeaderStyled = styled(FlexRowItem)`

`;

const CardFooterStyled = styled(FlexRowItem)`
  padding-top: 8px;
  margin-bottom: -6px;
  > button {
    img {
      margin-left: 3px;
    }
    ${flexCreator('row', 'space-between', 'center')};
  }
  .linkButton {
    font-size: ${({ theme }) => theme.fontSize[12]};
    width: auto;
    color: ${({ theme }) => theme.color.gray500 };
  }
  .applyButton {
    background-color: ${({ theme }) => theme.color.black};
    width: auto;
  }
`;

type CardContentProps = {
  icon: string;
  productName: string;
  balance: string;
  contentItems: React.ReactElement | React.ReactElement[];
  handleViewDetail: () => void;
  handleApplyNow: () => void;
};

const CardContent = (props: CardContentProps) => {
  const {
    icon,
    productName,
    balance,
    contentItems,
    handleViewDetail,
    handleApplyNow,
  } = props;

  const {t} = useTranslation(i18nComponents.namespace);

  return (
    <CardContentStyled>
      <CardHeaderStyled>
        <LoanBrand iconUrl={icon} productName={productName} balance={balance} showCurrency={true}/>
      </CardHeaderStyled>
      {contentItems}
      <Divider styleType="narrow" />

      <CardFooterStyled>
        <Button
          className={'linkButton'}
          styleType={'link'}
          onClick={handleViewDetail}
        >
          {t('view details')}
          <img src={nextIcon_gray} />
        </Button>
        <Button
          className={'applyButton'}
          styleType={'primary'}
          size={'small'}
          onClick={handleApplyNow}
        >
          {t('Apply now')} <img src={nextIcon} />
        </Button>
      </CardFooterStyled>
    </CardContentStyled>
  );
};

export default CardContent;
