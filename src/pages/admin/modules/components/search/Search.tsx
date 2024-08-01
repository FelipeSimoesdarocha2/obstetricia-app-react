// React
import { useState } from "react";

// Assets
import icon from "./icons/icon.svg";

// Styles
import * as S from "./Search.styles";

// Models
import { searchProps } from "./models";

const InputValue = (props: searchProps) => {
  const { id, title, value, placeholder, onBlur, onChange, onEnterPress } =
    props;

  const [invalidRequired, setInvalidRequired] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (onEnterPress && event.key === "Enter") {
      onEnterPress((event.target as HTMLInputElement).value);
    }
  };

  const onChangeValue = (event: { target: { value: string } }) => {
    const value = event.target?.value ?? "";

    if (!value) {
      setInvalidRequired(true);
    } else {
      setInvalidRequired(false);
    }

    onChange(value);
  };

  return (
    <div
      className={`${"input"}  ${invalidRequired ? "required" : ""} ${isFocused ? "focused" : null
        }
        `}
    >
      {isFocused ? null : (
        <>
          <img src={icon} alt="icon" />
          <label
            htmlFor={id}
            data-testid={`${id}-label`}
            className="label"
            dangerouslySetInnerHTML={{ __html: title as string }}
          />
        </>
      )}

      <input
        id={id}
        key={id}
        title={title}
        value={value}
        data-testid={id}
        onChange={onChangeValue}
        placeholder={placeholder}
        onKeyUp={(event) => onKeyUp(event)}
        onFocus={() => setIsFocused(true)}
        onBlur={(event) => {
          onBlur && onBlur(event);
          setIsFocused(false);
        }}
      />
    </div>
  );
};

const Search = (props: searchProps) => {
  const {
    id,
    title,
    value,
    placeholder,
    autocomplete,
    onBlur,
    onChange,
    onEnterPress,
  } = props;

  return (
    <S.Component>
      <InputValue
        id={id}
        title={title}
        value={value}
        onBlur={onBlur}
        placeholder={placeholder}
        onEnterPress={onEnterPress}
        autocomplete={autocomplete}
        onChange={onChange as (value: string) => void}
      />
    </S.Component>
  );
};

export default Search;
