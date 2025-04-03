
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import DashboardPage from "./pages/DashboardPage";
import LeadsPage from "./pages/LeadsPage";
import CampaignsPage from "./pages/CampaignsPage";
import CampaignPage from "./pages/CampaignPage";
import NewCampaignPage from "./pages/NewCampaignPage";
import AccountsPage from "./pages/AccountsPage";
import NotFound from "./pages/NotFound";
import EditCampaignPage from "./pages/EditCampaignPage";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<DashboardPage />} />
                        <Route path="leads" element={<LeadsPage />} />
                        <Route path="campaigns" element={<CampaignsPage />} />
                        <Route path="campaigns/new" element={<NewCampaignPage />} />
                        <Route path="campaigns/:id" element={<CampaignPage />} />
                        <Route path="campaigns/:id/edit" element={<EditCampaignPage />} />
                        <Route path="accounts" element={<AccountsPage />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;
