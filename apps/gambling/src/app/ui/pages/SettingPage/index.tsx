import {useState} from 'react';
import {AppLocalStorage} from '../../../persistant/localstorage';
import {useAllowLoginRouterRules} from '../../router/useAllowLoginRouterRules';

import {SettingPage as PSettingPage} from "./env/pernambucana/SettingPage";
import {SettingPage as WSettingPage} from "./env/wild/SettingPage";
import {SettingPage as CSettingPage} from "./env/coco/SettingPage";
import {renderByPlatform} from "../../utils/renderByPlatform";
import {AppLocalStorageKey} from "../../../persistant/AppLocalStorageKey";


export const SettingPage = () => {
  useAllowLoginRouterRules();

  const [editing, setEditing] = useState(false);
  const userInfo = JSON.parse(AppLocalStorage.getItem(AppLocalStorageKey.userInfo) || '{}');
  const { phone, nickname } = userInfo;

  return renderByPlatform({
    "wild777bet": (
      <WSettingPage editing={editing} setEditing={setEditing} phone={phone} nickname={nickname}/>
    ),
    "coco777bet": (
      <CSettingPage editing={editing} setEditing={setEditing} phone={phone} nickname={nickname}/>
    )
  }, (
    <PSettingPage editing={editing} setEditing={setEditing} phone={phone} nickname={nickname}/>
  ))
};
