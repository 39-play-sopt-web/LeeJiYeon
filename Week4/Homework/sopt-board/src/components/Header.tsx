import styled from '@emotion/styled';
import { NavLink, useNavigate } from 'react-router-dom';
import { storage } from '../utils/storage';
import { getPartLabel } from '../constants/part';

const Header = () => {
  const navigate = useNavigate();
  const part = storage.getPart();

  const handleLogout = () => {
    storage.clear();
    navigate('/auth');
  };

  return (
    <Wrapper>
      <Left>
        <Logo to="/posts">
          PLAY SOPT <Accent>BOARD</Accent>
        </Logo>
        {part && <PartBadge>{getPartLabel(part)} 파트</PartBadge>}
      </Left>

      <Nav>
        <Tab to="/posts" end>
          게시글 목록
        </Tab>
        <Tab to="/posts/new">글쓰기</Tab>
        <LogoutButton type="button" onClick={handleLogout}>
          로그아웃
        </LogoutButton>
      </Nav>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  padding: 0 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};
  background-color: ${({ theme }) => theme.colors.white};
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Logo = styled(NavLink)`
  font-size: 18px;
  font-weight: 800;
`;

const Accent = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

const PartBadge = styled.span`
  padding: 4px 10px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray500};
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Tab = styled(NavLink)`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray500};
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.black};
  }

  &.active {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
  }
`;

const LogoutButton = styled.button`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray500};
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.black};
  }
`;