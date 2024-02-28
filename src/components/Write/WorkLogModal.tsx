import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { IcClip, IcMap, IcPen } from '../../assets/icons';
import ModalPortal from '../../utils/ModalPortal';
import { useWriteModal } from '../../utils/useHooks/useModal';
import { Button } from '../common/styled/Button';
import {
  ModalBackground,
  ModalLayout,
  ModalNoBlackBackground,
} from '../common/styled/ModalLayout';
import WriteDropdown from './WriteDropdown';
import WritingModalTop from './WriteModalTop';

const SModalLayout = styled(ModalLayout)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 670px;
  height: 600px;
`;

const STextarea = styled.textarea`
  height: 180px;
  width: 100%;
  overflow-y: scroll;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #a6a6a6;
  background: #ffff;
  margin-bottom: 30px;
`;
const SPlaceContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SSubmit = styled(Button)`
  display: flex;
  margin-left: 40%;
  width: 150px;
  height: 40px;
  padding: 18px 20px;
  background-color: ${({ theme }) => theme.colors.purple100};
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.caption3};
`;

const SType = styled.div`
  border-bottom: 2.5px solid #0000004d;
  margin-bottom: 20px;
`;

const STypeBtn = styled.button`
  padding: 20px 30px;
  ${({ theme }) => theme.fonts.caption3}
`;
const SContentWrap = styled.div`
  padding-left: 20px;
  padding-right: 20px;

  /* border: 1px solid red; */
`;
const SContentIc = styled.div`
  display: flex;
  padding-left: 5px;
  align-items: center;
`;
const SContent = styled.div`
  ${({ theme }) => theme.fonts.caption3}
  padding-left: 5px;
  padding-right: 10px;
  > span {
    color: #632cfa;
  }
`;

const SContentLength = styled.div`
  margin-left: auto;
  padding-right: 5px;
  ${({ theme }) => theme.fonts.caption4};
`;
const SFileUploadInput = styled.input`
  ${({ theme }) => theme.fonts.caption3}
  margin-left: 20px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #e8e8e8;
  width: 400px;
  &::placeholder {
    color: #a6a6a6; /* placeholder의 색상 변경 */
  }
  cursor: pointer;
`;
const SFileWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 30px;
`;
const SFileText = styled.p`
  ${({ theme }) => theme.fonts.caption3}
  padding-left: 5px;
`;
const SUploadBtn = styled(Button)`
  border-radius: 8px;
  width: 80px;
  height: 38px;
  margin-left: auto;
  background-color: ${({ theme }) => theme.colors.gray200};
  ${({ theme }) => theme.fonts.caption3}
`;

const SPlaceInput = styled.input`
  ${({ theme }) => theme.fonts.caption3}
  border: none;
  /* padding-left: 10px; */
  border-bottom: 1px solid #e8e8e8;
  width: 450px;
  &::placeholder {
    color: #a6a6a6; /* placeholder의 색상 변경 */
  }

  cursor: pointer;
  &:focus {
    border-bottom: 1px solid #632cfa; /* 포커스가 있을 때 보라색으로 변경 */
  }
`;
const SPlaceLength = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  flex-shrink: 0;
  ${({ theme }) => theme.fonts.caption4}
  color: #A6A6A6;
  /* 포커스가 있을 때 색상 변경 */
  ${SPlaceInput}:focus-within + & {
    color: #632cfa;
  }
`;
const SPlaceContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;
const SPlace = styled.div`
  padding-left: 5px;
  padding-right: 10px;

  flex-shrink: 0;
  ${({ theme }) => theme.fonts.caption3}

  > span {
    color: #632cfa;
  }
`;

const SScroll = styled.div`
  /* height: 300px; */
  overflow-y: scroll;
`;
interface CloseProps {
  closeModal: () => void;
}
const WorkLogModal = () => {
  const { writeModal, handleClickModal } = useWriteModal();
  const [title, setTitle] = useState<string>(''); //제목 상태
  const [place, setPlace] = useState<string>('');
  const [date, setDate] = useState({
    startDate: '',
    endDate: '',
  });
  const [saveContents, setSaveContents] = useState<string>('');

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };
  // 자식 컴포넌트에게서 기간 값 가져오기
  const dateValue = (startDate: any, endDate: any) => {
    setDate((prevDate) => ({
      ...prevDate,
      startDate: startDate,
      endDate: endDate,
    }));
  };

  const handlePlaceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setPlace(newTitle); // title.length 보여주기 위함
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setSaveContents(e.target.value);
  };
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
          <WritingModalTop
            onTitleChange={handleTitleChange}
            onStartDateChange={dateValue}
          />
          <SScroll>
            <SContentWrap>
              <SType>
                <STypeBtn>회의록</STypeBtn>
              </SType>
              <SPlaceContentWrapper>
                <SPlaceContent>
                  <SContentIc>
                    <IcMap />
                    <SPlace>
                      장소
                      <span>*</span>
                    </SPlace>
                  </SContentIc>
                  <SPlaceInput
                    type="text"
                    maxLength={30}
                    placeholder="장소를 입력하세요"
                    onChange={handlePlaceInputChange}
                  ></SPlaceInput>
                  <SPlaceLength>({place.length} / 30)</SPlaceLength>
                </SPlaceContent>
                <SPlaceContent>
                  <SContentIc>
                    <IcPen />
                    <SContent>
                      내용
                      <span>*</span>
                    </SContent>
                  </SContentIc>
                  <SContentLength>
                    ({saveContents.length} / 3000)
                  </SContentLength>
                </SPlaceContent>
              </SPlaceContentWrapper>

              <STextarea
                placeholder="텍스트를 입력해주세요"
                value={saveContents}
                onChange={handleContentChange}
              />
            </SContentWrap>
            <SFileWrapper>
              <IcClip />
              <SFileText>파일 첨부</SFileText>

              <SFileUploadInput placeholder="2MB 이하의 jpg, png 파일 업로드 가능합니다." />
              <SUploadBtn>업로드</SUploadBtn>
            </SFileWrapper>
            <SSubmit onClick={() => ''}>등록</SSubmit>
          </SScroll>

          {writeModal.isOpen && writeModal.content}
        </SModalLayout>
      </ModalNoBlackBackground>
    </ModalPortal>
  );
};

export default WorkLogModal;
