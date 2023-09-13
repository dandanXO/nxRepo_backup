import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { PostRepayCreateResponse } from '../../../../../api/loanService/PostRepayCreateResponse';
import { getToken } from '../../../../../modules/querystring/getToken';
import { CopyButton } from '../../../../components/Buttons';
import { Label } from '../../../../components/Labels';
import Money from '../../../../components/Money.tsx';
import { PagePathEnum } from '../../../PagePathEnum';
import { RepaymentDetailPageUseCaseActions } from '../../../RepaymentDetailPage/userUsecaseSaga';

const MexicoPaymentInstructionPage = ({
  payload,
  orderNo,
}: PostRepayCreateResponse) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div>
      <div className="flex-grow">
        <div className="mx-6 mt-9 flex flex-col items-center">
          <div className="text-ctext-secondary">Total de la Factura</div>
          <div className="mt-2 mb-4 flex text-4xl font-bold">
            <Money money={payload?.orderAmount || 0} />
          </div>
          {payload?.beneficiario && (
            <Label
              className="mb-2"
              title="Beneficiario"
              value={payload.beneficiario}
            />
          )}
          {payload?.clabe && (
            <Label
              className="mb-2"
              title="CLABE"
              value={payload.clabe}
              extra={
                <CopyButton
                  className="rounded-full bg-[#E70020]"
                  text="Copiar"
                  value={payload.clabe}
                />
              }
            />
          )}
          {payload.referencia && (
            <Label
              className="mb-2"
              title="Referencia"
              value={payload.referencia}
              extra={
                <CopyButton
                  className="rounded-full bg-[#E70020]"
                  text="Copiar"
                  value={payload.referencia}
                />
              }
            />
          )}
          {payload.barcodeUrl && (
            <div className="mt-4 mb-2">
              <div className="text-center text-sm">
                Código de barras de pago
              </div>
              <img alt="barcodeUrl" src={payload.barcodeUrl} />
            </div>
          )}
        </div>
        <div className="text-ctext-secondary mx-6 mt-2 items-start text-xs">
          <div>Instrucciones de pago:</div>
          <ul className="list-outside list-decimal pl-4 pt-1">
            <li>
              Para completar el pago, por favor realiza la transferencia del
              monto indicado a la cuenta proporcionada.
            </li>
            <li>
              El código de pago es válido durante 24 horas. Por favor, realiza
              el pago de manera oportuna.
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-auto px-6 py-3">
        <button
          className="w-full rounded-full bg-[#E70020] px-2.5 py-4 text-center text-sm font-bold text-white"
          onClick={() => {
            navigate(
              `${
                PagePathEnum.RepaymentDetailPage
              }?token=${getToken()}&orderNo=${orderNo}`,
              { replace: true }
            );
            dispatch(
              RepaymentDetailPageUseCaseActions.system.showReservation()
            );
          }}
        >
          Pago completado, siguiente paso.
        </button>
      </div>
    </div>
  );
};

export default MexicoPaymentInstructionPage;
