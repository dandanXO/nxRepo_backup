import cx from 'classnames';

export const Banner = (props: any) => {
  const { className, src, imgClassName, bannerText } = props;
  return (
    <section className={cx('relative', className)}>
      <img className={cx('w-full', imgClassName)} src={src} />
      {bannerText}
    </section>
  )

}