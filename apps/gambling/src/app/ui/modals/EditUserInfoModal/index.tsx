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
import {CloseICON} from "../../components/Icons/CloseICON";


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
  const [nickNameInvalidatedMessage, setNickNameInvalidatedMessage] = useState('');
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

  const nickNameValidator = (nickName: string) => {
    if (nickName === '') {
      setNickNameInvalidatedMessage('Insira um apelido')
      return;
    }

    if (/[^0-9a-zA-Z]/.test(nickName)) {
      setNickNameInvalidatedMessage('Apenas inglês ou números são suportados')
      return;
    }

    if (nickName.length < 4 || nickName.length > 16) {
      setNickNameInvalidatedMessage('nome de usuário (6-16 letras e números)')
      return;
    }

    setNickNameInvalidatedMessage('')
  }

  const handleConfirm = () => {
    if(nickNameInvalidatedMessage === '') {
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
    }
  };

  return (
    <div
      className="fixed left-0 top-0 right-0 bottom-0 z-[1002] flex h-full w-full flex-col items-center justify-center bg-[rgba(0,0,0,0.65)]"
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
          <div
            onClick={() => {
              close();
            }}
          >
            <CloseICON/>
          </div>
        </div>

        <div className='w-full'>
          <Input
            prefix={<img alt='user' src={`assets/${environment.assetPrefix}/icon=user.png`} className="h-[14px] w-[14px] mr-2" />}
            className="mt-4 md:mt-8 w-full items-center rounded-full p-3 text-xs md:text-3xl bg-[var(--primary-variant)]"
            value={userNickname}
            onChange={(event: any) => {
              setUserNickname(event.target.value);
              nickNameValidator(event.target.value);
            }}
            validation={nickNameInvalidatedMessage === ''}
            errorMessage={nickNameInvalidatedMessage}
          />
        </div>

        <div className='w-full grid grid-cols-4 gap-2 md:gap-4 mb-4'>
          {
            [1,2,3,4,5,6,7,8,9,10,11,12].map((item) => (
              <div key={item} className='relative' onClick={()=>setSelectedAvatar(item)}>
                <img
                  className='w-full rounded-xl md:rounded-3xl bg-transparent'
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
