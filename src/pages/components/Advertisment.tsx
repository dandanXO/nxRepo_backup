

import styled from "styled-components";
import React, { useState } from "react";
import { mockGetLoanDetailResponse, GetLoanDetailResponse } from "../../api/getLoanDetail";

import Tag from "../../core/components/Tag";
import Card from "../../core/components/Card";
import CardContent from "../../core/components/CardContent";
import ListItem from "../../core/components/ListItem";
import Button from "../../core/components/Button";
import LoanBrand from "../../core/components/LoanBrand";
import Accordion from "../../core/components/Accordion";
import Divider from "../../core/components/Divider";
import Logo from "../../core/components/images/logo.jpg";
import Banner from "../../core/components/images/banner.jpg";

const AdvertismentStyled = styled.div`
    margin-top:32px;
    .infoTitle {
        color: ${({ theme }) => theme.color.gray500};
        font-size: ${({ theme }) => theme.fontSize[14]};
        margin-bottom: 10px;
        text-align: left;
    }
    
`;

const BannerWithCardStyled = styled.div`
    width: 100%;
    .banner {
        width: 100%;
        border-radius: 8px;
        margin-bottom: -20px;
    }
    .bannerHide {
        width: 100%;
        border-radius: 8px;
        margin-bottom: -40%;
    }
`;

type LoanDetailProps = Pick<GetLoanDetailResponse, "loanAmount" |"serviceCharge" |"dailyFee" | "reductionAmount" | "penaltyInterest"|"applyDate"|"dueDate"|"bankCardNo">;
type AdCardProps = {
    productName: string,
    balance: string,
    interest: string,
    terms: string,
    icon: string,
    banner: string
};
const data = [
    {
        productName: "ACTING CASH",
        balance: "₹ 10,000",
        interest: "1.8%",
        terms: "91 days",
        icon:Logo,
        banner:Banner
    },
    {
        productName: "POLAR LENDS",
        balance: "₹ 10,000",
        interest: "1.8%",
        terms: "91 days",
        icon:Logo,
        banner:Banner
    }
]

const BannerWithCard = (props: AdCardProps) => {

    const { productName, balance, interest, terms, icon, banner } = props

    const [isCollapse, setIsCollapse] = useState(true);
    return (
        <BannerWithCardStyled onClick={()=>setIsCollapse(!isCollapse)}>
            <img className={` ${isCollapse?'banner':'bannerHide'}` } src={banner} />
            <Card isHot={true}>
                <CardContent
                    icon={icon}
                    productName={productName}
                    balance={balance}
                    contentItems={
                        <>
                            <ListItem title={"interest"} text={interest} />
                            <ListItem title={"terms"} text={terms} />
                        </>
                    }
                />
            </Card>
        </BannerWithCardStyled>
    )
}

const Advertisment = () => {
    return (
        <AdvertismentStyled>
            <div className={'infoTitle'}>More Recommend Loan</div>
            {data.map(ad => <BannerWithCard {...ad} />)}
        </AdvertismentStyled>
    );
};

export default Advertisment;
