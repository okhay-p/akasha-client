import Header from "@/components/header";
import api from "@/util/interceptor";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function TopicPage() {
  const { id } = useParams();

  useEffect(() => {
    api.get("/topic/" + id).then((data) => console.log(data));
  }, [id]);

  return (
    <>
      <Header />
      <p>This is a topic page for {id}</p>;
    </>
  );
}

export default TopicPage;
