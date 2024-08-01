import styled from "styled-components";

export const Component = styled.div`
  width: 80px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  background: #f6f6f6;
  border-radius: 8px;
  cursor: pointer;

  p {
    font-size: 15px;
    font-weight: 600;
    color: #343434;
    line-height: 130%;
    letter-spacing: 0.1px;
  }

  img {
    width: 16px;
    height: 10px;
    transition: transform 500ms;
  }

  &.active {
    img {
      transform: rotate(-180deg);
      transition: 500ms;
    }
  }
`;
