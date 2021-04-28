import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.backgroundSecudary};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding-left: 25px;
  justify-content: space-between;
`;

export const InputLimit = styled.div`
  width: 225px;
  display: flex;
  height: 100%;
  align-items: center;

  button {
    margin-top: 0px;
  }
`;

export const WrapperButton = styled.div`
  display: flex;
  width: 90%;
  height: 100%;
  padding-top: 22px;
  flex-direction: column;

  & :first-child {
    height: 56px;
  }
`;

export const StyledButton = styled.button`
  border: none;
  background: transparent;
  font-size: 13px;
  line-height: 20px;
  -webkit-text-decoration: underline;
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.text};
`;
