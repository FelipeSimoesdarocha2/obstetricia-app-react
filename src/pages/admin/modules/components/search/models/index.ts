export interface searchProps {
  id?: string;
  title: string;
  value?: string | number;
  placeholder?: string;
  autocomplete?: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onChange: (value: string) => void;
  onEnterPress?: (value: string) => void;
}
