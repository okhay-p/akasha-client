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
      <div className="font-merriweather-sans text-center flex flex-col items-center gap-2 mt-40">
        <Button>
          <Link to="/generate-lessons">Generate Lessons</Link>
        </Button>
        <Button onClick={testApi}>API Testing</Button>
        {apiStatus && <p>{apiStatus}</p>}
      </div>
    </div>
  );
}

export default Landing;
