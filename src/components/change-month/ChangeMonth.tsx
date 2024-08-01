import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import dateHelper from "../../@core/helpers/date";
import styles from "./ChangeMonth.module.scss";

interface IChangeMonthProps {
  selectedMonth: number;
  selectedYear: number;
  onChangeMonth: (month: number) => void;
  onChangeYear: (year: number) => void;
}

function ChangeMonth(props: IChangeMonthProps) {
  const { selectedMonth, selectedYear, onChangeMonth, onChangeYear } = props;

  const [selectedMonthState, setSelectedMonth] = useState(selectedMonth);
  const [selectedYearState, setSelectedYear] = useState(selectedYear);

  const [dropdownMonthActive, setDropdownMonthActive] = useState(false);
  const [dropdownYearActive, setDropdownYearActive] = useState(false);

  const months = dateHelper.monthNames;
  const years = dateHelper.yearsList(dateHelper.currentYear());

  const onClickDropdownMonth = () => {
    setDropdownYearActive(false);
    setDropdownMonthActive(!dropdownMonthActive);
  };

  const onClickDropdownYear = () => {
    setDropdownMonthActive(false);
    setDropdownYearActive(!dropdownYearActive);
  };

  const onClickMonth = (month: number) => {
    onClickDropdownMonth();
    setSelectedMonth(month);
    onChangeMonth(month);
  };

  const onClickYear = (year: number) => {
    onClickDropdownYear();
    setSelectedYear(year);
    onChangeYear(year);

    const isCurrentYear = dateHelper.currentYear() === year;
    if (isCurrentYear && selectedMonthState > dateHelper.currentMonth()) {
      onClickMonth(dateHelper.currentMonth())
    }
  };

  const renderMoths = () => {
    const items: any = []

    const isCurrentYear = dateHelper.currentYear() === selectedYearState;

    months.forEach((month, index) => {
      if (!isCurrentYear || index <= dateHelper.currentMonth()) {
        items.push(
          <li
            key={month}
            className={index === selectedMonthState ? styles.active : undefined}
            onClick={() => onClickMonth(index)}
            aria-hidden
          >
            {month}
          </li>
        )
      }
    })

    return items;
  }

  return (
    <div className={styles.container}>
      <div
        className={styles.btnSelect}
        onClick={onClickDropdownMonth}
        aria-hidden
      >
        <span>{months[selectedMonthState]}</span>
        <KeyboardArrowDownIcon />
      </div>
      <ul
        className={`${styles.list} ${styles.month} ${
          dropdownMonthActive ? styles.active : null
        }`}
      >
        {renderMoths()}
      </ul>

      <div
        className={styles.btnSelect}
        onClick={onClickDropdownYear}
        aria-hidden
      >
        <span>{selectedYearState}</span>
        <KeyboardArrowDownIcon />
      </div>
      <ul
        className={`${styles.list} ${styles.year} ${
          dropdownYearActive ? styles.active : null
        }`}
      >
        {years.map((year) => (
          <li
            key={year}
            className={year === selectedYearState ? styles.active : undefined}
            onClick={() => onClickYear(year)}
            aria-hidden
          >
            {year}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChangeMonth;
