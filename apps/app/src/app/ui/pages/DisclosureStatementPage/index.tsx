import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router';

import { RootState } from '../../../reduxStore';
import { Navigation } from '../../core-components/Navigation';
import { Page } from '../../core-components/Page';
import {useEffect} from "react";
import {loadingSlice} from "../../../reduxStore/loadingSlice";

const DisclosureStatementPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const domain: string = useSelector((state: RootState) => state.app.appDomain) || "";
  const url = (domain.includes('https://www.') ? domain :`https://www.${domain}`) + '/permission.html';

  useEffect(() => {
    dispatch(loadingSlice.actions.updatePageLoading(true));
  }, [])

  const oniFrameLoad = () => {
    dispatch(loadingSlice.actions.updatePageLoading(false));
  }

  return (
    <Page className={`flex flex-col`}>
      <Navigation
        title={'Disclosure Statement'}
        back={() => {
          navigate(-1);
        }}
      />
      {domain && url && <iframe className={`w-full grow`} src={url} title="" onLoad={oniFrameLoad}/>}
    </Page>
  );
};
export default DisclosureStatementPage;
