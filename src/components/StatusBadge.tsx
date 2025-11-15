import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: "Pending" | "In Progress" | "Resolved" | "Rejected";
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const variants: Record<string, string> = {
    Pending: "bg-warning text-warning-foreground",
    "In Progress": "bg-info text-info-foreground",
    Resolved: "bg-success text-success-foreground",
    Rejected: "bg-destructive text-destructive-foreground",
  };

  return <Badge className={variants[status]}>{status}</Badge>;
};
