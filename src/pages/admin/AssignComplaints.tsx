import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getComplaints, getDepartments, updateComplaint, type Complaint } from "@/lib/storage";
import { StatusBadge } from "@/components/StatusBadge";
import { Building, Menu, AlertCircle, CheckCircle, FileText, LogOut } from "lucide-react";
import { toast } from "sonner";

const AssignComplaints = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [departments, setDepartments] = useState<string[]>([]);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/admin/login");
      return;
    }
    loadData();
  }, [user, navigate]);

  const loadData = () => {
    const allComplaints = getComplaints().filter((c) => c.status === "Pending");
    setComplaints(allComplaints);
    setDepartments(getDepartments().map((d) => d.name));
  };

  const handleAssign = (complaintId: string, department: string) => {
    if (updateComplaint(complaintId, { assignedDepartment: department, status: "In Progress" })) {
      toast.success("Complaint assigned successfully");
      loadData();
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
            <Button variant="secondary" className="w-full justify-start">
              <FileText className="h-4 w-4 mr-2" />
              Assign Complaints
            </Button>
            <Link to="/admin/update-status">
              <Button variant="ghost" className="w-full justify-start">
                <AlertCircle className="h-4 w-4 mr-2" />
                Update Status
              </Button>
            </Link>
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
              <CardTitle className="text-2xl">Assign Complaints to Departments</CardTitle>
            </CardHeader>
            <CardContent>
              {complaints.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No pending complaints to assign
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Assign Department</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {complaints.map((complaint) => (
                      <TableRow key={complaint.id}>
                        <TableCell className="font-mono text-sm">{complaint.id}</TableCell>
                        <TableCell>{complaint.category}</TableCell>
                        <TableCell>{complaint.userName}</TableCell>
                        <TableCell className="max-w-xs truncate">{complaint.description}</TableCell>
                        <TableCell>
                          <StatusBadge status={complaint.status} />
                        </TableCell>
                        <TableCell>
                          <Select onValueChange={(value) => handleAssign(complaint.id, value)}>
                            <SelectTrigger className="w-[200px]">
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                            <SelectContent>
                              {departments.map((dept) => (
                                <SelectItem key={dept} value={dept}>
                                  {dept}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default AssignComplaints;
