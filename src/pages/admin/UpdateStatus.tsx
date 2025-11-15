import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getComplaints, updateComplaint, type Complaint } from "@/lib/storage";
import { StatusBadge } from "@/components/StatusBadge";
import { Building, Menu, AlertCircle, CheckCircle, FileText, LogOut } from "lucide-react";
import { toast } from "sonner";

const UpdateStatus = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [remarks, setRemarks] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/admin/login");
      return;
    }
    loadComplaints();
  }, [user, navigate]);

  const loadComplaints = () => {
    const assigned = getComplaints().filter((c) => c.assignedDepartment);
    setComplaints(assigned);
  };

  const handleUpdate = (complaintId: string, status: string) => {
    const remark = remarks[complaintId] || "";
    if (updateComplaint(complaintId, { status: status as any, adminRemarks: remark })) {
      toast.success("Status updated successfully");
      loadComplaints();
      setRemarks((prev) => ({ ...prev, [complaintId]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Admin Portal</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Admin: {user?.name}</span>
            <Button variant="outline" size="sm" onClick={() => { logout(); navigate("/admin/login"); }}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="w-64 min-h-[calc(100vh-73px)] border-r bg-card">
          <nav className="p-4 space-y-2">
            <Link to="/admin/dashboard">
              <Button variant="ghost" className="w-full justify-start">
                <Menu className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
            </Link>
            <Link to="/admin/manage-departments">
              <Button variant="ghost" className="w-full justify-start">
                <Building className="h-4 w-4 mr-2" />
                Manage Departments
              </Button>
            </Link>
            <Link to="/admin/assign-complaints">
              <Button variant="ghost" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Assign Complaints
              </Button>
            </Link>
            <Button variant="secondary" className="w-full justify-start">
              <AlertCircle className="h-4 w-4 mr-2" />
              Update Status
            </Button>
            <Link to="/admin/view-feedback">
              <Button variant="ghost" className="w-full justify-start">
                <CheckCircle className="h-4 w-4 mr-2" />
                View Feedback
              </Button>
            </Link>
          </nav>
        </aside>

        <main className="flex-1 p-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Update Complaint Status</CardTitle>
            </CardHeader>
            <CardContent>
              {complaints.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No assigned complaints to update
                </div>
              ) : (
                <div className="space-y-4">
                  {complaints.map((complaint) => (
                    <Card key={complaint.id}>
                      <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Complaint ID</p>
                            <p className="font-mono">{complaint.id}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">User</p>
                            <p>{complaint.userName}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Category</p>
                            <p>{complaint.category}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Department</p>
                            <p>{complaint.assignedDepartment}</p>
                          </div>
                          <div className="md:col-span-2">
                            <p className="text-sm text-muted-foreground">Description</p>
                            <p>{complaint.description}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Current Status</p>
                            <StatusBadge status={complaint.status} />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="md:col-span-2">
                            <Input
                              placeholder="Admin remarks..."
                              value={remarks[complaint.id] || ""}
                              onChange={(e) => setRemarks({ ...remarks, [complaint.id]: e.target.value })}
                            />
                          </div>
                          <Select onValueChange={(value) => handleUpdate(complaint.id, value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Update status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="In Progress">In Progress</SelectItem>
                              <SelectItem value="Resolved">Resolved</SelectItem>
                              <SelectItem value="Rejected">Rejected</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default UpdateStatus;
