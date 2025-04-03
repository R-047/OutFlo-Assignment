
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BarChart, Calendar, Users, Briefcase } from "lucide-react";

const DashboardPage: React.FC = () => {
  return (
    <div className="container py-6 space-y-6 max-w-6xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome to your lead management dashboard.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +3 from last month
            </p>
            <Button variant="link" className="p-0 h-auto mt-2" asChild>
              <Link to="/leads">View all leads</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              2 require attention
            </p>
            <Button variant="link" className="p-0 h-auto mt-2" asChild>
              <Link to="/campaigns">View all campaigns</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Tasks</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">
              3 due today
            </p>
            <Button variant="link" className="p-0 h-auto mt-2">
              View calendar
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                  <Users className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">New lead added</p>
                  <p className="text-xs text-muted-foreground">Alby Jose - ABC</p>
                </div>
                <div className="ml-auto text-xs text-muted-foreground">
                  2 hours ago
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                  <Briefcase className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">Campaign updated</p>
                  <p className="text-xs text-muted-foreground">Q2 Outreach</p>
                </div>
                <div className="ml-auto text-xs text-muted-foreground">
                  5 hours ago
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                  <Users className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">Lead updated</p>
                  <p className="text-xs text-muted-foreground">Jane Smith - Innovation Inc</p>
                </div>
                <div className="ml-auto text-xs text-muted-foreground">
                  Yesterday
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link to="/leads">
                <Users className="mr-2 h-4 w-4" />
                Manage Leads
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link to="/campaigns">
                <Briefcase className="mr-2 h-4 w-4" />
                Manage Campaigns
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <BarChart className="mr-2 h-4 w-4" />
              View Reports
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
