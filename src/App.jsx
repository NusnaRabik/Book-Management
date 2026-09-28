import { Routes, Route, Navigate } from 'react-router-dom';

import AppLayout from './components/layout/AppLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';

import Login from './pages/Login';
import AuthCallback from './pages/AuthCallback';

import Dashboard from './pages/Dashboard';
import MyBooks from './pages/MyBooks';
import AddBook from './pages/AddBook';
import BookDetails from './pages/BookDetails';
import EditBook from './pages/EditBook';

export default function App() {
  return (
    <Routes>
      {/* =========================
          Public Routes
      ========================== */}

      <Route path="/login" element={<Login />} />

      <Route
        path="/auth/callback"
        element={<AuthCallback />}
      />

      {/* =========================
          Protected Application
      ========================== */}

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/books"
            element={<MyBooks />}
          />

          <Route
            path="/books/add"
            element={<AddBook />}
          />

          <Route
            path="/books/:id"
            element={<BookDetails />}
          />

          <Route
            path="/books/:id/edit"
            element={<EditBook />}
          />

        </Route>
      </Route>

      {/* =========================
          Default Routes
      ========================== */}

      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />
    </Routes>
  );
}
