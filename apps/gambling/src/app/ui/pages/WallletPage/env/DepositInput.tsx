
import useBreakpoint from "../../../hooks/useBreakpoint";
import { Input } from "../../../components/Inputs/Input";
import cx from 'classnames';
import styled from "styled-components";
import { environment } from "apps/gambling/src/environments/environment";
import { MobileInput } from "../../../components/Inputs/MobileInput";
import { RechargeResponseConfig } from "../../../../external/RechargeInfoGetEndpoint";

const InputTag = styled.div`
  position: absolute;
  top: -24px;
  right: -10px;
  border-radius: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  padding: 0 8px;
  height: 96px;
  color: #fff;
  min-width: 117px;
  z-index: 1;
  background-image: url("assets/${environment.assetPrefix}/giveaway.png");
  background-repeat: no-repeat;
  background-position: center center;
`;

const MobileTag = styled(InputTag)`
  background-image: url("assets/${environment.assetPrefix}/giveaway.png");
  background-size: 82px;
  background-position: center 23px;
  font-size: 18px;
  color: #fff;
  position: absolute;
  top: -27px;
`

interface IDepositInput {
  inputValue: string;
  selectedIndexConfig?: RechargeResponseConfig;
}

export const DepositInput = (props: IDepositInput) => {
  const { isMobile } = useBreakpoint();
  const { inputValue, selectedIndexConfig } = props;

  const isShowInputTag = selectedIndexConfig && Number(selectedIndexConfig?.rate) > 0

  if (environment.assetPrefix === 'coco777bet') {
    return (
      <div className={cx("relative", { 'my-10': !isMobile })}>
        <MobileInput value={inputValue} className={cx({ 'py-2.5 px-4': isMobile })} inputClassName={'text-white'} />
        {isShowInputTag &&
          (<div className={cx(`absolute top-0 right-0`,
            {
              'text-base px-2 text-white bg-[#FC8038] rounded-tr-[10px] rounded-bl-[10px] rounded-tl-none rounded-tbrnone': !isMobile,
              'text-xs pt-0.5 pr-1  text-[#fbd81e] bg-gradient-to-r from-[transparent] via-[#FF3838] to-[#FF3838] rounded-tr-lg': isMobile
            })
          }>
            + R$ {(Number(inputValue) * Number(selectedIndexConfig && selectedIndexConfig?.rate || 1)).toFixed(0).toString()}
          </div>)}
      </div>
    )
  }

  return (
    <div className={cx("relative", { 'my-10': !isMobile })}>
      {isMobile ? (
        <MobileInput value={inputValue} className={"w-full h-[35px] bg-white !py-0 border-white"} />
      ) : (
        <Input value={inputValue} className={"w-full bg-white border-white"} themeStyle={"normal"} />
      )}
      {
        isShowInputTag && parseFloat(selectedIndexConfig?.rate) > 0 &&
        (
          isMobile ? (
            <MobileTag className={"text-base font-bold"}>
              <span className="pr-1">+ </span> <span>{(Number(inputValue) * Number(selectedIndexConfig && selectedIndexConfig?.rate || 1)).toFixed(0).toString()}</span>
            </MobileTag>
          ) : (
            <InputTag className={cx({
              // "background-[linear-gradient(90deg,#FFF600 0%,#4FFB0C 100%)]": isMobile,
            })}
            >
              <span className="pr-1">+ </span> <span>{(Number(inputValue) * Number(selectedIndexConfig && selectedIndexConfig?.rate || 1)).toFixed(0).toString()}</span>
            </InputTag>
          )
        )
      }
    </div>
  )
}
