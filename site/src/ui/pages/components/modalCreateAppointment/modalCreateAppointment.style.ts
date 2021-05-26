import styled from "styled-components";
import { shade } from "polished";

export const ConatinerInsideModal = styled.form`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
`;

export const StyledCheckBox = styled.div`
  width: 100%;
  height: 30px;

  display: flex;
  align-items: center;

  color: #666360;

  font-size: 15px;
  line-height: 18px;

  input {
    width: 20px;
    height: 20px;
    cursor: pointer;
    margin-right: 10px;
  }
`;

export const WrapperTerms = styled.div`
  width: 100%;
  max-height: 280px;
  align-self: center;
  margin-top: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;

  border-radius: 5px;
  box-shadow: 0px 0px 4px -1.5px rgba(0, 0, 0, 0.8);

  &::-webkit-scrollbar-track {
    border: transparent;
    padding: 2px 0;
    background-color: transparent;
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 6px ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => shade(-0.6, theme.colors.text)};
  }
`;

export const ContentTerms = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-left: 10px;
  padding-top: 10px;
  color: #666360;

  ul {
    font-family: "Paytone One", sans-serif;
    font-size: 18px;
    line-height: 20px;

    strong {
      font-weight: normal;
    }
  }

  li {
    cursor: default;
    color: #666360;
    max-width: 550px;
    text-align: left;
    margin-top: 5px;
    font-size: 15px;
    line-height: 18px;
  }
`;

export const ModalTitle = styled.div`
  display: flex;
  align-items: flex-start;

  span {
    font-family: "Paytone One", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 20px;
    color: ${({ theme }) => theme.colors.titleColorCampaignCard};
  }
`;

export const WrapperButton = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 60px;
  padding-top: 10px;

  button {
    margin-top: 0;
    min-height: 56px;
    max-width: 60%;
  }
`;

export const StyledInputTime = styled.div`
  display: flex;
  align-self: center;
  margin-top: 10px;
  width: 80%;
  padding: 16px;
  display: flex;

  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  border-radius: 10px;
  border: 2px solid ${({ theme }) => theme.colors.backgroundPrimary};

  color: ${(props) => props.theme.colors.text};
  height: 56px;
  transition: 1s;

  input {
    color: ${({ theme }) => theme.colors.text};
    display: flex;

    flex-direction: row-reverse;
    flex: 1;
    background: transparent;
    border: 0;
    margin-left: -15px;
    cursor: pointer;
  }
`;
