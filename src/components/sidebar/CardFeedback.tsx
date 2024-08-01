import React, { useState } from 'react';

import feedback from "../../@core/images/feedback.svg";

import Feedback from '../../pages/feedback/Feedback';

import styles from "./Sidebar.module.scss";

const CardFeedback = () => {
  const [open, setOpen] = useState(false);

  const toogle = () => setOpen(!open);

  return (
    <>
      <div className={styles.card}>
        <p>
          Sua opinião é importante para nós!
        </p>

        <div>
          <button
            className={styles.navigateItem}
            onClick={toogle}
            type="button"
          >
            Responder
          </button>
          <img src={feedback} alt="" />
        </div>
      </div>
      {open && (<Feedback open={open} onClose={toogle} />)}
    </>
  )
}

export default CardFeedback;