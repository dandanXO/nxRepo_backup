export const flexCreator = (direction: string, justifyContnet: string, alignItems: string) => {
    return {
        display: 'flex',
        'flex-direction': direction ? direction : 'row',
        'justify-content': justifyContnet ? justifyContnet : 'center',
        'align-items': alignItems ? alignItems : 'center',
    }
}