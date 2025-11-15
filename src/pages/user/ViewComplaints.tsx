import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getUserComplaints, deleteComplaint, type Complaint } from "@/lib/storage";
import { StatusBadge } from "@/components/StatusBadge";
import { ArrowLeft, Trash2, Eye } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const ViewComplaints = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  useEffect(() => {
    if (!user) {
      navigate("/user/login");
      return;
    }
    loadComplaints();
  }, [user, navigate]);

  const loadComplaints = () => {
    if (user) {
      const userComplaints = getUserComplaints(user.id);
      setComplaints(userComplaints.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    }
  };

  const handleDelete = (id: string) => {
    if (deleteComplaint(id)) {
      toast.success("Complaint deleted successfully");
      loadComplaints();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => navigate("/user/dashboard")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">My Complaints</CardTitle>
          </CardHeader>
          <CardContent>
            {complaints.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No complaints found. Submit your first complaint to get started.</p>
                <Button className="mt-4" onClick={() => navigate("/user/submit-complaint")}>
                  Submit Complaint
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {complaints.map((complaint) => (
                      <TableRow key={complaint.id}>
                        <TableCell className="font-mono text-sm">{complaint.id}</TableCell>
                        <TableCell>{complaint.category}</TableCell>
                        <TableCell>
                          <StatusBadge status={complaint.status} />
                        </TableCell>
                        <TableCell>{complaint.assignedDepartment || "Not Assigned"}</TableCell>
                        <TableCell>{new Date(complaint.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Complaint Details</DialogTitle>
                                  <DialogDescription>ID: {complaint.id}</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <h4 className="font-semibold mb-1">Category</h4>
                                    <p className="text-muted-foreground">{complaint.category}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-1">Description</h4>
                                    <p className="text-muted-foreground">{complaint.description}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-1">Status</h4>
                                    <StatusBadge status={complaint.status} />
                                  </div>
                                  {complaint.assignedDepartment && (
                                    <div>
                                      <h4 className="font-semibold mb-1">Assigned Department</h4>
                                      <p className="text-muted-foreground">{complaint.assignedDepartment}</p>
                                    </div>
                                  )}
                                  {complaint.adminRemarks && (
                                    <div>
                                      <h4 className="font-semibold mb-1">Admin Remarks</h4>
                                      <p className="text-muted-foreground">{complaint.adminRemarks}</p>
                                    </div>
                                  )}
                                  <div>
                                    <h4 className="font-semibold mb-1">Submitted</h4>
                                    <p className="text-muted-foreground">{new Date(complaint.createdAt).toLocaleString()}</p>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                            {complaint.status === "Pending" && (
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDelete(complaint.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ViewComplaints;
