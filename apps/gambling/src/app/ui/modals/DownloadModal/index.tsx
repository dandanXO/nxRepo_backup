import styled from "styled-components";
import { useLazyDownloadQuery } from "../../../external";
import QRCode from 'react-qr-code';
import { AppLocalStorage } from "../../../persistant/localstorage";
import {environment} from "../../../../environments/environment";

export type IInitialChargeModal = {
  close: () => void;
}

const Container = styled.div`
  //width: 100%;
  //height: 100%;
  //width: 100%;
  //height: 100%;
  background-image: url(assets/${environment.assetPrefix}/downBg.png);
  background-size: 100% 100%;
  text-align: center;
`;


const DownloadButton = styled.div`
  width: 303px;
  height: 56px;
  border-radius: 30px;
  background: linear-gradient(180deg,#00B125 0%,#00FE5A 99%);
  box-shadow: 0 3px #036a02, inset 0 1px 3px rgba(255,255,255,.5);
  margin: 0 auto 15px;
  font-size: 18px;
  text-shadow: 0 1px 3px #036A02;
  transition: all .1s ease-in-out;
  letter-spacing: 0;
  color: #fff;
`
export const DownloadModal = (props: IInitialChargeModal) => {
  const [triggerDownload, { currentData, isFetching }] =
    useLazyDownloadQuery({
      pollingInterval: 0,
      refetchOnFocus: false,
      refetchOnReconnect: false,
    });

  const hadleDownload = (device: string) => {
    triggerDownload({
      packageName: environment.appPackageName,
    })
  }

  const downloadUrl=AppLocalStorage.getItem('downloadUrl')

  return (
    <div className={"z-[999] fixed left-0 top-0 right-0 bottom-0 flex flex-col flex justify-center items-center w-full h-full bg-[rgba(0,0,0,0.65)]"} onClick={(event: any) => {
      props.close();
    }}>

      <Container className={"text-white px-10 py-10 w-[400px] w-min-[80vh] w-max-[400px] h-auto bg-[black] rounded-2xl text-white flex flex-col items-center relative"} onClick={(event: any) => {
        event.stopPropagation();
      }}>


        <div className={"flex flex-row justify-end mb-2 absolute right-[20px] top-[20px]"}>
          <button onClick={() => {
            props.close();
          }}>
            <img
              className="w-[20px] h-[20px]" alt={"close"} src={"data:image/png;base64,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"}
            />
          </button>
        </div>

        <div className="info text-white mb-2">
          <div>Ao digitalizar o código QR, você pode</div>
          <div>jogos de cliente</div>
          <div>instantaneamente e sem problemas.</div>
        </div>

        <section className={"mb-2"}>
          <QRCode className="w-[100%] h-[100%]" value={String(downloadUrl)} />
          {/* <img className={"w-[100%] h-[100%]"} src={"https://cdn.britannica.com/17/155017-050-9AC96FC8/Example-QR-code.jpg"}/> */}
        </section>

        {/* <section className={"mb-2"}>
          <DownloadButton className={"mb-2 flex flex-row justify-center items-center"} onClick={()=>hadleDownload('mac')}>
            <img className={"w-[30px] h-[30px]"} src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAexJREFUSEvllk+IjlEUxn9PjTF2FsqfLIwmRRQbklhMmdCglKJGio2VZnaSrazNbGZrpmSaHWWw1DSllGRjI39KaZqSlBA9OnWnJt7ve+/7vn2mac763vM75znnnnPFMpmWicvKBtveC1wH9kjamaNi44xtXwbGgS5gVtLhjoNtHwSeJmjwrkoa+x/gJ8DRBHoJHJD0o6Ng2yHtN2BNSAyclfQpBxpnsmtsewPQA3yUZNvdwA1gDngMbAa2AAuS3pUF0BZsO7IZBq4A25OzyGoauAd8Bk4DF4BdS2AfgFHgtqRfRUG0BNteDzwEooHqWvTASUk//3bQDvwAGKxLTPeeAackzWeBbQ+kujXhvgIOSfqaLbXtu8D5JtQEjcYrtEKpbb8FtjUAv5HU1+5+K3AMgXgudW1G0ok64O/A2rrUnJndKakj8E2SvlStcbzf4w0yjqs3JcVkq9Rc14BbDcG/gUuSJqo8px3A6yqzvEWQBiYlXcwaIHHIduzZrKVeosyUpHNVwMeAmYZyR8b7JT3PBqes78eQbwCfKJI5/JWtxdixL4CNNeDvgX2SYnX+Y6UfAdtHgEfAugrwWAz9RRIv+igFJ8ljJ8cnbjcQW+cOEGWIT8FW4AwwBPQmhUYkhVItLQtcIdPso6sP/AccepQf4FvuTwAAAABJRU5ErkJggg=="}/>
            <span> Baixar MAC </span>
          </DownloadButton>

          <DownloadButton className={"mb-2 flex flex-row justify-center items-center"}>
            <img className={"w-[30px] h-[30px]"} src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAApNJREFUSEvtll2ITlEUhp8XF4pIfmZiipCIIkzSkBT5KZOSQiLu3E1EbhCN3JJyJyEZmRsUYhAaJuSCUhJS8jdE5P9nadX+9M1xvrPPYWpuZl9+Z33r2ftd71p7iy5a6iIu3eBU5c2sBpgNjAX6Aa+Aq8BlSfYv5cqU2swGACeAOqBHCuAe0CDpfFF4DLwMOBpJ2iJprpn1lvQl7wZi4IPAqkiy9cAx4DqwFWiS9LX8P2Y2EpgvaV/p94pgM/NvL4AhEbDX3UuxP8S9A24Cr4H+wRcObpa0NA+4FrgRgT6UNNrMmoElkdi1kg7kAbts2yPJ9gIbgPZwukrhv4AaSc/zgNuAaRHwAsANdSkSd1vSlPKY1Bqb2WDgaTCMJ70PuGFGAfXADOAzMDCosikCbpS0JQ+4yvvWpQm9XB3ATyT9NDM30yJJm83sLjAhAq6TdC0P2GVZAywERsCfmf4eOA7slPTYzAYF5/fMAL8BqnzDmeDQRm4CP3Wl5TIPl9RuZu6DHcCcxHT7AVwB9kg6mUz0V43NbGrowyz1Sm3UCJyR1GpmvtFJQN8wy+8AH4Bekr7lAbsJ/ARZy9toYxgSfQCv32ngUSjLMGAyMAuYKMmHSYeVdmJPMj1HG3nNzkXi2iSl5uoANjNvj5dAllk+Am6qXX4zRcDbJKWqlwSvAI5Ekp2SVG9m3ttjIrG1km6lxSTBh4GVwKdQL28fvyR8cJRi1wEtwIMI1B8L1ZUeCkmwy3LBzSLpeylxeIE40KUdByz2NomAD0laXSmm0GPPzIZKemZmZ4F5EfBySU2dAi5TwIfFbmB8SmJ/g7X6TJf0tlPBnixMOO/TmcEH7gc33EVJfsFkrkJSx5IV+d4NLqLWf8X+BlA33R8upOELAAAAAElFTkSuQmCC"}/>
            <span> Baixar Windows </span>
          </DownloadButton>

          <DownloadButton className={"mb-2 flex flex-row justify-center items-center"}>
            <img className={"w-[30px] h-[30px]"} src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAi5JREFUSEvtlk2ITmEUx3//iWxESKaU5DvJV2LBgqQpsrGRkLUkCmVkYSlqdkoWEtlYSBYoZaMUNcwkX2kiURQWYsHCX0fPW+O6897nvpOuxZzl+55zfvd8Pkc0JGqIy/8Ptj0VWC3pVlmWbK8D3kl6lZPFWhHb3g0MAMuAucBP4AVwH+iRdC4HGjrZYNsTgVPA3hLnBvqAY5J+5MCzwLYnAXeAGcBdYEfB+RVgDTAEbJb0vQqeC74E7AIeAOeBswXH+4HtQNS5T9KhUYNtz0t17Kpylv6PaGdK+tROvzJi2z3AwUxoS+2EpGi4EaUUbHs+sAC4AawA1tYE35PUb3tj1F3S66L9X+DUvW+AKcABYELq5jrsXuALcAb4CMyW9G24gzJwzGjMakg01eMOwYuBmPuQ5ZIGq8CR2odJ6TIQBjG/dSQiXgLsTEYrJT0aA/+RQtuNpTpqEw0VcgF42mGNFwF7kp+lklo+f/9U1tUxPk+AOWknz+oQ/Ba4CMRoLizu75EWSDwK0yUN2T7SCVjSSdsxUu8lfa5cIEUF24eB03VmCegNcDubnF29CYirI/eRiLd5i6SbowKHse1olG7gNjAOiPq1tlIcADEJIduA55KeVWWoMuLhDmzHdTEeeCkpHpH4qDgQNiS9bkkfqqClXd3OqElwvDTTgH5Jq1LE14Gt6fCbLOnrv4g4Dr19wHFJ1xJ4PRDX5VVJR3OgtVOd6zRHr1Zz5TjM1WkM/Av0EsofeCazogAAAABJRU5ErkJggg=="}/>
            <span> Baixar MAC </span>
          </DownloadButton>
        </section> */}

      </Container>
    </div>
  )
}

