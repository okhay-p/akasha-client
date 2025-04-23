import api from "@/util/interceptor";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AxiosError } from "axios";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LessonPreviewCard from "@/components/lesson-preview-card";

export interface TopicLesson {
  lesson_id: string;
  lesson_order: number;
  content: Array<string>;
  lesson_title: string;
  objectives: Array<string>;
  questions: Array<TopicQuestion>;
}

export interface TopicQuestion {
  question_id: string;
  options: Array<string>;
  question_order: number;
  question_text: string;
}

export interface TopicFullDetails {
  topic_id: string;
  topic_title: string;
  emoji: string;
  created_at: string;
  created_by: string;
  is_public: boolean;
  updated_at: string;
  lessons: Array<TopicLesson>;
}

function TopicPage() {
  const { id } = useParams();

  const [topic, setTopic] = useState<TopicFullDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const response = await api.get<TopicFullDetails>(
          "/topic/details/" + id,
        );

        // PROBABLY NOT A GOOD IDEA FOR DATA INTEGRITY
        if (id) {
          localStorage.setItem(id, JSON.stringify(response.data));
        }

        console.log("Gotta fetch them");

        setTopic(response.data);
      } catch (err) {
        const error = err as AxiosError;
        if (error.status === 404) {
          setError("Aw, Crap.. we could not find the topic ☹️");
        } else {
          setError(
            "There was some error in the server. But, we're trying our best to fix it 😉",
          );
        }
      }
    };

    const fetchProgress = async () => {
      const res = await api.get("/topic/progress/" + id);
      setProgress(res.data.current_lesson);
    };

    if (id) {
      // Check topic in localStorage first
      const ls = localStorage.getItem(id);
      if (ls) {
        const parsedJson = JSON.parse(ls);
        console.log("Yoinked it from localstorage");
        setTopic(parsedJson);
      } else {
        fetchTopic();
      }

      // Get or create current progress
      fetchProgress();
    }
  }, [id]);

  return (
    <div className="h-screen">
      <div className="grid place-items-center h-screen">
        {topic && (
          <Card className="w-[350px] max-w-[90%] mt-24 shadow-md">
            <CardHeader>
              <CardTitle className="font-custom mb-1 font-medium">
                <div className="inline border rounded-sm p-1 mr-1 shadow-sm">
                  {topic.emoji}
                </div>
                {topic.topic_title}
              </CardTitle>
              <CardDescription>by {topic.created_by}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                {topic.lessons
                  .sort((a, b) => a.lesson_order - b.lesson_order)
                  .map((item, index) => {
                    return (
                      <LessonPreviewCard
                        key={index}
                        item={item}
                        cur={progress}
                      />
                    );
                  })}
              </div>
            </CardContent>
          </Card>
        )}
        <p>{error}</p>
      </div>
    </div>
  );
}

export default TopicPage;
