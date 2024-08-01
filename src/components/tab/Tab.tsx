import React, { ReactElement, useEffect, useState } from "react";
import CarouselButtons, {
  ICarouselButtonsItem,
} from "../carousel-buttons/CarouselButtons";
import styles from "./Tab.module.scss";

export interface ITabHeadItem {
  id: string;
  name: string;
  active: boolean;
  canClose: boolean;
  ref: any;
  alias?: string;
}

export interface ITabHead {
  main: string;
  items: ITabHeadItem[];
}

interface ITapProps {
  header: ITabHead;
  body: ReactElement;
  transparentContent?: boolean;
  onClickCarouselItem?(item: ICarouselButtonsItem | null): void;
}

function Tab(props: ITapProps) {
  const { header, body, transparentContent, onClickCarouselItem } = props;
  const [headerState, setHeaderState] = useState<ITabHead>({
    items: [],
    main: "",
  });

  useEffect(() => {
    setHeaderState(header);
  }, [header]);

  const handleClickCarouselItem = (item: ICarouselButtonsItem | null) => {
    if (!onClickCarouselItem) {
      return;
    }

    if (item) {
      setHeaderState({ ...headerState });
    }

    onClickCarouselItem(item);
  };

  return (
    <div className={styles.container}>
      {headerState.main ? (
        <div className={styles.main} title={headerState.main}>
          <p>{headerState.main}</p>
        </div>
      ) : null}
      <CarouselButtons
        items={header.items}
        onClickItem={handleClickCarouselItem}
      />

      <div className={styles.body}>
        <div
          className={`${styles.content} ${transparentContent ? styles.transparentContent : ""
            } animate__animated animate__zoomIn`}
            >
          {body}
        </div>
      </div>
    </div>
  );
}

Tab.defaultProps = {
  onClickCarouselItem: undefined,
  transparentContent: false,
};

export default Tab;
