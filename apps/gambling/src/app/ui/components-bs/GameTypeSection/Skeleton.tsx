import styled from "styled-components";
// import Skeleton from 'react-loading-skeleton'
export const Skeleton = styled.div`
  @keyframes waveAnimation {
    0% {
      background-position: -200px 0;
      opacity: 0.2;
    }
    50% {
      opacity: 1;
    }
    100% {
      background-position: calc(200px + 100%) 0;
      opacity: 0.2;
    }
  }

  background: linear-gradient(
    90deg,
    transparent,
    rgba(0, 0, 0, 1),
    transparent
  );
  color: rgba(0, 0, 0, 0);
  overflow: hidden;
  background-size: 200% 100%;
  animation: waveAnimation 2s linear infinite;
  width: 100%;

`
