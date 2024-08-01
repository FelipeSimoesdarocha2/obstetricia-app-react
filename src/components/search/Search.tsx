/* eslint-disable react/require-default-props */
import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useDebouncedCallback } from 'use-debounce'
import CircularProgress from '@mui/material/CircularProgress';
import styles from "./Search.module.scss";
import Input from "../input/Input";


interface ISearchProps {
  search: string;
  label?: string;
  onChange(value: string): void;
  onEnterPress?(value: string): void;
  onBlur?(value: string): void;
  onLoading?(isLoading: boolean): void;
}

function Search(props: ISearchProps) {
  const { search, label, onChange, onEnterPress, onBlur, onLoading } = props;

  const [value, setValue] = useState(search);

  const [loading, setLoading] = useState(false);

  const handleLoading = (isLoading: boolean) => {
    setLoading(isLoading);
    onLoading?.(isLoading);
  }

  const debounceOnChange = useDebouncedCallback(async (value: string) => {
    await onChange(value)

    handleLoading(false);
  }, 500);

  const renderIcon = () => {
    if (loading) {
      return <CircularProgress size={22} sx={{color: '#3E6C75'}} />
    }

    return <SearchIcon />
  }

  const handleOnChange = (value: string) => {
    setValue(value);
    handleLoading(true);
    debounceOnChange(value);
  }

  useEffect(() => {
    setValue(search)
  }, [search])

  return (
    <div className={styles.container}>
      <Input
        type="text"
        id="search-box"
        icon={renderIcon()}
        label={label ?? ""}
        value={value}
        placeholder="Pesquisar"
        onChange={handleOnChange}
        onEnterPress={onEnterPress}
        onBlur={onBlur}
      />
    </div>
  );
}

Search.defaultProps = {
  label: "",
  onEnterPress: () => ({}),
  onBlur: () => ({}),
};

export default Search;
