import {environment} from "../../../../environments/environment";
import React from "react";
import useBreakpoint from "../../hooks/useBreakpoint";
import styled from "styled-components";

const FixedToolContainer = styled.div`
    width: 80px;
    background-color: rgba(119, 136, 120, 0.4);
    border-radius: 11px 0 0 11px;
    overflow: hidden;
    z-index: 10;
`

export type IToolbox = {
  showToolbox?: boolean;
  onClickToDownload: () => void;
  onClickToOpenTelegramManager: () => void;
  onClickToOpenTelegramService: () => void;
}
export const Toolbox = (props: IToolbox) => {
  const {isMobile} = useBreakpoint();
  const isShowToolbox = props.showToolbox === undefined ? true : props.showToolbox;

  return (
    <>
      {isMobile && isShowToolbox ? (
        <div className={"z-10 fixed right-[-23px] bottom-[68px]"}>
          <div className={"mb-2"}>
            <button className={""} onClick={props.onClickToDownload}>
              <img alt={"download"} className="w-[50%]" src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE8AAABPCAYAAACqNJiGAAAAAXNSR0IArs4c6QAADrhJREFUeNrlnQtYVGUax79znQuZptlle8rdtjW37X7ZbtvmY5utm2ubaChoqSRiaGaCVlqhpuWVMkxTEcFCRRiCUVOJLoqGlEGoIwxykZlhhoEZBpkBTXH2f3BGhgEMmGEO4Hme38MDyHDmx/t+1/d8EiLSFRlJ2Pxj5OHiAjJVW0aiNKeJslxH5ZSdpgxaHVWvr6DOGyqpizp8LMXnRWWUoaScylFrKKUa/z7vFJl6BD8vvA65Gq68n8kQXTGJMGhIhlFH2VTHKHNaKilctZIcmfEaSR8xgqTcey9JGDiQxErlZBNNkw3CR+Hze/D14fh+yAySvnQVdWR7KlWYdZwyq/WU7YSWysgppSO+w+v3KmGHDpEb9BBm1JA8TRFlS95OVKHTyP5bbiFx+PYGT7kZrzMJr7cpkVL9XELbftVReUc1dIQCv7fHSjv+C7mv4jSJN5aRul0Koh43ligZhmz0hrC2EF5/VABRxqZS6l90dN1PWjp+73FyX4+RdiKX/K2ilCi0RcQWHUWyvRVhHeUm/N6Fn1DZh0pp248aRrEX99VtpR08SK6DtLX6EmL7eAXJ6tePbBZDmjt9cR8LVlNZmRradlBLr/0S99mtxBXnkzHmclKuQHt2220kvjtIa9E24r4+SaJVh410+Z5CZozo0jJTSR9EWlyRilj8R5O07ijNneH+VNoeNW35RsvExeD+RRFXkEeGmHREpVSQggH9SWxPEOek3wASuyaVLvjOyKqSCnw8vClWkWcrtcS88F1yoCdJcyc0kjrwTQVjVqjJsz4Rp1GTQF0JsQZg6NGTxV1O4wBKuVvLWL8qZQK7VFxpPgkuO0Vqhz5NdvYGcU4eGkp2flXG1CYXM8FdIw4RJ4h77O9kR28S5+Tux8gOBQQmejsC1WjjtCWUtbdFnDsPIAKTtaw1Qc16pw3MQ6+q11Lm3tLG/R7D0AamGFlzrKe9cCrGQYZyonqvh/eqHeWVhcyB5CpOtSzTg3FgGQbAKRjHXU3inCxSsgUJ5Vxcp8TlY8qVf5Ky9O9hA2Bv0QcD6ZhTrGVzcQencsIkv7yc0o/uIVOuruJJTOW2VbH6DzuymFCM1ZHtO4jqahbn5C0Fq4rVc2vbJS4X617FpZRNjNWRvn1IzI5tRKUpo85WGKkGPdABLSjUUucSUqj8/gN824xcDw+b9Zxt9Yl2rAeWlBHF8pUkS4y/8vYEcqKykrJXAD3QAQ04XUXZS6poexFISKPUvr6vyR8zWTEVvOKK4n7B0nl+MWUTayGz9DR2zRzStI3SaHspKAangNpE21UV9AWa8e19+cHHei1nW3Wca3tJ/5SGxK/4mGSL1b5oK6gLgrQyRJqrtEJQAHEnwQkg9yObfB590Wz255VcfKvi9mG3qUhL1d0s0p6DwGnIc01Rd2nHwa8mRhR518HL+kquLrK1Xbn8UhKxPcX37YkrxUjJIpcUzRfS1CEtD9JywS9mceQJhO/m1NF6NqKFvELsd/qLPH8tNNIX1FWXpJ10SDsGYUK05YCjEPeTiPIeG0cpo6v4vGbihJ32PHQUXb2v+nuchDxnih5zpGiOI9oEadngRxHloaPaGKXjbZF5fNOiwTGUKmzZQYk+KD4Gee4p+rNDWhY4DDKrGbtUJHkCYQpOtVovaUpdodZDKFkQW15uJX0h1y1Fjzii7RCkHaxm7T8AMeUNDWP2r66SZFyuVjppoG1i9rJOjlYyF466pejh6kvRdgDSvgffiiyvHzxFmXnbUKE6KxNlWpmoNuoO88hsyGueomyjtB8c0jLAfou48gQWFvLmyHzuYZJVQIdsTaMKu4O8w1XMhaYUZRqlfeeQlg72QdzX3UBe2Ndc4aLTXAjJ0dJRkah36w7yMiHvoFuKfuOItr1gD9hl4UTrbZ2MWcMeWVopiSJHUWk5eQaV7usbCHqNSg9fTmWFr6Cy5qxgsj6Ip/NcpTlT1Bltu4ES4lJrOPv8RPZE8Eoma4qDUbOZDKEQ0lf3/vTrTPoHRl5Jcgx0zjBUXPpUHP5YWY4OIdPc1IteTlE3absc0r4CySAJJILtZzh7AvjiDG8fs4D53lf3f9dIKmVJtSSHZGtpwxCUrPpS3tgQat8hc/N2rfUUZe1plkvSFK7Sai5J+xLStoI4MGoe862v7v8P99MJiyqlBvKTnqnvP9D3+xQrk+iTbbVrrima4oi2nWAH2FbTXFoseHsvd4r4MG394GuhWVJPjlYx54WiaV/L4yRkU8xhRts8RbkW0ppHG9+YovFgC9hcy9uX5nAG9L4xPr13+FpUKz1PjpqYi75sbF0ZcBPZ8mU+U+3sRdNqWk/RbY52batDmhBtMRAXVcLVXP8nEYop4WuRTXqRZIsUeU4GP0i2JerY+vamqCBtI4g28mcH/4NKFOOehch7X4i8QyK1ec22+EZTqYkm7oJTWlspuglsAJ9Z+IbHJ1C7xLpfvxtI7HyLtJ58r6MNg33c27aGfwTz7Y4z3EV3aUK0bXJE2+dgvVVy8YVI9gcx7/VG9LZvVaG3PVhB5zzl43Fem5Wan7NHW0tRQdq6Won9MxAcz+WKfZ+DMc572yLLIRk6RjlehBlGWw3xOxh2uKboeiFNIS0ahH/PFft656w1Hn2DSY+olChJRjkbFbG6e8xtBYRhxwe5nMEZbWvBp1aJ/b0TnFHeTZ7teO5T7ki4CXNbZTEzdY2S9uqqyv1PUztnRTM/hcfSuXPAm5vp3AkLmYN9+rfvzQvDj2Ul/BlB2idgiYavveEv5Iv2/Czfl8T8E23iqK1czsitfO7zYPgG7udBz1HJ3np/4/bxhTPLpVNJEtbzdqoYr63njZxG7U01sw2tDT0+y+fM17azZ78Dw5ClkLZUx1vvfIZKaq+40HypMaJeZp8DZoNZ4HUQVi9reDCCzfDGe5xeLDVPK8J6nrCSvN/I2AZ6aSV5Sz5rTmljLir0ohOXM4c7sOGyoSNt3FPvsz+EQ9Sb4A2HtBlnZfbXzsrtoWCSQWb1uPTsVhI3u0Z6aSVZuPbo2YzRoZRX9jCSzFzDlSbws7Cc1FVt0X/iuJw3HNE2U4g2CJsOpoGpIBhwfTybyj0wg90/q1qa0VQ+q2EjluC5LG+8gUQL13Cl2cHrO7tO3r/j+Vx3aSHgVTBFiLxzkNfPM3kvpvGqsApZ0+5ZLIq2k8tYr+zbJkBei9nBmaahx+xdXJdVJYxMlhx3pqi7tJfBxHN+HskT9m2nG6S2SQV882Lv1Aoubxh2xD19A1tr+Ib4Nge6vDD0uLhYzZsiT/Km98G7+bxpPngHzANzQTiYU8CbZoNZBVLT62AGCFNLTaEgBEwFwWAymAReKZKZQutkDa4pOhnCXmmUJrcHQdx4D+UNCWKUYRZpXotyiyQdG/GhkvU4KrZAnrs014HuGgw9PgarwUqwHHxkk9qXgg8AVivskeC9Oqn9XfAOeLtOZp8H3HvRmZd60Rbtmmu0TYCwQDDuNz/7S795Ju/FvRJ1SKWsZa3KOlT/JFewdZ72ujFn+Iam2YGkTWkrHNI+BEvAYrAQvO+QNt9NWrhD2uVetL6pF72coudcpckbpQnRJkgbC/w9kOeHXnZ6taxu4q9tnF2QqOfiw9YwHtXnfY7Ic58dCAPdKLDKIW2ZTdJMWmO01V2KtvmN0SazvwXmOqS96SYtzCFtmkNaWyka4CLtRfC/366xM307J2/YOi47pFoW32Zx43pUPm7VsDY/D6ZBq7S8tVFaB1N0gUNco7QOpKhTWmspOgaMbpTmZ38BjLT6nevMe+LhI7hCZptQwF35sIcvDKwiBDW4nZU3LYk73pa0Dx3SrpiidS2ltTdFx51rkuaMNkHaC+evaeSJdGmn2vSnormsV00yxe8WdEej6juunLNd38lq+AGDSPziUr6mKUVbb9dapGhdKykKSe7SmqeoX1OKnnNP0SZpAiMq5dZr7qK/6PCMAu9nSpXMNr6Qb9/pGMJzB/Pw/EGn9yYwsZ+axp1cXCU52yxF65pS1FVahEPabIe0tmYHrika5EjRgHOtp6hTmpCqQsR1RlzjrEUpUU0yy9r3HIZwCU+8xFXx+sfHUh4/AcRjOiTt2xK+I/RrgusAne0cnNz+EpMWbJWXP5/XweNE1uKZq7VFnKXPgKvz2TMp3neQRmoJ0so6d4zIBj0XN3cXe1U+9Thir6RgolneuacehWsunjfdaOJVY/D86dUk7pEl3IHJtXLVqEwPz11ZiUnwOhNvfswL896ewB2BjPLlM3KzfwnvnfNWVhazz36i561DhlG9+oyBm/H+gkwy61idxLvnrKzW8IGrdXztnx+ne+XpFjc+Se8INMpqxxlkXXO+yjINF7wCAu/sZREoRNz4RnHyrjlXxXl9hAhcbuCtj/SSNvB2rNEFIlW7LOLcr4VoA5ebefPzi9ge3Qs/iF41CJ2D19u437si0Qsvs0hU03ZzBX49bCDN436fxThugtVP5bVetaPXFIyDFlfwcQtKJZb7vDCV8wV/xJRrrEZuCcAA+MlMkc7Pc70WnObHLLJI9a98xan6DeqeJzf6DaLjn8EkP8jqpx/b2SlXV13TMXl+1yhZu8AosY38lMuSdpO6EmEh89FoPmucSW5DtK3t8CTfl9dsrHvNr5Io5ukh8TMu+9pbxXmmTY7f+/g6PjvAiLW4arniv+1dj+sO10wsWb9llsbPNUvrAvfw6rsx7aG7+Hle4fWFocfwfVJ1kEVeF1gji3+xmOs55yS7X6HYbZpTIZs7p1qaNwsbxv7YcX8IJQt9vBSRwq7WX/F6/0J7hhmCDUOPvACzLGL4rz34hO7WrhAMb2aiVEGo9ZiFYpmpqDYag3KtYah3e+ANNv32kUzK9ShZlaPmlxGKzFHsKHyU4nPh64Pw/Xtms+lPRHNHRqRLCgNKZeaXrdiYscgyxmM/1b+A711nw7d1CVVGU1Cm9apGGoL90KhQs0w5vUaWg+09Q8gZWT12/89jCf5iSJ38fDA+n4yvY5ko5+VqmXIi/n1AuTzEv0j+8FAR/1eC/wMxhbydzArHyAAAAABJRU5ErkJggg=="}/>
            </button>
          </div>

          <div>
            <button className={""} onClick={props.onClickToOpenTelegramService}>
              <img alt={"telegram"} className="w-[50%]" src={`assets/${environment.assetPrefix}/icon-34cdd0f9.png`}/>
            </button>
          </div>
        </div>
      ): isShowToolbox ? (
        <div className={"fixed right-[0px] bottom-[68px] text-white w-[100px] flex flex-col p-[10px] z-20"}>
          <FixedToolContainer className={"flex flex-col justify-center items-center px2 py-3 mb-4"}>
            <div className={"text-xs font-light"}>Download</div>

            <button
              onClick={props.onClickToDownload}>
              <img alt={"download"} className="w-[40px]" src={"data:image/png;base64,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"}/>
            </button>

          </FixedToolContainer>

          <FixedToolContainer className={"flex flex-col justify-center items-center p-4"}>
            <div className={"text-xs font-lights mb-1"}>Contate-nos</div>

            <div className={"mb-1"}>
              <button
                onClick={props.onClickToOpenTelegramService}>
                <img alt={"telegram"} className="w-[40px]" src={`assets/${environment.assetPrefix}/icon-34cdd0f9.png`}/>
              </button>
              <div className={"text-xs font-light"}>Serviço</div>
            </div>

            <div className={"mb-1"}>
              <button
                onClick={props.onClickToOpenTelegramManager}>
                <img alt={"telegram"} className="w-[40px]" src={`assets/${environment.assetPrefix}/icon-34cdd0f9.png`}/>
              </button>
              <div className={"text-xs font-lights"}>Gerente</div>
            </div>
          </FixedToolContainer>
        </div>
      ): null}
    </>
  )
}
