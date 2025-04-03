
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { Lead } from "@/types/lead";

interface CampaignLeadMessageListProps {
    selectedLeads: Lead[];
    messages: { [key: string]: string };
    generatingMessage: { [key: string]: boolean };
    onMessageChange: (leadId: string, message: string) => void;
    onRemoveLead: (leadId: string) => void;
    generatePersonalisedMessage: (leadId: string) => void;
}

const CampaignLeadMessageList: React.FC<CampaignLeadMessageListProps> = ({
    selectedLeads,
    messages,
    generatingMessage,
    onMessageChange,
    onRemoveLead,
    generatePersonalisedMessage
}) => {
    if (selectedLeads.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Selected Leads</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-6 text-muted-foreground">
                        No leads selected yet. Click "Add Leads" to select leads for your campaign.
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Selected Leads ({selectedLeads.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {selectedLeads.map((lead) => (
                    <div key={lead._id} className="border rounded-md p-3 space-y-2">
                        <div className="flex items-center justify-between">
                            <div className="font-medium">{lead.name}</div>
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => onRemoveLead(lead._id)}
                                className="h-6 w-6 p-0"
                            >
                                <X className="h-4 w-4" />
                                <span className="sr-only">Remove</span>
                            </Button>
                        </div>
                        <div className="text-xs text-muted-foreground">
                            {lead.job_title} at {lead.company}
                        </div>
                        <div className="pt-2">
                            <Textarea
                                placeholder={`Enter personalized message for ${lead.name}...`}
                                className="resize-none"
                                rows={3}
                                value={messages[lead._id] || ""}
                                onChange={(e) => onMessageChange(lead._id, e.target.value)}
                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={generatingMessage[lead._id]}
                            onClick={() => generatePersonalisedMessage(lead._id)}
                        >
                            Generate personalized message
                        </Button>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

export default CampaignLeadMessageList;
