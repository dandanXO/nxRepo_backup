export const CustomColumnTitle = ({ titleText, contentText }) => {
    return <div>
        <div>{titleText}</div>
        {contentText && <div style={{ background: '#E6F7FF', margin: '8px -8px -12px -8px', padding: '8px' }}>{contentText}</div>}
    </div>
}
