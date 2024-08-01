import styled from 'styled-components';

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
