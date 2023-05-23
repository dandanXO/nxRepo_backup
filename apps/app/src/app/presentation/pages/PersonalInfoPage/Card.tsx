interface CardProps {
  children: React.ReactElement[] | React.ReactElement;
}

const Card = (props: CardProps) => {
  return <div className="m-2 rounded-md py-1 px-4 shadow-[0_0px_8px_rgba(0,0,0,0.1)]">{props.children}</div>;
};

export default Card;
