import { Button } from "@/components/ui/button";
import api from "@/util/interceptor";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { AutoResizeTextarea } from "@/components/auto-resize-textarea";
import { Send } from "lucide-react";

function GenerateLessons() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    toast("We are generating lessons for you. Give us a few seconds");
    try {
      const res = await api.post("/topic", { content: message });
      toast.success("Your lessons are ready!", {
        duration: 5000,
        action: {
          label: "Go to topic",
          onClick: () => navigate("/topic/" + res.data.message),
        },
        actionButtonStyle: {
          backgroundColor: "var(--primary)",
          color: "var(--foreground)",
        },
      });
    } catch (err) {
      const error = err as AxiosError;
      if (error.status === 400) {
        const msg =
          (error.response?.data as { message: string })?.message ||
          "An unknown error occurred";
        toast.error(msg, {
          style: {
            color: "var(--destructive)",
          },
        });
      } else {
        toast.error("Got some errors on our end. We're fixing on it.", {
          style: {
            color: "var(--destructive)",
          },
        });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[calc(100svh-48px)] w-full max-w-2xl space-y-4 mx-auto flex flex-col px-1 font-custom">
      <div className="flex-1 grid place-items-center text-4xl font-medium text-primary text-center">
        Learn any topic with interactive lessons
      </div>

      <div className="mb-4 w-full">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <div className="flex-1">
              <AutoResizeTextarea
                placeholder="Type your content here"
                value={message}
                onChange={setMessage}
                maxHeight={200}
                className="min-h-[40px] pb-16 text-base"
              />
            </div>
            <Button
              type="submit"
              size="icon"
              className="h-10 w-auto px-4 ml-auto -mt-14 mr-2"
              disabled={!message.trim() || loading}
            >
              <Send className="h-5 w-5" />
              Generate
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default GenerateLessons;
