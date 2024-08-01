import styled from 'styled-components';

export const Component = styled.div`
  width: 100%;
  height: 100%;
  max-width: 780px;
  padding: 2rem;

  border-radius: 16px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  canvas {
    width: 100% !important;
    height: 100% !important;
  }

  .header_chart {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    img {
      cursor: pointer;
    }

    img:hover {
      opacity: 0.9;
    }
  }

  ul {
    display: flex;
    margin: 1rem 0;
    gap: 2rem;
  }

  li {
    padding: 1rem;
  }

  p {
    color: #8b909a;
  }

  .filterDate {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  input[type='date'] {
    background: #f6f6f6;
    border-radius: 8px;
    height: 30px;
    padding: 10px;
    width: 130px;
    border: none;
  }

  select {
    width: 100px;
    height: 30px;
    border-radius: 8px;
    background: #f6f6f6;
    padding: 0 10px;
    border: none;
  }
`;

export const ChartStyle = styled.div`
  display: flex;
  flex-direction: column;
`;
