import React, { useEffect, useRef, useState } from "react";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import CloseIcon from "@mui/icons-material/Close";
import Button from "../button/Button";
import styles from "./CarouselButtons.module.scss";

export interface ICarouselButtonsItem {
  id: string;
  name: string;
  active: boolean;
  canClose: boolean;
  ref: any;
  alias?: string;
}

interface ICarouselButtonsProps {
  items: ICarouselButtonsItem[];
  onClickItem(item: ICarouselButtonsItem | null): void;
}

function CarouselButtons(props: ICarouselButtonsProps) {
  const { items, onClickItem } = props;
  const [itemsState, setItemsState] = useState<ICarouselButtonsItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<ICarouselButtonsItem>(
    items.find((item) => item.active) as ICarouselButtonsItem
  );
  const [lastLength, setLastLength] = useState<number>(0);
  const [showControlButtonState, setShowControlButton] =
    useState<boolean>(false);
  const containerItems = useRef<HTMLDivElement>(null);

  const showControlButton = (
    target: Window,
    itemsParam?: ICarouselButtonsItem[]
  ) => {
    const itemsTarget = itemsParam ?? items;

    if (target.outerWidth < 560 && itemsTarget.length > 1) {
      return true;
    }

    if (target.outerWidth < 712 && itemsTarget.length > 2) {
      return true;
    }

    if (target.outerWidth < 1033 && itemsTarget.length > 3) {
      return true;
    }

    if (target.outerWidth < 1300 && itemsTarget.length > 4) {
      return true;
    }

    if (target.outerWidth >= 1300 && itemsTarget.length > 5) {
      return true;
    }

    return false;
  };

  const scrollRight = () => {
    if (containerItems.current) {
      containerItems.current.scrollLeft += 150;
    }
  };

  const scrollLeft = () => {
    if (containerItems.current) {
      containerItems.current.scrollLeft -= 150;
    }
  };

  useEffect(() => {
    setItemsState(items);

    setShowControlButton(showControlButton(window, items));

    window.onresize = (event: UIEvent) => {
      setShowControlButton(showControlButton(event.target as Window));
    };
  }, [items]);

  useEffect(() => {
    if (itemsState.length > lastLength && containerItems.current) {
      containerItems.current.scrollLeft += itemsState.length * 150;
    }

    setLastLength(itemsState.length);
  }, [itemsState]);

  const selectItem = (item: ICarouselButtonsItem) => {
    const newItems = itemsState.map((i) => {
      const newItem = { ...i };

      if (item.id === i.id) {
        newItem.active = true;
        return newItem;
      }

      newItem.active = false;
      return newItem;
    });

    setItemsState([...newItems]);
    onClickItem(item);
  };

  useEffect(() => {
    if (itemsState.length) {
      selectItem(selectedItem);
      containerItems?.current?.scrollTo({ left: 0 });
    }
  }, [selectedItem]);

  const removeItem = (item: ICarouselButtonsItem) => {
    const newItems = [...itemsState];
    newItems.splice(itemsState.indexOf(item), 1);
    items.splice(items.indexOf(item), 1);
    setItemsState([...newItems]);

    setShowControlButton(showControlButton(window, newItems));

    if (item.active) {
      setSelectedItem(newItems[0]);
    }

    onClickItem(null);
  };

  return (
    <div className={styles.container}>
      {showControlButtonState ? (
        <Button
          name=""
          iconLeft={<KeyboardDoubleArrowLeftIcon />}
          className={styles.commandButtons}
          onClick={scrollLeft}
        />
      ) : null}

      <div className={styles.items} ref={containerItems}>
        {itemsState.map((item) => (
          <div
            className={`${styles.button} animate__animated animate__bounceIn`}
            key={`${item.name}-${item.id}`}
          >
            <Button
              name={item.name}
              active={item.active}
              onClick={(e) => {
                e.preventDefault();
                selectItem(item);
              }}
              className={`${styles.buttonItem} ${
                !item.canClose ? styles.buttonNotClose : ""
              }`}
              type="secondary"
            />
            {item.canClose ? (
              <Button
                iconLeft={<CloseIcon />}
                name=""
                active={item.active}
                type="secondary"
                onClick={(e) => {
                  e.preventDefault();
                  removeItem(item);
                }}
                className={styles.buttonClose}
              />
            ) : null}
          </div>
        ))}
      </div>

      {showControlButtonState ? (
        <Button
          name=""
          iconLeft={<KeyboardDoubleArrowRightIcon />}
          className={styles.commandButtons}
          onClick={scrollRight}
        />
      ) : null}
    </div>
  );
}

export default CarouselButtons;
