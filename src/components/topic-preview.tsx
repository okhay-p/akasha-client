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
      <Card className="h-24 flex justify-center ">
        <CardContent>
          <p className="font-semibold">
            {topic.emoji} {topic.title}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}

export default TopicPreview;
