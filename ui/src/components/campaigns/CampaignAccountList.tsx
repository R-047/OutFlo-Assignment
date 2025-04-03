
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Account } from "@/types/account";

interface CampaignAccountListProps {
  selectedAccounts: Account[];
  onRemoveAccount: (accountId: string) => void;
}

const CampaignAccountList: React.FC<CampaignAccountListProps> = ({
  selectedAccounts,
  onRemoveAccount,
}) => {
  if (selectedAccounts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Selected LinkedIn Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6 text-muted-foreground">
            No LinkedIn accounts selected yet. Click "Add LinkedIn Accounts" to select accounts for your campaign.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Selected LinkedIn Accounts ({selectedAccounts.length})</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {selectedAccounts.map((account) => (
          <div key={account._id} className="border rounded-md p-3 space-y-2">
            <div className="flex items-center justify-between">
              <div className="font-medium">{account.linkedin_username}</div>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => onRemoveAccount(account._id)}
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove</span>
              </Button>
            </div>
            <div className="text-xs text-muted-foreground truncate">
              {account.profile_url}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default CampaignAccountList;
