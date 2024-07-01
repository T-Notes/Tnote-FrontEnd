import styled from 'styled-components';
import { IcDelete } from '../../assets/icons';

const SDelete = styled.button`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 10px 12px 10px 12px;
  gap: 8px;
  border: 1px solid #a6a6a6;
  border-radius: 50px;
  margin-left: 20px;
  .text {
    font-family: Pretendard;
    font-size: 20px;
    font-weight: 500;
    line-height: 23.87px;
    text-align: center;
    color: #a6a6a6;
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
export default function DeleteButton({ onClick }: { onClick: () => void }) {
  return (
    <SDelete onClick={onClick}>
      <p className="text">삭제</p>
      <SDeleteIcon>
        <IcDelete />
      </SDeleteIcon>
    </SDelete>
  );
}
