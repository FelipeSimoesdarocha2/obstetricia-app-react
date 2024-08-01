// React
import { useState } from 'react';

// Icons
import vector from './icons/vector.svg';

// Styles
import * as S from './Filter.styles';

const Filter = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <S.Component onClick={handleClick} className={isOpen ? `${"active"}` : ""}>
      <p>All</p>
      <img src={vector} alt="icon" />
    </S.Component>
  );
};

export default Filter;
