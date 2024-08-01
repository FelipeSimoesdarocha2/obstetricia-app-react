import styled from "styled-components";

export const Component = styled.div`
  position: relative;
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: column;
  transition: all 600ms;

  .input {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    height: 50px;
    padding-left: 1rem;
    border: 1px solid #e9ebf9;
    border-radius: 8px;
    overflow: hidden;

    &.focused {
      border-color: #e1e1e1;
      box-shadow: 0px 0px 3px #e1e1e1;
    }

    input::placeholder {
      color: #9aa1a9;
      font-size: 14px;
      font-weight: 600;
      line-height: 150%;
      letter-spacing: -0.2px;
      text-align: start;
      font-style: normal;
    }

    input {
      width: 100%;
      height: 100%;
      display: block;
      border: none;
      outline: none;
      background: none;
    }
  }
`;
