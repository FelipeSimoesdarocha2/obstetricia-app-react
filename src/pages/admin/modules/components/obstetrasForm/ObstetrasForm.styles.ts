import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 44px;

  .form_itens {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .actions {
    width: 415px;
    height: 40px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 17px;
  }

  .form-input {
    position: relative;
    display: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .err {
      font-size: 14px;
      color: #ff9c03;
    }

    .err::before {
      content: '*';
      margin-right: 4px;
      color: red;
    }
  }
`;
