import { LessonPart } from "@/layouts/lesson-page";
import { Button } from "./ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TopicQuestion } from "@/layouts/topic-page";

interface Props {
  lp: LessonPart;
  increaseIdx: () => void;
  decreaseIdx: () => void;
}

function LessonPartRenderer({ lp, increaseIdx, decreaseIdx }: Props) {
  console.log(lp);
  switch (lp.type) {
    case "objectives":
      const objData = lp.data as Array<string>;
      return (
        <Card className="w-md p-4 font-custom">
          <p className="font-semibold text-lg text-center">
            Objectives
          </p>
          {objData.map((obj, i) => {
            return <p key={i}>{obj}</p>;
          })}
          <div className="flex justify-end gap-2">
            <Button
              variant="secondary"
              className="w-24"
              onClick={decreaseIdx}
            >
              Prev
            </Button>

            <Button className="w-24" onClick={increaseIdx}>
              Next
            </Button>
          </div>
        </Card>
      );
    case "content":
      const cData = lp.data as string;
      return (
        <Card className="w-md p-4 font-custom">
          <p className="font-base text-lg text-center">{cData}</p>
          <div className="flex justify-end gap-2">
            <Button
              variant="secondary"
              className="w-24"
              onClick={decreaseIdx}
            >
              Prev
            </Button>

            <Button className="w-24" onClick={increaseIdx}>
              Next
            </Button>
          </div>
        </Card>
      );
    case "question":
      const qData = lp.data as TopicQuestion;
      return (
        <Card className="w-md p-4 font-custom">
          <p className="font-base text-lg text-center">
            {qData.question_text}
          </p>
          <div className="flex flex-col gap-1">
            {qData.options.map((o, i) => {
              return (
                <Button variant="outline" key={i}>
                  {o}
                </Button>
              );
            })}
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="secondary"
              className="w-24"
              onClick={decreaseIdx}
            >
              Prev
            </Button>

            <Button className="w-24" onClick={increaseIdx}>
              Next
            </Button>
          </div>
        </Card>
      );
  }

  return (
    <div>
      <div>{lp.data.toString()}</div>
    </div>
  );
}

export default LessonPartRenderer;
