import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import AuthPage from './pages/AuthPage';
import PostListPage from './pages/PostListPage';
import PostWritePage from './pages/PostWritePage';
import PostDetailPage from './pages/PostDetailPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/posts" replace />} />
      <Route path="/auth" element={<AuthPage />} />

      <Route element={<Layout />}>
        <Route path="/posts" element={<PostListPage />} />
        <Route path="/posts/:postId" element={<PostDetailPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/posts/new" element={<PostWritePage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/posts" replace />} />
    </Routes>
  );
};

export default App;