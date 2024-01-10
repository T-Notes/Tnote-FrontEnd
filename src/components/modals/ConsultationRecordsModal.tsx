import styled from 'styled-components';
import MainModal from './MainModal';
import ClassLogModal from './ClassLogModal';
import WorkLogModal from './WorkLogModal';
import StudentRecordsModal from './StudentRecordsModal';
import { useRecoilState, useRecoilValue } from 'recoil';
import { modalState } from '../../recoil/atoms/modalState';
import WritingModalTop from '../WritingModalTop';
import SubmitBtn from '../SubmitBtn';
import { useState } from 'react';
import { ReactComponent as ImgWritingPeriod } from '../../assets/images/imgWritingPeriod.svg';
import { ReactComponent as ImgContentLogo } from '../../assets/images/imgContentLogo.svg';
import { ReactComponent as ImgTarget } from '../../assets/images/imgTarget.svg';
import WritingContent from '../WritingContent';
import instanceAxios from '../../api/InstanceAxios';
import { startDateState, endDateState } from '../../recoil/atoms/dateState';
import {
  counselingContent,
  counselingValue,
} from '../../recoil/atoms/contentState';

// styled //

const SCounselingField = styled.div`
  display: flex;
`;
const STarget = styled.div`
  display: flex;
`;

const ConsultationRecordsModal = () => {
  const [modal, setModal] = useRecoilState(modalState);
  const startDate = useRecoilValue(startDateState);
  const endDate = useRecoilValue(endDateState);
  // const content = useRecoilValue(contentState);
  const [title, setTitle] = useState<string>('');
  const [counselContent, setCounselContent] = useRecoilState(counselingContent);
  const [counselValue, setCounselValue] = useRecoilState(counselingValue);
  const [contentCount, setContentCount] = useState<number>(0);
  const [valueCount, setValueCount] = useState<number>(0);
  const [counselingField, setCounselingField] = useState<string | null>(null);
  const [counselingTarget, setCounselingTarget] = useState<string | null>(null);
  //드롭다운 클릭한 모달을 열리게 하는 함수
  const handleDropdownChange = (dropdown: string) => {
    const modalContentMap: Record<string, JSX.Element> = {
      업무일지: <WorkLogModal />,
      학급일지: <ClassLogModal />,
      '학생 관찰 일지': <StudentRecordsModal />,
    };

    setModal({ isOpen: true, content: modalContentMap[dropdown] });
  };
  const handleChangeTitle = (newTitle: string) => {
    setTitle(newTitle);
  };
  //상담 내용
  const handleChangeCounselContent = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const newCounselContent = e.target.value;
    setCounselContent({ content: newCounselContent });
    setContentCount(newCounselContent.length);
  };
  //상담 결과
  const handleChangeCounselValue = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const newCounselValue = e.target.value;
    setCounselValue({ content: newCounselValue });
    setValueCount(newCounselValue.length);
  };

  // 상담 분야 클릭
  const handleClickCounselingField = (field: string) => {
    setCounselingField(field);
  };

  // 상담 대상 클릭
  const handleClickCounselingTarget = (target: string) => {
    setCounselingTarget(target);
  };
  const handleSubmit = async () => {
    try {
      await instanceAxios.post('', {
        title,
        startDate,
        endDate,
        counselingField,
        counselingTarget,
        counselContent: counselContent.content,
        counselValue: counselValue.content,
      });
      setModal({ isOpen: false, content: null });
    } catch (err) {
      console.log('err:', err);
    }
  };

  return (
    <MainModal
      label="상담기록"
      options={['학급일지', '업무일지', '학생 관찰 일지']}
      handleDropdownChange={handleDropdownChange}
    >
      <WritingModalTop onTitleChange={handleChangeTitle} />
      {/* modlaContents 추가 */}
      <ImgWritingPeriod />
      <div>상담 분야*</div>
      <SCounselingField>
        {['교우관계', '성적', '가정', '건강', '기타'].map((field) => (
          <div key={field} onClick={() => handleClickCounselingField(field)}>
            {field}
          </div>
        ))}
      </SCounselingField>
      <ImgTarget />
      <div>대상*</div>
      <STarget>
        {['학부모', '학생'].map((target) => (
          <div key={target} onClick={() => handleClickCounselingTarget(target)}>
            {target}
          </div>
        ))}
      </STarget>
      <WritingContent
        size="small"
        name="상담 내용"
        onChange={handleChangeCounselContent}
        characterCount={contentCount}
      />
      <WritingContent
        size="small"
        name="상담 결과"
        onChange={handleChangeCounselValue}
        characterCount={valueCount}
      />
      <SubmitBtn
        background="purple"
        color="white"
        size="small"
        onClick={handleSubmit}
        label="등록"
      />
    </MainModal>
  );
};

export default ConsultationRecordsModal;
