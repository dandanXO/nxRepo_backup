import { DepositMoneyButton } from "apps/gambling/src/app/ui/components/Buttons/DepositMoneyButton";
import { DepositInput } from "../../../../components/deposit/DepositInput"
import { DepositNoticeSection } from "./DepositNoticeSection"
import cx from 'classnames';
import { depositButtonProps } from "./depositButtonProps";
import useBreakpoint from "apps/gambling/src/app/ui/hooks/useBreakpoint";
import { tcx } from "apps/gambling/src/app/ui/utils/tcx";
import { IDepositPanelProps } from "../../../../components/deposit/DepositPanel";




export const DepositPanel = (props: IDepositPanelProps) => {
  const { isMobile } = useBreakpoint();
  const { isLoaded, onClickToNextDepositPage } = props;


  return (
    <div id={"deposit-section"}>
      <DepositNoticeSection />
      {isLoaded && (
        <DepositInput {...props.depositInputProps} />
      )}
      <div className={tcx("md:pt-1 w-full flex flex-1 flex-row flex-wrap basis-[100%] justify-start items-stretch mb-3 md:mb-3 lg:mb-5")}>
        {props?.depositButtonsOptions?.map((options: any, index: number) => {
          const { rechargeValue, isShowRate, config, rate } = options;
          return (
            <div className={`basis-[30%] max-w-[33%] flex-1 overflow-hidden ${index % 3 === 1 ? 'mx-2 md:mx-4 lg:mx-5' : ''}`}>
              <DepositMoneyButton

                key={index}
                onClick={() => {
                  props.handleClickDepositMoneyButton(rechargeValue, index, config)
                }}
                isActive={props.selectedIndex === index}
                isShowRate={isShowRate}
                {...depositButtonProps({ rechargeValue, isMobile, rate })}

              />
            </div>
          )
        })}
        {
          // NOTE: 排版用，塞空的的區塊補齊空位
          Array.from({ length: (props?.depositButtonsOptions?.length - 1) % 3 }, (_, index) => {
            return (
              <div
                key={index}
                className={cx('basis-[30%]  max-w-[33%]  flex-1')}
              ></div>
            )
          })
        }
      </div>
      <button onClick={onClickToNextDepositPage} className="mb-10 md:mb-16 lg:mb-20 py-3 lg:py-3.5 text-sm md:text-base lg:text-lg text-white shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)] bg-[#8547eb] flex flex-row justify-center w-full cursor-pointer  rounded-lg">
        Depósito
      </button>
    </div>
  )
}
