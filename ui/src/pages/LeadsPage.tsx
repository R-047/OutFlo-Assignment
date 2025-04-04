
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Lead, NewLead } from "@/types/lead";
import { getLeads, createLead, updateLead, deleteLead, scrapeLeadInfo } from "@/services/leadService";
import LeadForm from "@/components/leads/LeadForm";
import LeadList from "@/components/leads/LeadList";
import { Plus, Loader2 } from "lucide-react";
import { link } from "fs";

const LeadsPage: React.FC = () => {
    const { toast } = useToast();
    const [leads, setLeads] = useState<Lead[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isAutoFilling, setIsAutoFilling] = useState(false);
    const [showCreateDialog, setShowCreateDialog] = useState(false);
    const [editingLead, setEditingLead] = useState<Lead | null>(null);
    const [leadToDelete, setLeadToDelete] = useState<Lead | null>(null);

    useEffect(() => {
        fetchLeads();
    }, []);
    useEffect(() => {
        if (!showCreateDialog) {
            setEditingLead(null)
        }
    }, [showCreateDialog])

    const fetchLeads = async () => {
        setIsLoading(true);
        try {
            const fetchedLeads = await getLeads();
            setLeads(fetchedLeads);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to fetch leads. Please try again.",
                variant: "destructive",
            });
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };


    const handleCreateLead = async (data: NewLead) => {
        setIsSubmitting(true);
        try {
            const newLead = await createLead(data);
            setLeads((prevLeads) => [newLead, ...prevLeads]);
            setShowCreateDialog(false);
            toast({
                title: "Success",
                description: "Lead created successfully.",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to create lead. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleUpdateLead = async (data: NewLead) => {
        if (!editingLead) return;

        setIsSubmitting(true);
        try {
            const updatedLead = await updateLead(editingLead._id, data);
            if (updatedLead) {
                setLeads((prevLeads) =>
                    prevLeads.map((lead) =>
                        lead._id === updatedLead._id ? updatedLead : lead
                    )
                );
            }
            setEditingLead(null);
            toast({
                title: "Success",
                description: "Lead updated successfully.",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update lead. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteConfirm = async () => {
        if (!leadToDelete) return;

        try {
            await deleteLead(leadToDelete._id);
            setLeads((prevLeads) => prevLeads.filter((lead) => lead._id !== leadToDelete._id));
            setLeadToDelete(null);
            toast({
                title: "Success",
                description: "Lead deleted successfully.",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete lead. Please try again.",
                variant: "destructive",
            });
        }
    };

    const handleAutoFill = async (linkedin_url: string) => {

        const linkedinUrlRegex = /^https:\/\/(www\.)?linkedin\.com\/(in|pub|public-profile\/(in|pub))\/[a-zA-Z0-9-]+\/*$/;
        if (!linkedinUrlRegex.test(linkedin_url)) {
            toast({
                title: "Error",
                description: "invalid linkedin url",
            });
            return
        }
        setIsAutoFilling(true);
        try {
            const lead = await scrapeLeadInfo(linkedin_url);
            setEditingLead({
                ...editingLead,
                name: lead?.name || "test",
                job_title: lead?.job_title || "test",
                location: lead?.location || "test",
                linkedin_url: linkedin_url,
                summary: lead?.summary || "test1233",
                company: lead?.company || "company"
            })
            toast({
                title: "Success",
                description: "successfully autofilled",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to autofil",
                variant: "destructive",
            });
        } finally {
            setIsAutoFilling(false);
        }
    };

    return (
        <div className="container py-6 space-y-6 max-w-6xl">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
                    <p className="text-muted-foreground">
                        Manage your leads and potential opportunities.
                    </p>
                </div>
                <Button onClick={() => setShowCreateDialog(true)}>
                    <Plus className="mr-2 h-4 w-4" /> Add Lead
                </Button>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center py-10">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : (
                <LeadList
                    leads={leads}
                    onEdit={(lead) => setEditingLead(lead)}
                    onDelete={(lead) => setLeadToDelete(lead)}
                />
            )}

            {/* Create Lead Dialog */}
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Create New Lead</DialogTitle>
                    </DialogHeader>
                    <LeadForm
                        lead={editingLead}
                        onSubmit={handleCreateLead}
                        isSubmitting={isSubmitting}
                        onAutofill={handleAutoFill}
                        isAutoFilling={isAutoFilling}
                    />
                </DialogContent>
            </Dialog>

            {/* Edit Lead Dialog */}
            <Dialog
                open={!!editingLead?._id}
                onOpenChange={(isOpen) => !isOpen && setEditingLead(null)}
            >
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Edit Lead</DialogTitle>
                    </DialogHeader>
                    {editingLead?._id && (
                        <LeadForm
                            lead={editingLead}
                            onSubmit={handleUpdateLead}
                            isSubmitting={isSubmitting}
                            onAutofill={handleAutoFill}
                            isAutoFilling={isAutoFilling}
                        />
                    )}
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <AlertDialog
                open={!!leadToDelete}
                onOpenChange={(isOpen) => !isOpen && setLeadToDelete(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete the lead "{leadToDelete?.name}" from your system.
                            This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive hover:bg-destructive/90">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default LeadsPage;
