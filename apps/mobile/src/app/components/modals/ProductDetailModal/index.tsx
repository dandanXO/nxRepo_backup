import React from "react";
import styled from "styled-components";
import { GetLoanDetailRecommendProducts } from "../../../api/getLoanDetail";
import { Overlay, ListItem, Title, Divider } from "@frontend/mobile/shared/ui";
import { environment } from "../../../../environments/environment";
import LoanBrand from "../../components/LoanBrand";
import { WithTranslation, withTranslation } from "react-i18next";
import { i18nProductDetailModal } from "./i18n/translations";

const ModalContentStyled = styled.div`
    padding: 0 12px;
    color: ${({ theme }) => theme.color.black};
    .info-title {
        text-align: left;
        color: ${({ theme }) => theme.color.gray500};
        font-size: ${({ theme }) => theme.fontSize[12]};
    }
`;

export type PureProductDetailModalProps = {
    recommendProducts?: GetLoanDetailRecommendProducts;
    setShowProductDetailModal: React.Dispatch<React.SetStateAction<boolean>>;
} & WithTranslation;

const PureProductDetailModal = (props: PureProductDetailModalProps) => {
    return (
        <div>
            <Overlay
                show={true}
                enableClose={true}
                title="Notice"
                enableTitleHorizontal={true}
                onCancel={() => props.setShowProductDetailModal(false)}
                content={(hide: () => void) => {
                    return (
                        <ModalContentStyled>
                            <Title>{props.t("Product Details")}</Title>
                            <Divider />
                            <LoanBrand
                                iconUrl={
                                    props?.recommendProducts?.logoUrl ?? ""
                                }
                                productName={
                                    props?.recommendProducts?.productName ?? ""
                                }
                                sizeType={"small"}
                            />
                            <ListItem
                                title={props.t("Loanable amount") as string}
                                text={`${environment.currency} ${
                                    props?.recommendProducts?.loanQuota ?? ""
                                }`}
                            />
                            <ListItem
                                title={props.t("Interest") as string}
                                text={
                                    props?.recommendProducts?.interestRate ?? ""
                                }
                            />
                            <ListItem
                                title={props.t("Terms") as string}
                                text={props?.recommendProducts?.term ?? ""}
                            />
                            <ListItem
                                title={props.t("Approval Rates") as string}
                                text={
                                    props?.recommendProducts?.approvedRate ?? ""
                                }
                            />
                            <ListItem
                                title={props.t("Approval Time") as string}
                                text={
                                    props?.recommendProducts?.approvedTime ?? ""
                                }
                            />
                            <Divider />
                            <div className={"info-title"}>
                                {props.t("customer service") as string}
                            </div>
                            <ListItem
                                title={props.t("Service time") as string}
                                text={props?.recommendProducts?.csTime ?? ""}
                            />
                            <ListItem
                                title={props.t("Email") as string}
                                text={props?.recommendProducts?.csEmail ?? ""}
                            />
                        </ModalContentStyled>
                    );
                }}
            ></Overlay>
        </div>
    );
};

export default withTranslation(i18nProductDetailModal.namespace)(
    PureProductDetailModal
);
