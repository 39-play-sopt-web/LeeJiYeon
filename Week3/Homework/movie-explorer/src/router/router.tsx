import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layouts/Layout';
import MainPage from '../pages/MainPage';
import DetailPage from '../pages/DetailPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: 'movie/:movieId', element: <DetailPage /> },
    ],
  },
]);