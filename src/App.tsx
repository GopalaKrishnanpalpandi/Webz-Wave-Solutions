
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./pages/Layout";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import ServiceDetailPage from "./pages/services/ServiceDetailPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import SecurityMiddleware from "./components/SecurityMiddleware";
import SecurityAdmin from "./components/SecurityAdmin";
import AssetProtection from "./components/AssetProtection";
import emailService from "./services/emailService";

const queryClient = new QueryClient();

const App = () => {
  // Test EmailJS connection when the app starts
  useEffect(() => {
    emailService.testEmailConnection()
      .then(isConnected => {
        if (isConnected) {
          console.log('EmailJS connection test successful');
        } else {
          console.warn('EmailJS connection test failed - contact form may not work');
        }
      })
      .catch(error => console.error('Error testing EmailJS connection:', error));
  }, []);

  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* Asset Protection - Prevents image copying and source code inspection */}
      <AssetProtection
        disableRightClick={true}
        disableKeyboardShortcuts={true}
        disableImageDragging={true}
        protectImages={true}
        detectDevTools={false} // Set to true in production if you want to block DevTools
        addSourceCodeWarning={true}
      />
      <BrowserRouter>
        <SecurityMiddleware>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="about" element={<About />} />
              <Route path="services" element={<Services />} />
              <Route path="services/:categoryId/:serviceId" element={<ServiceDetailPage />} />
              <Route path="contact" element={<Contact />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="terms-conditions" element={<TermsConditions />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          {/* Security Admin Panel (only visible in development) */}
          <SecurityAdmin />
        </SecurityMiddleware>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
