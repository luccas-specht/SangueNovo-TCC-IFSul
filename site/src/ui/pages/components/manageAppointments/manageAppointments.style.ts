import styled, { css } from "styled-components";
import { shade } from "polished";

export const Content = styled.main`
  width: 100%;
  max-width: 1400px;
  margin: 64px auto;
  display: flex;
  justify-content: space-between;
`;

export const InfoDaily = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;

  h1 {
    font-family: "Paytone One", sans-serif;
    font-size: 30px;
    font-weight: 400;
    line-height: 35px;
    font-style: normal;
    color: ${({ theme }) => theme.colors.titleColorCampaignCard};
  }
  p {
    margin-top: 8px;
    color: ${(props) => props.theme.colors.primary};
    display: flex;
    align-items: center;
    font-weight: 500;
    font-family: "Paytone One", sans-serif;

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
  max-height: 850px;
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
  margin-top: 7px;
  width: 65%;
  max-height: 850px;

  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  border: 2px solid red;

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
