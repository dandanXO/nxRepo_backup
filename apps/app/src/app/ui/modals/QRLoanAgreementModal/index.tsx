import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
// import ReactShadowRoot from 'react-shadow-root';
// import usePortal from 'react-useportal'


import {RootState} from '../../../reduxStore';
import {CloseButton} from '../../core-components/CloseButton';
import {Navigation} from '../../core-components/Navigation';
import {gateway} from "../../../gateway";

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
    gateway('', url, 'get', null).then((response) => {
      // console.log("response", response.data)
      if(response.success) {
        // NOTICE: Failed to execute 'atob' on 'Window': The string to be decoded contains characters outside of the Latin1 range.
        // setHTMLData("data:text/html;base64," + btoa(unescape(encodeURIComponent(response.data))));

        // const header = document.querySelector('#htmlContent');
        // if(header) {
        //   const shadowRoot = header.attachShadow({mode: 'open'});
        //   shadowRoot.innerHTML = response.data;
        // }
        // const rootElement = document.querySelector("#htmlContent")
        // if(rootElement) {
        //   const shadowRoot = rootElement.attachShadow({ mode: "closed" });
        //   shadowRoot.innerHTML = response.data;
        // }
        setHTMLData(response.data);
      }
    })
  }, [url])

  // var { ref, openPortal, closePortal, isOpen, Portal } = usePortal()

  return (
      <div className={'loan-agreement-modal fixed top-0 z-10 flex h-full w-screen flex-col bg-white'}>
          <div className={'mb-2'}>
              <div className={'z-20 fixed top-0 right-0'} onClick={onClickClose}><CloseButton /></div>
              <Navigation className={'pt-5'} title={'Loan Agreement'} />
          </div>
          <div className={'content flex-1'}>
              {/*NOTE: [Techniques to prevent CSS override by base application](https://medium.com/whatfix-techblog/techniques-to-prevent-css-override-by-base-application-53a00ff1451a)*/}
              {/*NOTE: htmlData樣式會被影響*/}
              <div dangerouslySetInnerHTML={{ __html: htmlData}}/>
              {/*NOTE: Android會攔截到 iframe src 行為，導致跳轉行為發生，但Android禁止，所以會發生問題*/}
              {/*<iframe id="loan-agreement" className="w-full h-full" src={url} />*/}
              {/*  {htmlData && (*/}
              {/*    <ReactShadowRoot>*/}
              {/*      <div>{htmlData}</div>*/}
              {/*    </ReactShadowRoot>*/}
              {/*  )}*/}
            {/*<div id="htmlContent" dangerouslySetInnerHTML={{ __html: htmlData}}/>*/}

            {/*<Portal>*/}
            {/*  <div id="htmlContent">{htmlData}</div>*/}
            {/*</Portal>*/}
          </div>
      </div>


  );
};
