import cx from 'classnames';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { transparent } from 'tailwindcss/colors';

import { InputValue, Modal } from '@frontend/mobile/shared/ui';

import { getToken } from '../../../application/getToken';
import {
  useLazyGetFeedbackCategoriesQuery,
  usePostFeedbackMutation,
} from '../../../externel/backend/rtk';
import { PageOrModalPathEnum } from '../../PageOrModalPathEnum';
import { Button } from '../../core-components/Button';
import { Navigation } from '../../core-components/Navigation';
import Select from '../../core-components/Select';
import { PageContent } from '../../core-components/PageContent';

interface ICategory {
  value: number | undefined;
  label: string;
  template: string;
}

const FeedbackPage = () => {
  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<
    InputValue<number | undefined>
  >({
    data: undefined,
    isValidation: false,
    errorMessage: '',
  });

  const [feedbackValue, setFeedbackValue] = useState<InputValue<string>>({
    data: '',
    isValidation: false,
    errorMessage: '',
  });

  const [isEdit, setIsEdit] = useState(false);
  const [isSendMessage, setIsSendMessage] = useState(false);

  const [
    triggerGetList,
    { currentData, isLoading, isFetching, isSuccess, isError, isUninitialized },
  ] = useLazyGetFeedbackCategoriesQuery({
    pollingInterval: 0,
    refetchOnFocus: false,
    refetchOnReconnect: false,
  });
  const [postFeedback] = usePostFeedbackMutation();

  useEffect(() => {
    triggerGetList(null);
  }, []);

  useEffect(() => {
    if (currentData && currentData.length > 0) {
      const options = currentData.map((i) => ({
        value: i.key,
        label: i.displayName,
        template: i.template,
      }));
      setCategoryList(options);
    }
  }, [isSuccess]);

  const handleFeedbackChange = (e: any) => {
    setFeedbackValue({
      ...feedbackValue,
      isValidation: false,
      data: e.target.value,
    });
  };

  const handleSendFeedback = () => {
    const isSelectedCategoryError = selectedCategory.data === undefined;
    const isFeedbackValueError = feedbackValue.data === '';

    setSelectedCategory({
      ...selectedCategory,
      isValidation: isSelectedCategoryError,
      errorMessage: isSelectedCategoryError ? 'Please select an option' : '',
    });

    setFeedbackValue({
      ...feedbackValue,
      isValidation: isFeedbackValueError,
      errorMessage: isFeedbackValueError
        ? 'This field cannot be left blank.'
        : '',
    });

    if (!isSelectedCategoryError && !isFeedbackValueError) {
      setIsSendMessage(true);
      postFeedback({
        category: Number(selectedCategory?.data),
        feedback: feedbackValue?.data,
      })
        .unwrap()
        .then(() => {
          setIsSendMessage(false);
          Modal.alert({
            show: true,
            mask: true,
            title: 'Received Feedback' as string,
            content:
              'Thank you for taking the time to provide your feedback. We will take it into careful consideration and will respond to your feedback as quickly as possible.' as string,
            confirmText: 'OK' as string,
            maskClosable: true,
            enableClose: false,
            enableIcon: false,
            onConfirm: () => {
              navigate(
                `${PageOrModalPathEnum.CustomerServicePage}?token=${getToken()}`, { replace: true }
              );
            },
          });
        });
    }
  };

  return (
    <div className={`flex flex-col h-full`}>
      <Navigation
        title={'Feedback'}
        back={() => {
          navigate(
            `${PageOrModalPathEnum.CustomerServicePage}?token=${getToken()}`, { replace: true }
          );
        }}
      />
      <PageContent>
        <div className="grow">
          <Select
            containerClassNames={cx(
              'font-bold text-base text-ctext-primary mb-4 leading-none'
            )}
            styles={{
              control: (baseStyles: any, state: any) => ({
                ...baseStyles,
                background: transparent,
                borderColor: selectedCategory.isValidation
                  ? window?.theme?.input?.error || 'red'
                  : baseStyles.borderColor,
              }),
              //@ts-ignore
              indicatorSeparator: (provided) => ({
                ...provided,
                display: 'none',
              }),
            }}
            onChange={(item: any) => {
              setSelectedCategory({
                errorMessage: '',
                isValidation: false,
                data: item.value,
              });
              setFeedbackValue({
                errorMessage: '',
                isValidation: false,
                data: item.template,
              });
            }}
            options={categoryList}
            placeholder={'Feedback Categories'}
            errorMessage={selectedCategory.errorMessage || ''}
          />
          <div
            className={cx(
              'border-cstate relative mb-1 w-full rounded-lg border  p-3 text-sm',
              {
                'border-red-500': feedbackValue.isValidation,
              }
            )}
          >
            <label
              className={cx('text-cTextFields-placeholder-main', {
                'absolute top-2 text-xs':
                  isEdit || feedbackValue.data.length > 0,
              })}
            >
              Feedback
            </label>
            <textarea
              rows={10}
              className="w-full resize-none py-3 outline-none"
              value={feedbackValue.data}
              onChange={(e) => handleFeedbackChange(e)}
              onFocus={() => setIsEdit(true)}
              onBlur={() => setIsEdit(false)}
            />
          </div>
          {feedbackValue.isValidation && (
            <div className="text-cstate-error-main ">
              {feedbackValue.errorMessage}
            </div>
          )}
        </div>
        <div className={``}>
          <Button
            text={'Send a message'}
            disable={isSendMessage}
            onClick={() => {
              if (isSendMessage) return;
              handleSendFeedback();
            }}
          />
        </div>
      </PageContent>
    </div>
  );
};

export default FeedbackPage;
