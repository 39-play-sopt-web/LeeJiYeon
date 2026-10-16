import styled from '@emotion/styled';

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

export const NextNumber = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray500};

  strong {
    margin: 0 6px;
    font-size: 24px;
    color: ${({ theme }) => theme.colors.gray900};
  }
`;

export const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ boardSize }) => boardSize}, 80px);
  gap: 8px;
`;

export const Cell = styled.button`
  width: 80px;
  height: 80px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 12px;
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray900};
  background-color: ${({ theme }) => theme.colors.white};
  transition: background-color 0.15s;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    border-style: dashed;
    background-color: transparent;
    cursor: default;
  }
`;