import React from 'react';
import { useNavigate } from 'react-router';

import { PageOrModalPathEnum } from '../../../../PageOrModalPathEnum';
import useBreakpoint from '../../../../pageTemplate/hooks/useBreakpoint';
import { EditUserInfoModal } from '../../../../modals/EditUserInfoModal';
import { useAllowLoginRouterRules } from '../../../../router/hooks/useAllowLoginRouterRules';
import { environment } from "../../../../../../environments/environment"
import {PageContainer} from "../../../../components-bs/PageContainer";
import {List} from "../../../../components/List";
import {ListItem} from "../../../../components/List/ListItem";
import {InfoCircleOutlined, PhoneOutlined, UserOutlined,} from "@ant-design/icons";
import {BackNavigation} from "../../../../components-bs/BackNavigation/BackNavigation";
import { tcx } from "../../../../utils/tcx";
import { notification } from "antd";


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
    <PageContainer>
      {contextHolder}
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
                className={tcx(
                  'flex items-center',
                  ['bg-transparent rounded-3xl px-3 bg-gradient-to-r from-[#FFA305] to-[#FFCC5A]', !isMobile]
                )}
                onClick={()=> setEditing(true)
              }>
                {
                  isMobile ? (
                    <img
                      className='w-[20px] h-[20px]'
                      alt='edit'
                      src={`assets/${environment.assetPrefix}/ic_account_edit.png`}
                    />
                  ): 'Editar'
                }
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

    </PageContainer>
  );
};
