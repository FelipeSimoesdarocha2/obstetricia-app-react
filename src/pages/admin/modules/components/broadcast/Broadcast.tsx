// React
import * as React from 'react';

// Styles
import * as S from './Broadcast.styles';

// Models
import { BroadcastProps } from './models';

const Broadcast = ({ name }: BroadcastProps) => {
  return (
    <S.Component>
      <h2>{name}</h2>
    </S.Component>
  );
};

export default Broadcast;
