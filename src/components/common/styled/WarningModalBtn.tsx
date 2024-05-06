import styled from 'styled-components';

import { Button } from './Button';

const SConfirmBtn = styled(Button)`
  width: 270px;
  height: 60px;
  padding: 18px 20px;
  background-color: ${({ theme }) => theme.colors.purple100}; // active

  color: ${({ theme }) => theme.colors.white}; // active
  ${({ theme }) => theme.fonts.button1}
`;

const SYesNoBtn = styled(Button)`
  width: 110px;
  height: 60px;
  padding: 18px 20px;
  ${({ theme }) => theme.fonts.button1}
`;
const SYesBtn = styled(SYesNoBtn)`
  background-color: ${({ theme }) => theme.colors.purple100}; // active

  color: ${({ theme }) => theme.colors.white}; // active
`;

const SNoBtn = styled(SYesNoBtn)`
  margin-right: 20px;
  background-color: ${({ theme }) => theme.colors.gray200}; // active

  color: ${({ theme }) => theme.colors.black}; // active
`;

const SButtonBox = styled.div`
  display: flex;
`;

interface WarningModalBtnProps {
  confirm: boolean;
  yesNo: boolean;
  onClickWarningBtn: () => void;
}
const WarningModalBtn = ({
  confirm,
  yesNo,
  onClickWarningBtn,
}: WarningModalBtnProps) => {
  return (
    <>
      {confirm && <SConfirmBtn onClick={onClickWarningBtn}>확인</SConfirmBtn>}
      {/* {yesNo && (
        <SButtonBox>
          <SNoBtn onClick={onClickWarningBtn}>아니요</SNoBtn>
          <SYesBtn onClick={onClickWarningBtn}>네</SYesBtn>
        </SButtonBox>
      )} */}
    </>
  );
};

export default WarningModalBtn;
