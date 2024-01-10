import styled from 'styled-components';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { modalState } from '../../recoil/atoms/modalState';
import ModalPortal from '../../helpers/ModalPortal';
import { ReactComponent as ImgCloseBtn } from '../../assets/images/imgCloseBtn.svg';
import { ReactComponent as ImgDropdownOpen } from '../../assets/images/imgDropdownOpen.svg';
import { ReactComponent as ImgDropdownClose } from '../../assets/images/imgDropdownClose.svg';

// styled //
const SModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  border: 1px solid var(--Black-Black50, #d5d5d5);
  background-color: #fff;
  padding: 20px;
  border-radius: 20px;
  width: 1100px;
  height: 800px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;
const SModalTop = styled.div`
  display: flex;
  align-items: center;
  .cursor {
    cursor: pointer;
  }
  .hover-color:hover {
    background-color: #e6f6fc;
  }
  .labelBox {
    width: 260px;
    height: 42px;
    display: flex;
    padding: 10px 10px 10px 20px;
    align-items: flex-start;
    gap: 20px;
    border-radius: 8px;
    border: 1px solid var(--Black-Black_60, #a6a6a6);
    background: #fff;
    margin: 24px;

    /* Font/Web_Header_3 */
    color: #000;
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
  .dropdownArrow {
  }
`;
const SDropdownList = styled.ul``;

const SDropdownItem = styled.li``;

interface WritingModalProps {
  children: any;
  label: string;
  options: string[];
  // option1: string;
  // option2: string;
  // option3: string;
  handleDropdownChange: (option: string) => void;
}
const MainModal = ({
  children,
  label,
  options,
  handleDropdownChange,
}: WritingModalProps) => {
  //상태관리 //
  const [modal, setModal] = useRecoilState(modalState);
  const [dropdown, setDropdown] = useState<boolean>(false);

  // 이벤트핸들러 //
  const handleCloseModal = () => {
    setModal({ isOpen: false, content: null });
  };
  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

  return (
    <ModalPortal>
      <SModalOverlay>
        <ModalContent>
          <SModalTop>
            {/* 모달 닫기 버튼 */}
            <ImgCloseBtn className="cursor" onClick={handleCloseModal} />
            {/* 모달 드롭다운 */}
            <div className="labelBox">
              <div>{label}</div>
              <div className="dropdownArrow" onClick={handleDropdown}>
                {dropdown ? <ImgDropdownClose /> : <ImgDropdownOpen />}
              </div>
            </div>
            {dropdown && (
              <SDropdownList>
                {options.map((option) => (
                  <SDropdownItem
                    key={option}
                    onClick={() => {
                      handleDropdownChange(option);
                      setDropdown(false);
                    }}
                  >
                    {option}
                  </SDropdownItem>
                ))}
              </SDropdownList>
            )}
            {/* {dropdown ? (
              <ul>
                <li
                  className="cursor hover-color"
                  onClick={() => handleDropdownChange(option1)}
                >
                  {option1}
                </li>
                <li
                  className="cursor hover-color"
                  onClick={() => handleDropdownChange(option2)}
                >
                  {option2}
                </li>
                <li
                  className="cursor hover-color"
                  onClick={() => handleDropdownChange(option3)}
                >
                  {option3}
                </li>
              </ul>
            ) : null} */}
          </SModalTop>
          {children}
        </ModalContent>
      </SModalOverlay>
    </ModalPortal>
  );
};

export default MainModal;
