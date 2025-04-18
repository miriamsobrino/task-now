import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import WelcomePage from './pages/WelcomePage.tsx';
import SignUpPage from './pages/SignUpPage.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import HomePage from './pages/HomePage.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import PublicRoute from './components/PublicRoute.tsx';
import SignInPage from './pages/SignInPage.tsx';
import Layout from './Layout.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { AppProvider } from './context/AppContext.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/welcome',
        element: (
          <PublicRoute>
            <WelcomePage />
          </PublicRoute>
        ),
      },
      {
        path: '/sign-up',
        element: (
          <PublicRoute>
            <SignUpPage />
          </PublicRoute>
        ),
      },
      {
        path: '/sign-in',
        element: (
          <PublicRoute>
            <SignInPage />
          </PublicRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <ThemeProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ThemeProvider>
    </AppProvider>
  </StrictMode>
);
