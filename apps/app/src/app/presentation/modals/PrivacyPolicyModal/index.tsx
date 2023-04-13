
import {Overlay} from "@frontend/mobile/shared/ui";
import { useNavigate } from "react-router";


const PrivacyPolicyModal = (props: any) => {
    const navigate=useNavigate()
    return (
        <Overlay
            show={true}
            enableClose={true}
            onCancel={()=>{navigate(-1)}}
            content={() => {
                return <div>
                    <div className={`text-xl font-bold text-left ml-1 mb-3`}>Privacy Policy</div>
                    <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam fringilla sollicitudin volutpat maecenas velit et. Mauris faucibus faucibus sit purus id nunc purus vitae dolor. Eget aliquet sed mattis dui, duis viverra etiam id vitae. Velit turpis ante vestibulum, vitae volutpat. Turpis maecenas nunc purus ultrices pretium, dignissim. Suspendisse leo velit eget felis vulputate fermentum. Sit tincidunt fringilla vitae et bibendum mi. Congue urna, augue elit tincidunt integer tortor imperdiet risus. Arcu nunc elit aliquam sit hac mauris parturient. Pellentesque ut quis pulvinar condimentum eu orci. Facilisis vitae vitae proin in nunc amet, diam aenean augue. Pulvinar nunc faucibus sed consectetur vitae lobortis eget mattis sed. Nam pellentesque semper vitae a, pulvinar suspendisse fermentum aliquam. Nulla sagittis, elit scelerisque vel. Adipiscing lorem id ut volutpat eget. Nunc ultrices a tincidunt velit at rhoncus sed. Felis volutpat elit velit cursus. Augue in dignissim consectetur sagittis, facilisi auctor nam in cras. Cursus nulla elit fusce sollicitudin enim aenean.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam fringilla sollicitudin volutpat maecenas velit et. Mauris faucibus faucibus sit purus id nunc purus vitae dolor. Eget aliquet sed mattis dui, duis viverra etiam id vitae. Velit turpis ante vestibulum, vitae volutpat. Turpis maecenas nunc purus ultrices pretium, dignissim. Suspendisse leo velit eget felis vulputate fermentum. Sit tincidunt fringilla vitae et bibendum mi. Congue urna, augue elit tincidunt integer tortor imperdiet risus. Arcu nunc elit aliquam sit hac mauris parturient. Pellentesque ut quis pulvinar condimentum eu orci. Facilisis vitae vitae proin in nunc amet, diam aenean augue. Pulvinar nunc faucibus sed consectetur vitae lobortis eget mattis sed. Nam pellentesque semper vitae a, pulvinar suspendisse fermentum aliquam. Nulla sagittis, elit scelerisque vel. Adipiscing lorem id ut volutpat eget. Nunc ultrices a tincidunt velit at rhoncus sed. Felis volutpat elit velit cursus. Augue in dignissim consectetur sagittis, facilisi auctor nam in cras. Cursus nulla elit fusce sollicitudin enim aenean.</div>
                </div>
            }}
        />
    )
}

export default PrivacyPolicyModal;
