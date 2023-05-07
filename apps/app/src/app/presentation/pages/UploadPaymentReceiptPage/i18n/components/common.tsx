import styled from 'styled-components';
import { Page } from '@frontend/mobile/shared/ui';

export const CameraSvgIconWrapper = styled.div`
  margin: 0 auto 10px;
  background: #fff;
  border-radius: 50%;
  width: 50px;
  height: 50px;
`;
export const Section = styled.div`
  margin-bottom: 100px;
`;
export const CustomPage = styled(Page)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const Title = styled.div`
  margin-bottom: 10px;
  font-weight: 400;
  text-align: center;
`;
export const UploadSection = styled.label.attrs<{ for: string }>((props) => ({
  htmlFor: 'file',
}))`
  height: 183px;
  background-color: #919191;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  text-align: center;
  border-radius: 8px;
  border: 2px solid #555;
  //margin-bottom: 20px;
  width: 100%;
`;
export const UploadSectionImg = styled.div<{
  imageURL: string;
}>`
  width: 100%;
  background-image: ${(props) => `url(${props.imageURL})`};
  background-repeat: no-repeat;
  height: 100%;
  background-position: center;
  background-size: contain;
`;
export const UploadSectionTitle = styled.div``;
