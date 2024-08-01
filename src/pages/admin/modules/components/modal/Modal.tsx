// React
import * as React from 'react';

// Styles
import * as S from './Modal.styles';

// Models
import { ModalProps } from './models';

const Modal = ({ open, onClose, children }: ModalProps) => {
  return (
    <S.Component open={open} onClose={onClose}>
      <S.Content>
        <S.Container>
          {children}
        </S.Container>
      </S.Content>
    </S.Component>
  );
};

export default Modal;
