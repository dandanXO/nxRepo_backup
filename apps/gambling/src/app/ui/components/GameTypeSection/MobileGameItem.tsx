import useBreakpoint from "../../hooks/useBreakpoint";
import {useState} from "react";
import cx from "classnames";
import {TailSpin} from "react-loading-icons";
import {IGameItem, IItem} from "./GameItem";
import styled from "styled-components";
// import Skeleton from 'react-loading-skeleton'


const Skeleton = styled.div`
  @keyframes waveAnimation {
    0% {
      background-position: -200px 0;
      opacity: 0.2;
    }
    50% {
      opacity: 1;
    }
    100% {
      background-position: calc(200px + 100%) 0;
      opacity: 0.2;
    }
  }

  background: linear-gradient(
    90deg,
    transparent,
    rgba(0, 0, 0, 1),
    transparent
  );
  color: rgba(0, 0, 0, 0);
  overflow: hidden;
  background-size: 200% 100%;
  animation: waveAnimation 2s linear infinite;
  width: 100%;

`


const FavoriteSection = styled.div`
  //&:after {
  //  content: "";
    position: absolute;
    z-index: 999;
    top: -15px;
    right: -37px;
    width: 100px;
    height: 40px;
    background: #090B0F;
    transform: rotate(45deg);
    box-shadow: 0 0 15px inset rgba(255,250,5,.3);
    background: rgba(9,11,15,.8);
    border: 1px solid #FFFA05;
  //}
`
const FavoriteStarImg = styled.img`
  right: -45px;
  top: 15px;
  position: relative;
  transform: rotate(99deg);
`



const StyledMobileGameItem = styled.div.attrs<IGameItem>(props => ({
  // className: cx("w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/5 xl:w-1/5", props.className)
  className: cx("", props.className)
}))`
  cursor: pointer;
  z-index: 1;
`

export const MobileGameItem = (props: IItem) => {
  const {isMobile} = useBreakpoint();
  const [onLoad, setOnLoad] = useState(false);
  return (
    <StyledMobileGameItem className={cx("p-1 shrink-0 grow-0 basis-[33%] overflow-hidden w-[33vh] h-[33vw] rounded-2xl flex flex-col items-center relative", {

    })} >
      <div onClick={props.onClick} className={cx("relative overflow-hidden w-full h-full rounded-xl ", {

      })}>
        {!onLoad && (
          <Skeleton className={"rounded-xl w-full h-full flex justify-center items-center"}>
            <TailSpin/>
          </Skeleton>
        )}
        <img
          alt={props.name}
          className={cx("border-[#FFFA05] border-[1px] border-solid",
            "max-w-full w-full h-full rounded-xl hover:blur-[2px] ", {
            // "van-image": isMobile,
            "invisible": !onLoad,
          })}
          src={props.imageURL}
          onLoad={() => {
            setOnLoad(true);
          }}
        />
        <FavoriteSection
          className={"absolute top-[4px] right-[4px]"}
          onClick={(event) => {
            event.stopPropagation();
            props.onClickFavorite && props.onClickFavorite();
          }}
        >
          <FavoriteStarImg className={"z-[999] w-[24px] h-[24px] absolute top-[4px] right-[4px]"} alt={"favorite"} src={!props.favorite? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAsCAYAAAAacYo8AAAAAXNSR0IArs4c6QAACBlJREFUWMPtWWtsFFUUPrMIAvIQqUARiihQQKAqIKBUEBDwAUJQUHwRXioq+A4YIzVIMCRExGDAxAfRiAKSEJMS4qMKdfvYbbfb7sy2QEQFFdAgRv3hr/H7zr1D11VIgW1cjE1Odjoz99zvnvud1x2R//8a/3xX2vlJWeh78pB/UNqcG6D3yfm+69RAqnzPqYV84fvS4lyw9oMAG/ej+I3C4p5TD+vfn/3APcf1a2SVH5H7VGpljZ90KrMbdL2MA0W+8atkJkDPUKmSWVjMYTwbls3W3u7XyWsAe6tfKZPxO1mvE7LJ90JvZCu38wD8uB+TaQA7zq+W6wF+DGQ8qDMLdDkO2nTKQuChVX7C+RD0GAvgIwF8GEAP9ytklN5znU9Al8eyC3SJtIZFj8DadyOSjADgKwF2kAqvuZBaeQTv1CM0OtlEkzmwaDmsPApSAPD9AbaPCq8JvlKuxTv7/QYZnz3Ak04ETvkkLHyVAq2Q3vjNU4nrdX/I1Vjgary7LUsiCWjgOgcB+hq/XAYq6GrpDgt3U6mRS/DsMlxfoQ5LB66X7llg7dC7CHdrlM+1AEjQ1XIxrHuRypfSRcFH5XLIYITFD5BJl/8LdQi2vwHRIilTIA/Agj8rt8nncumhoGNyIa47qOyRTgo+jmfl0heLmA66fI+dehpyL2QCZBB0dT4jx9WKrh4Jw5W5ULIMllkLeR+TlIAKSQA8BvlDo4fneLi3B7IdYXCpHwZoAiNAgqauqLRV4TXv8Vml9NQFurIcut/G+GLoikC+gvyi+j3nW9yvxDw7sJsb8e4LWmXulVswxwXpPM21AxoUUAKDauUtONxq0OAZWGkuJpwCIKM13NHRuO1hOB2dj1QIQJcAaFja6O5QeJ0KPuB8WB12sNU1Aveug67x2LG78O4SzP0iMGzE/NuApwRC4/0Ao/ZLBb4ED0q1mqtCaGOtQaARuVGzX4VSYSh+C9TJKqSfTl4HC9IBK7DNUelIi/gHENNdaYX/W6rw2twz4KOSA8nVsdRBXdXq1AU6h0le1+vcxGCwzFFsXEBSnkotjmbC0vu0FK2Ue/DidMgkVVCDaME4zIhBjsbkUt3y3ZicfEYax/j2/i6ALrGgS+Q8f4u0UOG1uddaF0becwzHctH0izLoNHF/gOYBRijOTQzEQkxRWQyMtPjERuAo9LENu3RF5qVpumJuH7eSFglrMslTa3HSMCIGrZxKDVo4AO1LSCUAz2cBdTgmWMBu6Ap2gJGHBqpBPoghYRFDVGsfJjg0JaHX/+6cBOE6nwF8hZaiUZmowJlUymAJWjoIdYGV6XzpVi4C2CIF7agE/6dbn2NLoYP0IfhS6OYcTFack3OXA0MVDOkiGDDsYvEniyytsKp3tGupljt1uypQLNEKcZtYDEcNnwlgSxroAHC6FKVZPwC/D5Y3PpKrwEkXcp1zx2Q2ogsiTujlJoVKOOsKDPgOA+dojKbjkN9xG6cD4Nz6NNAn1RksINXyAXAag9EmrDwfog5agxhPTruy7DQzIkB7zk/g3mItT6ttOqdDkd/kaQDcPzXoNPAhHVOMsVy8SVZdrYMO0B2Oy3zM/SMMOO/MWzHPOYpVF6mTmtibd8LqOHpQqhhnbBpwvkuq0EmNn+ToTjIsxhC96uRRNVi93Ha2aX4gFB2Awg021vZRroe1Fmm0OqjSZOCkCa3NcsDFDjKeMxm5slQN1SCFmaq3u4HzUe0p46grXGt1hjQml6YCL7I04WJLU6wdkXzoXAn9h2DpIZktsA7DQklnJxxmqy1Tu9lM2LapdDkB3MT9DgDdRSOJq/Q4ANC9m6vTedZPhDZhsr5KF8ZzbnkQx08VDgOabLHRhIvm4pl04jIPBiltzk5nJ8A+oVtbrg7VWXluYnLLv6T5VEm9H0QTk/a721J3NCz+K59nHjQnNkcME2wf2VM5Sp4ftCmfli+2VWGJcr+1XhenPCNNyG8umosvhRGYcEiVBilojhYNPSOU19gWrVp6WY6a+ptWNNm0na3t26uYHWl8bmr1jrbI6qm7x6MMF7vpyfzmOF5bAuU7tHZmMjJ1Ra5andvOBfDXpO8cBWbifY7eC97ZY98hv7l4s3vDsaC1aEo2NINjOtsQy1faot/0lwxlBB80xiyUzL08BWWA5em9UttAM0umNtE0AsvYWnkYdIlmFjQjQhKJIY7CyzQVQ3SLOTEt7wEgr6u0hctXMAkceCbQzVRrgZavz8wJQC9Ls96aLU0XNAJ6bgbw3+kLGYwm7M5RdAWlLtM/rc7agiUvOU8ALEfjemK71bRZOLZIOB/BupPsmctg+25/HUsd1MXam7rpQ0kZmjngDbIISj/GRDfBWmO0emMxxEkZEWLgKPtR9qisM5Khdcioxmk9eUkb7YS8incLlRYcw7GmZB6pOqnbdT4F8AUZjCihzQC1/kQfag42C1XYk8ZRQXrOXsjn/5Sy2eDiWTGAfa0nXmbxhXYhY+1OTsWzNzHX+kyeex/CdjPx3K7gy8FHnn/H8cWBYJMAhL61CZFpKt7frycJHEsdEegi6KjcgTlW4HlZZkDXISVzqyNIy+xHK9HW8QghIZsB4Bis+fzpfFnTpOTJc5Y+7wHwbG0VI2gcqjSy/JaRj12YZBoAuphgERQvQNhap4dC9ThKQ4N7Vh8C6MTUFZdXYJCFFvhR7Ex+JizeFRMc8eucMj0m9pw6KL4ho9+NPCeh/E84MXVunDlm6sywByz/OGgxgzVLxpMb2zkYQ9tFJKb/9NfrPwENi3dLGITtbQAAAABJRU5ErkJggg==" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAsCAYAAAAacYo8AAAAAXNSR0IArs4c6QAABRxJREFUWMPtmV2IFWUYx3/PnDlnz66ZuSmU6JZe7EKhQYrWamRfoF1ZmFgRYYS2JHsXFSFEFKEXQVts4AdIF6lsXQTSJ9RFEIUsQl20hqKr1YrEVrvqnjNfbxdnZvad97yjK3sOHcKBhzk75zDze//zfPxnFq5v/4NN/cZD6hwTapRxNcraZlxDGg6tKHCW0yiW1A5wVpZyW6Ov4zRcitM8jWIJERACEV1qhM2tDw47CWPoJITtLZ0q6iQrgWNECBGg4hAiArplOadaU/GQPgKEAAgAP907ROxoScXVT8ynyB+ElOPcrsW0ROOE3CKr8FtLcZfnCSinSifhpdGJx5OtlyohOzPQnhbJcUVfS4Gr42wioCsFTICrxj5kjfqGu1pJ8b4U2IRNPtf+FlRjinTWxal+pBuHX/BwMqkRxMWp4h8W4nC5yAS3yhYu/reKC30ZaF1hW3jcQJFtTVNcjbAIWAosImIBinkI8wlYRsBiIhYS0EnIPDwcqlp+J/071BR3UsWT8BD+weFPhDFcziCM4jNJlXF8znOZUTxOyY76FpqCqzM8h2IXETcDHUQU0lut9+VkjJsdRC9KG7hY4AtaOHGItq/9VhFRIeICAe/IRgay4KepENGWAuqgkeE9wsxUzAL7FnBddUdbQBJifJeECxS1cAjlflzir2pbxBgRt+eCBha1barrxyOjQLFAirHXF5UAt8XnCRiennfJ5rEZh++IaE+7Qqh1iEBTOrSA29QOLarrC9BDTw8TWgEB5xlji7U41Qir8PiMgIUZo+Rr8Hng+nf6QiMDXuW0CNHSw9Wgy0CJk0ywQfqn3aVY+vJSChzF5466vDUXYaaMeXdCo7CjnAVIphhr0CWgA3AZpsqj8hIXrtoO1XFu4hKf4PFgpmPYFmACm7UQWZTPy/tCDFxKlf6aCo/L6/XDKr+Pf4tLwF4CtlGxGCf/CtA2eH0Bqs7yTud1Al3kCOd5RvbabfBVR746ymt4vEE1no7JBLQVoy1NbAtIwMVofdPQ78lu+mftVdQQWwk4SIW2zPg2C9TWOkNLvitDbTcuxBKKArtkgLcaZrLUR6yjyqdU6KRiuD8/J79t4OZAmlY6wOEFGeRAw92hOkAPHt8zRSdTmqGy9e/gKmqLltdlwOEp2c+h5rjDZZwCyqlqoZHbto6T106j9A1AkucTzbO1J+hF0ZEWV5ADndc+zQGlw7df25ORe03gJe6hYvEywRWGj5nf+sBRmYS9r3ng8HCdezRhI0vbMwsz8SWh1s8dVjYvVYQ1dZ7cVnzKMiFtvl5fZIGFajtdDQdXH7AaxY0Z8Dz/YTq/zIkMYD3K9DY+VdpZmxZXdIX2pnLAlWXUm09Vc7izGanyiDUlzOfJmt/4iyIv0sY2SlygpPnrgnFVXXGfdc0A7824OwzjX5t+ISX2U6RHDjEohzmI0E2JATrw47FeW4CrFWkiQmHmLXFmXuV97mYuw0wCk8BlYErry7UL/4BPv+zjmPUcT7AcxQAR69Me7mi+ey4wHzhJlxzmXGMUn6v9Hydxc8XUO4/h8qwMcm8eNIAM8bN8zAMU2EqZ32mPjVXReGheMLMCdWZYwuvrzH4bVYTdVOiWd/lwxrd4iCP8TQ8Oe2jHo6wtoAgspqdx4MLqjJNz+IIqK2QPr8jgtb9Kk6+4JEd4mSlW4PIlcyC9A7C6ceA+byJcQnGCKpvkVTbK2/w669doQ5yQfWygymPAMMI4IZ9zfWvB7V/tldAEmD/SNQAAAABJRU5ErkJggg=="}/>
        </FavoriteSection>

      </div>
      <div className={"basis-[20px] text-[#d7e8ff] block text-ellipsis truncate text-sm md:text-base sm:text-center w-full sm:text-center md:text-left"}>{props.name}</div>
    </StyledMobileGameItem>

  )
}
