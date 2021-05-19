import styled from "styled-components";

interface ContentProps {
  color: string;
  high: boolean;
}

export const Container = styled.div`
  width: 100%;
  height: 90%;
  padding-top: 10px;
  display: flex;
`;

export const Content = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Details = styled.main`
  width: 60%;
  margin-top: 50px;
  /* max-width: 600px; */
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0 50px 0;
  background-color: ${({ theme }) => theme.colors.backgroundSecudary};
  border-radius: 10px;
  justify-content: space-between;

  img {
    height: 125px;
    width: 500px;
    border-radius: 10px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  button {
    max-width: 450px;
  }
`;

export const MainInformation = styled.div`
  width: 100%;
  max-width: 500px;
  height: 180px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
`;

export const Agroup = styled.div`
  display: flex;
  width: 80%;
  height: 25%;
  align-items: center;
  justify-content: space-between;
`;

export const Description = styled.div`
  width: 80%;
  height: 180px;
  max-height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  border: 2px solid red;

  strong {
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 23px;
    font-weight: 400px;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const Date = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  span {
    font-family: "Paytone One", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 20px;
    color: ${({ theme }) => theme.colors.titleColorCampaignCard};
  }
`;

export const BloodType = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  span {
    font-style: normal;
    font-weight: 900;
    font-size: 19px;
    line-height: 20px;
    color: ${({ theme }) => theme.colors.errorColor};
  }
`;

export const SubTitle = styled.span`
  font-family: "Paytone One", sans-serif;
  font-style: normal;
  font-size: 18px;
  line-height: 30px;
  color: ${({ theme }) => theme.colors.text};
`;

export const Map = styled.div`
  flex: 1;
  z-index: 5;
`;

export const Title = styled.h1`
  font-family: "Paytone One", sans-serif;
  font-size: 30px;
  font-weight: 400;
  line-height: 35px;
  font-style: normal;
  color: ${({ theme }) => theme.colors.titleColorCampaignCard};
`;

export const ContentPriority = styled.div<ContentProps>`
  width: 110%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-family: "Paytone One", sans-serif;
  font-style: normal;
  font-size: 20px;
  line-height: 26px;
  align-items: center;

  span {
    color: ${({ color }) => color};
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-between;

    svg {
      visibility: ${({ high }) => (high ? "visible" : "hidden")};
      opacity: ${({ high }) => (high ? "1" : "0")};
      margin-left: 10px;
      cursor: pointer;
    }
  }
`;
