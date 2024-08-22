import styled from 'styled-components';

const SDelete = styled.button`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 10px 12px 10px 12px;
  gap: 8px;
  margin-left: 20px;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 500;
  line-height: 23.87px;
  text-align: center;
  .gray {
    color: #a6a6a6;
  }
  .black {
    color: #171717;
  }
  @media (max-width: 680px) {
    display: none;
  }

  @media (max-width: 767px) {
    .text {
      font-size: 14px;
    }
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    .text {
      font-size: 16px;
    }
  }
  @media (max-width: 720px) {
    font-size: 12px;
  }
`;

const SDeleteIcon = styled.div`
  width: 24px;
  height: 24px;

  @media (min-width: 481px) and (max-width: 767px) {
    width: 18px;
    height: 18px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 20px;
    height: 20px;
  }
`;
interface DeleteButtonProps {
  onClick: () => void;
  isDeleteChecked: number | null;
}
export default function DeleteButton(props: DeleteButtonProps) {
  const { onClick, isDeleteChecked } = props;

  return (
    <SDelete onClick={onClick}>
      <p className={isDeleteChecked ? 'black' : 'gray'}>삭제</p>
    </SDelete>
  );
}
