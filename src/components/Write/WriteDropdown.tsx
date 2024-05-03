import styled from 'styled-components';

import { IcClose, IcOpenDropdown, IcCloseDropdown } from '../../assets/icons';
import { useToggle } from '../../utils/useHooks/useToggle';

// styled //
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
  /* 204px를 rem 단위로 변경 */
  width: auto;
  /* height: 60px; */
  /* border-radius: 8px; */
  padding-left: 20px;
  /* border: 1px solid #a6a6a6; */
  ${({ theme }) => theme.fonts.h4}
`;
const SDropdownToggle = styled.div`
  display: flex;
  margin-left: 10px;
`;
const SDropdownList = styled.ul`
  ${({ theme }) => theme.fonts.caption}
  width: 10rem;
  height: 7.3rem;
  border-radius: 8px;
  border: 1px solid #00000033;
  box-shadow: 0px 6px 15px 0px #00000033;
  background-color: white;
  padding: 4px;
  position: absolute;
  top: calc(100% + 4px); /* SDropdownLabel 아래로 위치 */
  left: 0;
  z-index: 3; /* SDropdownLabel 위에 나타나도록 설정 */
`;

const SDropdownItem = styled.li`
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: #e6f6fc;
    border-radius: 4px;
  }
`;

export interface WritingModalProps {
  label: string;
  options: string[];
  onClickDropdownOpenModal: (option: string) => void;
  closeWriteModal: () => void;
}

const WriteDropdown = (props: WritingModalProps) => {
  const { label, options, onClickDropdownOpenModal, closeWriteModal } = props;

  const { isToggle, handleChangeToggle } = useToggle();
  const handleClickDropdownOpenModal = (option: string) => {
    onClickDropdownOpenModal(option);
  };
  return (
    <SModalTop>
      <IcClose className="pointer" onClick={closeWriteModal} />
      <SDropdownLabel>
        <div>{label}</div>
        <SDropdownToggle onClick={handleChangeToggle}>
          {isToggle ? (
            <IcCloseDropdown className="pointer" />
          ) : (
            <IcOpenDropdown className="pointer" />
          )}
        </SDropdownToggle>

        {isToggle && (
          <SDropdownList>
            {options.map((option) => (
              <SDropdownItem
                key={option}
                onClick={() => {
                  handleClickDropdownOpenModal(option);
                }}
              >
                {option}
              </SDropdownItem>
            ))}
          </SDropdownList>
        )}
      </SDropdownLabel>
    </SModalTop>
  );
};

export default WriteDropdown;
