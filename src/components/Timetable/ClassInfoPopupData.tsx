import { IcClose } from '../../assets/icons';

interface ClassInfoDataProps {
  subject: string;
  classTime: string;
  ClassLocation: string;
  memo: string;
  onClose: () => void;
  onDelete: () => void;
  onUpdate: () => void;
}

const ClassInfoPopupData = ({
  subject,
  classTime,
  ClassLocation,
  memo,
  onClose,
  onDelete,
  onUpdate,
}: ClassInfoDataProps) => {
  return (
    <>
      <div>{subject} 수업</div>
      <IcClose onClick={onClose} className="pointer" />
      <br />
      <br />
      <label>일시</label>
      <p>{classTime}</p>
      <br />
      <label>장소</label>
      <p>{ClassLocation}</p>
      <br />
      <label>메모</label>
      <p>{memo}</p>
      <br />
      <button onClick={onDelete}>삭제</button>
      <button onClick={onUpdate}>수업 수정</button>
    </>
  );
};

export default ClassInfoPopupData;
