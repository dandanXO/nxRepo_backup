import {useEffect, useState} from "react";
import styled from "styled-components";


const StyledSendSMSCodeButton = styled.button`

`
{/*Enviar*/}
{/*Esquerda 120s*/}
{/*Reenviar*/}
type ICountingButtonType = "ready" | "counting" | "finished";
type IProps = {
  onClick: (isCounting: boolean) => void;
  valid: boolean;
  className: string;
}

export const SendSMSCodeButton = (props: IProps) => {
  const [state, setState] = useState<ICountingButtonType>("ready")
  const [secondState, setSecondState] = useState<number>(120)
  let strState

  useEffect(() => {
    let countingDownID: any;

    if (state === "counting") {
      if (countingDownID) {
        clearTimeout(countingDownID);
      }
      countingDownID = setTimeout(() => {
        if (secondState > 0) {
          setSecondState(secondState - 1)
        } else if (secondState === 0) {
          clearTimeout(countingDownID);
          setState("finished");
          setSecondState(120);
        }
      }, 1000)
    }
    return () => {
      if (state === "counting") {
        clearTimeout(countingDownID);
      }
    }
  }, [state, secondState])

  if (state === "ready") {
    strState = "Enviar"
  } else if (state === "counting") {
    // strState = "Esquerda " + secondState
    strState = secondState + "s"
  } else {
    strState = "Reenviar"
  }
  return (
    <StyledSendSMSCodeButton
      className={props.className}
      onClick={() => {
        props.onClick && props.onClick(state === "counting");
        if (!props.valid) return;
        if (state === "ready") {
          setState("counting");
        } else if (state === "finished") {
          setState("counting");
        }
      }}>{strState}</StyledSendSMSCodeButton>
  )
}
