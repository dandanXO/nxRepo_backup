import React from "react";
import styled from "styled-components";
import {useTranslation, withTranslation} from "react-i18next";
import {Form} from "../../../components/Form";
import {Label} from "../../../components/Label";
import {i18nBankBindAccountPage} from "../../translations";
import {Button, Input} from "@frontend/mobile/shared/ui";
import {IPakistanBankAccountForm} from "../../types/IBankAccountForm";
import Select from 'react-select';

const Warning = styled.div`
  margin: 0 auto;
  width: 284px;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.42;
  letter-spacing: normal;
  text-align: center;
  color: #f82626;
`;

const CustomForm = styled.div`
  .css-1s2u09g-control, .css-1pahdxg-control {
    border-radius: 9px;
    height: 49px;
    border: 1px solid #aaaaaa;
  }
  .css-14el2xx-placeholder {
    //font-weight: 600;
  }
`
export const BankAccountForm = (props: IPakistanBankAccountForm)  => {

  const {t} = useTranslation(i18nBankBindAccountPage.namespace);

  const options = props.bankDropList.map((item: string, index: number) => {
    return {value: item, label: item, index: index}
  });

  // useEffect(() => {
  //   if(props.bankDropList) {
  // console.log("props.bankDropList", props.bankDropList)
  // props.onIFSCDropSelect(0)
  // }
  // }, [props.bankDropList])

  return (
    <CustomForm>
      <Form>
        <Label>{t('Cardholder Name')}</Label>

        <Input
          className="mb"
          labelType={'none'}
          placeholder={t('Cardholder Name') as string}
          value={props.cardholderName}
          disabled
        />
        <Label>{t('Your IBAN Number (24 digits)')}</Label>
        <Input
          className="mb"
          labelType={'none'}
          placeholder={'Ex. PK36FTBK0000111123456702'}
          value={props.iBanData.data}
          onChange={props.onIBanChange}
          onBlur={props.onIbanBlur}
          errorMessage={props.iBanData.errorMessage}
        />

        <Label>{t('Please select your bank name')}</Label>
        <Select
          className="react-select-container mb"
          // defaultValue={props.bankDropList[0].value}
          value={props?.bankDropList[props.bankAccountValue]?.value}
          onChange={(item: any) => {
            // console.log(item)
            props.onIFSCDropSelect(item.index);
          }}
          options={options}
        />

        {/*<Select*/}
        {/*  className="mb"*/}
        {/*  fixButtonWidth={"calc(100vw - 36px)"}*/}
        {/*  dataSource={props.bankDropList}*/}
        {/*  defaultIndex={props.bankAccountValue}*/}
        {/*  // FIXME: to controlled component*/}
        {/*  onSelect={(index: number) => props.onIFSCDropSelect(index)}*/}
        {/*  maxItemCount={5.5}*/}
        {/*/>*/}

        <Label>{t('Account Number')}</Label>
        <Input
          className="mb"
          labelType={'none'}
          placeholder={t('Account Number') as string}
          value={props.bankcardNoData.data}
          onChange={props.onAccountNumberChange}
          onBlur={props.onAccountNumberBlur}
          errorMessage={props.bankcardNoData.errorMessage}
        />

        <Label>{t('Confirm Account Number')}</Label>
        <Input
          className="mb"
          labelType={'none'}
          placeholder={t('Confirm Account Number') as string}
          value={props.confirmedBankcardNoData.data}
          onChange={props.onConfirmAccountNumberChange}
          onBlur={props.onConfirmAccountNumberBlur}
          errorMessage={props.confirmedBankcardNoData.errorMessage}
        />

        <Warning>
          {t('Unchangeable after linked, please check before submission.')}
        </Warning>
      </Form>

      <Button
        onClick={() => {
          // if(!props.isFormPending && props.confirm) {
          //   console.log("request")
          props.confirm && props.confirm();
          // } else {
          //   console.log("request2")
          // }
        }}
      >
        {t('Save')}
      </Button>
    </CustomForm>
  );
}
