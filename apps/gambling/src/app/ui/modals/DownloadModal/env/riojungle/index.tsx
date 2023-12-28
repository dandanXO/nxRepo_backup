import styled from "styled-components";
import { useLazyDownloadQuery } from "../../../../../external";
import QRCode from 'react-qr-code';
import { AppLocalStorage } from "../../../../../persistant/localstorage";
import {environment} from "../../../../../../environments/environment";
import {AppLocalStorageKey} from "../../../../../persistant/AppLocalStorageKey";
import {CloseICON} from "../../../../components-bs/Icons/CloseICON";
import cx from "classnames";
import {usePageNavigate} from "../../../../hooks/usePageNavigate";

export type IInitialChargeModal = {
  close: () => void;
}

const Container = styled.div`
  //width: 100%;
  // height: 600px;
  //width: 100%;
  //height: 100%;
  // background-image: url(assets/${environment.assetPrefix}/downBg.png);
  background-size: 100% 100%;
  //text-align: center;
`;


const DownloadButton = styled.div`
  height: 40px;
  border-radius: 100px;
  background: rgba(16, 185, 143, 1);
  box-shadow: 0px -4px 4px 0px rgba(0, 0, 0, 0.25) inset;
  box-shadow: 0px 4px 4px 0px rgba(255, 255, 255, 0.25) inset;
  transition: all .1s ease-in-out;
  color: #fff;
`
export const RiojungleDownloadModal = (props: IInitialChargeModal) => {
  const [triggerDownload, { currentData, isFetching }] =
    useLazyDownloadQuery({
      pollingInterval: 0,
      refetchOnFocus: false,
      refetchOnReconnect: false,
    });

  const {onClickToOpenDownload, downloadUrl} = usePageNavigate();

  const handleDownload = (device: string) => {
    // triggerDownload({
    //   packageName: environment.appPackageName,
    // })
    onClickToOpenDownload();
  }


  return (
    <div className={"z-[1002] fixed left-0 top-0 right-0 bottom-0 flex flex-col justify-center items-center w-full h-full bg-[rgba(0,0,0,0.65)]"} onClick={(event: any) => {
      props.close();
    }}>

      <Container
        className={cx(
          "relative",
            "rounded-2xl border-solid ",
            "bg-[#333333]",
            "flex flex-col items-center",
            "",
            "text-center text-white",
            // NOTE:
            "w-[90vw] max-w-[368px] h-auto"
          )}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className={"flex justify-end w-full"}>
          <div
            onClick={() => {
              props.close();
            }}
          >
            <CloseICON className="w-[40px] h-[40px] p-0" btnClassName={'p-1 hover:rounded-full hover:bg-[rgba(255,255,255,0.1)]'} outLined={true}/>
          </div>
        </div>

        <div className="info text-white mt-2 mx-3 text-xl">
          Ao digitalizar o código QR, você podejogar jogos de clienteinstantaneamente e sem problemas.
        </div>

        <section className={""}>
          <QRCode className="w-[320px] h-[320px] p-2 mb-5 mt-4 bg-white box-border rounded-lg" value={downloadUrl} />
          {/* <img className={"w-[100%] h-[100%]"} src={"https://cdn.britannica.com/17/155017-050-9AC96FC8/Example-QR-code.jpg"}/> */}

          <div className={""}>
            {/*<DownloadButton className={"mb-2 flex flex-row justify-center items-center"} onClick={()=>handleDownload('mac')}>*/}
            {/*  <img className={"w-[30px] h-[30px]"} src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAexJREFUSEvllk+IjlEUxn9PjTF2FsqfLIwmRRQbklhMmdCglKJGio2VZnaSrazNbGZrpmSaHWWw1DSllGRjI39KaZqSlBA9OnWnJt7ve+/7vn2mac763vM75znnnnPFMpmWicvKBtveC1wH9kjamaNi44xtXwbGgS5gVtLhjoNtHwSeJmjwrkoa+x/gJ8DRBHoJHJD0o6Ng2yHtN2BNSAyclfQpBxpnsmtsewPQA3yUZNvdwA1gDngMbAa2AAuS3pUF0BZsO7IZBq4A25OzyGoauAd8Bk4DF4BdS2AfgFHgtqRfRUG0BNteDzwEooHqWvTASUk//3bQDvwAGKxLTPeeAackzWeBbQ+kujXhvgIOSfqaLbXtu8D5JtQEjcYrtEKpbb8FtjUAv5HU1+5+K3AMgXgudW1G0ok64O/A2rrUnJndKakj8E2SvlStcbzf4w0yjqs3JcVkq9Rc14BbDcG/gUuSJqo8px3A6yqzvEWQBiYlXcwaIHHIduzZrKVeosyUpHNVwMeAmYZyR8b7JT3PBqes78eQbwCfKJI5/JWtxdixL4CNNeDvgX2SYnX+Y6UfAdtHgEfAugrwWAz9RRIv+igFJ8ljJ8cnbjcQW+cOEGWIT8FW4AwwBPQmhUYkhVItLQtcIdPso6sP/AccepQf4FvuTwAAAABJRU5ErkJggg=="}/>*/}
            {/*  <span> Baixar MAC </span>*/}
            {/*</DownloadButton>*/}

            {/*<DownloadButton className={"mb-2 flex flex-row justify-center items-center"}>*/}
            {/*  <img className={"w-[30px] h-[30px]"} src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAApNJREFUSEvtll2ITlEUhp8XF4pIfmZiipCIIkzSkBT5KZOSQiLu3E1EbhCN3JJyJyEZmRsUYhAaJuSCUhJS8jdE5P9nadX+9M1xvrPPYWpuZl9+Z33r2ftd71p7iy5a6iIu3eBU5c2sBpgNjAX6Aa+Aq8BlSfYv5cqU2swGACeAOqBHCuAe0CDpfFF4DLwMOBpJ2iJprpn1lvQl7wZi4IPAqkiy9cAx4DqwFWiS9LX8P2Y2EpgvaV/p94pgM/NvL4AhEbDX3UuxP8S9A24Cr4H+wRcObpa0NA+4FrgRgT6UNNrMmoElkdi1kg7kAbts2yPJ9gIbgPZwukrhv4AaSc/zgNuAaRHwAsANdSkSd1vSlPKY1Bqb2WDgaTCMJ70PuGFGAfXADOAzMDCosikCbpS0JQ+4yvvWpQm9XB3ATyT9NDM30yJJm83sLjAhAq6TdC0P2GVZAywERsCfmf4eOA7slPTYzAYF5/fMAL8BqnzDmeDQRm4CP3Wl5TIPl9RuZu6DHcCcxHT7AVwB9kg6mUz0V43NbGrowyz1Sm3UCJyR1GpmvtFJQN8wy+8AH4Bekr7lAbsJ/ARZy9toYxgSfQCv32ngUSjLMGAyMAuYKMmHSYeVdmJPMj1HG3nNzkXi2iSl5uoANjNvj5dAllk+Am6qXX4zRcDbJKWqlwSvAI5Ekp2SVG9m3ttjIrG1km6lxSTBh4GVwKdQL28fvyR8cJRi1wEtwIMI1B8L1ZUeCkmwy3LBzSLpeylxeIE40KUdByz2NomAD0laXSmm0GPPzIZKemZmZ4F5EfBySU2dAi5TwIfFbmB8SmJ/g7X6TJf0tlPBnixMOO/TmcEH7gc33EVJfsFkrkJSx5IV+d4NLqLWf8X+BlA33R8upOELAAAAAElFTkSuQmCC"}/>*/}
            {/*  <span> Baixar Windows </span>*/}
            {/*</DownloadButton>*/}

            {/*<DownloadButton className={"mb-2 flex flex-row justify-center items-center"}>*/}
            {/*  <img className={"w-[30px] h-[30px]"} src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAi5JREFUSEvtlk2ITmEUx3//iWxESKaU5DvJV2LBgqQpsrGRkLUkCmVkYSlqdkoWEtlYSBYoZaMUNcwkX2kiURQWYsHCX0fPW+O6897nvpOuxZzl+55zfvd8Pkc0JGqIy/8Ptj0VWC3pVlmWbK8D3kl6lZPFWhHb3g0MAMuAucBP4AVwH+iRdC4HGjrZYNsTgVPA3hLnBvqAY5J+5MCzwLYnAXeAGcBdYEfB+RVgDTAEbJb0vQqeC74E7AIeAOeBswXH+4HtQNS5T9KhUYNtz0t17Kpylv6PaGdK+tROvzJi2z3AwUxoS+2EpGi4EaUUbHs+sAC4AawA1tYE35PUb3tj1F3S66L9X+DUvW+AKcABYELq5jrsXuALcAb4CMyW9G24gzJwzGjMakg01eMOwYuBmPuQ5ZIGq8CR2odJ6TIQBjG/dSQiXgLsTEYrJT0aA/+RQtuNpTpqEw0VcgF42mGNFwF7kp+lklo+f/9U1tUxPk+AOWknz+oQ/Ba4CMRoLizu75EWSDwK0yUN2T7SCVjSSdsxUu8lfa5cIEUF24eB03VmCegNcDubnF29CYirI/eRiLd5i6SbowKHse1olG7gNjAOiPq1tlIcADEJIduA55KeVWWoMuLhDmzHdTEeeCkpHpH4qDgQNiS9bkkfqqClXd3OqElwvDTTgH5Jq1LE14Gt6fCbLOnrv4g4Dr19wHFJ1xJ4PRDX5VVJR3OgtVOd6zRHr1Zz5TjM1WkM/Av0EsofeCazogAAAABJRU5ErkJggg=="}/>*/}
            {/*  <span> Baixar MAC </span>*/}
            {/*</DownloadButton>*/}

            <DownloadButton
              className={"w-full flex flex-row justify-center items-center mb-8"}
              onClick={()=>handleDownload('android')}
            >
              <span>Baixar Android</span>
            </DownloadButton>

          </div>

        </section>



      </Container>
    </div>
  )
}

