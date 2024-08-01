export interface IButtonProps {
  label: string;
  active?: boolean;
  className?: string;
  loading?: boolean;
  isSubmit?: boolean;
  disabled?: boolean;
  type?: 'primary' | 'secondary';
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
