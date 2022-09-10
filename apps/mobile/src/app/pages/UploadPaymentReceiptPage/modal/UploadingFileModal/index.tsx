import { Overlay } from "@frontend/mobile/shared/ui";
import React from "react";
import styled from "styled-components";
import { StyledLoading } from "@frontend/mobile/shared/ui";

const Container = styled.div`
    padding: 8px;
    font-size: 16px;
`;

const ProgressBar = styled.div``;
const Percent = styled.div`
    text-align: right;
`;

const Title = styled.div`
    text-align: center;
    color: black;
    margin-bottom: 30px;
`;
const ProgressBarContainer = styled.div`
    background: #e5e5e5;
    height: 5px;
`;
interface ProgressBarIndexProps {
    width: string;
}
const ProgressBarWater = styled.div<ProgressBarIndexProps>`
    background: #aaaaaa;
    width: ${(props) => props.width};
    height: 5px;
`;
const Description = styled.div`
    color: #aaaaaa;
    font-size: 14px;
    font-weight: 300;
    line-height: 1.43;
    text-align: center;
`;
const UploadingFileModal = () => {
    return (
        <Overlay
            height={100}
            show={true}
            content={(hide: () => void) => {
                return (
                    <Container>
                        <StyledLoading />
                        <Title>UploadingFile</Title>
                        {/*<ProgressBar>*/}
                        {/*    <ProgressBarContainer>*/}
                        {/*        <ProgressBarWater width={"30" + "%"}/>*/}
                        {/*    </ProgressBarContainer>*/}
                        {/*</ProgressBar>*/}
                        {/*<Percent>30%</Percent>*/}
                        <Description>
                            Your file is uploading, please keep your network
                            connection is active and wait for few minutes
                        </Description>
                    </Container>
                );
            }}
        ></Overlay>
    );
};

export default UploadingFileModal;
