import { LeftOutlined } from '@ant-design/icons';
import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

import { PageOrModalPathEnum } from '../../../../../PageOrModalPathEnum';
import { Footer } from '../Footer';
import { Notice } from '../Notice';
import { DayList } from './index';
import {GetSignInConfigResponse} from "../../../../../../external";
import { RootState } from '../../../../../../reduxStore';
import { useSelector } from 'react-redux';
import { LevelList } from "../../../index";
import {BackNavigation} from "../../../../../components-bs/BackNavigation/BackNavigation";

const Container = styled.div`
  //background: #287052;
  background-color: rgba(40, 112, 82, 0.1);

`;
export const PernambucanMobileDailySignInPage = ({
  currentLevel,
  signInAllConfig,
  onClickToSignIn,
  signInConfig,
  signInTotalDays,
  todayIsSignIn,
  vipLevel,
  setCurrentSelectedLevel,
  currentSelectedLevel,
}: {
  currentLevel: number;
  signInAllConfig: {
    identifier: string;
    value: string;
  }[];
  onClickToSignIn: () => void;
  signInConfig?: GetSignInConfigResponse['data']['signInConfig'];
  signInTotalDays: GetSignInConfigResponse['data']['signInTotalDays'];
  todayIsSignIn: GetSignInConfigResponse['data']['todayIsSignIn'];
  vipLevel: GetSignInConfigResponse['data']['vipLevel']
  currentSelectedLevel: number;
  setCurrentSelectedLevel: React.Dispatch<React.SetStateAction<number>>;
}) => {

  const navigate = useNavigate();
  const vip_level = useSelector((state: RootState) => state.app?.vip_level)

  return (
    <Container className={'100vh relative'}>
      {/*// <Container className={'h-full relative'}>*/}
      {/*  <section className={"sm:rounded-3xl text-white font-bold overflow-hidden relative mb-8"}>*/}
      {/*    <img className="w-full" src={`assets/${environment.assetPrefix}/bannerVIP.png`}/>*/}
      {/*  </section>*/}

      <div className={'p-2'}>

        <BackNavigation onClick={() => {
          navigate(PageOrModalPathEnum.IndexPage);
        }}/>

        <div className={'mt-2.5 mb-2 text-lg font-bold text-white'}>
          Meu nível atual VIP {currentLevel}
        </div>

        <div className={'mt-9'}>
          <LevelList
            startLevel={1}
            currentLevel={currentLevel}
            currentSelectedLevel={currentSelectedLevel}
            setCurrentSelectedLevel={setCurrentSelectedLevel}
          />
        </div>

        <DayList
          className={'mx-4 flex-wrap justify-start'}
          itemClassName={'shrink-0 grow-0 basis-[20%] mb-4'}
          currentSelectedLevel={currentSelectedLevel}
          signInAllConfig={signInAllConfig}
          signInConfig={signInConfig}
          signInTotalDays={signInTotalDays}
          todayIsSignIn={todayIsSignIn}
          vipLevel={vipLevel}
        />

        <Notice />

        <Footer
          onClickToSignIn={onClickToSignIn}
          todayIsSignIn={todayIsSignIn}
          vipLevel={vipLevel}
          setCurrentSelectedLevel={setCurrentSelectedLevel}
        />
      </div>
    </Container>
  );
};
