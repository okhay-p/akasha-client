import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import axios from "axios";
import { useState } from "react";

function Landing() {
  const [apiStatus, setApiStatus] = useState("");

  const testApi = async () => {
    const res = await axios.get("http://localhost:8080/user");
    console.log(res);
    setApiStatus(res.data.toString());
  };

  return (
    <>
      <Header />
      <div className="font-merriweather-sans text-center flex flex-col items-center gap-2 mt-2">
        <Button>
          <Link to="/generate-lessons">Generate Lessons</Link>
        </Button>
        <Button onClick={testApi}>API Testing</Button>
        {apiStatus && <p>{apiStatus}</p>}
      </div>
    </>
  );
}

export default Landing;
