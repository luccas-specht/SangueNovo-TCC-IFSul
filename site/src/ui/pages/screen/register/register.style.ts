import styled, { keyframes, css } from 'styled-components';

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

const Context = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  place-content: center;
  width: 100%;
  max-width: 800px;
`;

const ImgBackground = styled.div`
  flex: 1;
  background: url(${props => props.theme.imageBackground}) no-repeat center;
  background-size: cover;
`;

const appearFromRight = keyframes`
  from{
    opacity: 0;
    transform: translateX(50px);
  }
  to{
    opacity: 1;
    transform: translateX(0);
  }
`;

const AnimationContext = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${appearFromRight} 1.2s;
`;

const Tab = styled.ul`
  display: flex;
  color: ${props => props.theme.colors.text};
  width: 55%;
  justify-content: space-between;
  height: 25px;
  margin-top: 20px;
`;

interface TabsProps {
  isActive: boolean
}

const Tabs = styled.li<TabsProps>`
    cursor: pointer;
    ${props => props.isActive && css`
      border-radius: 2px;
      border-bottom: 3px solid red;
    `}
`;

export { 
    Container, 
    Context, 
    ImgBackground, 
    AnimationContext,
    Tab,
    Tabs };