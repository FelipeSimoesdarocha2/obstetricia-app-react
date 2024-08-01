import styled, { css } from "styled-components";

type ModalProps = {
  onClose: () => void;
};

export const Component = styled.div<{
  open: boolean;
  onClose: ModalProps["onClose"];
}>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: none;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 999;

  ${({ open }) =>
    open &&
    css`
      display: flex;
    `}
`;

export const Content = styled.div`
  width: 495px;
  height: auto;

  padding: 40px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.12);
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 44px;

  h2 {
    font-weight: 400;
    font-size: 28px;
    color: #000000;
    margin: 0;
  }

  p {
    font-weight: 400;
    font-size: 16px;
    color: #000000;
  }
`;
