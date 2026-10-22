import styled from '@emotion/styled';

export const Main = styled.main`
  min-height: calc(100vh - ${({ theme }) => theme.headerHeight});
  padding: 40px 24px;
  background: ${({ theme }) => theme.background};
`;