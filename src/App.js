import './App.css';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Register from './pages/register';
import Loading from './pages/loading';
import Verification from './pages/verification';
import { AuthProvider, ProtectedRoute } from './context/auth';
import { ModalProvider } from './context/modal';
import Welcome from './pages/welcome';
import SearchResult from './pages/searchResult';
import ProfilePage from './pages/profile';
import MyCohort from './pages/cohort/CohortPage';

const App = () => {
  return (
    <>
      <AuthProvider>
        <ModalProvider>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="loading" element={<Loading />} />
            <Route path="verification" element={<Verification />} />

            <Route
              path="searchresult"
              element={
                <ProtectedRoute>
                  <SearchResult />
                </ProtectedRoute>
              }
            />

            <Route
              path="profile/:id"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            <Route
              index
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="welcome"
              element={
                <ProtectedRoute disabledNav={true}>
                  <Welcome />
                </ProtectedRoute>
              }
            />
            <Route
              path="cohort"
              element={
                <ProtectedRoute>
                  <MyCohort />
                </ProtectedRoute>
              }
            />
          </Routes>
        </ModalProvider>
      </AuthProvider>
    </>
  );
};

export default App;
