import styled from 'styled-components';
import { IcSmallDatePicker, IcTitle } from '../../assets/icons';
import WriteDatePicker from '../Write/WriteDatePicker';

const SWrapper = styled.div`
  /* border: 1px solid red; */
  padding-left: 10px;

  z-index: 1;
`;
const STitle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  width: 100%;
`;
const SPointText = styled.span`
  color: #632cfa;
`;
const STitleInput = styled.input`
  ${({ theme }) => theme.fonts.caption3}
  border: none;
  padding-left: 10px;
  border-bottom: 1px solid #e8e8e8;
  width: 30.9rem;
  &::placeholder {
    color: #a6a6a6; /* placeholder의 색상 변경 */
  }

  cursor: pointer;
  &:focus {
    border-bottom: 1px solid #632cfa; /* 포커스가 있을 때 보라색으로 변경 */
  }
`;
const STitleLength = styled.div`
  padding-left: 10px;
  padding-right: 30px;
  flex-shrink: 0;
  ${({ theme }) => theme.fonts.caption4}
  color: #A6A6A6;
  /* 포커스가 있을 때 색상 변경 */
  ${STitleInput}:focus-within + & {
    color: #632cfa;
  }
`;
const SLabel = styled.p`
  padding-left: 10px;
  padding-right: 20px;
  flex-shrink: 0;
  ${({ theme }) => theme.fonts.caption3}
`;
const SPeriod = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;
interface EditTitleAndDate {
  titleLabel: string;
  dateLabel: string;
  onTitleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  title: number;
  value: string;
  onDateChange: (startDate: any, endDate: any, isAllDay: boolean) => void;
}
const EditModalTitleAndDate = (props: EditTitleAndDate) => {
  const {
    titleLabel,
    dateLabel,
    onTitleInputChange,
    title,
    value,
    onDateChange,
  } = props;
  return (
    <>
      <SWrapper>
        <STitle>
          <IcTitle />
          <SLabel>
            {titleLabel}
            <SPointText>*</SPointText>
          </SLabel>

          <STitleInput
            type="text"
            maxLength={30}
            placeholder="제목을 입력하세요"
            value={value}
            onChange={onTitleInputChange}
          ></STitleInput>
          <STitleLength>({title} / 30)</STitleLength>
        </STitle>
        <SPeriod>
          <IcSmallDatePicker />
          <SLabel>
            {dateLabel}
            <SPointText>*</SPointText>
          </SLabel>
          <div>
            <WriteDatePicker onStartDateChange={onDateChange} />
          </div>
        </SPeriod>
      </SWrapper>
    </>
  );
};

export default EditModalTitleAndDate;
