import { MdExpandLess } from '@react-icons/all-files/md/MdExpandLess';
import { MdExpandMore } from '@react-icons/all-files/md/MdExpandMore';
import cx from 'classnames';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {
  DropdownIndicatorProps,
  IndicatorSeparatorProps,
  components,
} from 'react-select';
import { transparent } from 'tailwindcss/colors';

import { RootState } from '../../../reduxStore';
import { modalSlice } from '../../../reduxStore/modalSlice';
import { Button } from '../../core-components/Button';
import { Horizontal } from '../../core-components/Horizontal';
import Select from '../../core-components/Select';

const IndicatorSeparator = (props: IndicatorSeparatorProps<any, true>) => {
  // console.log('IndicatorSeparator.props', props);
  return (
    <span {...props.innerProps} className={'font-light text-gray-400'}>
      change
    </span>
  );
};
//
// const DropdownIndicator = (props: DropdownIndicatorProps<any, true>) => {
//   // console.log("DropdownIndicator.props", props);
//   // console.log("selectProps", props.selectProps.menuIsOpen);
//   return (
//     <components.DropdownIndicator {...props}>
//       {props.selectProps.menuIsOpen ? (
//         <MdExpandLess size={30} color={'#AAAAAA'} />
//       ) : (
//         <MdExpandMore size={30} color={'#AAAAAA'} />
//       )}
//     </components.DropdownIndicator>
//   );
// };

type OptionType = {
  label: string | undefined;
  value: number | undefined;
};

const QuickRepaymentModal = () => {
  const modelState = useSelector((state: RootState) => state.model);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [optionValue, setOptionValue] = useState<OptionType>();

  // Note : 阻止下拉選單點選時，點擊到背後的mask回到上一頁
  let stopPropagation = false;

  useEffect(() => {
    if (modelState.simpleQuickRepaymentModal.bankcardList) {
      const bankcard = modelState?.simpleQuickRepaymentModal?.bankcardList.find(
        (bankcard) => {
          return (
            bankcard.bankId ===
            modelState?.simpleQuickRepaymentModal?.selectedBankcardId
          );
        }
      );

      if (bankcard) {
        setOptionValue({
          label: bankcard.bankAccount,
          value: bankcard.bankId,
        });
      }
    }
  }, [
    modelState?.simpleQuickRepaymentModal?.selectedBankcardId,
    modelState?.simpleQuickRepaymentModal?.bankcardList,
  ]);

  return (
    <div
      className={cx(
        'quick-repayment-modal fixed left-0 top-0 bottom-0 z-10 flex h-full w-screen flex-col justify-center bg-black bg-opacity-80 p-0'
      )}
      onClick={(e: any) => {
        if (!stopPropagation) {
          // alert("outside.1")
          navigate(-1);
          dispatch(
            modalSlice.actions.updateSimpleQuickRepaymentModal({
              show: false,
              confirm: false,
            })
          );
        } else {
          // alert("outside.2")
          stopPropagation = false;
        }
      }}
    >
      <div className={'flex flex-1 flex-col justify-end '}>
        <div className={'bankcard rounded-t-3xl bg-white p-4'}>
          <div>
            <div className={'text-md font-medium'}>Bank Card</div>
            <div
              className={'relative flex flex-row items-center justify-between'}
            >
              <Select
                containerClassNames="w-full"
                menuPlacement={'top'}
                styles={{
                  control: (baseStyles, state) => {
                    return {
                      ...baseStyles,
                      background: transparent,
                      borderColor: 'white',
                      boxShadow: 'none',
                    };
                  },
                }}
                components={{
                  IndicatorSeparator,
                  // DropdownIndicator,
                }}
                value={optionValue}
                onChange={(item: any) => {
                  // notice: 沒有 event 無法阻止冒泡事件發生
                  // console.log(item);
                  stopPropagation = true;
                  setOptionValue(item);
                  // props.onChangeBankcardID(item.value);
                  dispatch(
                    modalSlice.actions.updateSimpleQuickRepaymentModalSelectedID(
                      {
                        selectedBankcardId: item.value,
                      }
                    )
                  );
                }}
                options={
                  modelState?.simpleQuickRepaymentModal?.bankcardList &&
                  modelState?.simpleQuickRepaymentModal?.bankcardList.map(
                    (bankcard, index) => {
                      return {
                        value: bankcard.bankId,
                        label: bankcard.bankAccount,
                      };
                    }
                  )
                }
              />
            </div>
          </div>
          <div>
            <div className={'mb-2 text-xs font-light text-gray-400'}>
              <Horizontal />
              <span>By continuing, I have read and agree</span>
              <span
                className={'text-blue-500 underline'}
                onClick={() => {
                  dispatch(
                    modalSlice.actions.updateLoanAgreementModal({
                      ...modelState.loanAgreementModal,
                      show: true,
                    })
                  );
                }}
              >
                {' '}
                Loan Agreement{' '}
              </span>
              <span>carefully.</span>
            </div>
            <Button
              text={'Confirm'}
              onClick={() => {
                stopPropagation = true;
                dispatch(
                  modalSlice.actions.updateSimpleQuickRepaymentModal({
                    // NOTICE: 此處不關閉，來避免用戶提交中返回到首頁
                    show: true,
                    confirm: true,
                  })
                );
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickRepaymentModal;
