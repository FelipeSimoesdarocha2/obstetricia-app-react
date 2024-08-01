// React
import { useState } from 'react';

// Styles
import * as S from './Select.styles';

// Models
import { SelectProps, SelectValueProps, OptionValue } from './models';

const SelectValue = (props: SelectValueProps) => {
  const { id, className, classContainer, value, options, placeholder, title, required, onChange } = props;

  const [invalidRequired, setInvalidRequired] = useState(false);

  const onChangeValue = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value || '';

    if ((!value || value === '-1') && required) {
      setInvalidRequired(true);
    } else {
      setInvalidRequired(false);
    }

    onChange(value);
  };

  return (
    <div className={`select ${classContainer} ${invalidRequired ? 'required' : ''}`}>
      <select id={id} className={className} value={value} required={required} onChange={onChangeValue}>
        {placeholder && <option value="-1">{placeholder}</option>}
        {options?.map((option: OptionValue) => (
          <option key={option.value} value={option.value}>
            {option.description}
          </option>
        ))}
      </select>
      <span dangerouslySetInnerHTML={{ __html: title || '' }} />
    </div>
  );
};

const Select = (props: SelectProps) => {
  const { id, title, icon, className, value, options, placeholder, required, onChange } = props;

  return (
    <S.Component className="selectContainer">
      <div className="label">
        <label htmlFor={id} data-testid={`${id}-label`} dangerouslySetInnerHTML={{ __html: title || '' }} />
      </div>
      <SelectValue
        id={id}
        icon={icon}
        value={value}
        options={options}
        className={className}
        placeholder={placeholder}
        required={required}
        onChange={onChange as (value: string) => void}
      />
    </S.Component>
  );
};

export default Select;
