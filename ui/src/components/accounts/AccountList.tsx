
import React, { useState } from "react";
import { Account } from "@/types/account";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2, ExternalLink, Search, User } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface AccountListProps {
    accounts: Account[];
    onEdit: (account: Account) => void;
    onDelete: (account: Account) => void;
}

const AccountList: React.FC<AccountListProps> = ({ accounts, onEdit, onDelete }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredAccounts = accounts.filter(
        (account) =>
            account.linkedin_username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Mask password for display
    const maskPassword = (password: string) => {
        return "••••••••";
    };

    return (
        <div className="space-y-4">
            {/*
        <div className="flex items-center">
        <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
        type="search"
        placeholder="Search accounts..."
        className="pl-8"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        />
        </div>
        </div>
    */}

            {filteredAccounts.length === 0 ? (
                <div className="text-center py-10">
                    <p className="text-muted-foreground">No accounts found.</p>
                </div>
            ) : (
                <div className="border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Username</TableHead>
                                <TableHead className="hidden md:table-cell">Password</TableHead>
                                <TableHead className="hidden md:table-cell">Added</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredAccounts.map((account) => (
                                <TableRow key={account._id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center">
                                            <User className="mr-2 h-4 w-4" />
                                            {account.linkedin_username}
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {maskPassword(account.linkedin_password)}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {formatDistanceToNow(new Date(account.created_at), { addSuffix: true })}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            {account.profile_url && (
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => window.open(account.profile_url, "_blank")}
                                                    title="Open LinkedIn profile"
                                                >
                                                    <ExternalLink className="h-4 w-4" />
                                                    <span className="sr-only">Open LinkedIn profile</span>
                                                </Button>
                                            )}
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => onEdit(account)}
                                                title="Edit account"
                                            >
                                                <Edit className="h-4 w-4" />
                                                <span className="sr-only">Edit</span>
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => onDelete(account)}
                                                title="Delete account"
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

export default AccountList;
