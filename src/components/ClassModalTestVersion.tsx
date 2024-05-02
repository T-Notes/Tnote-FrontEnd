import ReactModal from 'react-modal';
import { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import FileUpload from './common/FileUpload';
import WritingModalTop from './Write/WriteModalTop';
import WriteDropdown from './Write/WriteDropdown';

import { SLogsSubmitBtn } from './common/styled/SLogsSubmitBtn';
import { writeFormCustomStyles } from './common/styled/ModalLayout';

// styled //

const SContentLine = styled.div`
  display: flex;
  padding-bottom: 10px;
`;

const SType = styled.div`
  margin-bottom: 20px;
  display: flex;
`;
const STypeBtn = styled.button<{ selected: boolean }>`
  padding: 20px 30px;
  ${({ theme }) => theme.fonts.caption3}
  color: ${(props) => (props.selected ? '#632CFA' : '#000000')};
  border-bottom: ${(props) =>
    props.selected ? '2.5px solid #632CFA' : '2.5px solid #0000004d'};
`;
const SBorderBottom = styled.div`
  padding-top: 20px;
  padding-left: 166.5px;
  border-bottom: 2.5px solid #0000004d;
`;
const SContentWrap = styled.div`
  padding-left: 20px;
  padding-right: 20px;
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

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
}

export default function ClassModalTestVersion({
  isOpen,
  onClose,
  ...props
}: CustomModalProps) {
  const handleClose = () => {
    onClose();
  };

  return (
    <ReactModal
      isOpen={isOpen}
      ariaHideApp={false}
      style={writeFormCustomStyles}
    >
      <WriteDropdown
        label="학급일지"
        options={['업무일지', '상담기록', '학생 관찰 일지']}
        handleClickModal={() => {}}
        closeWriteModal={() => {}}
      />
      <WritingModalTop
        titleLabel={'제목'}
        dateLabel={'기간'}
        onTitleChange={() => {}}
        onStartDateChange={() => {}}
      />

      <SLogsSubmitBtn onClick={() => {}} disabled={false}>
        등록
      </SLogsSubmitBtn>
    </ReactModal>
  );
}
