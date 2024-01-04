import { useNavigate } from 'react-router';
import { PageOrModalPathEnum } from '../../../../PageOrModalPathEnum';
import { Input } from '../../../../components-bs/Inputs/Input';
import useBreakpoint from '../../../../hooks/useBreakpoint';
import { EditUserInfoModal } from '../../../../modals/EditUserInfoModal';
import { useAllowLoginRouterRules } from '../../../../router/hooks/useAllowLoginRouterRules';
import { environment } from "../../../../../../environments/environment"
import {PageContainer} from "../../../../components-bs/PageContainer";
import {BackNavigation} from "../../../../components-bs/BackNavigation/BackNavigation";
import {InputSection} from "../../../../components-bs/Inputs/env/pernambucana/InputSection";


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
  const { isMobile } = useBreakpoint();

  return (
    <PageContainer>
      {editing && (
        <EditUserInfoModal
          nickname={nickname}
          close={() => setEditing(false)}
        />
      )}
      <div className={`${isMobile ? 'bg-varient' : 'border border-solid border-green-500 rounded-lg bg-varient m-4 mb-40 mt-8'}`}>
        <div id={'text-white game-record-section'}>

          <BackNavigation onClick={() => {
            if (isMobile) {
              navigate(PageOrModalPathEnum.MyPage);
            } else {
              navigate(PageOrModalPathEnum.IndexPage);
            }
          }}/>

          <div className={'w-full'}>
            <div>
              <Input
                prefix={
                  <div className={'flex w-full'}>
                    {/*<img*/}
                    {/*className={'mr-3 h-[21px] w-[21px]'}*/}
                    {/*alt={'back'}*/}
                    {/*src={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAlCAYAAAAuqZsAAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDQ4OCwgMjAyMC8wNy8xMC0yMjowNjo1MyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjIwQ0NCRDJENkE2RDExRUU4NTZGRTA0RUQ5NjQwRjhEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjIwQ0NCRDJFNkE2RDExRUU4NTZGRTA0RUQ5NjQwRjhEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjBDQ0JEMkI2QTZEMTFFRTg1NkZFMDRFRDk2NDBGOEQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MjBDQ0JEMkM2QTZEMTFFRTg1NkZFMDRFRDk2NDBGOEQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7Ghl6jAAACdElEQVR42sSYX2iPURjHX/8KibQQo2WxmrRCEcIFbReTKTdiLnaxQrOaaBERQsvyL2kTRf5ckPlzpbUircbFJMkFmWShuMBS/Mg+T56f9Os9v9/7nr3nvE99bt7znNO3p3OeP++wqqdngxCrhIMwFs7BGfgdeLThId+a4R4shLlwEh5BSZrCtsPREL8F8FjFehe2Glrz+E6GTqjwKWwGXIrgP17FTfMhTLgCEyPukchdgxGuhVXBspj7lsNm18J+We5tNrzqxIS9sNwr97LMpbB38Npy/3fXr7LLYu9eeOta2K0Ye77BBjjkI49JCfoYwf82lGu68JJgpUBfLuC7C9ZCv++SlK+DeGaooV6E9cF1g19f4NlyE2SLwa88bWFP4EaI32xYnHajuNtQpk64LtyFhL2EsH5bmsT9aQoT2wPvDd83pSnsKzQa1s7DmrSEBfoIwtLHKF2zESezw2FogCm2wsTq4U1C4pbCQ60gp/XcA3pWbGFfYD1khihukkZ/zH/fRmuHch+mxxUW6ExZb1gTcTehrsAZx2GqYW0J9MCsuMLELmorHWaS2y7AKY1CrlXDxgLnF2vkSuIKy5arJvhjWN8GzzV6RRpNmVWvRjxfxN2BcXGFZbP/OhgwrJdq9D7BT7irs2hUq8h2MTZTTgfMg15HKWwLzLEdv17ppW118BdINK0cylz4A3ZoDU06er1JDKwiapFO5h8SOK8dupOapKVNatO+bZ8mZhuTF7zV9vLnswEtM5LJd8YcXI5AbfbOuvr3IAKPwUyo0ZecMfhKe1WpDeq/HDnScfeS0aQpTIAVsArma1QfBH//Yn7O3TgowABEYnQop/CWTQAAAABJRU5ErkJggg=='}/>*/}
                    <div className={'w-full text-left'}>Número de telefone</div>
                  </div>
                }
                value={phone}
                className={'mb-4 w-full'}
                inputClassName={'text-right'}
              />
            </div>
            <Input
              prefix={
                <div className={'flex w-full'}>
                  {/*<img*/}
                  {/*  className={'mr-3 h-[21px] w-[21px]'}*/}
                  {/*  alt={'back'}*/}
                  {/*  src={*/}
                  {/*    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAArCAYAAADyijE0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDQ4OCwgMjAyMC8wNy8xMC0yMjowNjo1MyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjJFRDA2QUQ4NkE2RDExRUVCMjNFODlCOUU4NkZEM0U5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjJFRDA2QUQ5NkE2RDExRUVCMjNFODlCOUU4NkZEM0U5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MkVEMDZBRDY2QTZEMTFFRUIyM0U4OUI5RTg2RkQzRTkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MkVEMDZBRDc2QTZEMTFFRUIyM0U4OUI5RTg2RkQzRTkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6DVnmhAAACpUlEQVR42ryYT4hNURzHz3seL5l5MpoeU5NhJCkvTITIZszULPxraiwsrPQkqYmmhpIUMwsrSRaKjUyIIkONnSKEmdnNAhE2ZAaNP2We76nvWbi9N++e3/ld3/osXu+ec7/3d3+/c373pNqHzxuBVoF9oAMsivw3BV6Aa+Ai+BRnwnuFokl7mlgArvJm+8sYsbJztoA+8Ab0gBlxJvcxswG8BF0eY+bQ1AMwT8vMOk6YNzJtAUMgF2qmHtwCs02Y1jCHgsycAQuNjjrBTqmZZWCP0dUJqZm9IKVsZiVYKzHTZpJRm6+ZNJ8iCRV8zdgynJWQmXzoope4pjMzAX4mdN8PvmZKYCQhMyOS1zSYkJlBiZnL4I+ykWdgWGLmdbX9RKBjIXtTD/sSDV0C90PMjINt4GugkYfggEY/Mwo2B0ToNmgHk1qdni3H1eCCR1J/BkWwvZoRyQo8zslta3GKVVGKXDPJrtBe10TzpTiTZ4RhfwWOkixoYL/7BXzkF4K3MgoV8otLQLDimqkFW8F6sIKReMdcUFM1M/bmh8CuMu1ENN9std0E8z09/Aa9tteulMAN/CJ8BHbH7GuKAiOGcx+uFJlWMADq/mMrUyoXavsZcVdo5CwryVd2KTgdjcxGfkfPFD7dY77e4E7P9rtXEux5varpSIUTBR81g3M8qfDRD3DSpkeGK+dBhQfr5WYokX2IxWm2B3MVzOQCxta6nGlVeuXXpXsSdMPlTEHJzAAbqHpBzow5M3nFgnhPxNWUUzJSw2W9yXPcBBN4zJr5rpTAx90eI9Am0GIT+I5SZJYGjF3iqqnbZXOgngSMfepyxm5UnTyL2cGQLQeNZvpTq7eR3/2sikZPI9+4LPyzUY4SpxT7kxrirs1yD3semXQqNMJ/BRgAYJBz66Nsj5cAAAAASUVORK5CYII='*/}
                  {/*  }*/}
                  {/*/>*/}
                  <div className={'w-full text-left'}>
                    Apelido
                  </div>
                </div>
              }
              value={nickname}
              className={'mb-4 w-full items-center'}
              inputClassName={'text-right'}
              // suffix={
              //   <ViewButton
              //     onClick={() => setEditing(true)}
              //     className={'!h-[30px]'}
              //   >
              //     <img
              //       className={'mr-3 h-[21px] w-[21px]'}
              //       src={
              //         'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAkCAYAAAAOwvOmAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDQ4OCwgMjAyMC8wNy8xMC0yMjowNjo1MyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjU5MzU5RUYxNkE2RDExRUU5RUQ3QUQxNUVEOEUwMjEyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjU5MzU5RUYyNkE2RDExRUU5RUQ3QUQxNUVEOEUwMjEyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTkzNTlFRUY2QTZEMTFFRTlFRDdBRDE1RUQ4RTAyMTIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTkzNTlFRjA2QTZEMTFFRTlFRDdBRDE1RUQ4RTAyMTIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4PARvKAAACh0lEQVR42syYXUhUQRTHr9unUZRGPqgv20P5VD0ISoZFD6L4SV8vfUgFsqBPq0IhSA8VKD0FWohirAiiIEoSBVFWEEGQZlDQQ5CBIkTgVy6mu/4H/guX5XrvnXFm6cBPvO6cnb935pw5Z9Li8bj1v9l28aN06rHJOS6Dh2AbuA0euQ1+fixkBQz/06UgAjLBftAJHoA0NyeTok6AQYc5Gvn33akWlQ2egn2bfH4BvAQHUynqOsj1GFME3oPDqRJ1D7T4GHeES2lUVLHt9/vgCvjn4XPcpKgm8Aa026KrH5SAeRe/EVOizlOMsGYwAHbxeRycBNMOfl/ATROiCkBfUu65xOjK5PNXUAgmbGNmQTlY0C0qyNBPd/jsFKMraBMh9twzsAwqwC/dKSGDExxyGXMUfAD5fF4CVRT8SXfy3AmGQZ6PsVngLajk8zqY1H3MiL3TDc5I+KQzyor8DFYR1QquKviNcim1ixJi7igI+shEuq5b1GnQoyDoJ/fTX78OfkXlcU/skBQkMnkZmJNxCviMHhH6ByQFiTPvHPgm+2q9RO3hBg0qLFsdeKWSbwIeoR/h8SBrd8ET1azsJqqdB62s9TNtWLpFhViKyNo7cAPEdYsSHUiHwnd9BzVgdatlR8ChAxlSSKq/Gfp/dBRn9slzWIbslfyOKKgGP3SVsAlRQsiYjw7Eya6xbrJ0ixrk0snaLS63ZUJUmYJvF2gz0Z+pFnkvQL2pfl9F1Gc2BmtGr4JgMZ8CZ1iGLNiOoos8I2NOnYmErbBvjCZELfKqxs2cOhBxrRPW+JJeg7OJt+O1FDEu2UTSlU5Y88oV2/dULydOtiVm6QbWVAmr5VvSaWu8GLE2BBgACTh1FlgcxWMAAAAASUVORK5CYII='
              //       }
              //     />
              //   </ViewButton>
              // }
            />
            <Input
              prefix={
                <div  className={'flex w-full'}>
                  {/*<img*/}
                  {/*  className={'mr-3 h-[21px] w-[21px]'}*/}
                  {/*  alt={'back'}*/}
                  {/*  src={*/}
                  {/*    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAArCAYAAADyijE0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDQ4OCwgMjAyMC8wNy8xMC0yMjowNjo1MyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjJFRDA2QUQ4NkE2RDExRUVCMjNFODlCOUU4NkZEM0U5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjJFRDA2QUQ5NkE2RDExRUVCMjNFODlCOUU4NkZEM0U5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MkVEMDZBRDY2QTZEMTFFRUIyM0U4OUI5RTg2RkQzRTkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MkVEMDZBRDc2QTZEMTFFRUIyM0U4OUI5RTg2RkQzRTkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6DVnmhAAACpUlEQVR42ryYT4hNURzHz3seL5l5MpoeU5NhJCkvTITIZszULPxraiwsrPQkqYmmhpIUMwsrSRaKjUyIIkONnSKEmdnNAhE2ZAaNP2We76nvWbi9N++e3/ld3/osXu+ec7/3d3+/c373pNqHzxuBVoF9oAMsivw3BV6Aa+Ai+BRnwnuFokl7mlgArvJm+8sYsbJztoA+8Ab0gBlxJvcxswG8BF0eY+bQ1AMwT8vMOk6YNzJtAUMgF2qmHtwCs02Y1jCHgsycAQuNjjrBTqmZZWCP0dUJqZm9IKVsZiVYKzHTZpJRm6+ZNJ8iCRV8zdgynJWQmXzoope4pjMzAX4mdN8PvmZKYCQhMyOS1zSYkJlBiZnL4I+ykWdgWGLmdbX9RKBjIXtTD/sSDV0C90PMjINt4GugkYfggEY/Mwo2B0ToNmgHk1qdni3H1eCCR1J/BkWwvZoRyQo8zslta3GKVVGKXDPJrtBe10TzpTiTZ4RhfwWOkixoYL/7BXzkF4K3MgoV8otLQLDimqkFW8F6sIKReMdcUFM1M/bmh8CuMu1ENN9std0E8z09/Aa9tteulMAN/CJ8BHbH7GuKAiOGcx+uFJlWMADq/mMrUyoXavsZcVdo5CwryVd2KTgdjcxGfkfPFD7dY77e4E7P9rtXEux5varpSIUTBR81g3M8qfDRD3DSpkeGK+dBhQfr5WYokX2IxWm2B3MVzOQCxta6nGlVeuXXpXsSdMPlTEHJzAAbqHpBzow5M3nFgnhPxNWUUzJSw2W9yXPcBBN4zJr5rpTAx90eI9Am0GIT+I5SZJYGjF3iqqnbZXOgngSMfepyxm5UnTyL2cGQLQeNZvpTq7eR3/2sikZPI9+4LPyzUY4SpxT7kxrirs1yD3semXQqNMJ/BRgAYJBz66Nsj5cAAAAASUVORK5CYII='*/}
                  {/*  }*/}
                  {/*/>*/}
                  <div className={'w-[200px] text-left'}>
                    Verifique actualizações
                  </div>
                </div>
              }
              value={'1.0.1'}
              className={'mb-4 w-full'}
              inputClassName={'text-right'}
            />
            <InputSection
              className="flex w-full justify-between rounded-3xl border border-solid border-green-400"
              onClick={() => navigate('/privacy-agreement')}
            >
              <div  className={'flex w-full'}>
                {/*<img*/}
                {/*  className={'mr-3 h-[21px] w-[21px]'}*/}
                {/*  alt={'back'}*/}
                {/*  src={*/}
                {/*    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAnCAYAAACFSPFPAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDQ4OCwgMjAyMC8wNy8xMC0yMjowNjo1MyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQ4MjQ2RTMwNkE2RDExRUVBOUU0QjVCRjc2QzYzMjgyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQ4MjQ2RTMxNkE2RDExRUVBOUU0QjVCRjc2QzYzMjgyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDgyNDZFMkU2QTZEMTFFRUE5RTRCNUJGNzZDNjMyODIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDgyNDZFMkY2QTZEMTFFRUE5RTRCNUJGNzZDNjMyODIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4GP9eZAAACI0lEQVR42uzYSyhEURgH8OttQdmIhTI2lISUKJRXhvLYsGBhgSwUsvEoSWxYyDBqkkhJCWUnLCilJERJEZJRKEKekeH/5ZuapjuauXfunFn46pfpunP8nXvPOfceH/2+SVJYkVAImRAFl7AOK3CtpEF/F84NgAzQQxEkyZxTyz/3YAmWYQM+3RFGx/89yYMQJ4Mns3Z4glUOR86dDRMEOTYB4iT1FQpljOrYJtgavMuFaYQeCJO0rVjWBA/QDUP0C18+oQ2GPRDEvujvGaDTGiaCe0RkUe/EUJh8CBQcxo/uKQoTLnlH6XwlL6r/MO5YDuTqEYxwCAk8V4WKCPPGi+SBzbFZ2IRgT1+mKbsgVPswLeKeOXVw/EJEmCwHx9NFhCmGGrtj9fysI2Roj0Mif46GUdHzjLUNn/8ZWMswb16S5ZXCmN3Uu2p72UwN7KhspJpfY6pUtrNNYW7og4pGmuEDelW0QS99u9auHRN8v0zAlzXMJJwJCnIPg7Y3HXVzHVgEhKHLfGs/AujtrtXDQYz8KCI7HAegw0NBTNwrf87Afbz6annJaOQ1wLczywGNrnINZmcLh+hydW1agGylGz8yRVsjJXx5FC2UW5DCGz5qit4eUmFR7ap9xXs2BoVBZiANjtz1CEHbYC2QCydOfoeWmQqohGctnmdoLkri4X/n4JwX6Id4mNf6Je6Vh/8IlEKB9LvbSTc67XbO8RTvcv0IMABXgWg7gV67tgAAAABJRU5ErkJggg=='*/}
                {/*  }*/}
                {/*/>*/}
                <div>Política de Privacidad</div>
              </div>
              <img src={`assets/${environment.assetPrefix}/icon_41.png`}/>
            </InputSection>
          </div>
        </div>
        <div className={'h-20'}></div>
      </div>
    </PageContainer>
  );
};
