import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './components/auth/AuthProvider';
import { Layout } from './components/layout/Layout';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { Research } from './pages/Research';
import { Patents } from './pages/Patents';
import { Inventions } from './pages/Inventions';
import { CollaborationPanel } from './components/collaboration/CollaborationPanel';
import { AnalyticsDashboard } from './components/analytics/AnalyticsDashboard';
import { useAuthStore } from './stores/authStore';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthStore();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-aria-blue-600"></div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<LandingPage />} />
              
              {/* Protected routes with layout */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/research" element={
                <ProtectedRoute>
                  <Layout>
                    <Research />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/patents" element={
                <ProtectedRoute>
                  <Layout>
                    <Patents />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/inventions" element={
                <ProtectedRoute>
                  <Layout>
                    <Inventions />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/collaborate" element={
                <ProtectedRoute>
                  <Layout>
                    <CollaborationPanel />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/analytics" element={
                <ProtectedRoute>
                  <Layout>
                    <AnalyticsDashboard />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/market" element={
                <ProtectedRoute>
                  <Layout>
                    <div className="p-8 text-center">
                      <h1 className="text-2xl font-bold">Market Intelligence</h1>
                      <p className="text-gray-600 mt-2">Advanced market analysis coming soon...</p>
                    </div>
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/portfolio" element={
                <ProtectedRoute>
                  <Layout>
                    <div className="p-8 text-center">
                      <h1 className="text-2xl font-bold">IP Portfolio Management</h1>
                      <p className="text-gray-600 mt-2">Portfolio management tools coming soon...</p>
                    </div>
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/settings" element={
                <ProtectedRoute>
                  <Layout>
                    <div className="p-8 text-center">
                      <h1 className="text-2xl font-bold">Settings</h1>
                      <p className="text-gray-600 mt-2">User settings and preferences coming soon...</p>
                    </div>
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/help" element={
                <ProtectedRoute>
                  <Layout>
                    <div className="p-8 text-center">
                      <h1 className="text-2xl font-bold">Help & Support</h1>
                      <p className="text-gray-600 mt-2">Documentation and support resources coming soon...</p>
                    </div>
                  </Layout>
                </ProtectedRoute>
              } />
              
              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;