import styled from 'styled-components';
import React from 'react';
import {flexCreator} from '../../../../../../../libs/mobile/shared/ui/src/lib/components/utils';
import {environment} from "../../../../environments/environment";

const LoanBrandStyled = styled.div<propsStyles>`
  ${flexCreator('row', 'flex-start', 'center')};
  font-size: ${({ theme }) => theme.fontSize[16]};

  img {
    width: ${(props) =>
      props.sizeType === 'small'
        ? props.theme.fontSize[24]
        : props.theme.fontSize[38]};
    margin-right: 12px;
    border-radius: 8px;
  }
  .loanBrandInfo {
    display: flex;
    flex-direction: column;
  }
  .product {
    font-weight: bold;
  }
  .balance {
    font-size: ${({ theme }) => theme.fontSize[18]};
    color: ${({theme}) => theme.card.color}
  }
`;

type LoanBrandProps = {
  iconUrl: string;
  productName: string;
  balance?: string;
  showCurrency?: boolean;
} & propsStyles;

interface propsStyles {
  sizeType?: string;
}

const LoanBrand = (props: LoanBrandProps) => {
  const { iconUrl, productName, sizeType, balance, showCurrency = false } = props;
  return (
    <LoanBrandStyled className={'loanBrand'} sizeType={sizeType}>
      <div>
        <img src={iconUrl} alt="logo" />
      </div>
      <div className={"loanBrandInfo"}>
        <div className={"product"}>{productName}</div>
        {showCurrency && (<div className={'balance'}>{environment.currency} {balance}</div>)}
      </div>
    </LoanBrandStyled>
  );
};

export default LoanBrand;
