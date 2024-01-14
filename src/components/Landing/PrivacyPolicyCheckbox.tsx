import { IcCheckedBox, IcUncheckedBox } from '../../assets/icons';

interface PrivacyPolicyCheckboxProps {
  isChecked: boolean;
  handleCheckboxChange: () => void;
}
const PrivacyPolicyCheckbox = ({
  isChecked,
  handleCheckboxChange,
}: PrivacyPolicyCheckboxProps) => {
  return isChecked ? (
    <IcCheckedBox onClick={handleCheckboxChange} />
  ) : (
    <IcUncheckedBox onClick={handleCheckboxChange} />
  );
};

export default PrivacyPolicyCheckbox;
