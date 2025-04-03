
import React, { useState } from "react";
import { Lead } from "@/types/lead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2, ExternalLink, Search } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface LeadListProps {
    leads: Lead[];
    onEdit: (lead: Lead) => void;
    onDelete: (lead: Lead) => void;
}

const LeadList: React.FC<LeadListProps> = ({ leads, onEdit, onDelete }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredLeads = leads.filter(
        (lead) =>
            lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.job_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-4">
            {/*<div className="flex items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search leads..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>*/}

            {filteredLeads.length === 0 ? (
                <div className="text-center py-10">
                    <p className="text-muted-foreground">No leads found.</p>
                </div>
            ) : (
                <div className="border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead className="hidden md:table-cell">Company</TableHead>
                                <TableHead className="hidden md:table-cell">Job Title</TableHead>
                                <TableHead className="hidden md:table-cell">Location</TableHead>
                                <TableHead className="hidden lg:table-cell">Added</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredLeads.map((lead) => (
                                <TableRow key={lead._id}>
                                    <TableCell className="font-medium">{lead.name}</TableCell>
                                    <TableCell className="hidden md:table-cell">{lead.company}</TableCell>
                                    <TableCell className="hidden md:table-cell">{lead.job_title}</TableCell>
                                    <TableCell className="hidden md:table-cell">{lead.location}</TableCell>
                                    <TableCell className="hidden lg:table-cell">
                                        {formatDistanceToNow(new Date(lead.created_at), { addSuffix: true })}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            {lead.linkedin_url && (
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => window.open(lead.linkedin_url, "_blank")}
                                                    title="Open LinkedIn profile"
                                                >
                                                    <ExternalLink className="h-4 w-4" />
                                                    <span className="sr-only">Open LinkedIn profile</span>
                                                </Button>
                                            )}
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => onEdit(lead)}
                                                title="Edit lead"
                                            >
                                                <Edit className="h-4 w-4" />
                                                <span className="sr-only">Edit</span>
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => onDelete(lead)}
                                                title="Delete lead"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                                <span className="sr-only">Delete</span>
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
};

export default LeadList;
