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
      <div className={tcx("flex flex-1 -ml-1 -mr-1 flex-row flex-wrap basis-[100%] justify-start items-stretch", [`mb-20 `, !isMobile])}>
        {props?.depositButtonsOptions?.map((options: any, index: number) => {
          const { rechargeValue, isShowRate, config, rate } = options;
          return (
            <DepositMoneyButton
              key={index}
              onClick={() => {
                props.handleClickDepositMoneyButton(rechargeValue, index, config)
              }}
              isActive={props.selectedIndex === index}
              isShowRate={isShowRate}
              {...depositButtonProps({ rechargeValue, isMobile, rate })}
            />
          )
        })}
        {
          // NOTE: 排版用，塞空的的區塊補齊空位
          Array.from({ length: (props?.depositButtonsOptions?.length - 1) % 3 }, (_, index) => {
            return (
              <div
                key={index}
                className={cx('basis-[30%] flex-1 mx-1')}
              ></div>
            )
          })
        }
      </div>
      <button onClick={onClickToNextDepositPage} className="text-sm md:text-base lg:text-lg shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)] bg-[#8547eb] flex flex-row justify-center pt-3 w-full h-12 cursor-pointer items-start rounded-lg">
        Depósito
      </button>
    </div>
  )
}
