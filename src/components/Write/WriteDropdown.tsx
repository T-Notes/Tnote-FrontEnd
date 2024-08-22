import styled from 'styled-components';

import {
  IcClose,
  IcOpenDropdown,
  IcCloseDropdown,
  IcEditDisabledDropdown,
} from '../../assets/icons';
import { useToggle } from '../../utils/useHooks/useToggle';

// styled //
const SModalTop = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const SIcClose = styled(IcClose)`
  margin-right: 10px;
`;
const SDropdownLabel = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 10px;
  width: auto;

  ${({ theme }) => theme.fonts.h4}
`;
const DisabledDropdownLabel = styled(SDropdownLabel)`
  border-radius: 8px;
  border: 1px solid #a6a6a6;
  background-color: #e8e8e8;
  pointer-events: none;
  color: #a6a6a6;

  opacity: 0.8;
`;

const SDropdownToggle = styled.div`
  display: flex;
  margin-left: 10px;
`;
const SDropdownList = styled.ul`
  ${({ theme }) => theme.fonts.caption}
  width: 10rem;

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
  onClose: () => void;
  isEdit: boolean;
}

const WriteDropdown = (props: WritingModalProps) => {
  const { label, options, onClickDropdownOpenModal, onClose, isEdit } = props;

  const { isToggle, handleChangeToggle } = useToggle();
  const handleClickDropdownOpenModal = (option: string) => {
    onClickDropdownOpenModal(option);
  };
  return (
    <SModalTop>
      <SIcClose className="pointer" onClick={onClose} />
      {isEdit ? (
        <DisabledDropdownLabel>
          <div>{label}</div>
          <SDropdownToggle onClick={handleChangeToggle}>
            <IcEditDisabledDropdown />
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
        </DisabledDropdownLabel>
      ) : (
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
      )}
    </SModalTop>
  );
};

export default WriteDropdown;
