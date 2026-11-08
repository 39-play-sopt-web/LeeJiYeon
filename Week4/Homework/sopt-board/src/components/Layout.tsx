import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      {/* TODO: Header */}
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
  padding: 24px 16px;
`;