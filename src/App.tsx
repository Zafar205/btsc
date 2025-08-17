import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import Layout from './components/Layout';

import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />

          <Route path="/dashboard" element={
            <Layout title="BSTC Dashboard" subtitle="BSTC Dashboard and Reports">
              <Dashboard/>
            </Layout>
          } />
          <Route path="/reports" element={
            <Layout title="BSTC Reports" subtitle="Maintenance Reports & Analytics">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Settings</h2>
                <p className="text-gray-600">Settings page coming soon...</p>
              </div>
            </Layout>
          } />
          <Route path="/teams" element={
            <Layout title="BSTC Teams" subtitle="Maintenance Team Management">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">History</h2>
                <p className="text-gray-600">History page coming soon...</p>
              </div>
            </Layout>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App
