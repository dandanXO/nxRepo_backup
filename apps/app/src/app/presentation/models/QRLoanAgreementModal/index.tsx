import {CloseButton} from "../../components/layouts/CloseButton";
import {Navigation} from "../../components/layouts/Navigation";
import {useCallback} from "react";

type Props = {
  onClose: () => void;
}
export const LoanAgreementModal = (props: Props) => {
  const onClickClose = useCallback(() => {
    props.onClose()
  }, [])
  return (
    <div className={"loan-agreement-modal z-10 w-screen bg-white p-5 absolute top-0 flex flex-col"}>
      <div className={"z-10"} onClick={onClickClose}>
        <CloseButton/>
      </div>
      <div className={"mb-2"}>
        <Navigation title={"Loan Agreement"}/>
      </div>
      <div className={"content"}>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam fringilla sollicitudin volutpat maecenas velit et. Mauris faucibus faucibus sit purus id nunc purus vitae dolor. Eget aliquet sed mattis dui, duis viverra etiam id vitae. Velit turpis ante vestibulum, vitae volutpat. Turpis maecenas nunc purus ultrices pretium, dignissim. Suspendisse leo velit eget felis vulputate fermentum. Sit tincidunt fringilla vitae et bibendum mi. Congue urna, augue elit tincidunt integer tortor imperdiet risus. Arcu nunc elit aliquam sit hac mauris parturient. Pellentesque ut quis pulvinar condimentum eu orci. Facilisis vitae vitae proin in nunc amet, diam aenean augue. Pulvinar nunc faucibus sed consectetur vitae lobortis eget mattis sed. Nam pellentesque semper vitae a, pulvinar suspendisse fermentum aliquam. Nulla sagittis, elit scelerisque vel. Adipiscing lorem id ut volutpat eget. Nunc ultrices a tincidunt velit at rhoncus sed. Felis volutpat elit velit cursus. Augue in dignissim consectetur sagittis, facilisi auctor nam in cras. Cursus nulla elit fusce sollicitudin enim aenean.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam fringilla sollicitudin volutpat maecenas velit et. Mauris faucibus faucibus sit purus id nunc purus vitae dolor. Eget aliquet sed mattis dui, duis viverra etiam id vitae. Velit turpis ante vestibulum, vitae volutpat. Turpis maecenas nunc purus ultrices pretium, dignissim. Suspendisse leo velit eget felis vulputate fermentum. Sit tincidunt fringilla vitae et bibendum mi. Congue urna, augue elit tincidunt integer tortor imperdiet risus. Arcu nunc elit aliquam sit hac mauris parturient. Pellentesque ut quis pulvinar condimentum eu orci. Facilisis vitae vitae proin in nunc amet, diam aenean augue. Pulvinar nunc faucibus sed consectetur vitae lobortis eget mattis sed. Nam pellentesque semper vitae a, pulvinar suspendisse fermentum aliquam. Nulla sagittis, elit scelerisque vel. Adipiscing lorem id ut volutpat eget. Nunc ultrices a tincidunt velit at rhoncus sed. Felis volutpat elit velit cursus. Augue in dignissim consectetur sagittis, facilisi auctor nam in cras. Cursus nulla elit fusce sollicitudin enim aenean.
        </div>
      </div>
    </div>
  )
}
