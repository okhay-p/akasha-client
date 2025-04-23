import { LessonPart } from "@/layouts/lesson-page";
import { Button } from "./ui/button";

import { Card } from "@/components/ui/card";
import { TopicQuestion } from "@/layouts/topic-page";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import api from "@/util/interceptor";

interface Props {
  lp: LessonPart;
  increaseIdx: () => void;
  decreaseIdx: () => void;
  resetIdx: () => void;
  className: string;
}

function LessonPartRenderer({
  className,
  lp,
  increaseIdx,
  decreaseIdx,
}: Props) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(
    null,
  );
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  useState<Array<string> | null>(null);
  let senArr: Array<string> = [];

  const objData = lp.data as Array<string>;
  const cData = lp.data as string;
  const qData = lp.data as TopicQuestion;
  const fData = lp.data as Array<string>;

  const { id } = useParams();
  const handleAnswerClick = async (index: number) => {
    setSelectedAnswer(index);

    try {
      const qData = lp.data as TopicQuestion;
      const res = await api.get(
        "/question/" + qData.question_id + "/answer/" + index,
      );

      const isAnswerCorrect = res.data.answer;
      setIsCorrect(isAnswerCorrect);
    } catch (err) {
      console.log(err);
      setSelectedAnswer(null);
    }
  };

  switch (lp.type) {
    case "objectives":
      return (
        <Card className={className}>
          <p className="font-semibold text-lg text-center">
            Objectives
          </p>
          {objData.map((obj, i) => {
            return (
              <p key={i} className="font-base text-lg">
                {obj}
              </p>
            );
          })}
          <div className="flex justify-end gap-2">
            <Link to={"/topic/" + id}>
              <Button
                variant="secondary"
                className="w-24"
                onClick={decreaseIdx}
              >
                Home
              </Button>
            </Link>

            <Button className="w-24" onClick={increaseIdx}>
              Next
            </Button>
          </div>
        </Card>
      );
    case "content":
      senArr = cData.split(". ");

      return (
        <Card className={className}>
          {senArr &&
            senArr.map((s, i) => {
              return (
                <p key={i} className="font-base text-lg">
                  {i === senArr.length - 1 ? s : s + "."}
                </p>
              );
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
    case "question":
      return (
        <Card className={className}>
          <p className="font-base text-lg text-center">
            {qData.question_text}
          </p>
          <div className="flex flex-col gap-1">
            {qData.options.map((o, i) => {
              return (
                <Button
                  variant="outline"
                  key={i}
                  onClick={() => handleAnswerClick(i)}
                  className={
                    "w-[95%] mx-auto h-16 sm:h-12 " +
                    (selectedAnswer === i
                      ? isCorrect
                        ? "bg-green-300 dark:bg-green-950"
                        : "bg-red-300 dark:bg-red-950"
                      : "")
                  }
                  disabled={selectedAnswer === i}
                >
                  <p className="text-wrap">{o}</p>
                </Button>
              );
            })}
          </div>
          {isCorrect === false && <div className="text-center">❌</div>}
          {isCorrect === true && <div className="text-center">✅</div>}

          <div className="flex justify-end gap-2">
            <Button
              variant="secondary"
              className="w-24"
              onClick={decreaseIdx}
            >
              Prev
            </Button>

            <Button
              className="w-24"
              onClick={increaseIdx}
              disabled={selectedAnswer === null}
            >
              Next
            </Button>
          </div>
        </Card>
      );

    case "finished":
      return (
        <Card className={className}>
          <p className="font-base text-lg text-center">
            Congratulations 🥳 <br /> You have finished the lesson!
          </p>
          <div className="flex justify-end gap-2">
            <Link to={"/topic/" + fData[0]}>
              <Button variant="secondary" className="w-24">
                Home
              </Button>
            </Link>
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
