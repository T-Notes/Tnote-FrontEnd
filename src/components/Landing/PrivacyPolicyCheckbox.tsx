import { IcCheckedBox, IcUncheckedBox } from '../../assets/icons';

interface PrivacyPolicyCheckboxProps {
  isChecked: boolean;
  onCheckboxChange: () => void;
}
const PrivacyPolicyCheckbox = ({
  isChecked,
  onCheckboxChange,
}: PrivacyPolicyCheckboxProps) => {
  return isChecked ? (
    <IcCheckedBox onClick={onCheckboxChange} />
  ) : (
    <IcUncheckedBox onClick={onCheckboxChange} />
  );
};

export default PrivacyPolicyCheckbox;
