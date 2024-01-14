import { IcCheckedBox, IcUncheckedBox } from '../../assets/icons';

interface PrivacyPolicyCheckboxProps {
  isChecked: boolean;
  onClick: () => void;
}
const PrivacyPolicyCheckbox = ({
  isChecked,
  onClick,
}: PrivacyPolicyCheckboxProps) => {
  return isChecked ? (
    <IcCheckedBox onClick={onClick} />
  ) : (
    <IcUncheckedBox onClick={onClick} />
  );
};

export default PrivacyPolicyCheckbox;
