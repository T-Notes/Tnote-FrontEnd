import styled from 'styled-components';

const SHeader = styled.h1`
  ${({ theme }) => theme.fonts.h3}
`;
const SemesterSetupHeader = () => {
  return (
    <>
      <SHeader>학기 설정</SHeader>
    </>
  );
};

export default SemesterSetupHeader;
