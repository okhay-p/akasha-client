import { TopicLesson } from "@/layouts/topic-page";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

interface LessonPreviewCardProps {
  item: TopicLesson;
  cur: number;
}

function LessonPreviewCard({ item, cur }: LessonPreviewCardProps) {
  return (
    <Link
      to={item.lesson_order.toString()}
      className={item.lesson_order > cur ? "pointer-events-none" : ""}
    >
      <Button
        className="h-[60px] w-[100%] flex items-center p-2 font-custom font-medium justify-between"
        variant="outline"
        disabled={item.lesson_order > cur}
      >
        <p>
          {item.lesson_title.length > 35
            ? item.lesson_title.slice(0, 33) + "..."
            : item.lesson_title}
        </p>
        <div className="grid place-items-center text-base">
          {item.lesson_order < cur
            ? "✅"
            : item.lesson_order > cur
              ? "🔐"
              : "➡️"}
        </div>
      </Button>
    </Link>
  );
}

export default LessonPreviewCard;
