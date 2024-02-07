import ReactModal from 'react-modal';
import styled from 'styled-components';
import { ModalBackground, ModalLayout } from '../common/styled/ModalLayout';
import {
  IcWorkLog,
  IcClassLog,
  IcCounselingLog,
  IcStudentObservationLog,
} from '../../assets/icons';

const SWriteForm = styled(ModalLayout)`
  display: flex;
  flex-wrap: wrap;
  position: fixed;
  left: 14%;
  bottom: 12%;
  width: 300px;
  height: 344px;
  border-radius: 20px;
  padding: 24px, 20px, 20px, 20px;
`;

const SItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-basis: 50%;
`;
const SCaption = styled.p`
  ${({ theme }) => theme.fonts.caption}
`;
interface WriteProps {
  isToggle: boolean;
  handleChangeToggle: () => void;
}
const WriteFormModal = ({ isToggle, handleChangeToggle }: WriteProps) => {
  return (
    <ModalBackground onClick={handleChangeToggle}>
      <SWriteForm>
        <SItem>
          <IcClassLog className="pointer" />
          <SCaption>학급일지</SCaption>
        </SItem>
        <SItem>
          <IcWorkLog className="pointer" />
          <SCaption>업무일지</SCaption>
        </SItem>
        <SItem>
          <IcCounselingLog className="pointer" />
          <SCaption>상담기록</SCaption>
        </SItem>
        <SItem>
          <IcStudentObservationLog className="pointer" />
          <SCaption>학생 관찰 일지</SCaption>
        </SItem>
      </SWriteForm>
    </ModalBackground>
  );
};

export default WriteFormModal;
