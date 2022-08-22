import Overlay from "../../../../core/components/Overlay";
import React from "react";
import styled from "styled-components";


const Container = styled.div`
    padding: 8px;
    font-size: 16px
;
`;


const ProgressBar = styled.div`
    
`
const Percent = styled.div`
    text-align: right;
`

const Title = styled.div`
  text-align: left;
  color: black;
  margin-bottom: 30px;
`
const ProgressBarContainer = styled.div`
    background: #e5e5e5;
    height: 10px;
`
interface ProgressBarIndexProps {
    width: string;
}
const ProgressBarWater = styled.div<ProgressBarIndexProps>`
    background: #aaaaaa;
    width: ${(props) => props.width};
    height: 10px;
`;
const UploadingFileModal = () => {
    return (
        <Overlay
            height={100}
            show={true}
            content={(hide: () => void) => {
                return (
                    <Container>
                        <Title>UploadingFile</Title>
                        <ProgressBar>
                            <ProgressBarContainer>
                                <ProgressBarWater width={"30" + "%"}/>
                            </ProgressBarContainer>
                        </ProgressBar>
                        <Percent>30%</Percent>
                    </Container>
                )
            }}
        ></Overlay>
    )
}

export default UploadingFileModal;
