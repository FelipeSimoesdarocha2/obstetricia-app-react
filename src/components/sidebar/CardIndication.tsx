import React, { useState } from 'react';

import indicationIcon from '../../@core/images/indication.svg';

import Indication from '../../pages/indication/Indication';

import styles from './Sidebar.module.scss';

const CardIndication = () => {
  const [open, setOpen] = useState(false);

  const toogle = () => setOpen(!open);

  return (
    <>
      <div className={styles.card}>
        <p>
          Indique um colega e ganhe um mês grátis
        </p>

        <div>
          <button
            className={styles.navigateItem}
            onClick={toogle}
            type="button"
          >
            Indicar
          </button>
          <img src={indicationIcon} alt="" />
        </div>
      </div>
      {open && (<Indication open={open} onClose={toogle} />)}
    </>
  )
}

export default CardIndication;