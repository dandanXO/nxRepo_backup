export const LoadMoreButton = (props: { onClick: () => void }) => {
  return (
    <button
      onClick={props.onClick}
      className="text-white bg-gradient-to-b from-[var(--primary-main-from)] to-[var(--primary-main-to)] py-2 px-4 rounded-[32px] font-medium"
    >
      Ver Mais
    </button>
  )
}