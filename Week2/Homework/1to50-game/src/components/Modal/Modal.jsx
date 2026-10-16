import { createPortal } from 'react-dom';
import * as S from './Modal.styles';

const Modal = ({ title, children, onConfirm }) => {
  return createPortal(
    <S.Overlay>
      <S.Box role="dialog" aria-modal="true">
        <S.Title>{title}</S.Title>
        {children}
        <S.ConfirmButton onClick={onConfirm}>확인</S.ConfirmButton>
      </S.Box>
    </S.Overlay>,
    document.getElementById('modal-root')
  );
};

export default Modal;