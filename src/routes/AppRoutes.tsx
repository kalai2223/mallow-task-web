import { JSX } from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { useAppSelector } from '@app/hooks';
import LoginPage from '@features/auth/LoginPage';
import UserListPage from '@features/users/UserList';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = useAppSelector((state) => state.auth.token) || localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <UserListPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
