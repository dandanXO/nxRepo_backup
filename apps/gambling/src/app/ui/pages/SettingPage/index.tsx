import { useState } from 'react';
import { useNavigate } from 'react-router';

import { AppLocalStorage } from '../../../persistant/localstorage';
import { PageOrModalPathEnum } from '../../PageOrModalPathEnum';
import { Input, InputSection } from '../../components/Inputs/Input';
import { SectionContainer } from '../../components/container/SectionContainer';
import useBreakpoint from '../../hooks/useBreakpoint';
import { EditUserInfoModal } from '../../modals/EditUserInfoModal';
import { useAllowLoginRouterRules } from '../../router/useAllowLoginRouterRules';
import { environment } from "../../../../environments/environment"
import {Container} from "../../components/container/Container";
import {CocoSettingPage} from "./env/coco/CocoSettingPage";
import {PernambucanaSettingPage} from "./env/pernambucana/PernambucanaSettingPage";


export const SettingPage = () => {
  useAllowLoginRouterRules();

  const [editing, setEditing] = useState(false);
  const userInfo = JSON.parse(AppLocalStorage.getItem('userInfo') || '{}');
  const { phone, nickname } = userInfo;

  return environment.assetPrefix === "coco777bet" ? (
    <CocoSettingPage editing={editing} setEditing={setEditing} phone={phone} nickname={nickname} />
  ) : <PernambucanaSettingPage editing={editing} setEditing={setEditing} phone={phone} nickname={nickname} />
};
