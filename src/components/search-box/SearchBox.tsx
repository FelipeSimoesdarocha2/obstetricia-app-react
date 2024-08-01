/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
import React, { useEffect, useState } from "react";
import Search from "../search/Search";
import Tag from "../tag/Tag";
import styles from "./SearchBox.module.scss";

export interface ISearchBoxItem {
  id: string;
  name: string;
}

interface ISearchBoxProps {
  search: string;
  items: ISearchBoxItem[];
  label?: string;
  onChange(value: string): void;
  onSelectItem(item: ISearchBoxItem): void;
  onEnterPress(value: string): void;
  onBlur?(value: string): void;
  children?: any;
  onLoading?(isLoading: boolean): void;
}

function SearchBox(props: ISearchBoxProps) {
  const { search, items, label, onChange, onSelectItem, onEnterPress, onBlur, children, onLoading } = props;
  const [itemsState, setItemsState] = useState(items);
  const [searchValue, setSearchValue] = useState(search);

  useEffect(() => {
    setItemsState(items);
  }, [items]);

  useEffect(() => {
    setSearchValue(search);
  }, [search]);

  const selectItem = (item: ISearchBoxItem) => {
    setSearchValue("");
    setItemsState([]);
    onSelectItem(item);
  };

  return (
    <div className={styles.container}>
      <Search
        search={searchValue}
        label={label}
        onChange={onChange}
        onEnterPress={onEnterPress}
        onBlur={onBlur}
        onLoading={onLoading}
      />
      {children && (
        <div className={styles.children}>
          {children}
        </div>
      )}
      <ul className={styles.box}>
        {itemsState.map((item) => (
          <li
            className="animate__animated animate__headShake"
            aria-hidden="true"
            key={item.id}
            onClick={() => selectItem(item)}
          >
            <Tag name={item.name} className={styles.tag} type="secondary" />
          </li>
        ))}
      </ul>
    </div>
  );
}

SearchBox.defaultProps = {
  label: "",
  onBlur: () => ({}),
  children: undefined
};

export default SearchBox;
