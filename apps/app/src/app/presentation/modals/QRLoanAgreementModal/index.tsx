import {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import {RootState} from '../../../reduxStore';
import {CloseButton} from '../../core-components/CloseButton';
import {Navigation} from '../../core-components/Navigation';
import {runAxios} from "../../../api/base/runAxios";

type Props = {
  onClose: () => void;
};
export const LoanAgreementModal = (props: Props) => {
  const onClickClose = useCallback(() => {
    props.onClose();
  }, []);

  const url = useSelector((state: RootState) => state.indexPage.indexAPI?.loanAgreementUrl);

  const [htmlData, setHTMLData] = useState<any>();
  useEffect(() => {
    if(!url) return;
    runAxios('', url, 'get', null).then((response) => {
      // console.log("response", response.data)
      if(response.success) {
        // NOTICE: Failed to execute 'atob' on 'Window': The string to be decoded contains characters outside of the Latin1 range.
        setHTMLData("data:text/html;base64," + btoa(unescape(encodeURIComponent(response.data))));
      }
    })
  }, [url])

  return (
      <div className={'loan-agreement-modal fixed top-0 z-10 flex h-full w-screen flex-col bg-white'}>
          <div className={'mb-2'}>
              <div className={'z-20 fixed top-0 right-0'} onClick={onClickClose}><CloseButton /></div>
              <Navigation className={'pt-5'} title={'Loan Agreement'} />
          </div>
          <div className={'content flex-1'}>
              {/*<div dangerouslySetInnerHTML={{ __html: htmlData}}/>*/}
              {/*<iframe id="loan-agreement" className="w-full h-full" src={url} />*/}
            <iframe id="loan-agreement" className="w-full h-full" src={htmlData}/>
          </div>
      </div>


  );
};
