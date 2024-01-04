import cx from 'classnames';
import { environment } from "apps/gambling/src/environments/environment";
import useBreakpoint from "../../../../../pageTemplate/hooks/useBreakpoint";
import { QuestionSection1 } from "../common/QuestionSection1";
import { QuestionSection2 } from "../common/QuestionSection2";
import { QuestionSection3 } from "../common/QuestionSection3";
import { QuestionSection4 } from "../common/QuestionSection4";




export const QuestionContent = (props: any) => {
  const { isMobile } = useBreakpoint();

  return (
    <div className={cx(`border border-solid border-[var(--stroke-block)] text-xs p-3 sm:p-12 mt-4 sm:mt-0 sm:text-base`, props.className)}>
      <img className={'mb-4 mx-auto'} src={`assets/${environment.assetPrefix}/acting.png`} />
      <div className="mb-4 text-white"><QuestionSection1 /></div>
      <div className="mb-3 py-3.5 px-6 py-sm:mb-4 sm:py-6 sm:px-9 border border-dashed border-[var(--stroke-block)] rounded-2xl text-white">
        <div>Por exemplo:</div>
        <QuestionSection2 />
      </div>
      <div className="mb-3 sm:mb-4 text-[var(--secondary-assistant)]"><QuestionSection3 /></div>
      <div className="sm:mb-4 sm:py-3.5 sm:px-8 sm:bg-[#f051514d] text-[var(--state-error-main)]"><QuestionSection4 /></div>
    </div>
  )

}
