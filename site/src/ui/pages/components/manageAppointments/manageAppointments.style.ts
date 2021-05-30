import styled, { css } from "styled-components";
import { shade } from "polished";

export const Content = styled.main`
  width: 100%;
  max-width: 1400px;
  margin: 2.5% auto;
  display: flex;
  justify-content: space-between;
`;

export const InfoDaily = styled.div`
  width: 95%;
  align-self: center;
  height: 80px;
  display: flex;
  justify-content: space-between;

  h1 {
    font-size: 30px;
    font-weight: 900;
    line-height: 35px;
    font-style: normal;
    color: ${({ theme }) => theme.colors.titleColorCampaignCard};
  }
  p {
    margin-top: 8px;
    margin-bottom: 20px;
    color: ${(props) => props.theme.colors.primary};
    display: flex;
    align-items: center;
    font-weight: 900;

    span {
      display: flex;
      align-items: center;
    }

    span + span::before {
      content: "";
      width: 1px;
      height: 12px;
      background: ${(props) => props.theme.colors.primary};
      margin: 0 8px;
    }
  }
`;

export const Ul = styled.ul<{ active: boolean }>`
  padding-top: 10px;
  width: 32%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  li {
    font-size: 25px;
    font-weight: 900;
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
              border-radius: 2px;
              border-bottom: 2.5px solid ${({ theme }) => theme.colors.tabColor};
            }
          `
        : css`
            &:last-child {
              color: ${({ theme }) => theme.colors.tabColor};
              border-radius: 2px;
              border-bottom: 2.5px solid ${({ theme }) => theme.colors.tabColor};
            }
          `}
  }
`;

export const Schedule = styled.div`
  display: flex;
  flex: 1;
  max-height: 840px;
  max-width: 900px;
  flex-direction: column;
  padding: 25px;

  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.backgroundCampaignCard};
  box-shadow: 2px 2px 10px
    ${({ theme }) => theme.colors.colorBoxShadowCampaignCard};
  transition: 1s;
`;

export const WrapperAppointments = styled.div`
  width: 100%;
  max-height: 840px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;

  &::-webkit-scrollbar-track {
    border: transparent;
    padding: 2px 0;
    background-color: transparent;
    margin-top: 60px;
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

export const NextAppointment = styled.div`
  margin-top: 64px;

  strong {
    color: ${({ theme }) => theme.colors.titleColorCampaignCard};
    font-size: 20px;
    font-weight: 400;
  }

  div {
    background: #3e3b47;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-top: 24px;
    position: relative;

    &::before {
      position: absolute;
      height: 80%;
      width: 1px;
      left: 0%;
      top: 10%;
      content: "";
      background: #ff9000;
    }

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      color: #fff;
    }

    span {
      margin-left: auto;
      display: flex;
      align-items: center;
      color: #999591;

      svg {
        color: #ff9000;
        margin-right: 8px;
      }
    }
  }
`;

export const Section = styled.section`
  margin-top: 20px;
  width: 95%;
  align-self: center;

  & + section {
    margin-top: 50px;
  }

  > strong {
    color: ${({ theme }) => theme.colors.titleColor};
    font-size: 20px;
    line-height: 26px;
    border-bottom: 2px solid
      ${({ theme }) => theme.colors.colorBoxShadowCampaignCard};
    display: block;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }

  > p {
    color: #999591;
    font-weight: 900;
  }
`;

export const Appointment = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  & + div {
    margin-top: 16px;
  }

  span {
    margin-left: auto;
    display: flex;
    align-items: center;
    color: #f4ede8;
    width: 70px;

    svg {
      color: #ff9000;
      margin-right: 8px;
    }
  }

  div {
    flex: 1;
    background: #3e3b47;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-left: 24px;

    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
    }

    strong {
      margin-left: 20px;
      color: #fff;
    }
  }
`;

export const Calendar = styled.aside`
  width: 360px;

  .DayPicker {
    border-radius: 10px;
  }
  .DayPicker-wrapper {
    padding-bottom: 0;
    background: #3e3b47;
    border-radius: 10px;
  }
  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }
  .DayPicker-NavButton {
    color: #999591 !important;
  }
  .DayPicker-NavButton--prev {
    right: auto;
    left: 1.5em;
    margin-right: 0;
  }
  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px 0 0 0;
    padding: 16px;
    background-color: #28262e;
    border-radius: 0 0 10px 10px;
  }
  .DayPicker-Caption {
    margin-bottom: 1em;
    padding: 0 1em;
    color: #f4ede8;
    > div {
      text-align: center;
    }
  }
  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }
  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #3e3b47;
    border-radius: 10px;
    color: #fff;
  }
  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, "#3e3b47")};
  }
  .DayPicker-Day--today {
    font-weight: normal;
  }
  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }
  .DayPicker-Day--selected {
    background: #ff9000 !important;
    border-radius: 10px;
    color: #232129 !important;
  }
`;
