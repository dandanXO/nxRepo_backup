import cx from 'classnames';

interface IICon {
  name: string;
  img: string;
  className?: string;
}

export const Icon = (props: IICon) => {
  const { name, img, className } = props;
  return (
    <img className={className} src={img} alt={name} />
  )
}