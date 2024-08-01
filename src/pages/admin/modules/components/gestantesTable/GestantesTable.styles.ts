import styled from "styled-components";

export const Component = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  color: #7d7d7d;
  position: relative;

  table {
    border-collapse: collapse;
    margin-bottom: 100px;
  }

  thead tr {
    height: 75px;
    text-align: justify;
  }

  tbody tr {
    height: 60px;
  }

  tbody tr:hover {
    background: #f0f0f5;
    cursor: pointer;
  }

  tbody tr td:first-child {
    input {
      margin-right: 1rem;
    }
  }

  tbody tr td img {
    width: 43px;
    height: auto;
  }

  tbody tr td:nth-child(2) {
    div {
      display: flex;
      align-items: center;
      gap: 12px;

      color: #323c47;
      font-weight: 500;
      font-size: 15px;
    }
  }

  input[type="checkbox"] {
    width: auto;
  }

  tbody tr td:last-child {
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
    place-content: center;
  }

  tbody tr td:last-child button {
    display: flex;
    align-items: center;

    background: none;
    padding: 0;
    border: none;
    cursor: pointer;
  }

  tbody tr td:last-child span {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    position: absolute;
    right: auto;
    left: -150px;
    z-index: 10;

    overflow: hidden;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 0px 9px 1px #0000004e;
  }

  tbody tr td:last-child span button {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;

    padding: 8px 16px;
    width: 100%;
  }

  tbody tr td:last-child span button:hover {
    background-color: #f1f1f1;
  }

  tbody tr td:last-child span button p {
    color: #747474;
    font-size: 14px;
    font-weight: 500;
    line-height: 150%;
    letter-spacing: -0.2px;
    text-align: start;
    font-style: normal;
    margin: 0;
    width: 100%;
  }

  tbody tr td:last-child span button img {
    width: 26px;
    height: auto;
  }
`;
