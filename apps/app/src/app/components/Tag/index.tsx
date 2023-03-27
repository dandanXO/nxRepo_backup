
interface ITagProps {
    isActive: boolean;
    onClick: () => void;
    text: string | number;
}

const Tag = ({ isActive, onClick, text }: ITagProps) => {

    const tagStyle = isActive ? 'border-orange-500 bg-orange-200 text-orange-600' : 'border-slate-400 bg-slate-100 text-slate-400';

    return <div onClick={onClick} className={`border border-solid ${tagStyle} rounded-3xl py-0.5 px-2`}>
        {text}
    </div>
}

export default Tag;