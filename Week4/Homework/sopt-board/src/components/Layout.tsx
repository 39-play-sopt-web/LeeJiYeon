import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </>
  );
};

export default Layout;

const Main = styled.main`
  max-width: 800px;
  margin: 0 auto;
  padding: 32px 16px;
`;