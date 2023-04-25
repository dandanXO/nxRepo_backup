import styled from "styled-components";
import IoIosArrowBack from "@react-icons/all-files/io/IoIosArrowBack";
import {useState, memo} from "react";

const WebviewContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  background: #F6F6F6;
  width: 100vw;
  height: 100vh;
`
const WebViewHeader = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  //background: #ffffff;
  height: 40px;
  //border-bottom: 2px rgba(0, 0, 0, 0.1) solid;
  padding: 8px;
`
const StyledIframe = styled.iframe`
  width: 100vw;
  height: calc(100vh - 56px);
  //height: 1000px;
  border: 0;
  position: fixed;
  top: 56px;
  background: #ffffff;
`
type IWebViewModal = {
  url: string;
  onClickBack: () => void;
}
export const WebViewModal = memo((props: IWebViewModal) => {
    // const [loading, setLoading] = useState(false);
    const onLoad = () => {
      // console.log('onLoad')
      // setLoading(false);
    }
    return (
      <WebviewContainer>
        <WebViewHeader onClick={props.onClickBack}>
          <IoIosArrowBack size={25} color={"#000000"}/>
          <div style={{ padding: "0 8px", fontWeight: "bold"}}>
            Back
          </div>
        </WebViewHeader>
        {/*{loading ? (*/}
        {/*  <div style={{ padding: 16}}>Loading...</div>*/}
        {/*): (*/}
          <StyledIframe src={props.url} onLoad={onLoad}/>
        {/*)}*/}
      </WebviewContainer>
    )
  }
)
