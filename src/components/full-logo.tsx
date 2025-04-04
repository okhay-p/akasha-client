import logo from "@/assets/logo.svg";
import { Link } from "react-router-dom";

function FullLogo() {
  return (
    <Link to="/">
      <div className="flex items-center">
        <img src={logo} className="w-12 mr-2" alt="logo" />
        <p className="hidden md:block text-xl font-bold font-merriweather text-primary">
          AkashaLearn
        </p>
      </div>
    </Link>
  );
}

export default FullLogo;
