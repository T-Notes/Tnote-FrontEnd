import { Input } from '../common/styled/Input';

interface CareerSectionProps {
  handleCareerInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  career: string;
}
const CareerInputSection = (props: CareerSectionProps) => {
  const { career, handleCareerInputChange } = props;
  return (
    <>
      <Input
        type="text"
        placeholder="연차를 입력해주세요"
        onChange={handleCareerInputChange}
        value={career}
      ></Input>
    </>
  );
};

export default CareerInputSection;
