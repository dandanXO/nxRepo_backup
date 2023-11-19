import styled from "styled-components";
import {CopyButton} from "./CopyButton";


const BorderLinkButtonContainer = styled.div`
  position: relative;
  width: 95%; /* 如果要指定寬度，取消註釋此行 */
  height: 60px;
  margin: 1vw auto 4vw;
  background-color: var(--white); /* 將 background-image 改為 background-color */
  border-radius: 40px;
  border: 1px solid rgba(255, 255, 255, 0.5);

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

type IInviteSection = {
  inviteUrl: string;
  onClickToCopy?: () => void;
}

export const InviteCopySection = (props: IInviteSection) => {

  return (
    <div>
      <BorderLinkButtonContainer className={'mb-4 rounded-2xl p-2 sm:p-6'}>
        <div className={'text-sm font-bold text-gray-700 text-black'}>
          {props.inviteUrl}
        </div>
        <CopyButton
          className={
            'relative left-[24px] hidden h-[60px] w-[221px] sm:block'
          }
          onClick={props.onClickToCopy}
        >
          Cópia de
        </CopyButton>
      </BorderLinkButtonContainer>

      <CopyButton
        className={'block h-[60px] w-[221px] sm:hidden'}
        onClick={props.onClickToCopy}
      >
        Cópia de
      </CopyButton>
    </div>

  )
}
