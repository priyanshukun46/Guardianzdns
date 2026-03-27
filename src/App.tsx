import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Blocklist from "./pages/Blocklist";
import Whitelist from "./pages/Whitelist";
import Catalog from "./pages/Catalog";
import BrowseHistory from "./pages/BrowseHistory";
import ManageDevices from "./pages/ManageDevices";
import Statistics from "./pages/Statistics";
import { AppLayout } from "./components/AppLayout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<AppLayout />}>
            <Route path="/home" element={<Dashboard />} />
            <Route path="/blocklist" element={<Blocklist />} />
            <Route path="/whitelist" element={<Whitelist />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/history" element={<BrowseHistory />} />
            <Route path="/devices" element={<ManageDevices />} />
            <Route path="/statistics" element={<Statistics />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
