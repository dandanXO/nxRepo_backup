import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router';

import { RootState } from '../../../reduxStore';
import { Navigation } from '../../components/layouts/Navigation';
import { Page } from '../../components/layouts/Page';
import { PagePathEnum } from '../PagePathEnum';
import { getToken } from '../../../modules/querystring/getToken';
import { Button } from '../../components/layouts/Button';
import { Input, InputValue, Modal } from '@frontend/mobile/shared/ui';
import { useEffect, useRef, useState } from 'react';
import Select, { SelectInstance } from 'react-select';
import { useLazyGetFeedbackCategoriesQuery, usePostFeedbackMutation } from '../../../api/rtk';
import cx from 'classnames';


interface ICategory {
    value: number | undefined;
    label: string;
    template: string;
}

const FeedbackPage = () => {
    const navigate = useNavigate();
    const [categoryList, setCategoryList] = useState<ICategory[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<InputValue<number | undefined>>({
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
    const [isSendMessage,setIsSendMessage]=useState(false)

    const [triggerGetList, { currentData, isLoading, isFetching, isSuccess, isError, isUninitialized }] =
        useLazyGetFeedbackCategoriesQuery({
            pollingInterval: 0,
            refetchOnFocus: false,
            refetchOnReconnect: false,
        });
    const [postFeedback] = usePostFeedbackMutation();

    useEffect(() => {
        triggerGetList(null)
    }, [])

    useEffect(() => {
        if (currentData && currentData.length > 0) {
            const options = currentData.map(i => ({ value: i.key, label: i.displayName, template: i.template }))
            setCategoryList(options)
        }
    }, [isSuccess])

    const handleFeedbackChange = (e: any) => {
        setFeedbackValue({
            ...feedbackValue,
            isValidation: false,
            data: e.target.value
        })
    }

    const handleSendFeedback = () => {

        const isSelectedCategoryError = selectedCategory.data === undefined;
        const isFeedbackValueError = feedbackValue.data === '';

        setSelectedCategory({
            ...selectedCategory,
            isValidation: isSelectedCategoryError,
            errorMessage: isSelectedCategoryError ? 'Please select an option' : '',
        })

        setFeedbackValue({
            ...feedbackValue,
            isValidation: isFeedbackValueError,
            errorMessage: isFeedbackValueError ? 'This field cannot be left blank.' : '',
        })

        if (!isSelectedCategoryError && !isFeedbackValueError) {
            setIsSendMessage(true);
            postFeedback({
                category: Number(selectedCategory?.data),
                feedback: feedbackValue?.data
            }).unwrap().then(()=>{
                setIsSendMessage(false);
                Modal.alert({
                    show: true,
                    mask: true,
                    title:'Received Feedback' as string,
                    content: 'Thank you for taking the time to provide your feedback. We will take it into careful consideration and will respond to your feedback as quickly as possible.'as string,
                    confirmText: 'OK' as string,
                    maskClosable: true,
                    enableClose: false,
                    enableIcon: false,
                    onConfirm: () => {
                        navigate(`${PagePathEnum.CustomerServicePage}?token=${getToken()}`);
                    },
                  });
            })
        }

    }

    const [menuOpen,setMenuOpen]=useState(false)
    const selectRef = useRef<SelectInstance | null>(null);

    return (
        <div className={`flex flex-col`}>
            <Navigation
                title={'Feedback'}
                back={() => {
                    navigate(`${PagePathEnum.CustomerServicePage}?token=${getToken()}`);
                }}
            />
            <div className={`p-4 pt-0.5 h-[calc(100vh-56px)] flex flex-col`}>
                <div className='grow'>
                    <div className={cx('font-bold text-base text-ctext-primary mb-4 leading-none')}>
                        <Select
                        ref={selectRef}
                            styles={{
                                control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    borderColor: selectedCategory.isValidation ? window?.theme?.input?.error || 'red' : baseStyles.borderColor,
                                }),
                                //@ts-ignore
                                indicatorSeparator: (provided) => ({ ...provided, display: 'none' })
                            }}
                            // className='border-red-600'
                            onChange={(item: any) => {
                                setSelectedCategory({
                                    ...selectedCategory,
                                    isValidation:false,
                                    data: item.value
                                })
                                setFeedbackValue({
                                    ...feedbackValue,
                                    isValidation:false,
                                    data: item.template
                                })
                            }}
                            onFocus={()=>{
                                console.log('onFocus')
                                selectRef.current?.focus();
                                setMenuOpen(true)
                            }}
                            onBlur={()=>{
                                setMenuOpen(false)
                            }}
                            openMenuOnFocus={true}
                            options={categoryList}
                            isSearchable={false}
                            placeholder={'Feedback Categories'}
                        />
                        {selectedCategory.isValidation && <div className='text-cstate-error-main pt-2 font-normal'>{selectedCategory.errorMessage}</div>}
                    </div>
                    <div className={cx('text-sm mb-1 w-full border border-cstate rounded-lg  p-3 relative',
                        {
                            'border-red-500': feedbackValue.isValidation
                        })}>
                        <label className={cx('text-cTextFields-placeholder-main', {
                            'top-2 absolute text-xs': isEdit || feedbackValue.data.length > 0
                        })}
                        >Feedback</label>
                        <textarea
                            rows={10}
                            className='w-full outline-none py-3 resize-none'
                            value={feedbackValue.data}
                            onChange={(e) => handleFeedbackChange(e)}
                            onFocus={() => setIsEdit(true)}
                            onBlur={() => setIsEdit(false)}
                        />
                    </div>
                    {feedbackValue.isValidation && <div className='text-cstate-error-main '>{feedbackValue.errorMessage}</div>}
                </div>
                <div className={``}>
                    <Button 
                        text={'Send a message'} 
                        disable={isSendMessage}
                        onClick={() => {
                            if(isSendMessage) return;
                            handleSendFeedback()
                        }}
                    />
                </div>
            </div>
        </div>

    );
};

export default FeedbackPage;
