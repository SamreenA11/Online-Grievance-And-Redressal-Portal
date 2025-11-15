// localStorage utilities for simulating backend

export interface Complaint {
  id: string;
  userId: string;
  userName: string;
  category: string;
  description: string;
  status: "Pending" | "In Progress" | "Resolved" | "Rejected";
  assignedDepartment?: string;
  adminRemarks?: string;
  fileUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

export interface Feedback {
  id: string;
  complaintId: string;
  userId: string;
  userName: string;
  rating: number;
  comments: string;
  createdAt: string;
}

// Initialize demo data
export const initializeDemoData = () => {
  if (!localStorage.getItem("departments")) {
    const demoDepartments: Department[] = [
      { id: "dept-1", name: "IT Support", description: "Technical issues and system problems", createdAt: new Date().toISOString() },
      { id: "dept-2", name: "HR Department", description: "Human resources and employee relations", createdAt: new Date().toISOString() },
      { id: "dept-3", name: "Facilities", description: "Building maintenance and infrastructure", createdAt: new Date().toISOString() },
      { id: "dept-4", name: "Finance", description: "Financial queries and reimbursements", createdAt: new Date().toISOString() },
      { id: "dept-5", name: "Administration", description: "General administrative matters", createdAt: new Date().toISOString() },
    ];
    localStorage.setItem("departments", JSON.stringify(demoDepartments));
  }

  if (!localStorage.getItem("complaints")) {
    const demoComplaints: Complaint[] = [
      {
        id: "comp-1",
        userId: "user-1",
        userName: "Demo User",
        category: "Technical Issue",
        description: "Unable to access the employee portal. Getting authentication errors.",
        status: "In Progress",
        assignedDepartment: "IT Support",
        adminRemarks: "Investigating the issue. Will update within 24 hours.",
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "comp-2",
        userId: "user-1",
        userName: "Demo User",
        category: "Facility Issue",
        description: "Air conditioning not working in meeting room B-203.",
        status: "Resolved",
        assignedDepartment: "Facilities",
        adminRemarks: "AC has been repaired and is now working properly.",
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ];
    localStorage.setItem("complaints", JSON.stringify(demoComplaints));
  }
};

// Complaints
export const getComplaints = (): Complaint[] => {
  return JSON.parse(localStorage.getItem("complaints") || "[]");
};

export const getUserComplaints = (userId: string): Complaint[] => {
  const complaints = getComplaints();
  return complaints.filter((c) => c.userId === userId);
};

export const addComplaint = (complaint: Omit<Complaint, "id" | "createdAt" | "updatedAt">): Complaint => {
  const complaints = getComplaints();
  const newComplaint: Complaint = {
    ...complaint,
    id: `comp-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  complaints.push(newComplaint);
  localStorage.setItem("complaints", JSON.stringify(complaints));
  return newComplaint;
};

export const updateComplaint = (id: string, updates: Partial<Complaint>): boolean => {
  const complaints = getComplaints();
  const index = complaints.findIndex((c) => c.id === id);
  if (index !== -1) {
    complaints[index] = { ...complaints[index], ...updates, updatedAt: new Date().toISOString() };
    localStorage.setItem("complaints", JSON.stringify(complaints));
    return true;
  }
  return false;
};

export const deleteComplaint = (id: string): boolean => {
  const complaints = getComplaints();
  const filtered = complaints.filter((c) => c.id !== id);
  localStorage.setItem("complaints", JSON.stringify(filtered));
  return filtered.length < complaints.length;
};

// Departments
export const getDepartments = (): Department[] => {
  return JSON.parse(localStorage.getItem("departments") || "[]");
};

export const addDepartment = (department: Omit<Department, "id" | "createdAt">): Department => {
  const departments = getDepartments();
  const newDepartment: Department = {
    ...department,
    id: `dept-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  departments.push(newDepartment);
  localStorage.setItem("departments", JSON.stringify(departments));
  return newDepartment;
};

export const updateDepartment = (id: string, updates: Partial<Department>): boolean => {
  const departments = getDepartments();
  const index = departments.findIndex((d) => d.id === id);
  if (index !== -1) {
    departments[index] = { ...departments[index], ...updates };
    localStorage.setItem("departments", JSON.stringify(departments));
    return true;
  }
  return false;
};

export const deleteDepartment = (id: string): boolean => {
  const departments = getDepartments();
  const filtered = departments.filter((d) => d.id !== id);
  localStorage.setItem("departments", JSON.stringify(filtered));
  return filtered.length < departments.length;
};

// Feedback
export const getFeedback = (): Feedback[] => {
  return JSON.parse(localStorage.getItem("feedback") || "[]");
};

export const addFeedback = (feedback: Omit<Feedback, "id" | "createdAt">): Feedback => {
  const feedbacks = getFeedback();
  const newFeedback: Feedback = {
    ...feedback,
    id: `feed-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  feedbacks.push(newFeedback);
  localStorage.setItem("feedback", JSON.stringify(feedbacks));
  return newFeedback;
};
