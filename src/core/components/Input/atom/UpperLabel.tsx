import styled from "styled-components";
import React from "react";

interface Label { for?: string }
// NOTICE: LeftInputStyle
export const UpperFilledLabel = styled.label<Label>`
  font-weight: 300;
  //position: absolute;
  //top: -20px;
  //left: 20px;
  color: #aaaaaa;
  //line-height: 22px;
  position: relative;
  top: 10px;
  height: 22px;
`;


export const UpperDefaultLabel = styled.label<Label>`
  font-weight: 300;
  //position: absolute;
  //top: -20px;
  //left: 20px;
  color: #aaaaaa;
  line-height: 22px;
`;

// NOTICE: RightInputStyle
export const RightDefaultLabel = styled.label<Label>`
    flex: 1;
    font-size: 17px;
`;
