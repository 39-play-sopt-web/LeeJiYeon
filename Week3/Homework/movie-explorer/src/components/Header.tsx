import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Wrapper>
      <Inner>
        <Logo to="/">
          Jiyeon's <Point>Fav Movies</Point>
        </Logo>
      </Inner>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  height: ${({ theme }) => theme.layout.headerHeight};
  background-color: rgba(20, 20, 20, 0.9);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Inner = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: 0 2rem;
`;

const Logo = styled(Link)`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 800;
`;

const Point = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;