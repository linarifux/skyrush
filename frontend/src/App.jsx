import { Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast'; // 1. Import Toaster
import Navbar from "./components/shared/Navbar";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ScrollToTop from "./components/shared/ScrollToTop";
import DashboardLayout from "./layouts/DashboardLayout";
import Overview from "./pages/dashboard/Overview";
import Address from "./pages/dashboard/Address";
import Packages from "./pages/dashboard/Packages";
import Settings from "./pages/dashboard/Settings";
import Ship from "./pages/Ship";
import Services from "./pages/Services";
import HowItWorks from "./pages/HowItWorks";
import Footer from "./components/shared/Footer";
import Pricing from "./pages/Pricing";

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-blue-500 selection:text-white">
      <ScrollToTop />


      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: '#1e293b', // slate-800
            color: '#fff',
            border: '1px solid #334155', // slate-700
          },
          success: { iconTheme: { primary: '#10b981', secondary: '#fff' } },
          error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
        }}
      />
      {/* Navbar sits outside Routes to appear on all pages */}
      <Navbar />

      {/* Add padding-top to account for the fixed Navbar */}
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* We will add /login and /register routes here next */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ship" element={<Ship />} />
          <Route path="/services" element={<Services />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/pricing" element={<Pricing />} />

          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Overview />} />
            <Route path="address" element={<Address />} /> {/* NEW ROUTE */}
            <Route path="packages" element={<Packages />} /> {/* NEW ROUTE */}
            <Route path="settings" element={<Settings />} /> {/* NEW ROUTE */}
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </div>
    </div>
  );
}

export default App;
