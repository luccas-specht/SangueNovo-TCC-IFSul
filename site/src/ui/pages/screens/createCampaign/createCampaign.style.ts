import styled from "styled-components";
import { device } from "../../../../constants";

export const Container = styled.div`
  width: 100%;
  height: 90%;
  margin-top: 10px;
  background-color: ${({ theme }) => theme.colors.backgroundSecudary};
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  width: 100vw;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  display: flex;
  flex-direction: row;

  @media ${device.mobileL()} {
    flex-direction: column;
    width: 350px;
    height: 350px;
    margin: 50% 0;
  }
`;

export const Title = styled.text`
  color: ${({ theme }) => theme.colors.text};
  margin-top: 40px;
  align-self: center;
  font-size: 20px;
`;

export const Box = styled.div`
  height: auto;
  width: 500px;
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.backgroundSecudary};
`;

export const Form = styled.form`
  margin: 20px auto;
  width: 340px;
  height: auto;
  align-self: center;
  border-radius: 20px;
`;

export const FormBox = styled.div`
  width: 50%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
`;

export const Map = styled.div`
  flex: 1;
`;

export const Profile = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  border-radius: 10px;
  border: 1px dashed ${({ theme }) => theme.colors.primary};
  padding: 16px;
  width: 100%;
  color: ${(props) => props.theme.colors.text};
  display: flex;
  align-items: center;
  max-height: 56px;
  margin-bottom: 10px;
  justify-content: center;

  &:hover {
    border: 1px dashed green;
  }

  label {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    cursor: pointer;
  }

  input {
    display: none;
  }
`;
