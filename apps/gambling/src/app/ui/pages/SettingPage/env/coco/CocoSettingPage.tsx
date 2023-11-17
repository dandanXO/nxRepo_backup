import React, { useState } from 'react';
import { useNavigate } from 'react-router';

import { AppLocalStorage } from '../../../../../persistant/localstorage';
import { PageOrModalPathEnum } from '../../../../PageOrModalPathEnum';
import { Input, InputSection } from '../../../../components/Inputs/Input';
import { SectionContainer } from '../../../../components/container/SectionContainer';
import useBreakpoint from '../../../../hooks/useBreakpoint';
import { EditUserInfoModal } from '../../../../modals/EditUserInfoModal';
import { useAllowLoginRouterRules } from '../../../../router/useAllowLoginRouterRules';
import { environment } from "../../../../../../environments/environment"
import {Container} from "../../../../components/container/Container";
import {List} from "../../../../components/List";
import {ListItem} from "../../../../components/List/ListItem";
import {ViewButton} from "../../../../components/Buttons/ViewButton";
import {EditOutlined, InfoCircleOutlined, PhoneOutlined, UserOutlined,} from "@ant-design/icons";
import {BackNavigation} from "../../../../components/BackNavigation/BackNavigation";


type IProps = {
  editing: boolean;
  nickname: string;
  phone: string;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}
export const CocoSettingPage = ({
  editing,
  nickname,
  phone,
  setEditing,
}: IProps) => {
  useAllowLoginRouterRules();

  const navigate = useNavigate();
  const { isMobile } = useBreakpoint();

  return (
    <Container>

      <BackNavigation
        onClick={() => {
          if (isMobile) {
            navigate(PageOrModalPathEnum.MyPage);
          } else {
            navigate(PageOrModalPathEnum.IndexPage);
          }
          }
      }/>

      <List className={"bg-[#3F28AC]"}>
        <ListItem title={
          <div className={"w-full flex flex-row justify-between items-center"}>
            <div className={"flex flex-row justify-center items-center"}>
              <PhoneOutlined className={"mr-2"}/>
              <div>Número de telefone</div>
            </div>
            <div>{phone}</div>
          </div>
        }/>

        <ListItem title={
          <div className={"w-full flex flex-row justify-between items-center"}>
            <div className={"flex flex-row justify-center items-center"}>
              <UserOutlined className={"mr-2"}/>
              <div>Apelido</div>
            </div>
            <div className='flex gap-2 items-center'>
              <div>{nickname}</div>
              <button
                className='flex items-center'
                onClick={()=> setEditing(true)
              }>
                <EditOutlined />
              </button>
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
            <div className={"flex flex-row justify-center items-center"}>
              <InfoCircleOutlined className={"mr-2"}/>
              <div>Verifique actualizações</div>
            </div>
            <div>{"1.0.1"}</div>
          </div>
        }
        />

      </List>

      <List className={"bg-[#3F28AC]"}>
        <ListItem isEnd={true} title={
            <div className={"w-full flex flex-row justify-between items-center"}>
              <div className={"flex flex-row justify-center items-center"}>
                <InfoCircleOutlined className={"mr-2"}/>
                <div>Política de Privacidad</div>
              </div>
            </div>
          }
          onClick={() => navigate('/privacy-agreement')}
        />
      </List>

      {editing && (
        <EditUserInfoModal
          nickname={nickname}
          close={() => setEditing(false)}
        />
      )}

    </Container>
  );
};
