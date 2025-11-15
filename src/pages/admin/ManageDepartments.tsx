import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { getDepartments, addDepartment, updateDepartment, deleteDepartment, type Department } from "@/lib/storage";
import { Building, Edit, Trash2, Plus, Menu, AlertCircle, CheckCircle, FileText, LogOut } from "lucide-react";
import { toast } from "sonner";

const ManageDepartments = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingDept, setEditingDept] = useState<Department | null>(null);
  const [formData, setFormData] = useState({ name: "", description: "" });

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/admin/login");
      return;
    }
    loadDepartments();
  }, [user, navigate]);

  const loadDepartments = () => {
    setDepartments(getDepartments());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingDept) {
      updateDepartment(editingDept.id, formData);
      toast.success("Department updated successfully");
      setEditingDept(null);
    } else {
      addDepartment(formData);
      toast.success("Department added successfully");
      setIsAddOpen(false);
    }
    
    setFormData({ name: "", description: "" });
    loadDepartments();
  };

  const handleEdit = (dept: Department) => {
    setEditingDept(dept);
    setFormData({ name: dept.name, description: dept.description });
  };

  const handleDelete = (id: string) => {
    if (deleteDepartment(id)) {
      toast.success("Department deleted successfully");
      loadDepartments();
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
            <Button variant="secondary" className="w-full justify-start">
              <Building className="h-4 w-4 mr-2" />
              Manage Departments
            </Button>
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
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl">Manage Departments</CardTitle>
              <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Department
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Department</DialogTitle>
                    <DialogDescription>Create a new department to handle complaints</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Department Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">Add Department</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {departments.map((dept) => (
                    <TableRow key={dept.id}>
                      <TableCell className="font-medium">{dept.name}</TableCell>
                      <TableCell>{dept.description}</TableCell>
                      <TableCell>{new Date(dept.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Dialog open={editingDept?.id === dept.id} onOpenChange={(open) => !open && setEditingDept(null)}>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => handleEdit(dept)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit Department</DialogTitle>
                              </DialogHeader>
                              <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                  <Label htmlFor="edit-name">Department Name</Label>
                                  <Input
                                    id="edit-name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-description">Description</Label>
                                  <Textarea
                                    id="edit-description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    required
                                  />
                                </div>
                                <Button type="submit" className="w-full">Update Department</Button>
                              </form>
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(dept.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default ManageDepartments;
