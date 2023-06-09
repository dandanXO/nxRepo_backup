import React from "react";

interface IOrderInfoCardProps {
    orderId: number
}

const OrderInfoCard = ({
    orderId
}:IOrderInfoCardProps) => {
    return (
        <div>
            OrderInfoCard orderId = {orderId}
        </div>
    )
}

export default OrderInfoCard;
