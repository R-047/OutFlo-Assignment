
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Account, NewAccount } from "@/types/account";
import { getAccounts, createAccount, updateAccount, deleteAccount } from "@/services/accountService";
import AccountForm from "@/components/accounts/AccountForm";
import AccountList from "@/components/accounts/AccountList";
import { Plus, Loader2 } from "lucide-react";

const AccountsPage: React.FC = () => {
  const { toast } = useToast();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const [accountToDelete, setAccountToDelete] = useState<Account | null>(null);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    setIsLoading(true);
    try {
      const fetchedAccounts = await getAccounts();
      setAccounts(fetchedAccounts);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch accounts. Please try again.",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAccount = async (data: NewAccount) => {
    setIsSubmitting(true);
    try {
      const newAccount = await createAccount(data);
      setAccounts((prevAccounts) => [newAccount, ...prevAccounts]);
      setShowCreateDialog(false);
      toast({
        title: "Success",
        description: "Account created successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateAccount = async (data: NewAccount) => {
    if (!editingAccount) return;
    
    setIsSubmitting(true);
    try {
      const updatedAccount = await updateAccount(editingAccount._id, data);
      if (updatedAccount) {
        setAccounts((prevAccounts) =>
          prevAccounts.map((account) =>
            account._id === updatedAccount._id ? updatedAccount : account
          )
        );
      }
      setEditingAccount(null);
      toast({
        title: "Success",
        description: "Account updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!accountToDelete) return;
    
    try {
      await deleteAccount(accountToDelete._id);
      setAccounts((prevAccounts) => prevAccounts.filter((account) => account._id !== accountToDelete._id));
      setAccountToDelete(null);
      toast({
        title: "Success",
        description: "Account deleted successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete account. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container py-6 space-y-6 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">LinkedIn Accounts</h1>
          <p className="text-muted-foreground">
            Manage your LinkedIn accounts for outreach campaigns.
          </p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Account
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <AccountList
          accounts={accounts}
          onEdit={(account) => setEditingAccount(account)}
          onDelete={(account) => setAccountToDelete(account)}
        />
      )}

      {/* Create Account Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add LinkedIn Account</DialogTitle>
          </DialogHeader>
          <AccountForm
            onSubmit={handleCreateAccount}
            isSubmitting={isSubmitting}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Account Dialog */}
      <Dialog
        open={!!editingAccount}
        onOpenChange={(isOpen) => !isOpen && setEditingAccount(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit LinkedIn Account</DialogTitle>
          </DialogHeader>
          {editingAccount && (
            <AccountForm
              account={editingAccount}
              onSubmit={handleUpdateAccount}
              isSubmitting={isSubmitting}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!accountToDelete}
        onOpenChange={(isOpen) => !isOpen && setAccountToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the LinkedIn account "{accountToDelete?.linkedin_username}" from your system.
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

export default AccountsPage;
