import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getFeedback, type Feedback } from "@/lib/storage";
import { Building, Menu, AlertCircle, CheckCircle, FileText, LogOut, Star } from "lucide-react";

const ViewFeedback = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState<Feedback[]>([]);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/admin/login");
      return;
    }
    setFeedback(getFeedback());
  }, [user, navigate]);

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
            <Link to="/admin/update-status">
              <Button variant="ghost" className="w-full justify-start">
                <AlertCircle className="h-4 w-4 mr-2" />
                Update Status
              </Button>
            </Link>
            <Button variant="secondary" className="w-full justify-start">
              <CheckCircle className="h-4 w-4 mr-2" />
              View Feedback
            </Button>
          </nav>
        </aside>

        <main className="flex-1 p-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">User Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              {feedback.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No feedback submitted yet
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Complaint ID</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Comments</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {feedback.map((fb) => (
                      <TableRow key={fb.id}>
                        <TableCell className="font-mono text-sm">{fb.complaintId}</TableCell>
                        <TableCell>{fb.userName}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < fb.rating
                                    ? "fill-warning text-warning"
                                    : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="max-w-md">{fb.comments}</TableCell>
                        <TableCell>{new Date(fb.createdAt).toLocaleDateString()}</TableCell>
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

export default ViewFeedback;
