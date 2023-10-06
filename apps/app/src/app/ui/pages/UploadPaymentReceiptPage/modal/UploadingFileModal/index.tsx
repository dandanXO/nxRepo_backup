import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { Overlay, StyledLoading } from '@frontend/mobile/shared/ui';

import Divider from '../../../../core-components/Divider';
import { i18nUploadingFileModal } from './i18n/translations';

const Container = styled.div`
  padding: 8px;
  font-size: 16px;
`;

const ProgressBar = styled.div``;
const Percent = styled.div`
  text-align: right;
`;

const Title = styled.div`
  text-align: center;
  color: black;
  margin-bottom: 30px;
`;
const ProgressBarContainer = styled.div`
  background: #e5e5e5;
  height: 5px;
`;
interface ProgressBarIndexProps {
  width: string;
}
const ProgressBarWater = styled.div<ProgressBarIndexProps>`
  background: #aaaaaa;
  width: ${(props) => props.width};
  height: 5px;
`;
const Description = styled.div`
  color: #aaaaaa;
  font-size: 14px;
  font-weight: 300;
  line-height: 1.43;
  text-align: center;
`;
const UploadingFileModal = () => {
  const { t } = useTranslation(i18nUploadingFileModal.namespace);
  return (
    <Overlay
      height={100}
      show={true}
      overflow="hidden"
      content={(hide: () => void) => {
        return (
          <Container>
            <div>{t('Uploading File')}</div>
            <Divider />
            <div className={`mt-8 mb-6`}>
              <StyledLoading />
            </div>
            <Description className={`mb-6`}>
              {t(
                'Your file is uploading, please keep your network connection is active and wait for few minutes'
              )}
            </Description>
          </Container>
        );
      }}
    ></Overlay>
  );
};

export default UploadingFileModal;
