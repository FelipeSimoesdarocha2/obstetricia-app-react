import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .actions_modal {
    width: 415px;
    height: 40px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 17px;
  }

  .contentReminder {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }

  .contentReminder .time {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
  }

  .contentReminder p {
    color: #747474;
    font-size: 15px;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.1px;
    text-align: start;
    font-style: normal;
    margin: 0;
    width: 100%;
  }

  .contentReminder .ant-picker {
    width: 100%;
    height: 38px;
    background-color: #f6f6f6;
  }

  .itenCheck {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .item {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 22px;

    label {
      font-size: 16px;
      line-height: 26px;
      color: #000000;
    }

    input[type="checkbox"] {
      appearance: none;

      cursor: pointer;
      width: 24px;
      height: 24px;
      border: 1px solid #0832de;
      border-radius: 4px;
      padding: 0px;

      &:checked {
        background: #0832de;
      }
    }

    input[type="checkbox"]::before {
      content: "";
      display: flex;
      align-items: center;
      width: 12px;
      height: 12px;
      margin: 5px;
    }

    input[type="checkbox"]:checked::before {
      content: "✓";
      color: #fff;
    }
  }
`;

export const Header = styled.div`
  width: 90%;
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: sticky;
  overflow: visible;
  z-index: 1;
  gap: 24px;

  .filters {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .actions {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  @media (max-width: 1100px) {
    width: 100%;
  }
`;
