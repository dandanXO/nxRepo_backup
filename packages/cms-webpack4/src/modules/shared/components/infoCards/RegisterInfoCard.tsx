import React from "react";

interface IRegisterInfoCard {
    userId: number;
    personaInfoVo: {
        channelName: string
    }
}

const RegisterInfoCard = ({
    userId, personaInfoVo
}: IRegisterInfoCard) => {
    const { channelName } = personaInfoVo

    return (
        <div>
            RegisterInfoCard userId={userId} channelName = {channelName}
        </div>
    )
}

export default RegisterInfoCard;
