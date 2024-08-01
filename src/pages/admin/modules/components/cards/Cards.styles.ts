import styled, { css } from 'styled-components';

export const Component = styled.div`
  width: 210px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border-radius: 16px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 1.5rem;
  font-weight: 500;

  @media (max-width: 960px) {
    padding: 1rem;
    white-space: nowrap;
    overflow: hidden;
  }
`;

export const Title = styled.div`
  display: flex;
  flex-direction: column;

  p {
    color: #8b909a;
  }
`;

export const Content = styled.div<{ contentProps: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;

  h2 {
    font-size: 32px;
    margin: 0;
  }

  .first-child {
    color: #1eb564;
  }

  p:last-child {
    color: #8b909a;
  }

  svg {
    fill: #1eb564;
  }

  .flex {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  ${({ contentProps }) =>
    contentProps &&
    css`
      .flex {
        svg {
          fill: #ee4646 !important;
          transform: rotate(-180deg);
        }
        .first-child {
          color: #ee4646;
        }
      }
    `}
`;
