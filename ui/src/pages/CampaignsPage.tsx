
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCampaigns, deleteCampaign } from "@/services/campaignService";
import { Button } from "@/components/ui/button";
import { Briefcase, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CampaignList from "@/components/campaigns/CampaignList";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Campaign } from "@/types/campaign";

const CampaignsPage: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [campaignToDelete, setCampaignToDelete] = useState<Campaign | null>(null);

  const { data: campaigns, isLoading, error } = useQuery({
    queryKey: ["campaigns"],
    queryFn: getCampaigns,
  });

  const deleteMutation = useMutation({
    mutationFn: (campaignId: string) => deleteCampaign(campaignId),
    onSuccess: () => {
      toast.success("Campaign successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      setDeleteDialogOpen(false);
    },
    onError: (error) => {
      console.error("Error deleting campaign:", error);
      toast.error("Failed to delete campaign");
    },
  });

  const handleDeleteClick = (campaign: Campaign) => {
    setCampaignToDelete(campaign);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (campaignToDelete) {
      deleteMutation.mutate(campaignToDelete._id);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <p>Loading campaigns...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-red-500">Error loading campaigns.</p>
          <Button onClick={() => queryClient.invalidateQueries({ queryKey: ["campaigns"] })} className="mt-4">
            Try Again
          </Button>
        </div>
      );
    }

    if (!campaigns || campaigns.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Briefcase className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-xl font-semibold mb-2">No Campaigns Yet</h2>
          <p className="text-muted-foreground text-center max-w-md mb-6">
            Create your first outreach campaign to start connecting with your leads.
          </p>
          <Button onClick={() => navigate('/campaigns/new')}>
            <Plus className="mr-2 h-4 w-4" /> Create Your First Campaign
          </Button>
        </div>
      );
    }

    return <CampaignList campaigns={campaigns} onDeleteClick={handleDeleteClick} />;
  };

  return (
    <div className="container py-6 space-y-6 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campaigns</h1>
          <p className="text-muted-foreground">
            Manage your marketing and outreach campaigns.
          </p>
        </div>
        <Button onClick={() => navigate('/campaigns/new')}>
          <Plus className="mr-2 h-4 w-4" /> New Campaign
        </Button>
      </div>

      {renderContent()}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Campaign</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the campaign "{campaignToDelete?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={deleteMutation.isPending}>
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CampaignsPage;
