import { useEffect, useRef } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { storage } from '../utils/storage';

const ProtectedRoute = () => {
  const hasAuthCode = Boolean(storage.getAuthCode());
  const alertedRef = useRef(false);

  useEffect(() => {
    if (!hasAuthCode && !alertedRef.current) {
      alertedRef.current = true;
      alert('회원 코드를 먼저 발급받아 주세요.');
    }
  }, [hasAuthCode]);

  if (!hasAuthCode) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;