import styled from 'styled-components';
import ModalPortal from '../../utils/ModalPortal';
import { useWriteModal } from '../../utils/useHooks/useModal';
import {
  ModalBackground,
  ModalLayout,
  ModalNoBlackBackground,
} from '../common/styled/ModalLayout';
import WriteDropdown from './WriteDropdown';

const SModalLayout = styled(ModalLayout)`
  width: 1100px;
  height: 800px;
`;
interface CloseProps {
  closeModal: () => void;
}
const WorkLogModal = () => {
  const { writeModal, handleClickModal } = useWriteModal();
  return (
    <ModalPortal>
      <ModalNoBlackBackground>
        <SModalLayout>
          <WriteDropdown
            label="업무일지"
            options={['학급일지', '상담기록', '학생 관찰 일지']}
            handleChangeOption={handleClickModal}
            // closeModal={closeModal}
          />
          <div>업무일지 모달이다!!!!!</div>

          {writeModal.isOpen && writeModal.content}
        </SModalLayout>
      </ModalNoBlackBackground>
    </ModalPortal>
  );
};

export default WorkLogModal;
