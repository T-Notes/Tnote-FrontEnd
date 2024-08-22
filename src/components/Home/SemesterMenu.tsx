import styled from 'styled-components';
import AllSemesterNamesForm from './AllSemesterNamesForm';
import { NoteButton } from '../common/NoteButton';

const SSemesterMenuWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 28px;
`;
const SButton = styled.button`
  font-family: Pretendard;
  font-size: 23px;
  font-weight: 500;
  line-height: 23.87px;
  text-align: left;
  padding: 0px 0px 0px 1.78vw;
  color: #666666;
  cursor: pointer;

  @media (max-width: 1439px) {
    font-size: 23px;
  }

  @media (max-width: 1279px) {
    font-size: 20px;
  }

  @media (max-width: 1023px) {
    font-size: 18px;
  }
`;
const SAddAndSetup = styled.div`
  margin-left: auto;
`;
interface SemesterMenu {
  onClickAddBtn: () => void;
}
const SemesterMenu = ({ onClickAddBtn }: SemesterMenu) => {
  return (
    <SSemesterMenuWrapper>
      <AllSemesterNamesForm />
      <SAddAndSetup>
        {window.location.pathname.includes('home') ? (
          <NoteButton />
        ) : (
          <SButton onClick={onClickAddBtn}>추가</SButton>
        )}
      </SAddAndSetup>
    </SSemesterMenuWrapper>
  );
};

export default SemesterMenu;
