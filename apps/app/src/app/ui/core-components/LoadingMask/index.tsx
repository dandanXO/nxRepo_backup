import PulseLoader from "react-spinners/PulseLoader";
const LoadingMask = () => {

    return (
        <div className="fixed z-[1000] left-0 top-0 flex justify-center items-center bg-cbg-tertiary h-full opacity-70 w-full">
            {<PulseLoader
                className="pulseLoader"
                loading={true}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
                speedMultiplier={0.5}
                margin={15}
            />}
        </div>
    );
}

export default LoadingMask;
