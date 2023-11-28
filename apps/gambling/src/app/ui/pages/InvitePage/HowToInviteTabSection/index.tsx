import { QuestionContainer } from "../index";
import styled from "styled-components";
import copy from "copy-to-clipboard";
import { notification } from 'antd';
import { environment } from "../../../../../environments/environment";

import { HowToImageContainer as PHowToImageContainer } from "./env/pernambucana/HowToImageContainer";
import { HowToImageContainer as WHowToImageContainer } from "./env/wild/HowToImageContainer";
import { HowToImageContainer as CHowToImageContainer } from "./env/coco/HowToImageContainer";

import { InviteCopySection as PInviteCopySection } from "./env/pernambucana/InviteCopySection";
import { InviteCopySection as WInviteCopySection } from "./env/wild/InviteCopySection";
import { InviteCopySection as CInviteCopySection } from "./env/coco/InviteCopySection";

import shareListImg from "../HowToInviteTabSection/env/coco/share-list.png";
import { renderByPlatform } from "../../../utils/renderByPlatform";
import { HowToImageText } from "./env/common/HowToImageText";
import { HowToImage as CHowToImage } from "./env/coco/HowToImageContainer";
import { HowToImage as WHowToImage } from "./env/wild/HowToImageContainer";
import { HowToImage as PHowToImage } from "./env/pernambucana/HowToImageContainer";
import { QuestionContent as CQuestionContent } from "./env/coco/QuestionContent";
import { QuestionContent as WQuestionContent } from "./env/wild/QuestionContent";
import { QuestionContent as PQuestionContent } from "./env/pernambucana/QuestionContent";

interface IHowToInviteTabSection {
  inviteUrl: string;
}
export const HowToInviteTabSection = (props: IHowToInviteTabSection) => {

  return (
    <div className={'mb-[80px] min-w-[300px]'}>
      {renderByPlatform({
        "wild777bet": <WHowToImage className="p-4 rounded-2xl" />,
        "coco777bet": <CHowToImage className="p-4 sm:p-0 rounded-2xl" />,
      }, <PHowToImage className="p-4 rounded-2xl" />)}
      {renderByPlatform({
        "wild777bet": <WQuestionContent />,
        "coco777bet": <CQuestionContent />,
      }, <PQuestionContent />)}
    </div>
  );
};
