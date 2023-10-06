import PulseLoader from 'react-spinners/PulseLoader';

const LoadingMask = () => {
  return (
    <div className="bg-cbg-tertiary fixed left-0 top-0 z-[1000] flex h-full w-full items-center justify-center opacity-70">
      {
        <PulseLoader
          className="pulseLoader"
          loading={true}
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
          speedMultiplier={0.5}
          margin={15}
        />
      }
    </div>
  );
};

export default LoadingMask;
