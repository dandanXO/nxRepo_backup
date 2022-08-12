// export default () => {
//     return <div>LoanDetailsPage</div>
// }

import styled from "styled-components";
import React from "react";
import Card from "../../components/Card";
import CardContent from "../../components/CardContent";



const LoanDetailsPage = () => {
 
    return (
        <div>
            <Card isHot={true}>
                <CardContent />
            </Card>
        </div>
    );
}

export default LoanDetailsPage;
