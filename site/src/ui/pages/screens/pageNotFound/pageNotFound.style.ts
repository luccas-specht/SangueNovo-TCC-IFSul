import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex: 1;
  height: 70%;
  align-self: center;
  align-items: center;
  flex-direction: column;
`;

export const Content = styled.div`
  padding-top: 8%;
  display: flex;
  width: 50%;
`;

export const AnimationWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const StyledText = styled.div`
  font-weight: 550;
  font-size: 30px;
  line-height: 36px;
  color: ${({ theme }) => theme.colors.primary1};
  text-transform: uppercase;
`;
