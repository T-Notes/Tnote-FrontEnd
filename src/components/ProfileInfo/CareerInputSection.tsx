import { property } from 'lodash';
import styled from 'styled-components';
import { Input } from '../common/styled/Input';

const SInput = styled(Input)`
  margin-top: 20px;
`;

interface CareerSectionProps {
  handleCareerInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  career: string;
}
const CareerInputSection = (props: CareerSectionProps) => {
  const { career, handleCareerInputChange } = props;
  return (
    <>
      <SInput
        type="text"
        placeholder="연차를 입력해주세요"
        onChange={handleCareerInputChange}
        value={career}
      ></SInput>
    </>
  );
};

export default CareerInputSection;
