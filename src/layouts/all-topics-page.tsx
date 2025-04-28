import TopicPreview, { TopicL1 } from "@/components/topic-preview";
import { Button } from "@/components/ui/button";
import api from "@/util/interceptor";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AllTopicsPage() {
  const [publicTopics, setPublicTopics] =
    useState<Array<TopicL1> | null>(null);
  const [userTopics, setUserTopics] = useState<Array<TopicL1> | null>(
    null,
  );
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await api.get("/topic");
        setPublicTopics(res.data.public_topics);
        setUserTopics(res.data.user_topics);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTopics();
  }, []);

  return (
    <div className="h-screen p-2 font-custom">
      {/* Generated Topics Section */}
      <section className="mx-auto mt-2 md:w-[calc(100vw-16rem)] max-w-4xl">
        <div className="font-medium mb-1">Generaetd By You</div>
        <div className="flex gap-4 w-full overflow-x-auto whitespace-nowrap">
          {userTopics ? (
            userTopics.map((topic, index) => {
              return <TopicPreview key={index} topic={topic} />;
            })
          ) : (
            <div className="mx-auto flex flex-col gap-2 items-center">
              You have not generated any topic yet
              <Link to="/generate-lessons">
                <Button>Generate</Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Discover section */}
      <section className="mt-2 mx-auto md:w-[calc(100vw-16rem)] max-w-4xl">
        <div className="font-medium mb-1">Discover More</div>
        <div className="grid grid-cols-2 gap-2">
          {publicTopics ? (
            publicTopics.map((topic, index) => {
              return <TopicPreview key={index} topic={topic} />;
            })
          ) : (
            <div className="mx-auto flex flex-col gap-2 items-center">
              You have not generated any topic yet
              <Link to="/generate-lessons">
                <Button>Generate</Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default AllTopicsPage;
