import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// User Pages
import UserLogin from "./pages/user/Login";
import UserRegister from "./pages/user/Register";
import UserDashboard from "./pages/user/Dashboard";
import SubmitComplaint from "./pages/user/SubmitComplaint";
import ViewComplaints from "./pages/user/ViewComplaints";
import Feedback from "./pages/user/Feedback";

// Admin Pages
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import ManageDepartments from "./pages/admin/ManageDepartments";
import AssignComplaints from "./pages/admin/AssignComplaints";
import UpdateStatus from "./pages/admin/UpdateStatus";
import ViewFeedback from "./pages/admin/ViewFeedback";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* User Routes */}
            <Route path="/user/login" element={<UserLogin />} />
            <Route path="/user/register" element={<UserRegister />} />
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/user/submit-complaint" element={<SubmitComplaint />} />
            <Route path="/user/view-complaints" element={<ViewComplaints />} />
            <Route path="/user/feedback" element={<Feedback />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/manage-departments" element={<ManageDepartments />} />
            <Route path="/admin/assign-complaints" element={<AssignComplaints />} />
            <Route path="/admin/update-status" element={<UpdateStatus />} />
            <Route path="/admin/view-feedback" element={<ViewFeedback />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
