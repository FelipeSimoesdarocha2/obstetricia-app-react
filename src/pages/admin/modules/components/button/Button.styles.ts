import styled from "styled-components";

export const Component = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 187px;
  height: 40px;
  border-radius: 8px;
  border: none;
  cursor: pointer;

  p {
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 0.15px;
    line-height: normal;
    text-align: center;
    font-style: normal;
    margin: 0;
  }

  &.primary {
    background: #f6f6f6;
    transition: opacity 500ms;

    p {
      color: #4340da;
    }

    &:disabled {
      cursor: not-allowed;
    }

    &:not(&:disabled) {
      &:hover {
        opacity: 85%;
        transition: opacity 500ms;
      }
    }
  }

  &.secondary {
    background: #4340da;
    transition: opacity 500ms;

    p {
      color: #f6f6f6;
    }

    &:disabled {
      cursor: not-allowed;
    }

    &:not(&:disabled) {
      &:hover {
        opacity: 85%;
        transition: opacity 500ms;
      }
    }
  }
`;
