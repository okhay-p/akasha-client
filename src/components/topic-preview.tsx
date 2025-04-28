import { Link } from "react-router-dom";
import { Card, CardContent } from "./ui/card";

export interface TopicL1 {
  emoji: string;
  title: string;
  id: string;
  created_by: string;
  created_at: string;
  is_public: boolean;
  status_id: number;
  updated_at: string;
}

interface Props {
  topic: TopicL1;
}

function TopicPreview({ topic }: Props) {
  return (
    <Link to={"/topic/" + topic.id}>
      <Card className="size-40 flex justify-center items-center">
        <CardContent>
          <div className="mx-auto size-8 shadow-sm rounded-md grid place-items-center border mb-2">
            {topic.emoji}
          </div>
          <p className="text-wrap">{topic.title}</p>
        </CardContent>
      </Card>
    </Link>
  );
}

export default TopicPreview;
