import React from 'react';

interface IPaymentResultPage {
  path: 'complete' | 'failed';
  resultImage: string;
}

const MexicoPaymentResultPage = ({ path, resultImage }: IPaymentResultPage) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <img src={resultImage} alt="result" />
      <div className="text-primary-main py-4 font-bold">
        {path === 'complete' ? 'Repayment Successful' : 'Repayment Failed'}
      </div>
      <div className="text-ctext-secondary w-3/5 text-center text-sm font-medium">
        {path === 'complete'
          ? 'The repayment was successful, and the order has been settled.'
          : 'Bank acceptance is in progress, which may take anywhere from ten seconds to several seconds. Please wait patiently.'}
      </div>
    </div>
  );
};

export default MexicoPaymentResultPage;
