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

const SIcClassLog = styled(IcClassLog)`
  &:hover #isDisableFill {
    fill: #9b78fb;
  }
  &:hover #isDisableStroke {
    stroke: white;
  }
`;
const SIcWorkLog = styled(IcWorkLog)`
  &:hover #isDisableFill {
    fill: #9b78fb;
  }
  &:hover #isDisableStroke {
    stroke: white;
  }
`;
const SIcCounselingLog = styled(IcCounselingLog)`
  &:hover #isDisableFill {
    fill: #9b78fb;
  }
  &:hover #isDisableStroke {
    stroke: white;
  }
`;

const SIcStudentObservationLog = styled(IcStudentObservationLog)`
  &:hover #isDisableFill {
    fill: #9b78fb;
  }
  &:hover #isDisableStroke {
    stroke: white;
  }
`;

interface WriteProps {
  closeWriteFormModal: () => void;
  handleClickModal: (openModalContent: string) => void;
}

const WriteFormModal = ({
  closeWriteFormModal,
  handleClickModal,
}: WriteProps) => {
  return (
    <ModalBackground onClick={closeWriteFormModal}>
      <SWriteForm onClick={(e: any) => e.stopPropagation()}>
        <SItem>
          <SIcClassLog
            className="pointer"
            onClick={() => handleClickModal('학급일지')}
          />
          <SCaption>학급일지</SCaption>
        </SItem>
        <SItem>
          <SIcWorkLog
            className="pointer"
            onClick={() => handleClickModal('업무일지')}
          />
          <SCaption>업무일지</SCaption>
        </SItem>
        <SItem>
          <SIcCounselingLog
            className="pointer"
            onClick={() => handleClickModal('상담기록')}
          />
          <SCaption>상담기록</SCaption>
        </SItem>
        <SItem>
          <SIcStudentObservationLog
            className="pointer"
            onClick={() => handleClickModal('학생 관찰 일지')}
          />
          <SCaption>학생 관찰 일지</SCaption>
        </SItem>
      </SWriteForm>
    </ModalBackground>
  );
};

export default WriteFormModal;
