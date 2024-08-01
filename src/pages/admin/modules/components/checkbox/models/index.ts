export interface ICheckboxProps {
  id: string;
  title: string;
  disabled?: boolean;
  checked?: boolean;
  onChange: (checked: boolean) => void;
}
