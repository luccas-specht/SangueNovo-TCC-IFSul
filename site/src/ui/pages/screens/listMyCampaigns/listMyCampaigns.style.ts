import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex: 1;
  height: 90%;
  align-items: flex-start;
`;

export const AnimationContent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 1;
`;

export const AnimationWrapper = styled.div`
  display: flex;
  width: 500px;
  height: 500px;
`;

export const TextInfo = styled.text`
  max-width: 400px;
  font-weight: 400;
  font-size: 18px;
  line-height: 23.5px;
  text-align: center;
`;

export const ContentList = styled.div`
  height: 80%;
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.backgroundSecudary};
  border-top: 2px solid ${({ theme }) => theme.colors.backgroundPrimary};
  border-radius: 10px;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2);
`;

export const Main = styled.main`
  padding-top: 80px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Ul = styled.ul<{ active: boolean }>`
  padding-top: 50px;
  width: 20%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  li {
    line-height: 25px;
  }

  button {
    background: none;
    border: none;
    color: none;

    font-style: normal;
    font-size: 16px;
    line-height: 25px;
    text-align: center;
    font-weight: 900;

    ${({ active }) =>
      active
        ? css`
            &:first-child {
              color: ${({ theme }) => theme.colors.tabColor};
              border-radius: 1px;
              border-bottom: 2px solid ${({ theme }) => theme.colors.tabColor};
            }
          `
        : css`
            &:last-child {
              color: ${({ theme }) => theme.colors.tabColor};
              border-radius: 1px;
              border-bottom: 2px solid ${({ theme }) => theme.colors.tabColor};
            }
          `}
  }
`;
