interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function SingleCheckbox({ checked, onChange }: CheckboxProps) {
  return (
    <label>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
    </label>
  );
}
