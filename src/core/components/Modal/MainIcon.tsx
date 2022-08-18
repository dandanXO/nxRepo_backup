import PropTypes from "prop-types";
import styled from "styled-components";

const ConfirmICON = require("../images/modal/state/confirm.png");
const NotificationICON = require("../images/modal/state/notification.png");
const ErrorICON = require("../images/modal/state/error.png");
const DeleteICON = require("../images/modal/state/delete.png");
const MoneyICON = require("../images/modal/state/money.png");

function getIconBackground(type: string) {
    if (typeof type === "undefined" || type === null) {
        return `url(${ConfirmICON}) no-repeat;`;
    }
    switch (type) {
        case "confirm":
            return `url(${ConfirmICON}) no-repeat;`;
        case "notification":
            return `url(${NotificationICON}) no-repeat;`;
        case "error":
            return `url(${ErrorICON}) no-repeat;`;
        case "question":
            return `url(${DeleteICON}) no-repeat;`;
        case "money":
            return `url(${MoneyICON}) no-repeat;`;
        default:
            return `url(${ConfirmICON}) no-repeat;`;
    }
}

interface MainIconProps {
    type: string;
}
const MainIcon = styled("h2")<MainIconProps>`
    margin: 0 auto;
    background: ${props => getIconBackground(props.type)};
    width: 43px;
    height: 43px;
    /* Float */
    clear: both;
`;
MainIcon.displayName = "HeaderICON";
MainIcon.propTypes = {
    type: PropTypes.oneOf(["confirm", "notification", "error", "question", "money"]),
};
export default MainIcon;
