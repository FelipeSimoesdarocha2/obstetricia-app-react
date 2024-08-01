// React
import * as React from 'react';

// Styles
import * as S from './Checkbox.styles';

// Models
import { ICheckboxProps } from './models';

const Checkbox = ({ id, disabled, checked, onChange }: ICheckboxProps) => {
  const handleOnChange = () => {
    onChange(!checked);
  };

  return (
    <S.Component>
      <input id={id} type="checkbox" onChange={handleOnChange} disabled={disabled} checked={checked} />
    </S.Component>
  );
};

export default Checkbox;
