import Header from "@/components/header";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import {
  TopicFullDetails,
  TopicLesson,
  TopicQuestion,
} from "./topic-page";
import LessonPartRenderer from "@/components/lesson-part-renderer";
import { Button } from "@/components/ui/button";

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

  const increaseIdx = () => {
    if (curIdx < parts.length) setCurIdx(curIdx + 1);
  };

  const decreaseIdx = () => {
    if (curIdx > 0) setCurIdx(curIdx - 1);
  };

  return (
    <div className="bg-dot h-screen font-custom">
      <Header />
      {lesson && (
        <div className="mt-8 flex justify-center relative">
          <div className="text-2xl">{lesson.lesson_title}</div>
          {parts.map((lp, i) => {
            return (
              <div className="absolute top-12" hidden={i != curIdx}>
                <LessonPartRenderer
                  key={i}
                  lp={lp}
                  increaseIdx={increaseIdx}
                  decreaseIdx={decreaseIdx}
                />
              </div>
            );
          })}
          <div
            className="absolute top-12"
            hidden={curIdx != parts.length}
          >
            <Card className="w-md p-4 font-custom">
              <p className="font-base text-lg text-center">
                That's all for this topic! Generate more if you want to
                learn more!
              </p>
              <div className="flex justify-end gap-2">
                <Link to={"/topic/" + id}>
                  <Button variant="secondary" className="w-24">
                    Home
                  </Button>
                </Link>
                <Link to="/generate-lessons">
                  <Button variant="default" className="w-24">
                    Generate
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

export default LessonPage;
