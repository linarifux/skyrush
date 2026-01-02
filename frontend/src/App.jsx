import { Routes, Route } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ScrollToTop from "./components/shared/ScrollToTop";
import DashboardLayout from "./layouts/DashboardLayout";
import Overview from "./pages/dashboard/Overview";
import Address from "./pages/dashboard/Address";

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-blue-500 selection:text-white">
      <ScrollToTop />
      {/* Navbar sits outside Routes to appear on all pages */}
      <Navbar />

      {/* Add padding-top to account for the fixed Navbar */}
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* We will add /login and /register routes here next */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Overview />} />
            <Route path="address" element={<Address />} /> {/* NEW ROUTE */}
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
