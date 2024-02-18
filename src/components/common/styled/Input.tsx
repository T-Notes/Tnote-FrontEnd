import styled from 'styled-components';

export const Input = styled.input`
  display: flex;
  width: 550px;
  height: 50px;
  padding: 10px 10px 10px 24px;
  align-items: center;
  gap: 10px;
  border: 1px solid #d5d5d5;
  border-radius: 8px;

  background-color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.black};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray100};
  }
`;

export const SearchInput = styled.input`
  display: flex;
  margin-left: auto;
  width: 300px;
  height: 40px;
  padding: 10px 10px 10px 16px;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border: 1px solid #d5d5d5;
  border-radius: 4px;

  background-color: ${({ theme }) => theme.colors.blue400};
  ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.black};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray600};
  }
`;

export const SDateInput = styled.div`
  display: flex;
  border-bottom: #a6a6a6;
  width: 320px;
  height: 24px;
  padding: 16px 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  text-align: center;
`;
