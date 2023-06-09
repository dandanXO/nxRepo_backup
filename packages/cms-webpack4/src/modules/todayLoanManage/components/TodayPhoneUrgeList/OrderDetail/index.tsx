import React from "react";
import { useParams } from "react-router-dom";

export const OrderDetail = () => {
    const urlParams=useParams<{ userId: string, orderId: string}>()
    const userId = Number(urlParams.userId);
    const orderId = Number(urlParams.orderId);

    console.log(`userId = ${userId}, orderId = ${orderId}`);

    return <div>OrderDetail</div>
}
