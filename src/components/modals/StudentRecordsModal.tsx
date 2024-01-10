import MainModal from './MainModal';
import ClassLogModal from './ClassLogModal';
import WorkLogModal from './WorkLogModal';
import ConsultationRecordsModal from './ConsultationRecordsModal';
import { useRecoilState, useRecoilValue } from 'recoil';
import { startDateState, endDateState } from '../../recoil/atoms/dateState';
import {
  observationContent,
  guidancePlanContent,
} from '../../recoil/atoms/contentState';
import { modalState } from '../../recoil/atoms/modalState';
import WritingModalTop from '../WritingModalTop';
import { useState } from 'react';
import WritingContent from '../WritingContent';
import SubmitBtn from '../SubmitBtn';
import instanceAxios from '../../api/InstanceAxios';

const StudentRecordsModal = () => {
  const [modal, setModal] = useRecoilState(modalState);
  const [observations, setObservations] = useRecoilState(observationContent);
  const [guidancePlan, setGuidancePlan] = useRecoilState(guidancePlanContent);
  const [title, setTitle] = useState<string>('');
  const startDate = useRecoilValue(startDateState);
  const endDate = useRecoilValue(endDateState);
  const [observationsCount, setObservationsCount] = useState<number>(0);
  const [guidancePlanCount, setGuidancePlanCount] = useState<number>(0);

  // 이벤트 핸들러 //
  const handleChangeTitle = (newTitle: string) => {
    setTitle(newTitle);
  };

  const handleChangeObservations = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const newObservations = e.target.value;
    setObservations({ content: newObservations });
    setObservationsCount(newObservations.length);
  };

  const handleChangeGuidancePlan = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const newGuidancePlan = e.target.value;
    setGuidancePlan({ content: newGuidancePlan });
    setGuidancePlanCount(newGuidancePlan.length);
  };

  const handleDropdownChange = (dropdown: string) => {
    const modalContentMap: Record<string, JSX.Element> = {
      업무일지: <WorkLogModal />,
      상담기록: <ConsultationRecordsModal />,
      학급일지: <ClassLogModal />,
    };

    setModal({ isOpen: true, content: modalContentMap[dropdown] });
  };

  const handleSubmit = async () => {
    try {
      await instanceAxios.post('', {
        title,
        startDateState,
        endDate,
        observations: observationContent,
        guidancePlan: guidancePlanContent,
      });
      setModal({ isOpen: false, content: null });
    } catch (err) {
      console.log('err:', err);
    }
  };
  return (
    // <div>학생 관찰 기록</div>
    <MainModal
      label="학생 관찰 일지"
      options={['학급일지', '업무일지', '상담기록']}
      handleDropdownChange={handleDropdownChange}
    >
      <WritingModalTop onTitleChange={handleChangeTitle} />
      <WritingContent
        size="small"
        name="관찰 내용"
        onChange={handleChangeObservations}
        characterCount={observationsCount}
      />
      <WritingContent
        size="small"
        name="해석 및 지도방안"
        onChange={handleChangeGuidancePlan}
        characterCount={guidancePlanCount}
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

export default StudentRecordsModal;
