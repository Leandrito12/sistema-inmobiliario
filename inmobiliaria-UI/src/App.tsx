import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from './components/Header';
import { LandingPage } from './pages/LandingPage';
import PropertiesView from './components/PropertiesView';

import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import AdminDashboardDebug from './components/AdminDashboardDebug';
import AdminPropertyForm from './components/AdminPropertyForm';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';
import PropertyDetail from './components/PropertyDetail';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={
            <>
              <Header />
              <LandingPage />
            </>
          } />
          <Route path="/propiedades" element={
            <>
              <Header />
              <PropertiesView />
            </>
          } />
          <Route path="/propiedad/:id" element={
            <>
              <Header />
              <PropertyDetail />
            </>
          } />
          
          {/* Rutas de administración */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/debug" element={<AdminDashboardDebug />} />
          <Route path="/admin/propiedades/nueva" element={
            <ProtectedRoute>
              <AdminPropertyForm />
            </ProtectedRoute>
          } />
          <Route path="/admin/propiedades/editar/:id" element={
            <ProtectedRoute>
              <AdminPropertyForm />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App
