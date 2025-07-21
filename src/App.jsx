import { useEffect } from "react";
import { Provider } from "react-redux";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "./store/store";
import { AuthProvider } from "./contexts/AuthContext";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import Index from "./pages/Index";
import SpaceDetail from "./pages/SpaceDetail";
import BookingPage from "./pages/BookingPage";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import AdminPanel from "./pages/admin/AdminPanel";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import Profile from "./pages/Profile";
import VirtualMeetings from "./pages/VirtualMeetings";
import ChatRoom from "./pages/ChatRoom";
import ListSpace from "./pages/ListSpace";
import Pricing from "./pages/Pricing";
import Features from "./pages/Features";
import Security from "./pages/Security";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Help from "./pages/Help";
import Status from "./pages/Status";
import Blog from "./pages/Blog";
import Forum from "./pages/Forum";
import Events from "./pages/Events";
import Partners from "./pages/Partners";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/space/:id" element={<SpaceDetail />} />
          <Route path="/booking/:spaceId" element={<BookingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/virtual-meetings" element={<VirtualMeetings />} />
          <Route path="/chat-room/:roomId" element={<ChatRoom />} />
          <Route path="/list-space" element={<ListSpace />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/features" element={<Features />} />
          <Route path="/security" element={<Security />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/help" element={<Help />} />
          <Route path="/status" element={<Status />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/events" element={<Events />} />
          <Route path="/partners" element={<Partners />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Sonner />
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
