import React from "react";

interface ICollectionRecordCard {
    orderId: number;
}

const CollectionRecordCard = ({
    orderId
}: ICollectionRecordCard) => {
    return (
        <div>
            CollectionRecordCard orderId = {orderId}
        </div>
    )
}

export default CollectionRecordCard;
