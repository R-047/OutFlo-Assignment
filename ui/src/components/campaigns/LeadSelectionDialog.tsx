
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { Lead } from "@/types/lead";

interface LeadSelectionDialogProps {
    leads: Lead[];
    selectedLeads: Lead[];
    onAddLead: (lead: Lead) => void;
}

const LeadSelectionDialog: React.FC<LeadSelectionDialogProps> = ({
    leads,
    selectedLeads,
    onAddLead,
}) => {
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredLeads = leads
        .filter((lead) => !lead.is_deleted)
        .filter(
            (lead) =>
                !selectedLeads.some((selectedLead) => selectedLead._id === lead._id) &&
                (lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    lead.job_title.toLowerCase().includes(searchTerm.toLowerCase()))
        );

    const handleAddLead = (lead: Lead) => {
        onAddLead(lead);
    };

    return (
        <>
            <Button type="button" variant="outline" onClick={() => setOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Leads
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Select Leads</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4 my-4">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search leads..."
                                className="pl-8"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="border rounded-md divide-y max-h-[300px] overflow-y-auto">
                            {filteredLeads.length === 0 ? (
                                <div className="p-4 text-center text-muted-foreground">
                                    No leads found or all leads already selected
                                </div>
                            ) : (
                                filteredLeads.map((lead) => (
                                    <div
                                        key={lead._id}
                                        className="p-3 flex items-center justify-between hover:bg-muted"
                                    >
                                        <div>
                                            <div className="font-medium">{lead.name}</div>
                                            <div className="text-sm text-muted-foreground">
                                                {lead.job_title} at {lead.company}
                                            </div>
                                        </div>
                                        <Button size="sm" onClick={() => handleAddLead(lead)}>
                                            <Plus className="h-4 w-4" />
                                            <span className="sr-only">Add</span>
                                        </Button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default LeadSelectionDialog;
