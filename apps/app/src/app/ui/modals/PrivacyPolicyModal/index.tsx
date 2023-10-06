import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { Overlay } from '@frontend/mobile/shared/ui';

import { RootState } from '../../../reduxStore';
import { loadingSlice } from '../../../reduxStore/loadingSlice';
import LoadingMask from '../../core-components/LoadingMask';

const PrivacyPolicyModal = (props: any) => {
  const navigate = useNavigate();
  const domain: string =
    useSelector((state: RootState) => state.app?.appDomain) || '';
  console.log('domain: ', domain);
  const url =
    (domain.includes('https://www.') ? domain : `https://www.${domain}`) +
    '/privacy.html';

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadingSlice.actions.updatePageLoading(true));
  }, []);

  const oniFrameLoad = () => {
    dispatch(loadingSlice.actions.updatePageLoading(false));
  };

  const pageLoading = useSelector((state: any) => state.pageLoading);
  return (
    <Overlay
      show={true}
      enableClose={true}
      onCancel={() => {
        navigate(-1);
      }}
      content={() => {
        return (
          <div className="flex h-[80vh] flex-col">
            <div
              className={`text-ctext-primary ml-5 text-left text-xl font-bold`}
            >
              Privacy Policy
            </div>
            {domain && (
              <iframe
                className={`w-full grow `}
                src={url}
                title=""
                onLoad={oniFrameLoad}
              />
            )}
            {/*NOTICE: 最外層的被蓋住，只好這邊暫時加上*/}
            {pageLoading.show && <LoadingMask />}
          </div>
        );
      }}
    />
  );
};

export default PrivacyPolicyModal;
