
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { Account } from "@/types/account";

interface AccountSelectionDialogProps {
    accounts: Account[];
    selectedAccounts: Account[];
    onAddAccount: (account: Account) => void;
}

const AccountSelectionDialog: React.FC<AccountSelectionDialogProps> = ({
    accounts,
    selectedAccounts,
    onAddAccount,
}) => {
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredAccounts = accounts.filter(
        (account) =>
            !selectedAccounts.some((selectedAccount) => selectedAccount._id === account._id) &&
            (account.linkedin_username.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleAddAccount = (account: Account) => {
        onAddAccount(account);
    };

    return (
        <>
            <Button type="button" variant="outline" onClick={() => setOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add LinkedIn Accounts
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Select LinkedIn Accounts</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4 my-4">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search accounts..."
                                className="pl-8"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="border rounded-md divide-y max-h-[300px] overflow-y-auto">
                            {filteredAccounts.length === 0 ? (
                                <div className="p-4 text-center text-muted-foreground">
                                    No accounts found or all accounts already selected
                                </div>
                            ) : (
                                filteredAccounts.map((account) => (
                                    <div
                                        key={account._id}
                                        className="p-3 flex items-center justify-between hover:bg-muted"
                                    >
                                        <div>
                                            <div className="font-medium">{account.linkedin_username}</div>
                                            <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                                                {account.profile_url}
                                            </div>
                                        </div>
                                        <Button size="sm" onClick={() => handleAddAccount(account)}>
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

export default AccountSelectionDialog;
