import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./Tag.module.scss";

interface ITagProps {
  name: string;
  type: "primary" | "secondary";
  canClose?: boolean;
  onClose?: () => void;
  className?: string;
}

function Tag(props: ITagProps) {
  const { name, type, canClose, className, onClose } = props;

  const close = () => {
    if (!onClose) {
      return;
    }

    onClose();
  };

  return (
    <div className={styles.container}>
      <span className={`${styles.tag} ${styles[type]} ${className}`}>
        {name}

        {canClose ? (
          <span
            className={styles.btnClose}
            aria-hidden
            onClick={(_) => close()}
          >
            <CloseIcon />
          </span>
        ) : null}
      </span>
    </div>
  );
}

Tag.defaultProps = {
  canClose: false,
  className: "",
  onClose: () => ({}),
};

export default Tag;
