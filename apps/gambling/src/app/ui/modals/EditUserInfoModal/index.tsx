import { UserOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';

import { useUpdateUserInfoMutation } from '../../../external';
import { promiseHandler } from '../../../gateway/promiseHanlder';
import { AppLocalStorage } from '../../../persistant/localstorage';
import { Input as DesktopInput } from '../../components/Input';
import { MobileInput } from '../../components/MobileInput';
import useBreakpoint from '../../hooks/useBreakpoint';
import { IOpenNotificationWithIcon } from '../../pageTemplate';

const AvatarSrcMap: { [key: number]: string} = {
  1: 'alterar_1.c00fc635.png',
  2: 'alterar_2.9083d2ef.png',
  3: 'alterar_3.79b553f9.png',
  4: 'alterar_4.bb0b3c7c.png',
  5: 'alterar_5.5e0b2dbf.png',
  6: 'alterar_6.cbf95e56.png',
  7: 'alterar_7.e38e8e0b.png',
  8: 'alterar_8.c988f1a4.png',
  9: 'alterar_9.d00377c6.png',
}


const avatarPickerSrc = 'data:image/png;base64,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'


interface IEditUserInfoModalProps {
  nickname: string;
  close: () => void;
}

const Container = styled.div`
  background-color: #1b2233;
  background-size: 100% 100%;
`;

const CancelButton = styled.button`
  width: 100%;
  padding: 10px 0;
  border-radius: 25px;
  font-size: 16px;
  background: linear-gradient(180deg, #49524b 0%, #9cb7aa 100%);
  box-shadow: 0 2px #303e32, inset 0 1px 3px rgba(255, 255, 255, 0.5);
  letter-spacing: 0;
`;
const ConfirmButton = styled.button`
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  background: linear-gradient(180deg, #00b125 0%, #00fe5a 99%);
  box-shadow: 0 2px #036a02, inset 0 1px 3px rgba(255, 255, 255, 0.5) !important;
  border-radius: 25px;
  letter-spacing: 0;
  text-shadow: 0 1px 2px #036a02;
`;

export const EditUserInfoModal = ({
  nickname,
  close,
}: IEditUserInfoModalProps) => {
  const userInfo = JSON.parse(AppLocalStorage.getItem('userInfo') || '{}')
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
      token: AppLocalStorage.getItem('token') || '',
      nickname: userNickname,
      avatar: `${selectedAvatar}`
    }).then((response) => {
      promiseHandler.then(
        response,
        () => {
          if ((response as any).data.code === 200) {
            AppLocalStorage.setItem(
              'userInfo',
              JSON.stringify((response as any).data.data.user_info || '{}')
            );
            close();
          }
        },
        openNotificationWithIcon
      );
    });
  };

  return (
    <div
      className="fixed left-0 top-0 right-0 bottom-0 z-[999] flex flex h-full w-full flex-col items-center justify-center bg-[rgba(0,0,0,0.65)]"
      onClick={() => close()}
    >
      {contextHolder}
      <Container
        className="relative flex h-auto w-[400px] flex-col items-center rounded-2xl px-10 py-10 text-white"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div
          className={
            'absolute right-[20px] top-[20px] mb-2 flex flex-row justify-end'
          }
        >
          <button
            onClick={() => {
              close();
            }}
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
        <div className="w-full text-left">Alterar apelido favrito</div>

        <div className='w-full'>
          <Input
            prefix={<UserOutlined className="mr-2" />}
            className="mt-8 mb-8 w-full items-center rounded-full"
            value={userNickname}
            onChange={(event) => setUserNickname(event.target.value)}
          />
        </div>

        <div className='w-full grid grid-rows-3 grid-flow-col gap-10 mb-8'>
          {
            [1,2,3,4,5,6,7,8,9].map((item) => (
              <div key={item} className='relative' onClick={()=>setSelectedAvatar(item)}>
                <img className='w-full' alt={`avatar${item}`} src={`assets/${AvatarSrcMap[item]}`}/>
                {selectedAvatar === item && <img className='w-full absolute top-0 left-0' alt='pick' src={avatarPickerSrc}/>}
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
      </Container>
    </div>
  );
};
