import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;

  .form_itens {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 25px;

    overflow: auto;
    height: 40em;
    padding: 2rem 0px;
    padding-right: 1rem;
  }

  .form_itens::-webkit-scrollbar {
    width: 0.4svw;
  }

  .form_itens::-webkit-scrollbar-thumb {
    background: linear-gradient(transparent, #b2b2b2b2, transparent);
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
    display: flex;
    flex-direction: column;
    align-items: center;
    .err {
      position: absolute;
      top: -1rem;
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
