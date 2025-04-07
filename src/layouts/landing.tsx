import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import api from "@/util/interceptor";
import { useState } from "react";

function Landing() {
  const [apiStatus, setApiStatus] = useState("");

  const testApi = async () => {
    const res = await api.get("/");
    console.log(res);
    setApiStatus(res.data.message);
  };

  return (
    <div className="bg-dot h-dvh">
      <Header />
      <div className="font-custom-sans text-center flex flex-col items-center gap-2 mt-40">
        <Link to="/generate-lessons">
          <Button>Generate Lessons</Button>
        </Link>
        <Link to="/topic/0ab588ab-71aa-4025-835d-85e47486c5b7">
          <Button>test topic</Button>
        </Link>
        <Button onClick={testApi}>API Testing</Button>
        {apiStatus && <p>{apiStatus}</p>}
      </div>
    </div>
  );
}

export default Landing;
