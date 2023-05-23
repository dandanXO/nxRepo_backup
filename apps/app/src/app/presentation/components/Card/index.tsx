import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { flexCreator } from '@frontend/mobile/shared/ui';

import { i18nComponents } from '../i18n/translations';

const CardStyled = styled.div`
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.13);
  font-size: ${({ theme }) => theme.fontSize[16]};
  position: relative;
  border-radius: 8px;
  padding: 14px;
  margin-bottom: 20px;
  background: ${({ theme }) => theme.color.white};
  ${flexCreator('column', '', '')}
  .hotTagText {
    position: absolute;
    top: 3px;
    right: 3px;
    font-size: ${({ theme }) => theme.fontSize[12]};
    font-weight: bold;
  }
`;

const triangle = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  width: 20px;
  height: 20px;
  border-top-right-radius: 30%; // 圆角弧度
  background: ${({ theme }) => theme.color.yellow};
  transform: rotate(-60edg) skewX(-30edg) scale(1, 0.866);
`;
const HotTag = styled(triangle)`
  :before,
  :after {
    content: '';
    position: absolute;
    background-color: inherit;
    width: 20px;
    height: 20px;
  }
  :before {
    transform: rotate(-135deg) skewX(-45deg) scale(1.414, 0.707) translate(0, -50%);
  }
  :after {
    transform: rotate(135deg) skewY(-45deg) scale(0.707, 1.414) translate(50%);
  }
`;

type CardProps = {
  children: React.ReactElement | React.ReactElement[];
  isHot: boolean;
};

const Card = (props: CardProps) => {
  const { children, isHot } = props;
  const { t } = useTranslation(i18nComponents.namespace);
  return (
    <CardStyled>
      {isHot && (
        <div>
          <HotTag />
          <span className={'hotTagText'}>{t('Hot')}</span>
        </div>
      )}
      {children}
    </CardStyled>
  );
};

export default Card;
