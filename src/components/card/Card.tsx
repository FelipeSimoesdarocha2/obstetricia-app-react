import React, { ReactElement } from "react";
import styles from "./Card.module.scss";

interface ICardHeaderProps {
  title: string;
  rightContent: ReactElement | null;
}

interface ICardProps {
  header: ICardHeaderProps;
  body: ReactElement | null | undefined;
  className?: string;
  bodyHeight?: number | string;
  width?: number | string;
  classBody?: string;
}

function Card(props: ICardProps) {
  const { header, body, className, bodyHeight, width, classBody } = props;

  return (
    <div className={`${styles.card} ${className}`} style={{ width }}>
      {header.title || header.rightContent ? (
        <div className={styles.header}>
          <strong>{header.title}</strong>
          <div>{header.rightContent}</div>
        </div>
      ) : null}

      <div
        className={`${styles.body} ${classBody}`}
        style={{ height: bodyHeight }}
      >
        {body}
      </div>
    </div>
  );
}

Card.defaultProps = {
  bodyHeight: null,
  width: null,
  classBody: undefined,
  className: undefined,
};

export default Card;
