import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  TopicFullDetails,
  TopicLesson,
  TopicQuestion,
} from "./topic-page";
import LessonPartRenderer from "@/components/lesson-part-renderer";
import api from "@/util/interceptor";

export interface LessonPart {
  type: "objectives" | "content" | "question" | "finished";
  data: Array<string> | string | TopicQuestion;
}

function LessonPage() {
  const { id, order } = useParams();

  const [lesson, setLesson] = useState<TopicLesson | null>(null);
  const [curIdx, setCurIdx] = useState<number>(0);

  // [[obj1,obj2],"content1","content2", q1{},q2{}]
  const [parts, setParts] = useState<Array<LessonPart>>([]);

  useEffect(() => {
    // Get lesson from localStorage
    if (id) {
      const ls = localStorage.getItem(id);
      if (ls) {
        const parsedJson: TopicFullDetails = JSON.parse(ls);
        console.log("Yoinked it from localstorage");

        if (order) {
          const lsLesson = parsedJson.lessons.find(
            (item) => item.lesson_order === Number.parseInt(order),
          );
          if (lsLesson) {
            setLesson(lsLesson);

            // Populate lesson parts array
            const lpArr: LessonPart[] = [];
            lpArr.push({
              type: "objectives",
              data: lsLesson.objectives,
            });

            for (const c of lsLesson.content) {
              lpArr.push({
                type: "content",
                data: c,
              });
            }

            for (const q of lsLesson.questions) {
              lpArr.push({
                type: "question",
                data: q,
              });
            }

            lpArr.push({
              type: "finished",
              data: [id, order],
            });

            setParts(lpArr);
          }
        }
      }
    }
  }, [id, order]);

  useEffect(() => {
    if (curIdx === parts.length - 1) {
      if (id && order) api.put("/topic/progress/" + id + "/" + order);
    }
  }, [id, curIdx, parts, order]);

  const increaseIdx = () => {
    if (curIdx < parts.length) setCurIdx(curIdx + 1);
  };

  const decreaseIdx = () => {
    if (curIdx > 0) setCurIdx(curIdx - 1);
  };

  const resetIdx = () => {
    setCurIdx(0);
  };

  return (
    <div className="h-screen font-custom overflow-x-hidden">
      {lesson && (
        <div className="mx-auto flex flex-col justify-items-center mt-4 sm:mt-8 md:mt-16">
          <div className="text-center text-2xl px-8">
            {lesson.lesson_title}
          </div>
          <div className="mx-auto">
            {parts.map((lp, i) => {
              return (
                <div key={i} hidden={i != curIdx}>
                  <LessonPartRenderer
                    lp={lp}
                    increaseIdx={increaseIdx}
                    decreaseIdx={decreaseIdx}
                    resetIdx={resetIdx}
                    className="w-[350px] sm:w-md p-4 font-custom"
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default LessonPage;
