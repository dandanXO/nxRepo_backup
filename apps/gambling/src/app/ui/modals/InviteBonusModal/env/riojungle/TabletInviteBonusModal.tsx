import {Container} from "../../container";

export const TabletInviteBonusModal = () => {
  return (
    <div
      className={"z-[1005] fixed left-0 top-0 right-0 bottom-0 flex flex-col flex justify-center items-center w-full h-full bg-[rgba(0,0,0,0.65)]"}
      onClick={(event) => {
        // props.close();
      }}
    >
      <Container
        className={
          // NOTE:
          "w-[90vw] max-w-[336px] h-auto bg-orange-500"
        }
        onClick={(event: any) => {

        }}
      >
        TabletInviteBonusModal
      </Container>
    </div>
  )
}
