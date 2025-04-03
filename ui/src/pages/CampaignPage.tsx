
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCampaign, updateCampaign, deleteCampaign } from "@/services/campaignService";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import CampaignEditForm from "@/components/campaigns/CampaignEditForm";
import { Lead } from "@/types/lead";
import { Account } from "@/types/account";

const CampaignPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);

    const { data: campaign, isLoading, error } = useQuery({
        queryKey: ["campaigns", id],
        queryFn: () => getCampaign(id as string),
        enabled: !!id,
    });

    const deleteMutation = useMutation({
        mutationFn: (campaignId: string) => deleteCampaign(campaignId),
        onSuccess: () => {
            toast.success("Campaign successfully deleted");
            queryClient.invalidateQueries({ queryKey: ["campaigns"] });
            navigate("/campaigns");
        },
        onError: (error) => {
            console.error("Error deleting campaign:", error);
            toast.error("Failed to delete campaign");
        },
    });

    const handleDelete = () => {
        if (id) {
            deleteMutation.mutate(id);
            setDeleteDialogOpen(false);
        }
    };

    const handleEdit = () => {
        setEditDialogOpen(true);
    };

    if (isLoading) {
        return (
            <div className="container py-6 flex justify-center">
                <p>Loading campaign...</p>
            </div>
        );
    }

    if (error || !campaign) {
        return (
            <div className="container py-6">
                <p className="text-red-500">Error loading campaign details.</p>
                <Button onClick={() => navigate("/campaigns")} className="mt-4">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Campaigns
                </Button>
            </div>
        );
    }

    const statusColor = {
        Active: "bg-green-100 text-green-800",
        Inactive: "bg-gray-100 text-gray-800",
        Deleted: "bg-red-100 text-red-800",
    };

    return (
        <div className="container py-6 space-y-6 max-w-6xl">
            <div className="flex items-center justify-between">
                <div>
                    <Button variant="outline" onClick={() => navigate("/campaigns")} className="mb-4">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Campaigns
                    </Button>
                    <h1 className="text-3xl font-bold tracking-tight">{campaign.name}</h1>
                    <div className="flex items-center gap-2 mt-1">
                        <Badge variant={campaign.status === "Active" ? "default" : "outline"}>
                            {campaign.status}
                        </Badge>
                        <p className="text-muted-foreground">
                            Created on {new Date(campaign.created_at).toLocaleDateString()}
                        </p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={handleEdit}>
                        <Pencil className="mr-2 h-4 w-4" /> Edit
                    </Button>
                    <Button variant="destructive" onClick={() => setDeleteDialogOpen(true)}>
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Campaign Description</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>{campaign.description}</p>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Leads ({campaign.leads?.length || 0})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {campaign.leads && campaign.leads.length > 0 ? (
                            <div className="space-y-2">
                                {campaign.leads.map((lead: Lead) => (
                                    <div key={lead._id} className="border p-2 rounded">
                                        {lead.name}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted-foreground text-center py-4">No leads selected for this campaign.</p>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>LinkedIn Accounts ({campaign.accounts?.length || 0})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {campaign.accounts && campaign.accounts.length > 0 ? (
                            <div className="space-y-2">
                                {campaign.accounts.map((account: Account) => (
                                    <div key={account._id} className="border p-2 rounded">
                                        {account.linkedin_username}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted-foreground text-center py-4">No LinkedIn accounts selected for this campaign.</p>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Delete Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Campaign</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this campaign? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={handleDelete}>Delete</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Edit Campaign</DialogTitle>
                    </DialogHeader>
                    <CampaignEditForm
                        campaign={campaign}
                        onSuccess={() => {
                            setEditDialogOpen(false);
                            queryClient.invalidateQueries({ queryKey: ["campaigns", id] });
                            toast.success("Campaign updated successfully");
                        }}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CampaignPage;
