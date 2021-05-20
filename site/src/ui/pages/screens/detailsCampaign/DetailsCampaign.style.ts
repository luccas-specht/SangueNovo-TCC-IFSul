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
  height: 85%;
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
    background-repeat: no-repeat;
    background-size: cover;
    object-fit: cover;
  }

  button {
    max-width: 470px;
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
  width: 70%;
  height: 100px;
  display: flex;
  align-items: center;
  white-space: normal;
  text-align: center;
  overflow: hidden;

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
  font-style: normal;
  font-size: 18px;
  font-weight: 400;
  line-height: 30px;
  color: ${({ theme }) => theme.colors.text};
`;

export const Map = styled.div`
  flex: 1;
  z-index: 5;

  .map-popup .leaflet-popup-content-wrapper {
    background: rgba(255, 255, 255, 0.8);
    border-radius: 20px;
    box-shadow: none;
  }

  .map-popup .leaflet-popup-content {
    color: #0089a5;
    font-size: 18px;
    font-weight: bold;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .map-popup .leaflet-popup-content a {
    width: 40px;
    height: 40px;
    background: #15c3d6;
    box-shadow: 17.2868px 27.6589px 41.4884px rgba(23, 142, 166, 0.16);
    border-radius: 12px;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .map-popup .leaflet-popup-tip-container {
    display: none;
  }
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

export const ContentProgress = styled.div`
  height: 18px;
  width: 80%;
  position: relative;
  display: flex;
  align-self: center;
  align-items: center;
`;

export const Progress = styled.div`
  background-color: #c4c4c4;
  border-radius: 10px;
  height: 100%;
  width: 100%;
  max-width: 450px;
  align-self: flex-start;

  span {
    color: #c4c4c4;
    font-style: normal;
    line-height: 25px;
  }
`;

export const ProgressDone = styled.div`
  background: linear-gradient(
    to left,
    ${({ theme }) => theme.colors.colorProgressBar},
    ${({ theme }) => theme.colors.colorProgressBar}
  );
  border-radius: 10px;
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 0;
  opacity: 0;
  transition: 1s ease 0.3s;

  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 15px;
  color: ${({ theme }) => theme.colors.white};
`;

export const StyledCurrentGoal = styled.text`
  width: 100px;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.colorProgressBar};
  font-family: "Paytone One", sans-serif;
  font-size: 30px;
  align-items: center;
`;
