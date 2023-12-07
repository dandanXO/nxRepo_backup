import styled from "styled-components";

export const GameList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;
  margin-top: 16px;
  justify-content: flex-start;
`
