import styled from 'styled-components';

import { MdRemoveRedEye, BsFillEyeSlashFill } from 'react-icons/all';

export const Container = styled.div`
  background-color: ${({theme}) => theme.colors.backgroundPrimary};
  border-radius: 10px;
  border: 2px solid ${({theme}) => theme.colors.backgroundPrimary};
  padding: 16px;
  width: 100%;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;

  svg {
    margin-right: 16px;
  }
`;

export const Input = styled.input`
  color: ${({ theme }) => theme.colors.text};
  flex: 1;
  background: transparent;
  border: 0;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const CloseEye = styled(MdRemoveRedEye)`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export const OpenEye = styled(BsFillEyeSlashFill)`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;