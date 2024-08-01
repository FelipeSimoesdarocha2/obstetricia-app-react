export interface inputValueProps {
  id?: string;
  info?: string;
  type?: string;
  mask?: string | (string | RegExp)[];
  title?: string;
  value?: string | number;
  checked?: boolean;
  textarea?: boolean;
  required?: boolean;
  className?: string;
  placeholder?: string;
  autocomplete?: string;
  classContainer?: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onChange: (value: string) => void;
  onEnterPress?: (value: string) => void;
}

export interface inputProps {
  id?: string;
  info?: string;
  type?: string;
  mask?: string | (string | RegExp)[];
  title: string;
  value?: string | number;
  checked?: boolean;
  textarea?: boolean;
  required?: boolean;
  className?: string;
  placeholder?: string;
  autocomplete?: string;
  values?: inputValueProps[];
  width?: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onChange?: (value: string) => void;
  onEnterPress?: (value: string) => void;
}
