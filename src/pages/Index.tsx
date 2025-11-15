import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Shield, Users, CheckCircle } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-info/5">
      <header className="border-b bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">GrievancePortal</h1>
          </div>
          <div className="flex gap-2">
            <Link to="/user/login">
              <Button variant="outline">User Login</Button>
            </Link>
            <Link to="/admin/login">
              <Button>Admin Login</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-info bg-clip-text text-transparent">
            Online Complaint & Grievance Management System
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A modern, efficient platform for submitting, tracking, and resolving complaints with transparency and accountability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="h-12 w-12 text-primary mb-2" />
              <CardTitle>For Users</CardTitle>
              <CardDescription>Submit and track your grievances</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  Easy complaint submission
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  Real-time status tracking
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  Provide feedback
                </li>
              </ul>
              <Link to="/user/register">
                <Button className="w-full mt-4">Get Started</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-primary/50">
            <CardHeader>
              <Shield className="h-12 w-12 text-primary mb-2" />
              <CardTitle>For Administrators</CardTitle>
              <CardDescription>Manage and resolve complaints efficiently</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  Assign to departments
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  Update status & remarks
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  View analytics
                </li>
              </ul>
              <Link to="/admin/login">
                <Button variant="outline" className="w-full mt-4">Admin Access</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <FileText className="h-12 w-12 text-primary mb-2" />
              <CardTitle>Features</CardTitle>
              <CardDescription>Everything you need in one place</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  Department management
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  File attachments
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  Feedback system
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-br from-primary/10 to-info/10 border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Ready to Get Started?</CardTitle>
            <CardDescription className="text-base">
              Join our platform today and experience seamless grievance management
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center gap-4">
            <Link to="/user/register">
              <Button size="lg">Register as User</Button>
            </Link>
            <Link to="/user/login">
              <Button size="lg" variant="outline">Sign In</Button>
            </Link>
          </CardContent>
        </Card>
      </main>

      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>© 2024 GrievancePortal. All rights reserved.</p>
          <p className="text-sm mt-2">Demo Credentials - User: user@example.com / user123 | Admin: admin@grievance.com / admin123</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
