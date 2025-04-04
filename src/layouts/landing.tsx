import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";

function Landing() {
  return (
    <>
      <Header />
      <div className="font-merriweather-sans text-center">
        <Button>
          <Link to="/generate-lessons">Generate Lessons</Link>
        </Button>
      </div>
    </>
  );
}

export default Landing;
