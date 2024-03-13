import { IcClose } from '../../assets/icons';
import styled from 'styled-components';

const SModalTop = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const SDropdownLabel = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  width: auto;
  padding-left: 20px;

  ${({ theme }) => theme.fonts.h4}
`;
interface EditModalHeader {
  onClose: () => void;
  label: string;
}
const EditWriteModalHeader = ({ onClose, label }: EditModalHeader) => {
  return (
    <>
      <SModalTop>
        <SDropdownLabel>
          <IcClose onClick={onClose} className="pointer" />
          <div>{label}</div>
        </SDropdownLabel>
      </SModalTop>
    </>
  );
};

export default EditWriteModalHeader;
