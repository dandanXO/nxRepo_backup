import styled from "styled-components";
import cx from "classnames";
import { useNavigate } from "react-router";
import { PageOrModalPathEnum } from "../../PageOrModalPathEnum";
import {environment} from "../../../../environments/environment";

export type IInitialChargeModal = {
  close: () => void;
  onConfirm: () => void;
}

const Container = styled.div`
  //width: 100%;
  //height: 100%;
  background-image: url(assets/${environment.assetPrefix}/pop3.8f1838c0.png);
  background-size: 100% auto;
  border-radius: 20px;
  padding: 20px 24px;
`;

const Item = styled.div.attrs({
  className: "relative w-full flex flex-row justify-between text-left item-center",
})`
  //width: 94%;
  //position: relative;
  margin-bottom: 16px;
  margin-top: 10px;
  background: linear-gradient(180deg,#004EFF 0%,#00ACFE 100%);
  box-shadow: 0 2px #0148f9, inset 0 1px 3px rgba(255,255,255,.5);
  border-radius: 8px;
  padding: 10px 20px;

  text-shadow: 0px 1px 0px #042A85;
`

const MoneyButton = styled.div.attrs((props) => ({
  className: cx("flex flex-row justify-center items-center", props.className)
}))<{
  className?: string;
}>`
  position: absolute;
  right: -10px;
  top: 36%;
  width: 104px;
  height: 29px;
  background: #FF3F20;
  box-shadow: 0 2px 4px rgba(0,0,0,.5), 0 1px #880c00, inset 0 1px 3px rgba(255,255,255,.5);
  border-radius: 6px;
  //display: flex;
  //justify-content: center;
  //align-items: center;
  color: #f7fe00;
  line-height: 21px;
  text-shadow: 0px 1px 0px #7D0403;
  //margin-top: -15px;
`

const EarnButton = styled.button`
  background: linear-gradient(180deg,#004EFF 0%,#00ACFE 100%);
  box-shadow: 0 2px #0148f9, inset 0 1px 3px rgba(255,255,255,.5);
  border-radius: 24px;
  transition: all .1s ease-in-out;
  padding: 10px 20px;
  flex:1;
`
const InviteButton = styled.button`
  font-size: 15px;
  display: block;
  background: linear-gradient(180deg,#FF1515 0%,#FF7F2F 100%);
  box-shadow: 0 2px #880c00, inset 0 1px 3px rgba(255,255,255,.5);
  border-radius: 24px;
  letter-spacing: 0;
  transition: all .1s ease-in-out;

  padding: 10px 20px;
  flex:1;
  margin-left: 16px;
`

export const InviteBonusModal = (props: IInitialChargeModal) => {
  const navigate = useNavigate();
  return (
    <div className={"z-[999] fixed left-0 top-0 right-0 bottom-0 flex flex-col flex justify-center items-center w-full h-full bg-[rgba(0,0,0,0.65)]"} onClick={(event) => {
      props.close();
    }}>

      <Container className={" w-[340px] w-min-[80vh] w-max-[400px] h-auto bg-[black] rounded-2xl text-white flex flex-col items-center relative"} onClick={(event) => {
        event.stopPropagation();
      }}>

        <div className={"flex flex-row justify-end mb-2 absolute right-[20px] top-[20px]"}>
          <button onClick={() => {
            props.close();
          }}>
            <img
              className="w-[20px] h-[20px]" alt={"close"} src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAAXNSR0IArs4c6QAACupJREFUeF7t3Wty1DoQhmFpJ2QlkJUcWAnJSggrIawEdqJTnfKAmYzHul+636mi8gNLsb7WY9njGcc7XiRAAocJeLIhARI4TgAgzA4SuJMAQJgeJAAQ5gAJ5CXACpKXG62MJAAQI4VmmHkJACQvN1oZSQAgRgrNMPMSAEhebrQykgBAjBSaYeYlAJC83GhlJAGAGCk0w8xLACB5udHKSAIAMVJohpmXAEDycqOVkQQAYqTQDDMvAYDk5UYrIwkAxEihGWZeAgDJy41WRhIAiJFCM8y8BACSlxutjCQAECOFZph5CUwJJITwwTl3+ffbOSf/nPf+7SevtRO4UV8Z0O8Z6zsNkBDCZ+fcR+ec/Dx6vTrn5N9P77385LVIArv6ftoOfrf2XGoqB8Hvs4AZDiSE8NU595RRZwnzGSgZyXVsssGQGssZQcprivoOAxJCkCPJj5TEDrYVXN9nXJ4rjG3ZLrb6fsuAcT1mgfJlVH2HAClYNe6deg0LcdlZ3GjHKx78Lnsop12PI5B0BxJCkKPKveuM3LINCzF3hzW2206ppMYtXg+9kXQF0jg8KQhIWkzLyD411rcbkAbL7lHZQBI5oWtu1gHHkNOtnkB+Vbhgi60pSGKTqrBdRxyXvX3y3j9X2PXTLroAaXBRfjowTrdiIirfZgCOy053uR7pBaTn6rGvOitJuYHDHgbikH3qsoo0B7J9rECAjHqBpEHyg3HIiF69948NhvZPlz2A5N4przl2kFRMcwIc3U6zegCRu+Vy13z0CyQVKjARDhmN3Bx+qTCswy56ABl1/XFr0CApmE2T4VADJBTUpEVTkGSkOiEOGcWL9/5LxnCim/RYQWYDIuGAJHqKODcpDjVAZjrF2k8LkEQgmRiH7H3zt3p7rCCzAmElOQEyOQ41QFp9ejfi+Be1CSvJjZgWwCF7LR+Bb/rN0h4riHy0vdXHn6MERGwEkl1Ii+CQZxQ0n7/Nf8EEd9IjfLxtAhI39QX5dR3lIQ8PscXN3a45ENmxEMLM1yFcuG8JrLJybLvb/AJdfk8vILW+f557IEhpZ3IlWQxHl9WjG5BtFZn9Yt3sSrIYDqlT84+YXCZDlxVkAyKPfZHPZaU+/iXl6F9zWxMryYI4unyKtzuQDYm8o5XzjKSaEz+lL9VIFsTR7dRqCJANyQwffzePZEUcIx790+0Uaz8jB30FNwXFu7cURxSnZIfvtV0Uh1x3NL0peCuzIUBYSVpN/fN+wXGe0X6LYUBAklaoGluDIz3FoUBAkl6w3BbgyEtuOBCQ5BUupRU4UtL6d9spgIAkv4BnLcFxltD9/58GCEjKCnmrNTjKM50KCEjKC3rpARx1spwOCEjKCwuO8gwvPUwJBCT5BQZHfna3Wk4LBCTphQZHemZnLaYGApKz8v39f3DEZ5Wy5fRAQHJeTnCcZ5S7xRJAQHJcXnDkTv24dssAAcn7goIjbpKXbLUUEJBwzVEy2XPaLgcEJEs9mucyJ+WbmUO+z5GDYt9mSSCWkXBaVTrl09ovC8QiEnCkTe4aWy8NxBIScNSY7ul9LA/EAhJwpE/sWi1UANGMBBy1pnpeP2qAaEQCjrxJXbOVKiCakICj5jTP70sdEA1IwJE/oWu3VAlkZSTb35Sf/Q8O7efhsjcBYzCpBbIwklUe7i0Rq8YhA1QNZFEkMQe2GbZRj8MEEJA0sWQChxkgIKmKxAwOU0BAUgWJKRzmgICkCIk5HCaBgCQLiUkcZoGAJAmJWRymgYAkColpHOaBgOQuEvM4ALLNjwX/ZmLU4b9gI3Bs4am/kx47SUDyJylw7CYNQHZhgET/Z6tiD5iX7QBylZhhJKwcN/QA5EYoBpGA42BpAchBMIaQgOPOeRdA7oRjAAk4Ti5KAHISkGIk4Ii4YgdIREgKkYAjou7cKIwMSdkdd3Ak1J0VJCEsBSsJOBLqzQqSGNbiKwk4MurNCpIRWghBHsvzOaPpyCby9zleRu7Air8bIIlVW/ChbpcRygry6L2Xn7wiEwBIZFDb6ZWsGis91O16dCBJqDfXIAlhLbxygCShztebsoJEhKcIB6dbEfXebwKQk8AU4gBJAhKA3AlLMQ6QRCIByEFQBnCAJAIJQG6EZAgHSE6QAOQqIIM4QHIHCUB24RjGAZIDJADZggHHnxnCzcQdFoA458Dx7vAJki0S80DAcXgCDhILf4Lt3psU4Dh9n9M8ErMrCDhOcXDhbnUFAUc0DvNIzK0g4EjGYRqJKSDgyMZhFokZIOAoxmESiQkg4KiGwxwS9UDAUR2HKSSqgYCjGQ4zSNQCWRDH23OrnHMfnXNPzad2vV+g+maiSiCr4vDev8q8XfAJjmqRqAOyOo7LgR0k9Za4kp5UAdGCAyQlU7puWzVAtOEASd2JntubCiBacYAkd1rXa7c8EO04QFJvsuf0tDQQKzhAkjO167RZFog1HCCpM+FTe1kSiFUcIEmd3uXbLwfEOg6QlE/6lB6WAgKOf0vLzcSUqZ637TJAwHG7wCDJm/ixrZYAAo775QRJ7HRP3256IOCIKypI4nJK3WpqIOBIKydI0vKK2XpaIOCIKd/7bUCSl9tRqymBgKOsyCApy2/fejog4KhTXJDUyXEqIOCoU1RuJtbLcRog4KhX1H1PrCRluU4BBBxlRTxrDZKzhI7/fzgQcOQXL6UlSFLS+rvtUCDgyCtabiuQpCc3DAg40otVowVI0lIcAgQcaUWqvTVI4hPtDgQc8cVpuSVI4tLtCiSE8Mk59yNu16bY6u1xoJcnHk6xRxV3AiTnYXYDEkL44Jz7db5L02yhGsfCNxPlucXfvfdSn+avnkBk5ZAVZIWXCRwLI5FV/aXHROoCZLHVwxSORZF0e1h2LyCrrB4mcSyKpMsq0hzIQquHaRwLInn13j+2Ps3qAeTrAn8QBhy7mbbQu1sPrS/WewCZ/fQKHDcOw4sgaX6aZR0IOO6coyyARAWQ0Po8MbN/cEQENzmSF++9/F3HZq8eK8iMQMCRMKUmRqICiNw9l7vos7zAkVGJSZE8ee+fM4YT3aTHCjITEHBET433G06IRAWQWd7FAkcBjknvk6i4SJ/hPgg4KuCYDYn3vvkZUPNfMMFH3MFREcdESH577x8aDO2fLpsDkd8WQhh1HQKOhjNo8DVJ8+sPia4XkBGnWeBoiGPwStJl9egGZMAqAo4OOAYi6bJ69AYi90LkHa3W90TA0RHHACTdVo+uQLZVpPWpFjgG4OiIpCuO7kAaIwHHQBxXSD43OlN47P0AjS4X6dd12979qBlily/PTDD/ltiF7dFOcrZQ63R62MFvCJBtJZEHOHyrEGLzD6wtMSsn28ntm6Q1rjmHHvyGAamwJL865557L7mTzcPpd6dgNZmivsOB7KDIinJZlo+WZnnUy0/nnBxVujwXafoZuMgObp+o+G979NO9Uy+psTz3SoAMf00DZJ/EtjzvQ5R3LwAxfLrU2YGV6jslkDploBcSKE8AIOUZ0oPiBACiuLgMrTwBgJRnSA+KEwCI4uIytPIEAFKeIT0oTgAgiovL0MoTAEh5hvSgOAGAKC4uQytPACDlGdKD4gQAori4DK08AYCUZ0gPihMAiOLiMrTyBABSniE9KE4AIIqLy9DKEwBIeYb0oDgBgCguLkMrTwAg5RnSg+IEAKK4uAytPAGAlGdID4oTAIji4jK08gQAUp4hPShOACCKi8vQyhMASHmG9KA4gf8BPQ3tFENJKXoAAAAASUVORK5CYII="}
            />
          </button>
        </div>


        <img alt="title" className={"w-[269px] h-[27px]"} src={`assets/${environment.assetPrefix}/title3.274f5fbe.png`}/>
        <div className={"text-white text-sm"}>Bônus de primeira recarga para usuários convidados</div>

        <div className={"w-full"}>

          <div className={"flex flex-col w-full mb-2"}>
            <Item>
              <div className={"left flex flex-col"}>
                <div className={"font-bold text-sm"}>Convidar 1-10</div>
                <div className={"text-base text-sm"}>Prêmio</div>
              </div>
              <div className={"right"}>
                <MoneyButton className={"money-button"}>
                  <img alt="money" src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAASCAYAAAC9+TVUAAAAAXNSR0IArs4c6QAAAuNJREFUOE991EtonFUYxvHf+WYmk05S0+k0tlHbhlaqFQTtBaRCwS6q1lt1JYIUuhPcKAi6UHSnCwXtSsGF4sKFoLvebKW0RYubLqLpzdSY9GKaTJo2maQz/b4jM1N7CeI5HA4ceP6H93kvwf+s+L7Eix7S40ksdsgnYYeJ+ZIw/yH+aKk1tijaquAJHVYIrU3drw56Nrxk7HbdTUj83WaLfaRkvY6kYG4RJ3MM1/m7xrJung/Ulx93tL4tPDV44V/QLcglRxQXPe5IJ+dSZqpUUroQkceCe9m0k2xgwME928L22ZEmqAWJX6l4xWg8/EBnGD/JXTeEyY2/shuQ5l3rYWsXaXXQ4bmnwzOG25DTXnB/4Qf7+ll62vVekpRklpaNc7jWBOBKE5iwPWPGCUdtaUPG7YqlNa+H3Wd5tKF6msnzdK1k2QqcQ4lYIA6SXMLdWI6cD0MkcdWA4dVrDf3BZtIxcnNkgZgnmeTiOLkclX5yR4iRUMGUsyF+r99zzjhWycXuCfU+hg+waguTQzhFV5nOe5gdZbJG7xSFDpIlOGZ/iH/Zqa/zS7tL4tqq2iwLLjJdpnsh4TiXq6T9lFeRnSI32g4vKbYgb4X4m4/15d90vGR0+IridXoXMN1J92OkJ0hyXJthokrfWrKD5Mqt1EZD1of4rg9s8p5FZCOEM4Q8M3OcL7VLpbiVQo18D2M/U56g2IvLLrjqvhDfVpba6xEbm4UVx9s+pE1js/Y530V9JVODLJ+mso7iauzzTfjMq+0Uv6MitceDNjRjTUdpnCFrkEWmlhBr9PTSsYKOVYTpFmRH+NTXt8r+DYtFez1sQ1zItT/JauT6yPeR9BLKxJRsmPCTNJnTH3YZvaOLYxPUsNdGGzTTtxDdNMaYHSI7Qe6SsY68w8WSb8PnvrvZO7e3dQtUs7++2rq0SmPEeFp3tJR3oFhwSKfB8IXGf46CO0CvKat5Wd4vcgbmi+bPoH8Adc4S7UClmikAAAAASUVORK5CYII="}/>
                  <span className={"money-value"}>10</span>
                </MoneyButton>
              </div>
            </Item>

            <Item>
              <div className={"left flex flex-col"}>
                <div className={"font-bold text-sm"}>Convidar 11-24</div>
                <div className={"text-base text-sm"}>Prêmio</div>
              </div>
              <div className={"right"}>
                <MoneyButton className={"money-button"}>
                  <img alt="money" src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAASCAYAAAC9+TVUAAAAAXNSR0IArs4c6QAAAuNJREFUOE991EtonFUYxvHf+WYmk05S0+k0tlHbhlaqFQTtBaRCwS6q1lt1JYIUuhPcKAi6UHSnCwXtSsGF4sKFoLvebKW0RYubLqLpzdSY9GKaTJo2maQz/b4jM1N7CeI5HA4ceP6H93kvwf+s+L7Eix7S40ksdsgnYYeJ+ZIw/yH+aKk1tijaquAJHVYIrU3drw56Nrxk7HbdTUj83WaLfaRkvY6kYG4RJ3MM1/m7xrJung/Ulx93tL4tPDV44V/QLcglRxQXPe5IJ+dSZqpUUroQkceCe9m0k2xgwME928L22ZEmqAWJX6l4xWg8/EBnGD/JXTeEyY2/shuQ5l3rYWsXaXXQ4bmnwzOG25DTXnB/4Qf7+ll62vVekpRklpaNc7jWBOBKE5iwPWPGCUdtaUPG7YqlNa+H3Wd5tKF6msnzdK1k2QqcQ4lYIA6SXMLdWI6cD0MkcdWA4dVrDf3BZtIxcnNkgZgnmeTiOLkclX5yR4iRUMGUsyF+r99zzjhWycXuCfU+hg+waguTQzhFV5nOe5gdZbJG7xSFDpIlOGZ/iH/Zqa/zS7tL4tqq2iwLLjJdpnsh4TiXq6T9lFeRnSI32g4vKbYgb4X4m4/15d90vGR0+IridXoXMN1J92OkJ0hyXJthokrfWrKD5Mqt1EZD1of4rg9s8p5FZCOEM4Q8M3OcL7VLpbiVQo18D2M/U56g2IvLLrjqvhDfVpba6xEbm4UVx9s+pE1js/Y530V9JVODLJ+mso7iauzzTfjMq+0Uv6MitceDNjRjTUdpnCFrkEWmlhBr9PTSsYKOVYTpFmRH+NTXt8r+DYtFez1sQ1zItT/JauT6yPeR9BLKxJRsmPCTNJnTH3YZvaOLYxPUsNdGGzTTtxDdNMaYHSI7Qe6SsY68w8WSb8PnvrvZO7e3dQtUs7++2rq0SmPEeFp3tJR3oFhwSKfB8IXGf46CO0CvKat5Wd4vcgbmi+bPoH8Adc4S7UClmikAAAAASUVORK5CYII="}/>
                  <span className={"money-value"}>15</span>
                </MoneyButton>
              </div>
            </Item>

            <Item>
              <div className={"left flex flex-col"}>
                <div className={"font-bold text-sm"}>{"Convidar > 25"}</div>
                <div className={"text-base text-sm"}>Prêmio</div>
              </div>
              <div className={"right"}>
                <MoneyButton className={"money-button"}>
                  <img alt="money" src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAASCAYAAAC9+TVUAAAAAXNSR0IArs4c6QAAAuNJREFUOE991EtonFUYxvHf+WYmk05S0+k0tlHbhlaqFQTtBaRCwS6q1lt1JYIUuhPcKAi6UHSnCwXtSsGF4sKFoLvebKW0RYubLqLpzdSY9GKaTJo2maQz/b4jM1N7CeI5HA4ceP6H93kvwf+s+L7Eix7S40ksdsgnYYeJ+ZIw/yH+aKk1tijaquAJHVYIrU3drw56Nrxk7HbdTUj83WaLfaRkvY6kYG4RJ3MM1/m7xrJung/Ulx93tL4tPDV44V/QLcglRxQXPe5IJ+dSZqpUUroQkceCe9m0k2xgwME928L22ZEmqAWJX6l4xWg8/EBnGD/JXTeEyY2/shuQ5l3rYWsXaXXQ4bmnwzOG25DTXnB/4Qf7+ll62vVekpRklpaNc7jWBOBKE5iwPWPGCUdtaUPG7YqlNa+H3Wd5tKF6msnzdK1k2QqcQ4lYIA6SXMLdWI6cD0MkcdWA4dVrDf3BZtIxcnNkgZgnmeTiOLkclX5yR4iRUMGUsyF+r99zzjhWycXuCfU+hg+waguTQzhFV5nOe5gdZbJG7xSFDpIlOGZ/iH/Zqa/zS7tL4tqq2iwLLjJdpnsh4TiXq6T9lFeRnSI32g4vKbYgb4X4m4/15d90vGR0+IridXoXMN1J92OkJ0hyXJthokrfWrKD5Mqt1EZD1of4rg9s8p5FZCOEM4Q8M3OcL7VLpbiVQo18D2M/U56g2IvLLrjqvhDfVpba6xEbm4UVx9s+pE1js/Y530V9JVODLJ+mso7iauzzTfjMq+0Uv6MitceDNjRjTUdpnCFrkEWmlhBr9PTSsYKOVYTpFmRH+NTXt8r+DYtFez1sQ1zItT/JauT6yPeR9BLKxJRsmPCTNJnTH3YZvaOLYxPUsNdGGzTTtxDdNMaYHSI7Qe6SsY68w8WSb8PnvrvZO7e3dQtUs7++2rq0SmPEeFp3tJR3oFhwSKfB8IXGf46CO0CvKat5Wd4vcgbmi+bPoH8Adc4S7UClmikAAAAASUVORK5CYII="}/>
                  <span className={"money-value"}>20</span>
                </MoneyButton>
              </div>
            </Item>
          </div>

          <div className={"flex flex-row justify-between items-center text-sm"}>
            <EarnButton className={"text-sm"} onClick={()=>props.close()}>Ganhar dinheiro</EarnButton>
            <InviteButton className={"text-sm"} onClick={() => props.onConfirm()}>Convide agora</InviteButton>
          </div>

        </div>

      </Container>
    </div>
  )
}

