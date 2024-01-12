import {useState} from 'react';
import {AppLocalStorage} from '../../../persistant/localstorage';
import {useAllowLoginRouterRules} from '../../router/hooks/useAllowLoginRouterRules';

import {SettingPage as PSettingPage} from "./env/pernambucana/SettingPage";
import {SettingPage as WSettingPage} from "./env/wild/SettingPage";
import {SettingPage as CSettingPage} from "./env/u1/SettingPage";
import { SettingPage as RioSettingPage } from './env/u2';
import {renderByUVersion} from "../../utils/renderByUVersion";
import {AppLocalStorageKey} from "../../../persistant/AppLocalStorageKey";


export const SettingPage = () => {
  useAllowLoginRouterRules();

  const [editing, setEditing] = useState(false);
  const userInfo = JSON.parse(AppLocalStorage.getItem(AppLocalStorageKey.userInfo) || '{}');
  const { phone, nickname } = userInfo;

  return renderByUVersion({
    "wild777bet": (
      <WSettingPage editing={editing} setEditing={setEditing} phone={phone} nickname={nickname}/>
    ),
    "u1": (
      <CSettingPage editing={editing} setEditing={setEditing} phone={phone} nickname={nickname}/>
    ),
    "u2": (
      <RioSettingPage nickname={nickname} phone={phone} />
    )
  }, (
    <PSettingPage editing={editing} setEditing={setEditing} phone={phone} nickname={nickname}/>
  ))
};
