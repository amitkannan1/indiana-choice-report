import { useState, useEffect } from "react";
import { 
  useGetCurrentAuthUser, 
  useGetReportSections, 
  useGetReportTables, 
  useGetReportStats,
  useGetReportMetadata,
  useUpdateReportMetadata,
  useGetAdminUsers,
  useAddAdminUser,
  useRemoveAdminUser
} from "@workspace/api-client-react";
import { 
  getGetReportMetadataQueryKey,
  getGetAdminUsersQueryKey
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";

import { AdminLayout } from "@/components/layout/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, Edit, Trash2, Plus, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import { EditSectionDialog, EditTableDialog, EditStatDialog } from "@/components/admin/AdminForms";
import type { ReportSection, ReportTable, ReportStat } from "@workspace/api-client-react";

export default function Admin() {
  const { data: auth, isLoading: authLoading } = useGetCurrentAuthUser();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Data queries
  const { data: sections = [], isLoading: sectionsLoading } = useGetReportSections();
  const { data: tables = [], isLoading: tablesLoading } = useGetReportTables();
  const { data: stats = [], isLoading: statsLoading } = useGetReportStats();
  const { data: metadata, isLoading: metadataLoading } = useGetReportMetadata();
  const { data: users = [], isLoading: usersLoading } = useGetAdminUsers();

  // Dialog states
  const [editingSection, setEditingSection] = useState<ReportSection | null>(null);
  const [editingTable, setEditingTable] = useState<ReportTable | null>(null);
  const [editingStat, setEditingStat] = useState<ReportStat | null>(null);

  // Metadata form state
  const [metaForm, setMetaForm] = useState({ title: "", year: "", desc: "", date: "" });
  
  // User form state
  const [newUserReplitId, setNewUserReplitId] = useState("");
  const [newUserUsername, setNewUserUsername] = useState("");

  // Mutations
  const { mutate: updateMeta, isPending: updatingMeta } = useUpdateReportMetadata({
    mutation: {
      onSuccess: () => {
        toast({ title: "Success", description: "Metadata updated." });
        queryClient.invalidateQueries({ queryKey: getGetReportMetadataQueryKey() });
      }
    }
  });

  const { mutate: addUser, isPending: addingUser } = useAddAdminUser({
    mutation: {
      onSuccess: () => {
        toast({ title: "User Added", description: "New admin user successfully granted access." });
        setNewUserReplitId("");
        setNewUserUsername("");
        queryClient.invalidateQueries({ queryKey: getGetAdminUsersQueryKey() });
      },
      onError: (err) => toast({ title: "Error", description: err.message, variant: "destructive" })
    }
  });

  const { mutate: removeUser, isPending: removingUser } = useRemoveAdminUser({
    mutation: {
      onSuccess: () => {
        toast({ title: "User Removed", description: "Admin access revoked." });
        queryClient.invalidateQueries({ queryKey: getGetAdminUsersQueryKey() });
      }
    }
  });

  useEffect(() => {
    if (!authLoading && !auth?.isAuthenticated) {
      window.location.href = "/api/login?returnTo=/admin";
    }
  }, [auth, authLoading]);

  useEffect(() => {
    if (metadata) {
      setMetaForm({
        title: metadata.reportTitle,
        year: metadata.reportYear,
        desc: metadata.reportDescription || "",
        date: metadata.publishedDate || ""
      });
    }
  }, [metadata]);

  if (authLoading || !auth?.isAuthenticated) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>;
  }

  if (!auth.user?.isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-primary">Access Denied</h1>
        <p className="text-muted-foreground">You do not have admin access. Contact an administrator to be added.</p>
        <a href="/" className="text-accent underline">Return to Report</a>
      </div>
    );
  }

  const isLoading = sectionsLoading || tablesLoading || statsLoading || metadataLoading || usersLoading;

  return (
    <AdminLayout username={auth.user.username}>
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Content Management</h2>
        <p className="text-muted-foreground mt-2">Update the live report contents, data tables, and configuration.</p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64 border rounded-xl bg-card">
          <Loader2 className="animate-spin h-8 w-8 text-primary" />
        </div>
      ) : (
        <Tabs defaultValue="sections" className="space-y-6">
          <TabsList className="bg-card border h-14 p-1 w-full justify-start overflow-x-auto">
            <TabsTrigger value="sections" className="h-10 px-6 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Text Sections</TabsTrigger>
            <TabsTrigger value="tables" className="h-10 px-6 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Data Tables</TabsTrigger>
            <TabsTrigger value="stats" className="h-10 px-6 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Key Statistics</TabsTrigger>
            <TabsTrigger value="metadata" className="h-10 px-6 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Report Settings</TabsTrigger>
            <TabsTrigger value="users" className="h-10 px-6 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Admin Access</TabsTrigger>
          </TabsList>

          <TabsContent value="sections" className="m-0 focus-visible:outline-none">
            <Card>
              <CardHeader>
                <CardTitle>Report Sections</CardTitle>
                <CardDescription>Manage the narrative text and overall structure of the report.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Order</TableHead>
                      <TableHead>Section Key</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[...sections].sort((a, b) => a.sectionOrder - b.sectionOrder).map((section) => (
                      <TableRow key={section.id}>
                        <TableCell className="font-mono text-muted-foreground">{section.sectionOrder}</TableCell>
                        <TableCell><Badge variant="outline">{section.key}</Badge></TableCell>
                        <TableCell className="font-medium">{section.title}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="secondary" size="sm" onClick={() => setEditingSection(section)}>
                            <Edit className="h-4 w-4 mr-2" /> Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tables" className="m-0 focus-visible:outline-none">
            <Card>
              <CardHeader>
                <CardTitle>Data Tables</CardTitle>
                <CardDescription>Manage tabular data displayed within sections.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Table Key</TableHead>
                      <TableHead>Section</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[...tables].sort((a, b) => a.sectionKey.localeCompare(b.sectionKey) || a.tableOrder - b.tableOrder).map((table) => (
                      <TableRow key={table.id}>
                        <TableCell><Badge variant="outline">{table.key}</Badge></TableCell>
                        <TableCell className="text-muted-foreground text-sm">{table.sectionKey}</TableCell>
                        <TableCell className="font-medium">{table.title}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">{table.rows.length} rows &times; {table.headers.length} cols</TableCell>
                        <TableCell className="text-right">
                          <Button variant="secondary" size="sm" onClick={() => setEditingTable(table)}>
                            <Edit className="h-4 w-4 mr-2" /> Edit Data
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="m-0 focus-visible:outline-none">
            <Card>
              <CardHeader>
                <CardTitle>Key Statistics</CardTitle>
                <CardDescription>Manage the highlighted callout metrics.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Section</TableHead>
                      <TableHead>Label</TableHead>
                      <TableHead>Current Value</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[...stats].sort((a, b) => a.sectionKey.localeCompare(b.sectionKey) || a.statOrder - b.statOrder).map((stat) => (
                      <TableRow key={stat.id}>
                        <TableCell className="text-muted-foreground text-sm">{stat.sectionKey}</TableCell>
                        <TableCell className="font-medium">{stat.label}</TableCell>
                        <TableCell className="font-serif font-bold text-primary">{stat.value}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="secondary" size="sm" onClick={() => setEditingStat(stat)}>
                            <Edit className="h-4 w-4 mr-2" /> Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="metadata" className="m-0 focus-visible:outline-none">
            <Card className="max-w-2xl">
              <CardHeader>
                <CardTitle>Report Settings</CardTitle>
                <CardDescription>Global attributes for the entire report.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Report Title</Label>
                  <Input value={metaForm.title} onChange={e => setMetaForm({...metaForm, title: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Academic Year</Label>
                    <Input value={metaForm.year} onChange={e => setMetaForm({...metaForm, year: e.target.value})} placeholder="e.g. 2024-2025" />
                  </div>
                  <div className="space-y-2">
                    <Label>Published Date</Label>
                    <Input value={metaForm.date} onChange={e => setMetaForm({...metaForm, date: e.target.value})} placeholder="e.g. June 2025" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Short Description (Hero subtext)</Label>
                  <Textarea value={metaForm.desc} onChange={e => setMetaForm({...metaForm, desc: e.target.value})} className="h-24" />
                </div>
                <Button 
                  onClick={() => updateMeta({ data: { reportTitle: metaForm.title, reportYear: metaForm.year, reportDescription: metaForm.desc, publishedDate: metaForm.date }})} 
                  disabled={updatingMeta}
                  className="mt-4"
                >
                  {updatingMeta && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="m-0 focus-visible:outline-none">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Authorized Admins</CardTitle>
                    <CardDescription>Users who can log in and edit the report data.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Username</TableHead>
                          <TableHead>Added</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map((u) => (
                          <TableRow key={u.id}>
                            <TableCell className="font-medium flex items-center gap-2">
                              {u.username}
                              {auth.user?.username === u.username && <Badge variant="secondary" className="ml-2">You</Badge>}
                            </TableCell>
                            <TableCell className="text-muted-foreground text-sm">
                              {new Date(u.addedAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button 
                                variant="destructive" 
                                size="sm" 
                                onClick={() => {
                                  if (confirm(`Remove ${u.username}?`)) removeUser({ id: u.id });
                                }}
                                disabled={auth.user?.username === u.username || removingUser}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><UserPlus className="h-5 w-5"/> Add Admin</CardTitle>
                    <CardDescription>Grant access to another team member.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Replit Username</Label>
                      <Input 
                        placeholder="e.g. john_doe" 
                        value={newUserUsername}
                        onChange={e => setNewUserUsername(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Replit User ID (Optional)</Label>
                      <Input 
                        placeholder="ID number" 
                        value={newUserReplitId}
                        onChange={e => setNewUserReplitId(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">ID is preferred if known, username is used as display fallback.</p>
                    </div>
                    <Button 
                      className="w-full" 
                      onClick={() => addUser({ data: { replitUserId: newUserReplitId || 'unknown', username: newUserUsername }})}
                      disabled={!newUserUsername || addingUser}
                    >
                      {addingUser ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
                      Add User
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      )}

      {/* Editor Dialogs */}
      <EditSectionDialog 
        section={editingSection} 
        open={!!editingSection} 
        onOpenChange={(open) => !open && setEditingSection(null)} 
      />
      
      <EditTableDialog 
        table={editingTable} 
        open={!!editingTable} 
        onOpenChange={(open) => !open && setEditingTable(null)} 
      />
      
      <EditStatDialog 
        stat={editingStat} 
        open={!!editingStat} 
        onOpenChange={(open) => !open && setEditingStat(null)} 
      />

    </AdminLayout>
  );
}
