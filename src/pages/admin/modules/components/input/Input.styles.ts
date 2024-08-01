import styled from 'styled-components';

export const Component = styled.div`
  position: relative;
  width: 100%;
  margin: 10px 0;
  display: flex;
  flex-direction: column;

  .label {
    position: absolute;
    top: -25px;
    left: 0px;
    color: #747474;
  }

  input {
    border: 1px solid #f1f1f1;
    display: inline-flex;
    overflow: hidden;
    padding-left: 20px;
    height: 45px;
    background: #f6f6f6;
    border-radius: 8px;
    letter-spacing: 0.15px;
    width: 100%;

    &:focus {
      outline: none;
      border: 1px solid rgba(0, 0, 0, 0.4);
      transition: all 250ms;
    }

    &::placeholder {
      color: #343434;
    }
  }

  input[type='text'] {
  }
`;
