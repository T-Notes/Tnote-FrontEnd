import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  IcClip,
  IcClose,
  IcPen,
  IcSmallDatePicker,
  IcTitle,
} from '../../assets/icons';
import { getClassLogDetailData, patchClassLog } from '../../utils/lib/api';
import { Button } from '../common/styled/Button';
import { ModalBackground, ModalLayout } from '../common/styled/ModalLayout';
import WriteDatePicker from '../Write/WriteDatePicker';
import WritingModalTop from '../Write/WriteModalTop';

const SModalLayout = styled(ModalLayout)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 670px;
  height: 600px;
`;
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
// 제목기간
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
// 본문내용
const STextarea = styled.textarea`
  height: 180px;
  width: 100%;
  overflow-y: scroll;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #a6a6a6;
  background: #ffff;
  margin-bottom: 15px;
`;
const SContentLine = styled.div`
  display: flex;
  padding-bottom: 10px;
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
  padding-left: 10px;
  align-items: center;
`;
const SContent = styled.div`
  ${({ theme }) => theme.fonts.caption3}
  padding-left: 5px;
  > span {
    color: #632cfa;
  }
`;
const SContentLength = styled.div`
  margin-left: auto;
  padding-right: 5px;
  ${({ theme }) => theme.fonts.caption4};
  color: ${({ theme }) => theme.colors.gray100};
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
  margin-bottom: 25px;
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

interface Edit {
  onClose: () => void;
  logId: string | undefined;
}
interface ClassLog {
  id: number | null;
  title: string;
  startDate: string;
  endDate: string;
  classContents: string;
  magnitude: string;
  plan: string;
  submission: string;
  classLogImageUrls: string[];
}
interface SaveContents {
  학습계획: string;
  수업내용: string;
  제출과제: string;
  진도표: string;
}
const EditClassLogModal = ({ onClose, logId }: Edit) => {
  const formData = new FormData();
  const [title, setTitle] = useState<string>(''); //제목 상태
  const [date, setDate] = useState({
    startDate: '',
    endDate: '',
  });
  const [parentsIsAllDay, setParentsIsAllDay] = useState<boolean>(false);
  const [imgUrl, setImgUrl] = useState<File>();

  const [contentType, setContentType] =
    useState<keyof SaveContents>('학습계획'); //현재 모달에서 어떤 종류의 탭을 입력하고 있는지를 나타낸다.

  const [classLogData, setClassLogData] = useState<ClassLog>({
    id: null,
    title: '',
    startDate: '',
    endDate: '',
    classContents: '',
    magnitude: '',
    plan: '',
    submission: '',
    classLogImageUrls: [''],
  });
  const [saveContents, setSaveContents] = useState<SaveContents>({
    학습계획: '',
    수업내용: '',
    제출과제: '',
    진도표: '',
  }); //각 탭의 타입에 따른 입력된 내용을 저장하는 객체
  const handleContentTypeChange = (type: keyof SaveContents) => {
    setContentType(type);
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setSaveContents((prevSaveContents) => ({
      ...prevSaveContents,
      [contentType]: e.target.value,
    }));
  };
  useEffect(() => {
    const getDetailData = async () => {
      const res = await getClassLogDetailData(logId);
      setClassLogData({
        id: res.data.id,
        title: res.data.title,
        startDate: res.data.startDate.slice(0, 10),
        endDate: res.data.endDate.slice(0, 10),
        classContents: res.data.classContents,
        magnitude: res.data.magnitude,
        plan: res.data.plan,
        submission: res.data.submission,
        classLogImageUrls: res.data.classLogImageUrls,
      });
      setSaveContents({
        학습계획: res.data.plan,
        수업내용: res.data.classContents,
        제출과제: res.data.submission,
        진도표: res.data.magnitude,
      });
    };
    getDetailData();
  }, []);

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };
  const dateValue = (startDate: any, endDate: any, isAllDay: boolean) => {
    setDate((prevDate) => ({
      ...prevDate,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    }));
    setParentsIsAllDay(isAllDay);
  };
  const handleTitleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setClassLogData((prev) => ({
      ...prev,
      title: newTitle,
    }));
    // setTitle(newTitle); // title.length 보여주기 위함
    // onTitleChange(newTitle);
  };

  const handleChangeImg = (e: any) => {
    const file = e.target.files[0];
    console.log('file', file);
    setImgUrl(file);
    formData.append('classLogImages', file);
  };

  const handleEdit = async () => {
    try {
      const logData = {
        title: classLogData.title,
        startDate: date.startDate,
        endDate: date.endDate,
        plan: saveContents.학습계획,
        classContents: saveContents.수업내용,
        submission: saveContents.제출과제,
        magnitude: saveContents.진도표,
        isAllDay: parentsIsAllDay, // 종일 버튼 로직 추가하기
      };
      const jsonDataTypeValue = new Blob([JSON.stringify(logData)], {
        type: 'application/json',
      });
      formData.append('classLogUpdateRequestDto', jsonDataTypeValue);

      if (imgUrl) {
        formData.append('classLogImages', imgUrl);
      }

      const accessToken = localStorage.getItem('accessToken');

      await axios.patch(`http://j9972.kr/tnote/classLog/${logId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
          accept: 'application/json',
        },
      });
    } catch {}
  };
  return (
    <ModalBackground>
      <SModalLayout>
        <SModalTop>
          <SDropdownLabel>
            <IcClose onClick={onClose} className="pointer" />
            <div>학급일지</div>
          </SDropdownLabel>
        </SModalTop>
        <SWrapper>
          <STitle>
            <IcTitle />
            <SLabel>
              제목
              <SPointText>*</SPointText>
            </SLabel>

            <STitleInput
              type="text"
              maxLength={30}
              placeholder="제목을 입력하세요"
              onChange={handleTitleInputChange}
              value={classLogData.title}
            ></STitleInput>
            <STitleLength>({classLogData.title.length} / 30)</STitleLength>
          </STitle>
          <SPeriod>
            <IcSmallDatePicker />
            <SLabel>
              기간
              <SPointText>*</SPointText>
            </SLabel>
            <div>
              <WriteDatePicker onStartDateChange={dateValue} />
            </div>
          </SPeriod>
        </SWrapper>
        <SContentWrap>
          <SType>
            <STypeBtn onClick={() => handleContentTypeChange('학습계획')}>
              학습계획
            </STypeBtn>
            <STypeBtn onClick={() => handleContentTypeChange('수업내용')}>
              수업내용
            </STypeBtn>
            <STypeBtn onClick={() => handleContentTypeChange('제출과제')}>
              제출과제
            </STypeBtn>
            <STypeBtn onClick={() => handleContentTypeChange('진도표')}>
              진도표
            </STypeBtn>
          </SType>
          {contentType && (
            <>
              <SContentLine>
                <SContentIc>
                  <IcPen />
                  <SContent>
                    내용
                    <span>*</span>
                  </SContent>
                </SContentIc>
                <SContentLength>
                  ({saveContents[contentType].length} / 3000)
                </SContentLength>
              </SContentLine>
              <STextarea
                placeholder="텍스트를 입력해주세요"
                value={saveContents[contentType]}
                onChange={handleContentChange}
              />
            </>
          )}
        </SContentWrap>
        <SFileWrapper>
          <IcClip />
          <SFileText>파일 첨부</SFileText>
          <SFileUploadInput
            placeholder="2MB 이하의 jpg, png 파일 업로드 가능합니다."
            type="file"
            onChange={handleChangeImg}
          />
          <SUploadBtn>업로드</SUploadBtn>
        </SFileWrapper>
        <SSubmit onClick={handleEdit}>등록</SSubmit>
      </SModalLayout>
    </ModalBackground>
  );
};

export default EditClassLogModal;
