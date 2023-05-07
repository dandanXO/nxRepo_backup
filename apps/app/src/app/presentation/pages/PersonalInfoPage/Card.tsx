interface CardProps {
  children: React.ReactElement[] | React.ReactElement;
}

const Card = (props: CardProps) => {
  return (
    <div className="shadow-[0_0px_8px_rgba(0,0,0,0.1)] m-2 py-1 px-4 rounded-md">
      {props.children}
    </div>
  );
};

export default Card;
