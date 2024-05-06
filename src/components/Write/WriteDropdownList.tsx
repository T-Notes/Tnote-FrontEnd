import styled from 'styled-components';

const SWrapper = styled.div`
  width: 130px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0px 6px 15px 0px #00000033;
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  z-index: 5;
  color: black;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const SList = styled.ul`
  padding: 10px 26px 10px 10px;
  &:hover {
    background-color: #f0ebff;
  }
`;
const SItem = styled.li`
  font-size: 16px;
  color: #2f2f2f;
  font-weight: 500;
  cursor: pointer;
`;
const WriteDropdownList = ({
  onClickOpenModal,
}: {
  onClickOpenModal: (option: string) => void;
}) => {
  const options = ['학급일지', '업무일지', '상담기록', '학생 관찰 일지'];
  const handleClickOpenModal = (option: string) => {
    onClickOpenModal(option);
  };
  return (
    <>
      <SWrapper>
        {options.map((option, idx) => (
          <SList key={idx} onClick={() => handleClickOpenModal(option)}>
            <SItem>{option}</SItem>
          </SList>
        ))}
      </SWrapper>
    </>
  );
};

export default WriteDropdownList;
