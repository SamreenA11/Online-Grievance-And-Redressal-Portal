import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserComplaints, addFeedback } from "@/lib/storage";
import { ArrowLeft, Star } from "lucide-react";
import { toast } from "sonner";

const Feedback = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [complaintId, setComplaintId] = useState("");
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");
  const [complaints, setComplaints] = useState<any[]>([]);

  useEffect(() => {
    if (!user) {
      navigate("/user/login");
      return;
    }
    const userComplaints = getUserComplaints(user.id).filter((c) => c.status === "Resolved");
    setComplaints(userComplaints);
  }, [user, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !complaintId || rating === 0) {
      toast.error("Please fill all required fields");
      return;
    }

    addFeedback({
      complaintId,
      userId: user.id,
      userName: user.name,
      rating,
      comments,
    });

    toast.success("Feedback submitted successfully!");
    navigate("/user/dashboard");
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
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Submit Feedback</CardTitle>
            <CardDescription>
              Share your experience with resolved complaints
            </CardDescription>
          </CardHeader>
          <CardContent>
            {complaints.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No resolved complaints available for feedback.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="complaint">Select Complaint</Label>
                  <Select value={complaintId} onValueChange={setComplaintId} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a resolved complaint" />
                    </SelectTrigger>
                    <SelectContent>
                      {complaints.map((complaint) => (
                        <SelectItem key={complaint.id} value={complaint.id}>
                          {complaint.id} - {complaint.category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Rating</Label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="transition-colors"
                      >
                        <Star
                          className={`h-8 w-8 ${
                            star <= rating
                              ? "fill-warning text-warning"
                              : "text-muted-foreground"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {rating === 0 && "Click to rate"}
                    {rating === 1 && "Poor"}
                    {rating === 2 && "Fair"}
                    {rating === 3 && "Good"}
                    {rating === 4 && "Very Good"}
                    {rating === 5 && "Excellent"}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comments">Comments</Label>
                  <Textarea
                    id="comments"
                    placeholder="Share your feedback..."
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    rows={5}
                    required
                  />
                </div>

                <div className="flex gap-4">
                  <Button type="submit" className="flex-1" disabled={rating === 0}>
                    Submit Feedback
                  </Button>
                  <Button type="button" variant="outline" onClick={() => navigate("/user/dashboard")}>
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Feedback;
