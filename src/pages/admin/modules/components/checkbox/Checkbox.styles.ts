import styled from 'styled-components';

export const Component = styled.div`
  display: flex;

  input {
    cursor: pointer;
    width: 16px;
    height: auto;
    border: 1px solid var(--black);

    &:checked {
      filter: hue-rotate(40deg );
    }

    &:disabled {
      cursor: not-allowed;
    }
  }

  label {
    cursor: default;
    font-size: 14px;
    font-weight: 300;
    font-size: 14px;
    margin: 0px 10px 0;
  }
`;
