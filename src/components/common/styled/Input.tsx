import styled from 'styled-components';

export const Input = styled.input`
  display: flex;
  width: 550px;
  height: 60px;
  padding: 10px 10px 10px 24px;
  align-items: center;
  gap: 10px;
  border: 1px solid #d5d5d5;

  background-color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.button1};
  color: ${({ theme }) => theme.colors.black};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray100};
  }
`;
