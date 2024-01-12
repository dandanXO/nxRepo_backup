import { IPanelMode, QuestionContainer } from "../index";
import styled from "styled-components";
import copy from "copy-to-clipboard";
import { notification } from 'antd';
import { environment } from "../../../../../environments/environment";

import { HowToImageContainer as PHowToImageContainer } from "./env/pernambucana/HowToImageContainer";
import { HowToImageContainer as WHowToImageContainer } from "./env/wild/HowToImageContainer";
import { HowToImageContainer as CHowToImageContainer } from "./env/u1/HowToImageContainer";

import { InviteCopySection as PInviteCopySection } from "./env/pernambucana/InviteCopySection";
import { InviteCopySection as WInviteCopySection } from "./env/wild/InviteCopySection";
import { InviteCopySection as CInviteCopySection } from "./env/u1/InviteCopySection";

import shareListImg from "./env/u1/share-list.png";
import { renderByUVersion } from "../../../utils/renderByUVersion";
import { HowToImageText } from "./env/common/HowToImageText";
import { HowToImage as CHowToImage } from "./env/u1/HowToImageContainer";
import { HowToImage as WHowToImage } from "./env/wild/HowToImageContainer";
import { HowToImage as PHowToImage } from "./env/pernambucana/HowToImageContainer";
import { QuestionContent as CQuestionContent } from "./env/u1/QuestionContent";
import { QuestionContent as WQuestionContent } from "./env/wild/QuestionContent";
import { QuestionContent as PQuestionContent } from "./env/pernambucana/QuestionContent";
import { HowToInviteTabSection as RHowToInviteTabSection } from './env/u2'

export type IHowToInviteTabSection = {
  inviteUrl: string;
} & IPanelMode
export const HowToInviteTabSection = (props: IHowToInviteTabSection ) => {




  return (

    <div className={'mb-[80px] min-w-[300px]'}>
      {renderByUVersion({
        "wild777bet": (
          <>
            <WHowToImage className="p-4 rounded-2xl" />
            <WQuestionContent />
          </>
        )
        ,
        "u1": (
          <>
            <CHowToImage className="p-4 sm:p-0 rounded-2xl" />
            <CQuestionContent />
          </>),
        "u2": <RHowToInviteTabSection {...props}/>,
      }, (
        <>
          <PHowToImage className="p-4 rounded-2xl" />
          <PQuestionContent />
        </>))}
    </div>
  );
};
