import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { IcPen, IcMap, IcPerson } from '../../assets/icons';
import { convertUrlToFile } from '../../utils/convertUrlToFile';
import { getPlanDetailData } from '../../utils/lib/api';
import FileUpload from '../common/FileUpload';
import { Button } from '../common/styled/Button';
import { writeFormCustomStyles } from '../common/styled/ModalLayout';
import { SLogsSubmitBtn } from '../common/styled/SLogsSubmitBtn';
import { CustomModalProps, DateProps } from './ClassLogModal';
import WriteDropdown from './WriteDropdown';
import WritingModalTop from './WriteModalTop';

const SLabel = styled.p`
  padding-left: 10px;
  padding-right: 20px;
  flex-shrink: 0;
  ${({ theme }) => theme.fonts.caption3}
`;
const SPointText = styled.span`
  color: #632cfa;
`;

const SCounseling = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  width: 100%;
`;
const SCounselingTarget = styled.div`
  padding-left: 10px;
  padding-top: 10px;
`;

const SCounselingCategory = styled(Button)<{ selected: boolean }>`
  background-color: ${(props) => (props.selected ? '#7F51FC' : '#ffff')};
  color: ${(props) => (props.selected ? '#ffff' : '#A6A6A6')};
  border-radius: 35px;
  border: 1px solid #a6a6a6;
  padding-top: 7px;
  padding-bottom: 7px;
  padding-left: 10px;
  padding-right: 10px;
  margin-right: 10px;
`;

const STargetCategory = styled(Button)<{ selected: boolean }>`
  background-color: ${(props) => (props.selected ? '#7F51FC' : '#ffff')};
  color: ${(props) => (props.selected ? '#ffff' : '#A6A6A6')};
  border-radius: 35px;
  border: 1px solid #a6a6a6;
  padding-top: 7px;
  padding-bottom: 7px;
  padding-left: 10px;
  padding-right: 10px;
  margin-right: 10px;
`;

const SCounselingCategoryBox = styled.div`
  display: flex;
`;
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
  padding-bottom: 20px;
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

const SScroll = styled.div`
  overflow-y: scroll;
`;
const SCounselingResult = styled.div`
  border: none;
  padding-top: 30px;
  border-top: 1px solid #d5d5d5;
`;
const SPlaceInput = styled.input`
  ${({ theme }) => theme.fonts.caption3}
  border: none;
  border-bottom: 1px solid #e8e8e8;
  width: 450px;
  &::placeholder {
    color: #a6a6a6;
  }
  cursor: pointer;
  &:focus {
    border-bottom: 1px solid #632cfa;
  }
`;
const SPlaceLength = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  flex-shrink: 0;
  ${({ theme }) => theme.fonts.caption4}
  color: #A6A6A6;
  ${SPlaceInput}:focus-within + & {
    color: #632cfa;
  }
`;

const ScheduleLogModal = ({
  isOpen,
  onClose,
  handleClickOpenModal,
  logId,
  scheduleId,
  isEdit,
}: CustomModalProps) => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [counselingResult, setCounselingResult] = useState<string>('');
  const [date, setDate] = useState<DateProps>({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [location, setLocation] = useState<string>('');
  const [participants, setParticipants] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [parentsIsAllDay, setParentsIsAllDay] = useState<boolean>(false);

  const [imgUrl, setImgUrl] = useState<File[]>([]);
  const [fileName, setFileName] = useState<string[]>([]);
  const formData = new FormData();

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  // 자식 컴포넌트에게서 기간 값 가져오기
  const handleDate = (startDate: Date, endDate: Date, isAllDay: boolean) => {
    setDate({
      startDate: startDate,
      endDate: endDate,
    });
    setParentsIsAllDay(isAllDay);
  };
  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value;
    if (content.length <= 3000) {
      setContent(content);
    }
  };
  const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
    const location = e.target.value;
    if (location.length <= 30) {
      setLocation(location);
    }
  };

  const handleParticipantsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const participants = e.target.value;
    if (participants.length <= 30) {
      setParticipants(participants);
    }
  };

  const handleClickSubmit = async () => {
    if (scheduleId) {
      if (isEdit) {
        try {
          const editData = {
            title: title,
            startDate: new Date(
              date.startDate.getTime() -
                date.startDate.getTimezoneOffset() * 60000,
            ),
            endDate: new Date(
              date.endDate.getTime() - date.endDate.getTimezoneOffset() * 60000,
            ),
            location: location,
            contents: content,
            participants: participants,
            isAllDay: parentsIsAllDay,
          };

          // 이미지 파일
          if (imgUrl.length >= 1) {
            for (let i = 0; i < imgUrl.length; i++) {
              formData.append('planImages', imgUrl[i]);
            }
          }

          const jsonDataTypeValue = new Blob([JSON.stringify(editData)], {
            type: 'application/json',
          });
          formData.append('request', jsonDataTypeValue);

          const accessToken = localStorage.getItem('accessToken');

          await axios.put(`https://j9972.kr/tnote/v1/plan/${logId}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${accessToken}`,
              accept: 'application/json',
            },
          });
          window.location.reload();
          onClose();
        } catch (err) {
          if (
            (err as any).response?.data?.message ===
            '해당 기간에 일치하는 학급일지가 존재하지 않습니다.'
          ) {
            window.alert('학기에 해당하는 날짜만 선택할 수 있습니다.');
          }
        }
      } else {
        try {
          const logData = {
            title: title,
            startDate: new Date(
              date.startDate.getTime() -
                date.startDate.getTimezoneOffset() * 60000,
            ),
            endDate: new Date(
              date.endDate.getTime() - date.endDate.getTimezoneOffset() * 60000,
            ),
            location: location,
            contents: content,
            participants: participants,
            isAllDay: parentsIsAllDay,
            color: '#48E113',
          };

          // 이미지 파일
          if (imgUrl.length >= 1) {
            for (let i = 0; i < imgUrl.length; i++) {
              formData.append('planImages', imgUrl[i]);
            }
          }

          const jsonDataTypeValue = new Blob([JSON.stringify(logData)], {
            type: 'application/json',
          });
          formData.append('request', jsonDataTypeValue);

          const accessToken = localStorage.getItem('accessToken');

          await axios.post(
            `https://j9972.kr/tnote/v1/plan/${scheduleId}`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${accessToken}`,
                accept: 'application/json',
              },
            },
          );
          window.location.reload();
          onClose();
        } catch (err) {
          if (
            (err as any).response?.data?.message ===
            '해당 기간에 일치하는 학급일지가 존재하지 않습니다.'
          ) {
            window.alert('학기에 해당하는 날짜만 선택할 수 있습니다.');
          }
        }
      }
    } else {
      Swal.fire({
        title: '학기가 있어야 합니다.',
        text: '학기 추가 혹은 학기 선택을 먼저 해주십시오.',
      });
    }
  };

  const isFormValid = title && date.startDate && date.endDate && content;

  useEffect(() => {
    if (logId && isEdit) {
      getPlanDetailData({ queryKey: ['PLAN', String(logId)] })
        .then((response) => {
          const data = response;
          setTitle(data.title);
          setLocation(data.location);
          setContent(data.contents);
          setParticipants(data.participants);
          setColor(data.color);
          setDate({
            startDate: new Date(data.startDate),
            endDate: new Date(data.endDate),
          });

          const imagePromises = data.images.map((image: any) => {
            return convertUrlToFile(image.url, image.originalFileName);
          });

          Promise.all(imagePromises)
            .then((files) => {
              setImgUrl((prevFiles) => [...prevFiles, ...files]);
            })
            .catch((error) => {
              console.error('Failed to convert image URLs to files:', error);
            });
        })
        .catch((error) => {});
    }
  }, [logId, isEdit]);

  return (
    <ReactModal
      isOpen={isOpen}
      ariaHideApp={false}
      style={writeFormCustomStyles}
    >
      <WriteDropdown
        label="일정"
        options={['학급일지', '업무일지', '상담기록', '학생 관찰 일지']}
        onClickDropdownOpenModal={handleClickOpenModal}
        onClose={onClose}
        isEdit={isEdit}
      />
      <WritingModalTop
        titleLabel={'제목'}
        dateLabel={'기간'}
        onTitleChange={handleTitleChange}
        onStartDateChange={handleDate}
        title={title}
        onStartDate={date.startDate}
        onEndDate={date.endDate}
        isEdit={isEdit}
      />
      {/* 스크롤 내용 */}
      <SScroll>
        <SCounselingTarget>
          <SCounseling>
            <IcMap />
            <SLabel>장소</SLabel>
            <SPlaceInput
              type="text"
              maxLength={30}
              placeholder="장소를 입력하세요"
              value={location}
              onChange={handleLocationChange}
            ></SPlaceInput>
            <SPlaceLength>({location.length} / 30)</SPlaceLength>
          </SCounseling>
          <SCounseling>
            <IcPerson />
            <SLabel>참석자</SLabel>
            <SPlaceInput
              type="text"
              maxLength={30}
              placeholder="참석자를 입력하세요"
              value={participants}
              onChange={handleParticipantsChange}
            ></SPlaceInput>
            <SPlaceLength>({participants.length} / 30)</SPlaceLength>
          </SCounseling>
        </SCounselingTarget>
        <SContentLine>
          <SContentIc>
            <IcPen />
            <SContent>
              내용
              <span>*</span>
            </SContent>
          </SContentIc>
          <SContentLength>( {content.length}/ 3000)</SContentLength>
        </SContentLine>

        <STextarea
          placeholder="텍스트를 입력해주세요"
          value={content}
          onChange={handleContentChange}
        />
        <FileUpload imgUrl={imgUrl} setImgUrl={setImgUrl} />
        <SLogsSubmitBtn onClick={handleClickSubmit} disabled={!isFormValid}>
          등록
        </SLogsSubmitBtn>
      </SScroll>
    </ReactModal>
  );
};

export default ScheduleLogModal;
