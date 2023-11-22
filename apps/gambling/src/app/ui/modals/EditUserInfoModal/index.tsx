import { notification } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';

import { useUpdateUserInfoMutation } from '../../../external';
import { promiseHandler } from '../../../gateway/promiseHanlder';
import { AppLocalStorage } from '../../../persistant/localstorage';
import { Input as DesktopInput } from '../../components/Inputs/Input';
import { MobileInput } from '../../components/Inputs/MobileInput';
import useBreakpoint from '../../hooks/useBreakpoint';
import { IOpenNotificationWithIcon } from '../../pageTemplate';
import { tcx } from "../../utils/tcx";
import { UserOutlined } from "@ant-design/icons";
import { environment } from "../../../../environments/environment";
import {AppLocalStorageKey} from "../../../persistant/AppLocalStorageKey";


interface IEditUserInfoModalProps {
  nickname: string;
  close: (done?:boolean) => void;
}

const CancelButton = styled.button`
  width: 100%;
  padding: 10px 0;
  border-radius: 8px;
  font-size: 16px;
  background: linear-gradient(180deg, #FFEF61 0%, #FF7E21 100%);
`;
const ConfirmButton = styled.button`
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  background: linear-gradient(180deg, #45CCF7 0%, #0044C7 99%);
  border-radius: 8px;
`;

export const EditUserInfoModal = ({
  nickname,
  close,
}: IEditUserInfoModalProps) => {
  const userInfo = JSON.parse(AppLocalStorage.getItem(AppLocalStorageKey.userInfo) || '{}')
  const [userNickname, setUserNickname] = useState(nickname);
  const [triggerUpdateUserInfo, { isLoading }] = useUpdateUserInfoMutation({});
  const [selectedAvatar, setSelectedAvatar] = useState(Number(userInfo.avatar) || 1)

  const { isMobile } = useBreakpoint();

  const Input = isMobile ? MobileInput : DesktopInput;

  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (props: IOpenNotificationWithIcon) => {
    const type = props.type || 'error';
    const msg = props.message || 'Message';
    api[type]({
      message: msg,
      description: props.description,
    });
  };

  const handleConfirm = () => {
    triggerUpdateUserInfo({
      token: AppLocalStorage.getItem(AppLocalStorageKey.token) || '',
      nickname: userNickname,
      avatar: `${selectedAvatar}`
    }).then((response) => {
      promiseHandler.then(
        response,
        () => {
          if ((response as any).data.code === 200) {
            AppLocalStorage.setItem(
              AppLocalStorageKey.userInfo,
              JSON.stringify((response as any).data.data.user_info || '{}')
            );
            close(true);
          }
        },
        openNotificationWithIcon
      );
    });
  };

  return (
    <div
      className="fixed left-0 top-0 right-0 bottom-0 z-[999] flex h-full w-full flex-col items-center justify-center bg-[rgba(0,0,0,0.65)]"
      onClick={() => close()}
    >
      {contextHolder}
      <div
        className={tcx(
          `
          flex w-[400px] md:w-[656px] flex-col items-center rounded-2xl px-8 pt-8 pb-10 text-white
          bg-gradient-to-b from-[#577DDE] to-[#000691]
          `,
          ['w-[382px] px-6 pt-4 pb-5', isMobile]
        )}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className='flex justify-between w-full'>
          <div className="w-full text-start text-lg md:text-4xl md:font-bold">Alterar apelido favrito</div>
          <button
            onClick={() => {close();}}
          >
            <img
              className="h-[20px] w-[20px]"
              alt={'close'}
              src={
                'data:image/png;base64,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'
              }
            />
          </button>
        </div>

        <div className='w-full'>
          <Input
            prefix={<UserOutlined className="mr-2" />}
            className="mt-4 md:mt-8 w-full items-center rounded-full p-3 text-xs md:text-3xl"
            value={userNickname}
            onChange={(event: any) => setUserNickname(event.target.value)}
          />
        </div>

        <div className='w-full grid grid-cols-4 gap-2 md:gap-4 mb-4'>
          {
            [1,2,3,4,5,6,7,8,9,10,11,12].map((item) => (
              <div key={item} className='relative' onClick={()=>setSelectedAvatar(item)}>
                <img
                  className='w-full rounded-xl md:rounded-3xl bg-red-600'
                  alt={`avatar${item}`} src={`assets/${environment.assetPrefix}/avatar_${item}.png`}
                />
                {selectedAvatar === item &&
                  <div className='absolute top-0 left-0 h-full w-full rounded-xl md:rounded-3xl border-4 border-[#FDEF70] z-10' />
                }
              </div>
            ))
          }
        </div>

        <div className="flex w-full justify-between gap-5">
          <CancelButton onClick={() => close()}>Cancelar</CancelButton>
          <ConfirmButton onClick={handleConfirm} disabled={isLoading}>
            {isLoading ? 'Cargando' : 'Confirme'}
          </ConfirmButton>
        </div>
      </div>
    </div>
  );
};
