export interface InputDateProps {
    id: string;
    title: string;
    info?: string;
    value?: string;
    width?: string;
    required?: boolean;
    icon?: string | null;
    onChange: (value: string) => void;
}
