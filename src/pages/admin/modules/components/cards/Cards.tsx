// React
import { useEffect, useState } from 'react';

// Styles
import * as S from './Cards.styles';

// Models
import { cardsProps } from './models';

// Components
import { Broadcast } from '../broadcast';

const Cards = ({ name, data, value, porcentage }: cardsProps) => {
  const [incomeValue, setIncomeValue] = useState(false);

  useEffect(() => {
    setIncomeValue(porcentage <= 0);
  }, [porcentage]);

  return (
    <S.Component>
      <S.Title className="hero_card">
        <Broadcast name={name} />
        <p>Last {data} days</p>
      </S.Title>
      <S.Content contentProps={incomeValue}>
        <h2>{value}</h2>
        <div className="flex">
          <svg viewBox="0 0 10 10" width={14} height={14}>
            <path d="M0.333496 4.99992L1.156 5.82242L4.41683 2.56742V9.66659H5.5835V2.56742L8.8385 5.82825L9.66683 4.99992L5.00016 0.333252L0.333496 4.99992Z" />
          </svg>
          <p className="first-child">{porcentage}%</p>
          <p>vs last {data} days</p>
        </div>
      </S.Content>
    </S.Component>
  );
};

export default Cards;
