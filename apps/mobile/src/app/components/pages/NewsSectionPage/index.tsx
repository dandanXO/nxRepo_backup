import React from "react";
import styled from "styled-components";

import star_icon_photo from "./star_icon.svg";

import instant_cash_on_the_go_photo from "./pakistan/1_instant_cash_on_the_go.svg";
import apply_photo from "./pakistan/2_apply.svg";
import Instant_approval_photo from "./pakistan/3_instant_approval.svg";
import transfer_money_photo from "./pakistan/4_transfer_money.svg";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    background: #fff;
`;
const StepContainer = styled.div`
    margin-bottom: 20px;
`;
const StepTitle = styled.div`
    color: #2b2828;
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 4px;
`;
const StepSubtitle = styled.div`
    //color: #f58b10;
    color: #73c106;
    font-size: 16px;
    margin-bottom: 4px;
`;
const StepFeatureDescription = styled.div`
    color: #aaaaaa;
    font-size: 14px;
`;
const StepFeature = styled.div`
    color: #aaaaaa;
    font-size: 14px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;
const StepStar = styled.img`
    vertical-align: center;
`;
const StepImage = styled.img``;

const NewsSectionPage = () => {
    return (
        <Container>
            <StepContainer>
                <StepImage src={instant_cash_on_the_go_photo} />
                <StepTitle>
                    <span style={{ color: "#73C106" }}>Instant Cash</span> on
                    the go!
                </StepTitle>
                <StepFeatureDescription>
                    <div>Borrow and Repay on your own terms.</div>
                    <div>Effortless application. Takes 10 mins to apply.</div>
                    <div>
                        Get instant cash transferred to your bank account in
                        minutes.
                    </div>
                </StepFeatureDescription>
            </StepContainer>

            <StepContainer>
                <StepImage src={apply_photo} />
                <StepTitle>Apply</StepTitle>
                <StepSubtitle>Fill in a few details</StepSubtitle>
                <StepFeature>
                    <StepStar src={star_icon_photo} />
                    <div>
                        Identity real-name system to avoid mistaken transfer.
                    </div>
                </StepFeature>
            </StepContainer>

            <StepContainer>
                <StepImage src={Instant_approval_photo} />
                <StepTitle>Instant Approval</StepTitle>
                <StepSubtitle>Know your approved limit</StepSubtitle>
                <StepFeature>
                    <StepStar src={star_icon_photo} />
                    <div>
                        Review to confirm the identity details are correct.
                    </div>
                </StepFeature>
            </StepContainer>

            <StepContainer>
                <StepImage src={transfer_money_photo} />
                <StepTitle>Transfer Money</StepTitle>
                <StepSubtitle>One click transfer to your bank</StepSubtitle>
                <StepFeature>
                    <StepStar src={star_icon_photo} />
                    <div>Congrats! Amount successfully received.</div>
                </StepFeature>
            </StepContainer>
        </Container>
    );
};

export default NewsSectionPage;
