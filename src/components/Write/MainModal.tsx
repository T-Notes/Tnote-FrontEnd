import styled from 'styled-components';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { logModalState } from '../../utils/lib/atom';
import ModalPortal from '../../utils/ModalPortal';
import { ModalBackground, ModalLayout } from '../common/styled/ModalLayout';
import { IcClose } from '../../assets/icons';
// import ModalPortal from '../../helpers/ModalPortal';
// import { ReactComponent as ImgCloseBtn } from '../../assets/images/imgCloseBtn.svg';
// import { ReactComponent as ImgDropdownOpen } from '../../assets/images/imgDropdownOpen.svg';
// import { ReactComponent as ImgDropdownClose } from '../../assets/images/imgDropdownClose.svg';

// styled //

const SModalLayout = styled(ModalLayout)`
  width: 1100px;
  height: 800px;
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
  handleDropdownChange: (option: string) => void;
  closeModal: () => void;
}
interface ModalProps {
  isOpen: boolean;
  content: React.ReactNode | null;
}
const MainModal = ({
  children,
  label,
  options,
  handleDropdownChange,
  closeModal,
}: WritingModalProps) => {
  //상태관리 //
  // const [modal, setModal] = useRecoilState(logModalState);
  const [modal, setModal] = useState<ModalProps>({
    isOpen: false,
    content: null,
  });
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
      <ModalBackground>
        <SModalLayout>
          <SModalTop>
            {/* 모달 닫기 버튼 */}
            <IcClose className="cursor" onClick={closeModal} />
            {/* 모달 드롭다운 */}
            <div className="labelBox">
              <div>{label}</div>
              <div className="dropdownArrow" onClick={handleDropdown}>
                {dropdown ? '^' : 'v'}
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
          </SModalTop>
          {children}
        </SModalLayout>
      </ModalBackground>
    </ModalPortal>
  );
};

export default MainModal;

// main modal의 역할을 명확하게 하자. 디자인의 요소는 여기에 있으면 공통으로 다루기 힘들다.
// 드롭다운 컴포넌트를 따로 만들거나 하자. (공통 컴포넌트로 만들 수 있을까?) WriteFormModal과 기능은 비슷한데..
//
