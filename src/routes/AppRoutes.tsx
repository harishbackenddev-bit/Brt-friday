// src/routes/AppRoutes.tsx
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";

// Layouts
import WebsiteLayout from "@/layouts/WebsiteLayout";
import AuthLayout from "@/layouts/AuthLayout";
import UserLayout from "@/layouts/user/UserLayout";
import AdminLayout from "@/layouts/admin/AdminLayout";

// Website Pages
import Home from "@/pages/website/Home";

// Auth Pages
import Login from "@/pages/auth/Login";
import CreateAccount from "@/pages/auth/CreateAccount";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import ResetPassword from "@/pages/auth/ResetPassword";

// User Pages
import UserDashboard from "@/pages/user/Dashboard";


// Admin Pages
import AdminDashboard from "@/pages/admin/Dashboard";
import Events from "@/pages/admin/Events/Events";


const AppRoutes = () => {
  return (
    <Routes>
      {/* WEBSITE - Public */}
      <Route path="/" element={<WebsiteLayout />}>
        <Route index element={<Home />} />
      </Route>

      {/* AUTH - Public */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/onboarding" element={<CreateAccount />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>

      {/* USER - Protected */}
      <Route path="/user" element={
        <ProtectedRoute>
          <UserLayout />
        </ProtectedRoute>
      }>
        <Route index element={<UserDashboard />} />
      </Route>

      {/* ADMIN - Protected (Admin Only) */}
      <Route path="/admin" element={
        <ProtectedRoute adminOnly={true}>
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route index element={<AdminDashboard />} />
        <Route path="/admin/events" element={<Events />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;