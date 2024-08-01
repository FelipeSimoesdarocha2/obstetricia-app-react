import React, { useState } from "react";
import styles from "./NavButtons.module.scss";

export interface INavButton {
  name: string;
  type: number;
  active?: boolean;
}

interface INavButtonsProps {
  buttons: INavButton[];
  onClickButton: (button: INavButton) => void;
}

function NavButtons(props: INavButtonsProps) {
  const { buttons, onClickButton } = props;
  const [buttonsState, setButtons] = useState<INavButton[]>(buttons);

  const handleClickButton = (buttonParam: INavButton) => {
    const newButtons = [...buttonsState.map((b) => ({ ...b, active: false }))];

    const button = newButtons.find((b) => b.type === buttonParam.type);

    if (!button) {
      return;
    }

    button.active = true;

    setButtons(newButtons);

    onClickButton(button);
  };

  return (
    <div className={styles.container}>
      {buttonsState.map((button) => (
        <button
          key={button.type}
          type="button"
          className={`${button.active ? styles.active : undefined}`}
          onClick={(e) => {
            e.preventDefault();
            handleClickButton(button);
          }}
        >
          {button.name}
        </button>
      ))}
    </div>
  );
}

export default NavButtons;
