interface DropdownProps {
  options: any[];
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
        <option key={option.id} value={option.name}>
          {option.name}
        </option>
      ))}
    </select>
  );
};
