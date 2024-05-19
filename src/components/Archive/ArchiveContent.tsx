import styled from 'styled-components';

const SLabel = styled.label`
  font-size: 18px;
  font-weight: 600;
  padding-bottom: 10px;
`;
const STextarea = styled.textarea`
  height: 130px;
  width: 100%;
  color: #a6a6a6;
  overflow-y: scroll;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #a6a6a6;
  background: #ffff;
  margin-bottom: 15px;
  margin-bottom: 30px;
  font-size: 14px;
`;
const STextareaFile = styled(STextarea)`
  height: auto;
`;
interface Archive {
  label: string;
  contentValue: string;
  isFile: boolean;
}
const ArchiveContent = (props: Archive) => {
  const { label, contentValue, isFile } = props;
  return (
    <>
      {isFile ? (
        <>
          <SLabel>{label}</SLabel>
          <STextareaFile readOnly defaultValue={contentValue} />
        </>
      ) : (
        <>
          <SLabel>{label}</SLabel>
          <STextarea readOnly defaultValue={contentValue} />
        </>
      )}
    </>
  );
};

export default ArchiveContent;
