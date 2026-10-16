import styled from '@emotion/styled';

export const Header = styled.header`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  height: ${({ theme }) => theme.headerHeight};
  padding: 0 24px;
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray100};
`;

export const Title = styled.h1`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray900};
`;

export const Nav = styled.nav`
  display: flex;
  gap: 8px;
`;

export const MenuButton = styled.button`
  padding: 6px 14px;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: ${({ isActive }) => (isActive ? 700 : 500)};
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.primaryDark : theme.colors.gray500};
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.primary : 'transparent'};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme, isActive }) =>
      isActive ? theme.colors.primary : theme.colors.gray100};
  }
`;

export const Right = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
`;

export const Select = styled.select`
  padding: 6px 10px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 8px;
  font-size: 13px;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Timer = styled.span`
  min-width: 72px;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray900};
  background-color: ${({ theme }) => theme.colors.primary};
  font-variant-numeric: tabular-nums;
`;