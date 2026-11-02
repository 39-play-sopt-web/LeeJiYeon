import styled from '@emotion/styled';

export const Wrapper = styled.section`
  max-width: 640px;
  margin: 0 auto;
`;

export const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray900};
`;

export const ResetButton = styled.button`
  padding: 6px 12px;
  border: 1px solid ${({ theme }) => theme.colors.red};
  border-radius: 8px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.red};
  background-color: ${({ theme }) => theme.colors.white};

  &:hover {
    background-color: #fef2f2;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 12px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.white};
  font-size: 13px;
  text-align: left;

  th,
  td {
    padding: 12px 16px;
  }

  th {
    font-weight: 700;
    color: ${({ theme }) => theme.colors.gray900};
    background-color: ${({ theme }) => theme.colors.primary};
  }

  td {
    color: ${({ theme }) => theme.colors.gray900};
    border-top: 1px solid ${({ theme }) => theme.colors.gray100};
  }

  td:first-of-type {
    font-weight: 700;
  }
`;

export const Empty = styled.p`
  padding: 60px 0;
  text-align: center;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray500};
`;