import React from 'react';
import { useNavigate } from 'react-router';

import { PageOrModalPathEnum } from '../../../../PageOrModalPathEnum';
import useBreakpoint from '../../../../hooks/useBreakpoint';
import { EditUserInfoModal } from '../../../../modals/EditUserInfoModal';
import { useAllowLoginRouterRules } from '../../../../router/useAllowLoginRouterRules';
import { environment } from "../../../../../../environments/environment"
import {Container} from "../../../../components/container/Container";
import {List} from "../../../../components/List";
import {ListItem} from "../../../../components/List/ListItem";
import {InfoCircleOutlined, PhoneOutlined, UserOutlined,} from "@ant-design/icons";
import {BackNavigation} from "../../../../components/BackNavigation/BackNavigation";
import { tcx } from "../../../../utils/tcx";
import { notification } from "antd";
import {EditButton} from "../../../../components-bs/Icons/EditButton";


type IProps = {
  editing: boolean;
  nickname: string;
  phone: string;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}
export const SettingPage = ({
  editing,
  nickname,
  phone,
  setEditing,
}: IProps) => {
  useAllowLoginRouterRules();

  const navigate = useNavigate();

  const [api, contextHolder]= notification.useNotification();

  const { isMobile } = useBreakpoint();

  return (
    <Container className=''>
      {contextHolder}
      <BackNavigation
        className={''}
        onClick={() => {
          if (isMobile) {
            navigate(PageOrModalPathEnum.MyPage);
          } else {
            navigate(PageOrModalPathEnum.IndexPage);
          }
          }}
        title={isMobile?(<div className='absolute left-0 w-full text-center font-bold text-lg'>Configuração</div>): undefined}
      />

      <List className={"bg-[var(--primary-variant)] mt-6 md:mt-0"}>
        <ListItem title={
          <div className={"w-full flex flex-row justify-between items-center"}>
            <div className={"flex flex-row justify-center items-center gap-[10px]"}>
              <img className='w-5 h-5' src={`assets/${environment.assetPrefix}/icon_account_phone.png`} alt="phone" />
              <div>Número de telefone</div>
            </div>
            <div>{phone}</div>
          </div>
        }/>

        <ListItem title={
          <div className={"w-full flex flex-row justify-between items-center"}>
            <div className={"flex flex-row justify-center items-center gap-[10px]"}>
              <img className='w-5 h-5' src={`assets/${environment.assetPrefix}/icon_user.png`} alt="user" />
              <div>Apelido</div>
            </div>
            <div className='flex gap-2 items-center'>
              <div>{nickname}</div>
              <EditButton onClick={()=> setEditing(true)}/>
            </div>
            {/*<ViewButton*/}
            {/*  onClick={() => setEditing(true)}*/}
            {/*  className={'!h-[30px]'}*/}
            {/*>*/}
            {/*  <EditOutlined />*/}
            {/*</ViewButton>*/}
          </div>
        }/>

        <ListItem isEnd={true} title={
          <div className={"w-full flex flex-row justify-between items-center"}>
            <div className={"flex flex-row justify-center items-center gap-[10px]"}>
              <img className='w-5 h-5' src={`assets/${environment.assetPrefix}/icon_account_version.png`} alt="version" />
              <div>Verifique actualizações</div>
            </div>
            <div>{"1.0.1"}</div>
          </div>
        }
        />

      </List>

      <List className={"bg-[var(--primary-variant)]"}>
        <ListItem isEnd={true} title={
            <div className={"w-full flex flex-row justify-between items-center"}>
              <div className={"flex flex-row justify-center items-center gap-[10px]"}>
                <img className='w-5 h-5' src={`assets/${environment.assetPrefix}/icon=terms.png`} alt="terms" />
                <div>Politica de Privacidade</div>
              </div>
            </div>
          }
          onClick={() => navigate('/privacy-agreement')}
        />
      </List>

      {editing && (
        <EditUserInfoModal
          nickname={nickname}
          close={(done) => {
            setEditing(false);
            if(done) {
              api.success({
                message: 'Done',
              });
              navigate(PageOrModalPathEnum.SettingPage)
            }
          }}
        />
      )}

    </Container>
  );
};
