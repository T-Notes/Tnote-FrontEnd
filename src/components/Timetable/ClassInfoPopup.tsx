import { useState } from 'react';
import { useParams } from 'react-router-dom';
import instanceAxios from '../../utils/InstanceAxios';
import ClassInfoPopupData from './ClassInfoPopupData';

import {
  ModalLayout,
  ModalBackground,
} from '../../components/common/styled/ModalLayout';
import styled from 'styled-components';

const SModalBackground = styled(ModalBackground)`
  background: none;
`;
const SModalLayout = styled(ModalLayout)`
  width: 510px;
  height: 270px;
`;

interface ToggleProps {
  handleToggle: () => void;
}
const ClassInfoPopup = ({ handleToggle }: ToggleProps) => {
  const [subject, setSubject] = useState<string>('');
  const [classTime, setClassTime] = useState<string>('');
  const [classLocation, setClassLocation] = useState<string>('');
  const [memo, setMemo] = useState<string>('');

  const subjects = [
    {
      id: 2,
      subjectName: '물리',
      classTime: '월요일 09:00~09:50',
      classLocation: '3학년 1반(3F)',
      memo: '힘내자',
    },
  ];

  const handleDelete = (id: number) => {
    console.log('삭제됐다!');
    instanceAxios.delete(`/tnote/subjects/${id}`);
  };

  const handleUpdate = (id: number) => {
    console.log('수정 완료!');
    //api 나오면 수정
  };
  return (
    <SModalBackground>
      <SModalLayout>
        {subjects.map((data) => (
          <ClassInfoPopupData
            key={data.id}
            subject={data.subjectName}
            classTime={data.classTime}
            ClassLocation={data.classLocation}
            memo={data.memo}
            onClose={handleToggle}
            onDelete={() => handleDelete(data.id)}
            onUpdate={() => handleUpdate(data.id)}
          />
        ))}
      </SModalLayout>
    </SModalBackground>
  );
};

export default ClassInfoPopup;
