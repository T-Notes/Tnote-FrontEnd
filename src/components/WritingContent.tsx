import { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as ImgContentLogo } from '../assets/images/imgContentLogo.svg';
import { useRecoilState, useRecoilValue } from 'recoil';
// import { contentState } from '../recoil/atoms/contentState';
interface StyledTextareaProps {
  size?: 'small' | 'large';
}
// styled //
const SContentContainer = styled.textarea<StyledTextareaProps>`
  max-height: 160px;
  overflow-y: scroll;
  padding: 20px 0px 20px 20px;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 10px;
  border-radius: 8px;
  border: 1px solid var(--Black-Black_60, #a6a6a6);
  background: #fff;

  width: 940px;
  height: ${(props) => {
    switch (props.size) {
      case 'small':
        return '160px';
      case 'large':
        return '260px';
    }
  }};
`;
const SContentLine = styled.div`
  display: flex;
`;

interface WritingContentProps {
  name: string;
  size?: 'small' | 'large';
  onChange: any;
  characterCount: number;
}
const WritingContent = ({
  name,
  size,
  onChange,
  characterCount,
}: WritingContentProps) => {
  // const [content, setContent] = useRecoilState(contentState);
  // const [characterCount, setCharacterCount] = useState<number>(0);

  // const handleChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   const newContent = e.target.value;
  //   setCharacterCount(newContent.length);
  // };

  return (
    <div>
      <SContentLine>
        <ImgContentLogo />
        <div>{name}</div>
        <div>({characterCount} / 3000)</div>
      </SContentLine>

      <SContentContainer
        size={size}
        placeholder="텍스트를 입력하세요."
        maxLength={3000}
        onChange={onChange}
      />
    </div>
  );
};

export default WritingContent;
