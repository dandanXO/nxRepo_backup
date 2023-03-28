
interface ITagProps {
    isActive: boolean;
    onClick: () => void;
    text: string | number;
    style?: string;
}

const Tag = ({ isActive, onClick, text ,style}: ITagProps) => {

    const tagStyle = isActive ? 'border-orange-500 bg-orange-200 text-orange-600' : 'border-slate-400 bg-slate-100 text-slate-400';

    return <div onClick={onClick} className={`border border-solid ${tagStyle} rounded-2xl py-0.5 px-3 grow text-center ${style}`}>
        {text}
    </div>
}

export default Tag;