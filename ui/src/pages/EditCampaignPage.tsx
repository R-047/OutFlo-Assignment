import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Lead } from "@/types/lead";
import { Account } from "@/types/account";
import { createCampaign, createMessage, generateMessage, getCampaign, getMessagesByCampaign, updateCampaign, updateMessage } from "@/services/campaignService";
import { getLeads } from "@/services/leadService";
import { getAccounts } from "@/services/accountService";
import LeadSelectionDialog from "@/components/campaigns/LeadSelectionDialog";
import AccountSelectionDialog from "@/components/campaigns/AccountSelectionDialog";
import CampaignLeadMessageList from "@/components/campaigns/CampaignLeadMessageList";
import CampaignAccountList from "@/components/campaigns/CampaignAccountList";
import { Campaign } from "@/types/campaign";

const EditCampaignPage: React.FC = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState<'Active' | 'Inactive'>('Active');
    const [selectedLeads, setSelectedLeads] = useState<Lead[]>([]);
    const [selectedAccounts, setSelectedAccounts] = useState<Account[]>([]);
    const { id } = useParams<{ id: string }>();
    const [campaignId, setCampaignId] = useState<string | null>(id);
    const [messages, setMessages] = useState<{ [key: string]: string }>({});
    const [generatingMessages, setGeneratingMessages] = useState<{ [key: string]: boolean }>({});

    const { data: campaign, isLoading, error } = useQuery({
        queryKey: ["campaigns", id],
        queryFn: () => getCampaign(id as string),
        enabled: !!id,
    });

    const { data: campaignMessages, campaignMessagesLoading, campaignMessagesError } = useQuery({
        queryKey: ["campaign messages", id],
        queryFn: () => getMessagesByCampaign(id as string),
        enabled: !!id,
    });


    useEffect(() => {
        if (campaign) {
            setName(campaign.name);
            setDescription(campaign.description);
            setStatus(campaign.status);
            setSelectedLeads(campaign.leads);
            setSelectedAccounts(campaign.accounts)
        }
    }, [campaign]);

    useEffect(() => {
        if (campaignMessages) {
            const messageMap = campaignMessages.reduce((acc, message) => {
                acc[message.lead] = message.message;
                return acc;
            }, {} as { [key: string]: string });

            setMessages(messageMap);
        }

    }, [campaignMessages])


    const { data: leads = [] } = useQuery({
        queryKey: ["leads"],
        queryFn: getLeads
    });

    const { data: accounts = [] } = useQuery({
        queryKey: ["accounts"],
        queryFn: getAccounts
    });

    const updateCampaignMutation = useMutation({
        mutationFn: (campaign: Partial<Campaign>) => updateCampaign(id, campaign),
        onSuccess: (data) => {
            toast.success("Campaign updated successfully");
            setCampaignId(data._id);
            // After creating campaign, automatically create empty messages for selected leads
            selectedLeads.forEach(lead => {
                const isOldLead = campaignMessages.find(m => m.lead == lead._id)
                if (isOldLead) {
                    updateMessageMutation.mutate({
                        id: isOldLead._id,
                        message: messages[lead._id] || ""
                    })
                } else {
                    createMessageMutation.mutate({
                        campaign: data._id,
                        lead: lead._id,
                        message: messages[lead._id] || ""
                    });
                }
            });
            // Navigate to campaigns page after successful creation
            setTimeout(() => {
                navigate('/campaigns');
            }, 1500);
        },
        onError: (error) => {
            toast.error("Failed to update campaign");
            console.error("Campaign update error:", error);
        }
    });

    const updateMessageMutation = useMutation({
        mutationFn: ({ id, message }: { id: string; message: string }) => updateMessage(id, { message }),
        onSuccess: () => {
            // Success handled silently as there might be multiple messages
        },
        onError: (error) => {
            toast.error("Failed to create a message for a lead");
            console.error("Message creation error:", error);
        }
    });


    const createMessageMutation = useMutation({
        mutationFn: createMessage,
        onSuccess: () => {
            // Success handled silently as there might be multiple messages
        },
        onError: (error) => {
            toast.error("Failed to create a message for a lead");
            console.error("Message creation error:", error);
        }
    });


    const generateMessageMutation = useMutation({
        mutationFn: (lead: Lead) => generateMessage(name, description, lead),
        onSuccess: (data) => {
            console.log(data)
            setGeneratingMessages(prev => ({
                ...prev,
                [data.id]: false
            }))
            setMessages(prev => ({
                ...prev,
                [data.id]: data.message.text
            }))
        },
        onError: (error) => {
            setGeneratingMessages({})
            toast.error("Failed to create a message for a lead");
            console.error("Message creation error:", error);
        }
    })



    const handleAddLead = (lead: Lead) => {
        if (!selectedLeads.find(l => l._id === lead._id)) {
            setSelectedLeads([...selectedLeads, lead]);
            // Initialize empty message for this lead
            setMessages(prev => ({
                ...prev,
                [lead._id]: ""
            }));
        }
    };

    const handleAddAccount = (account: Account) => {
        if (!selectedAccounts.find(a => a._id === account._id)) {
            setSelectedAccounts([...selectedAccounts, account]);
        }
    };

    const handleRemoveLead = (leadId: string) => {
        setSelectedLeads(selectedLeads.filter(lead => lead._id !== leadId));
        // Remove message for this lead
        const updatedMessages = { ...messages };
        delete updatedMessages[leadId];
        setMessages(updatedMessages);
    };

    const handleRemoveAccount = (accountId: string) => {
        setSelectedAccounts(selectedAccounts.filter(account => account._id !== accountId));
    };

    const handleMessageChange = (leadId: string, message: string) => {
        setMessages(prev => ({
            ...prev,
            [leadId]: message
        }));
    };

    const handleMessageGeneration = (leadId: string) => {
        setGeneratingMessages(prev => ({
            ...prev,
            [leadId]: true
        }))
        const lead = leads.find((l) => leadId == l._id)
        if (name == "" || description == "") {
            toast.error("please provide a campaign name and description");
            return
        }
        generateMessageMutation.mutate(lead)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("submiting")

        if (!name || !description) {
            toast.error("Please fill in all required fields");
            return;
        }

        if (selectedLeads.length === 0) {
            toast.error("Please select at least one lead");
            return;
        }

        if (selectedAccounts.length === 0) {
            toast.error("Please select at least one LinkedIn account");
            return;
        }

        updateCampaignMutation.mutate({
            name,
            description,
            status,
            leads: selectedLeads.map(lead => lead._id),
            accounts: selectedAccounts.map(account => account._id)
        });
    };

    return (
        <div className="container py-6 space-y-6 max-w-6xl">
            <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" onClick={() => navigate('/campaigns')}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Campaigns
                </Button>
            </div>

            <div>
                <h1 className="text-3xl font-bold tracking-tight">Edit {name} </h1>
                <p className="text-muted-foreground">
                    Set up your outreach campaign and personalized messages.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Campaign Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Campaign Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="Enter campaign name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Enter campaign description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <select
                                        id="status"
                                        className="w-full p-2 border rounded-md"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value as 'Active' | 'Inactive')}
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>

                                <div className="pt-4 flex items-center justify-between flex-wrap gap-3">
                                    <div className="flex flex-wrap gap-2">
                                        <LeadSelectionDialog
                                            leads={leads}
                                            onAddLead={handleAddLead}
                                            selectedLeads={selectedLeads}
                                        />
                                        <AccountSelectionDialog
                                            accounts={accounts}
                                            onAddAccount={handleAddAccount}
                                            selectedAccounts={selectedAccounts}
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={updateCampaignMutation.isPending}
                                    >
                                        {updateCampaignMutation.isPending ? "Updating..." : "Update Campaign"}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    <CampaignAccountList
                        selectedAccounts={selectedAccounts}
                        onRemoveAccount={handleRemoveAccount}
                    />
                </div>

                <div className="space-y-6">
                    <CampaignLeadMessageList
                        selectedLeads={selectedLeads}
                        messages={messages}
                        generatingMessage={generatingMessages}
                        onMessageChange={handleMessageChange}
                        onRemoveLead={handleRemoveLead}
                        generatePersonalisedMessage={handleMessageGeneration}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditCampaignPage;
