import PulseLoader from "react-spinners/PulseLoader";
import { Page } from "../layouts/Page";

const LoadingMask = () => {

    return (
        <Page className="fixed z-[1000] left-0 top-0 flex justify-center items-center bg-cbg-tertiary h-screen opacity-70">
            {<PulseLoader
                className="pulseLoader"
                loading={true}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
                speedMultiplier={0.5}
                margin={15}
            />}
        </Page>
    );
}

export default LoadingMask;
