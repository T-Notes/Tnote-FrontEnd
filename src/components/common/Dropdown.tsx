interface DropdownProps {
  options: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

export const Dropdown = ({
  options,
  selectedValue,
  onSelect,
}: DropdownProps) => {
  return (
    <select value={selectedValue} onChange={(e) => onSelect(e.target.value)}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
