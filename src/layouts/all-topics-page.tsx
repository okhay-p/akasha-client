import Header from "@/components/header";
import TopicPreview, { TopicL1 } from "@/components/topic-preview";
import api from "@/util/interceptor";
import { useEffect, useState } from "react";

function AllTopicsPage() {
  const [topics, setTopics] = useState<Array<TopicL1> | null>(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await api.get("/topic");
        setTopics(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTopics();
  }, []);

  return (
    <div className="h-screen bg-dot">
      <Header />
      <div className="max-w-[1400px] mx-auto">
        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 p-2">
          {topics &&
            topics.map((topic, index) => {
              return <TopicPreview key={index} topic={topic} />;
            })}
        </div>
      </div>
    </div>
  );
}

export default AllTopicsPage;
