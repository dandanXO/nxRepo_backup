import React from "react";
import { longTextContent } from "./index";

const FixedLongContentComponent = () => {
    return (
        <div style={{ width: "1000px", padding: "0px 20px" }}>
            {longTextContent}
        </div>
    );
};

export default FixedLongContentComponent;
