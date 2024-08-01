export interface OptionValue {
    value: string;
    description: string;
}

export interface SelectValueProps {
    id: string;
    className?: string;
    title?: string;
    required?: boolean;
    placeholder?: string;
    icon?: string | null;
    classContainer?: string;
    options?: OptionValue[];
    value?: string | number;
    onChange: (value: string) => void;
}

export interface SelectProps {
    id: string;
    title: string;
    info?: string;
    width?: string;
    required?: boolean;
    className?: string;
    placeholder?: string;
    icon?: string | null;
    options?: OptionValue[];
    value?: string | number;
    onChange?: (value: string) => void;
}

