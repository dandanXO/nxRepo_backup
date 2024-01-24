// import InviteBanner from './desktop_recomendar_pic.png';
import Level from './level.png';
import Gift from './gift.png';
import GameChips from './gameChips.png';
import useBreakpoint from '../../../../../pageTemplate/hooks/useBreakpoint';
import { IHowToInviteTabSection } from '../..';
import { QuestionSection1 } from '../common/QuestionSection1';
import { QuestionSection2 } from '../common/QuestionSection2';
import { QuestionSection3 } from '../common/QuestionSection3';
import copy from "copy-to-clipboard";
import { notification } from 'antd';
import { environment } from '../../../../../../../environments/environment';


export const HowToInviteTabSection = (props: IHowToInviteTabSection) => {
  const {
    isMobile,
    isTablet,
    isDesktop,
  } = useBreakpoint();
  const [notefy, contextHolder] = notification.useNotification();
  const productName = ''
  const onClickToCopy = () => {
    copy(props.inviteUrl);
    navigator.clipboard.writeText(props.inviteUrl);
    notefy.success({
      message: 'Copiado!',
    });
  };
  return (
    <div className="w-full flex flex-col justify-between w-full items-center">
      <button
        onClick={() => props.setPanelMode('daily')}
        className=" leading-[28px] text-white mb-3 md:mb-4 lg:mb-10 shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)] bg-[var(--secondary-main)] relative flex flex-row justify-center py-1.5 px-5 gap-2 cursor-pointer self-end rounded-[100px]"
      >
        Convidar conta
        <img
          src="https://file.rendit.io/n/0spjSovL9AiUbj6b8ZeC.svg"
          alt="ArrowRight"
          id="ArrowRight"
          className="mt-px w-6"
        />
      </button>
      <div className="relative flex flex-col justify-between w-full">
        <div className="flex flex-col gap-1 w-full items-center">
          <img
            src={`assets/${environment.uVersion}/${environment.mvVersion}/desktop_recomendar_pic.png`}
            alt="Image1"
            id="Image1"
            className=""
          />
          {/*<img*/}
          {/*  src={InviteBanner}*/}
          {/*  alt="Image1"*/}
          {/*  id="Image1"*/}
          {/*  className=""*/}
          {/*/>*/}

          <div className="mb-5 md:mb-8 lg:mb-10 w-full text-center text-white text-sm md:text-base lg:text-xl font-bold leading-5 md:leading-6 lg:leading-7">{`Programa de recomendação exclusivo da plataforma ${environment.platformGroup}-${environment.platformName}, recomende aos amigos e ganhe comissões sem limite máximo! Esperamos sinceramente que mais jogadores se juntem a nós!`}</div>

          {!isMobile && <div className="mb-5 pr-3 lg:pr-8 relative w-full bg-[linear-gradient(145deg,_var(--liner-main-from)_-7%,var(--liner-main-to)_109%)] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat flex flex-row gap-16 items-start rounded-lg flex-wrap">
            <div className='flex-1 flex flex-row flex-nowrap  justify-between'>
              <div className="flex flex-col mb-5 items-start flex-1 ">
                <div className="break-all pl-[117px] pr-9 lg:pl-[196px] text-sm md:text-base lg:text-2xl font-bold leading-[32px] text-[#4b80bd] bg-white flex flex-row whitespace-nowrap items-start py-2.5 rounded-tl-lg rounded-br-[100px] ">
                  Copie o link para seus amigos!
                </div>
                <div className="pl-[117px] lg:pl-[196px] pt-5 text-base md:text-xl lg:text-3xl font-bold leading-7 lg:leading-9 text-white break-all">
                  {props?.inviteUrl}
                </div>
              </div>
              <div className='self-center justify-start ml-1'>
                <button
                  onClick={onClickToCopy}
                  className="p-2 lg:py-3 lg:px-10 text-left text-base md:text-xl lg:text-3xl font-medium text-white shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)] bg-[var(--primary-main)]  rounded-[100px]"
                >
                  Convide Amigos
                </button>
              </div>
              {contextHolder}
            </div>


            <div className='absolute left-[-25px] bottom-0 w-[130px] lg:w-[224px] '>
              <img
                src={Gift}
                alt="Image2"
                id="Image2"
                className="relative"
              />
            </div>
          </div>
          }
          {
            isMobile && (
              <div className="mb-5 bg-gradient-to-br from-[var(--liner-main-from)] to-[var(--liner-main-to)] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat flex flex-col w-full items-start rounded-lg">

                <div className="text-sm md:text-base lg:text-2xl font-bold leading-5 text-[#4b80bd] bg-white flex flex-row justify-center py-1 w-full items-start rounded-tl-lg rounded-tr-lg">
                  Copie o link para seus amigos!
                </div>
                <div className='p-2 w-full'>

                  <div className="text-base md:text-xl lg:text-3xl font-normal leading-6 text-white text-center w-full mb-2">
                  {props?.inviteUrl}
                  </div>
                  <div>
                    <button
                      onClick={onClickToCopy}
                      className="text-base md:text-xl lg:text-3xl font-normal leading-6 text-white shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)] bg-[var(--primary-main)] flex flex-row justify-center py-2 w-full cursor-pointer rounded-[100px]"
                    >
                      Convide Amigos
                    </button>
                  </div>
                </div>
                {contextHolder}
              </div>
            )
          }

        </div>

        <div className="mb-3 md:mb-5 flex flex-row w-full border rounded-lg border-solid border-[var(--grayscale-20)] bg-[var(--grayscale-10)]">
          <div className="p-2 md:px-5 lg:py-3 text-sm lg:text-base text-center leading-5 lg:leading-6 text-[var(--state-warn-main)]">
            <QuestionSection3 />
          </div>
        </div>
        <div className="text-sm lg:text-base overflow-hidden bg-[var(--grayscale-20)] flex flex-col justify-between w-full items-start rounded-lg">
          <div className="bg-gradient-to-l from-[#ffffff00] to-[#ffffff1a] text-zinc-400 flex w-full p-2 py-3 md:p-5 lg:p-8 justify-center items-center">
            Nota: Para garantir a justiça, os usuários trapaceiros serão banidos
            permanentemente, os fundos obtidos ilegalmente serão congelados e as
            responsabilidades legais relevantes serão assumidas.
          </div>

          <div className="w-full p-2 md:p-5 lg:px-8 bg-[#333]">
            <div className="flex flex-col lg:flex-row ">
              <div className="flex flex-col items-center w-full  lg:w-[63%] max-md:ml-0">
                <div className="items-stretch flex grow flex-col max-md:max-w-full ">
                  <div className="text-white text-base md:text-xl lg:text-3xl font-bold leading-6 md:leading-7 lg:leading-9 max-md:max-w-full">
                    Programa de referência
                  </div>
                  <div className="text-zinc-400 text-sm lg:text-base font-medium leading-5 lg:leading-6 mt-2 md:mt-3 lg:mt-5 max-md:max-w-full">
                    <QuestionSection1 />
                  </div>
                </div>
              </div>
              <div className="w-full md:w-[50%] lg:w-[40%] self-center lg:self-end mt-2 md:mt-0">
                <img className="w-full" src={Level} />
              </div>
            </div>
          </div>
          <div className="pt-3 px-2 md:pt-5 md:pl-5 md:pr-4 lg:pl-8 lg:pr-0 items-center flex flex-row bg-gradient-to-l from-[#ffffff00] to-[#ffffff1a] w-full  ">
            <div className='flex-1'>
              <div className="mb-2 md:mb-3 lg:mb-4 text-white text-base md:text-xl lg:text-3xl font-bold leading-6 md:leading-7 lg:leading-9 max-md:max-w-full">
                Estudos de caso
              </div>
              <div className="text-zinc-400 text-sm lg:text-base font-medium leading-5 lg:leading-6 font-medium pb-3 md:pb-5 lg:pb-8">
                <QuestionSection2 />
              </div>
            </div>
            <div className="origin-top-left bottom-0 h-full self-end">
              <img className="hidden md:flex md:w-[200px] lg:w-[300px]" src={GameChips} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )


}
