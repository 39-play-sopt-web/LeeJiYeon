import styled from '@emotion/styled';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(17, 24, 39, 0.5);
  z-index: 100;
`;

export const Box = styled.div`
  min-width: 260px;
  padding: 28px 32px;
  border-radius: 16px;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Title = styled.h2`
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray900};
`;

export const ConfirmButton = styled.button`
  width: 100%;
  margin-top: 20px;
  padding: 10px 0;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primaryDark};
  background-color: ${({ theme }) => theme.colors.primary};

  &:hover {
    filter: brightness(0.95);
  }
`;