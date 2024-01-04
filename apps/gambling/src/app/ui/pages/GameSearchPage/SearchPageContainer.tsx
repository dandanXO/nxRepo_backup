import { ReactNode } from "react";

import { usePageNavigate } from "../../router/hooks/usePageNavigate";
import {renderByPlatform} from "../../utils/renderByPlatform";

import {SearchPageContainer as PContaniner} from "./env/pernambucana/SearchPageContainer";
import {SearchPageContainer as WContaniner} from "./env/wild/SearchPageContainer";
import {SearchPageContainer as CContaniner} from "./env/coco/SearchPageContainer";


interface Props {
  children?: ReactNode;
}
export const SearchPageContainer = (props: Props) => {
  const {onClickToIndex} = usePageNavigate();

  return renderByPlatform({
    "wild777bet": (
      <WContaniner onClickToIndex={onClickToIndex}>{props.children}</WContaniner>
    ),
    "coco777bet": (
      <CContaniner onClickToIndex={onClickToIndex}>{props.children}</CContaniner>
    ),
  }, <PContaniner onClickToIndex={onClickToIndex}>{props.children}</PContaniner>)
}
