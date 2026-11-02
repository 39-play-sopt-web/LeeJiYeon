import styled from '@emotion/styled';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import Header from '../components/Header';

const Layout = () => {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <ScrollRestoration />
    </>
  );
};

export default Layout;

const Main = styled.main`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: 3rem 2rem 6rem;
`;