import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AracList from "./components/AracList";
import RequestsPanel from "./components/RequestsPanel";
import RequestVehiclePage from './components/RequestVehiclePage';
import UpdateVehiclePage from './components/UpdateVehiclePage';
import AddVehiclePage from './components/AddVehiclePage';
import RequestVehiclePanel from "./components/RequestVehiclePanel";
import AddRequestPage from "./components/AddRequestPage";
import ReleaseVehiclePage from "./components/ReleaseVehiclePage";
import Menu from "./Menu"; 
import LoginPage from "./components/LoginPage";
import LogoutPage from "./components/LogoutPage";
import ProtectedRoute from "./ProtectedRoute";
import ReservePage from "./components/ReservePage";
import ReserveList from "./components/ReserveList";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login / Register route'ları herkese açık */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected route'lar */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <div>
                <Menu />
                <div>Egebimtes Araç Kontrol Sistemine Hoşgeldiniz.</div>
              </div>
            </ProtectedRoute>
          } 
        />
        <Route path="/AracList" element={
          <ProtectedRoute><AracList /></ProtectedRoute>
        } />
        <Route path="/istekler" element={
          <ProtectedRoute><RequestsPanel /></ProtectedRoute>
        } />
        <Route path="/updatevehicle" element={
          <ProtectedRoute><UpdateVehiclePage /></ProtectedRoute>
        } />
        <Route path="/requestvehicle" element={
          <ProtectedRoute><RequestVehiclePage /></ProtectedRoute>
        } />
        <Route path="/addvehicle" element={
          <ProtectedRoute><AddVehiclePage /></ProtectedRoute>
        } />
        <Route path="/arac_istekleri" element={
          <ProtectedRoute><RequestVehiclePanel /></ProtectedRoute>
        } />
        <Route path="/request" element={
          <ProtectedRoute><AddRequestPage /></ProtectedRoute>
        } />
        <Route path="/releasevehicle" element={
          <ProtectedRoute><ReleaseVehiclePage /></ProtectedRoute>
        } />
        <Route path="/logout" element={
          <ProtectedRoute><LogoutPage /></ProtectedRoute>
        } />
        <Route path="/createReserve" element={
          <ProtectedRoute><ReservePage /></ProtectedRoute>
        } />
        <Route path="/rezervasyonlar" element={
          <ProtectedRoute><ReserveList /></ProtectedRoute>
        } />
      </Routes>
      
    </Router>
  );
}

export default App;
