import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import Header from "@/components/header";
import api from "@/util/interceptor";

const FeedbackPage = () => {
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!feedback.trim()) {
      toast("Error", {
        description: "Please enter your feedback",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Replace with your actual API call
      const response = await api.post(
        `${import.meta.env.VITE_API}/feedback`,
        { feedback },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status == 201) {
        toast("I got your feedback! Thanks!");
      }
      setFeedback("");
    } catch (error) {
      console.log(error);
      toast("Uh oh.. Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-2xl mx-auto p-6 font-custom">
        <div className="space-y-2 mb-6">
          <h1 className="text-3xl font-bold">Share Your Feedback</h1>
          <p>
            Thanks for taking your time to try AkashaLearn. I'd love to
            hear your thoughts, suggestions, or concerns.
            <br />
            All feedback is submitted anonymously, so feel free to share
            openly.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Your feedback here..."
            className="min-h-[150px]"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            disabled={isSubmitting}
          />

          <Button
            type="submit"
            disabled={isSubmitting || !feedback.trim()}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Feedback"
            )}
          </Button>
        </form>
      </div>
    </>
  );
};

export default FeedbackPage;
