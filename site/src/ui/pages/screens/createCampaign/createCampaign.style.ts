import { StylesProvider } from "@material-ui/styles";
import styled from "styled-components";
import { device } from "../../../../constants";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.backgroundSecudary};
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  width: 100%;
  height: auto;
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

export const Title = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

export const Box = styled.div`
  height: 550px;
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
  height: 310px;
  align-self: center;
  border-radius: 20px;
`;

export const FormBox = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
`;

export const Map = styled.div`
  width: 60%;
  height: 100%;
  background-color: red;
`;
